import { ResumeData } from './types.ts';

// AI Model configurations
export const AI_MODELS = {
  TEXT_PARSING: {
    provider: 'openrouter',
    model: 'mistral/mistral-7b-instruct',
    maxTokens: 2000,
    temperature: 0.1,
    costPerToken: 0.0001 / 1000 // $0.0001 per 1K tokens
  },
  IMAGE_OCR: {
    provider: 'vertex',
    model: 'gemini-1.5-flash',
    maxTokens: 4000,
    temperature: 0,
    costPerToken: 0.001 / 1000
  },
  CONTENT_ENHANCEMENT: {
    provider: 'openrouter',
    model: 'anthropic/claude-3-haiku',
    maxTokens: 4000,
    temperature: 0.3,
    costPerToken: 0.0005 / 1000
  }
};

export class OpenRouterClient {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor() {
    this.apiKey = Deno.env.get('OPENROUTER_API_KEY')!;
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is required');
    }
  }

  async chat(model: string, messages: any[], options: any = {}): Promise<{
    content: string;
    tokensUsed: number;
    cost: number;
  }> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://mockstars.ai',
        'X-Title': 'MockStars Resume Parser'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: options.maxTokens || 2000,
        temperature: options.temperature || 0.1,
        stream: false
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const tokensUsed = data.usage?.total_tokens || 0;
    
    if (!content) {
      throw new Error('No content returned from OpenRouter API');
    }

    return {
      content,
      tokensUsed,
      cost: tokensUsed * (options.costPerToken || 0.0001 / 1000)
    };
  }

  async parseResumeText(text: string): Promise<{
    data: ResumeData;
    tokensUsed: number;
    cost: number;
    confidence: number;
  }> {
    const systemPrompt = `You are an expert resume parser. Extract structured information from resume text and return it as valid JSON.

Return a JSON object with this exact structure:
{
  "personalInfo": {
    "name": string | null,
    "email": string | null,
    "phone": string | null,
    "location": string | null,
    "website": string | null,
    "linkedin": string | null,
    "github": string | null
  },
  "summary": string | null,
  "experience": [
    {
      "title": string,
      "company": string,
      "startDate": string,
      "endDate": string,
      "location": string | null,
      "description": [string],
      "achievements": [string] | null
    }
  ],
  "education": [
    {
      "degree": string,
      "school": string,
      "year": string,
      "gpa": string | null,
      "relevant_courses": [string] | null,
      "achievements": [string] | null
    }
  ],
  "skills": [string],
  "projects": [
    {
      "name": string,
      "description": string,
      "technologies": [string],
      "url": string | null,
      "github": string | null
    }
  ] | null,
  "certifications": [string] | null,
  "languages": [string] | null,
  "confidence": number (0-100)
}

Important:
- Extract ALL relevant information
- For dates, use formats like "Jan 2020", "2020-2023", "Present"
- Break down job descriptions into bullet points
- Extract skills from all sections
- Include confidence score based on text clarity
- Return ONLY valid JSON, no other text`;

    const userPrompt = `Parse this resume text:\n\n${text}`;

    const result = await this.chat(
      AI_MODELS.TEXT_PARSING.model,
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      {
        maxTokens: AI_MODELS.TEXT_PARSING.maxTokens,
        temperature: AI_MODELS.TEXT_PARSING.temperature,
        costPerToken: AI_MODELS.TEXT_PARSING.costPerToken
      }
    );

    try {
      // Clean the response to ensure it's valid JSON
      const cleanedContent = result.content.replace(/```json\n?|\n?```/g, '').trim();
      const parsedData = JSON.parse(cleanedContent);
      
      return {
        data: parsedData,
        tokensUsed: result.tokensUsed,
        cost: result.cost,
        confidence: parsedData.confidence || 0
      };
    } catch (error) {
      throw new Error(`Failed to parse AI response as JSON: ${error.message}`);
    }
  }
}

export class VertexAIClient {
  private projectId: string;
  private location: string;
  private accessToken: string | null = null;

  constructor() {
    this.projectId = Deno.env.get('VERTEX_AI_PROJECT_ID')!;
    this.location = Deno.env.get('VERTEX_AI_LOCATION') || 'us-central1';
    
    if (!this.projectId) {
      throw new Error('VERTEX_AI_PROJECT_ID environment variable is required');
    }
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    // In production, you'd use service account authentication
    // For now, we'll use the API key method
    const apiKey = Deno.env.get('VERTEX_AI_API_KEY');
    if (!apiKey) {
      throw new Error('VERTEX_AI_API_KEY environment variable is required');
    }

    this.accessToken = apiKey;
    return apiKey;
  }

  async extractTextFromImage(imageData: Uint8Array, mimeType: string): Promise<{
    text: string;
    confidence: number;
    tokensUsed: number;
    cost: number;
  }> {
    const token = await this.getAccessToken();
    const base64Image = btoa(String.fromCharCode(...imageData));

    const prompt = `Extract ALL text from this image. This appears to be a resume or CV. 
Please provide:
1. All text content exactly as it appears
2. Maintain formatting and structure where possible
3. Include all sections: personal info, experience, education, skills, etc.

Return the extracted text in a clean, readable format.`;

    const requestBody = {
      contents: [{
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Image
            }
          }
        ]
      }],
      generation_config: {
        temperature: 0,
        max_output_tokens: AI_MODELS.IMAGE_OCR.maxTokens,
      }
    };

    const response = await fetch(
      `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/publishers/google/models/${AI_MODELS.IMAGE_OCR.model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Vertex AI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('No text extracted from image');
    }

    // Estimate tokens and cost
    const estimatedTokens = Math.ceil(text.length / 4); // Rough estimate
    const cost = estimatedTokens * AI_MODELS.IMAGE_OCR.costPerToken;

    return {
      text,
      confidence: 85, // Base confidence for OCR
      tokensUsed: estimatedTokens,
      cost
    };
  }
}

export class AIClientManager {
  private openRouterClient: OpenRouterClient;
  private vertexClient: VertexAIClient;

  constructor() {
    this.openRouterClient = new OpenRouterClient();
    this.vertexClient = new VertexAIClient();
  }

  async parseDocumentText(text: string): Promise<{
    data: ResumeData;
    tokensUsed: number;
    cost: number;
    confidence: number;
  }> {
    return await this.openRouterClient.parseResumeText(text);
  }

  async extractTextFromImage(imageData: Uint8Array, mimeType: string): Promise<{
    text: string;
    confidence: number;
    tokensUsed: number;
    cost: number;
  }> {
    return await this.vertexClient.extractTextFromImage(imageData, mimeType);
  }

  // Fallback method with retry logic
  async parseWithFallback(text: string, retries = 2): Promise<{
    data: ResumeData;
    tokensUsed: number;
    cost: number;
    confidence: number;
    model: string;
  }> {
    let lastError: Error | null = null;

    for (let i = 0; i <= retries; i++) {
      try {
        const result = await this.parseDocumentText(text);
        return {
          ...result,
          model: AI_MODELS.TEXT_PARSING.model
        };
      } catch (error) {
        lastError = error as Error;
        console.warn(`Parsing attempt ${i + 1} failed:`, error.message);
        
        if (i < retries) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
    }

    throw new Error(`AI parsing failed after ${retries + 1} attempts. Last error: ${lastError?.message}`);
  }
}
