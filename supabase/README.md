# MockStars Resume Parser - Production Deployment Guide

## 🚀 Quick Start

### 1. Prerequisites
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- OpenRouter account and API key
- Google Cloud account with Vertex AI enabled

### 2. Installation
```bash
# Install Supabase CLI
npm install -g supabase
# or
brew install supabase/tap/supabase

# Login to Supabase
supabase login

# Link to your project (run in project root)
supabase link --project-ref your-project-ref
```

### 3. Environment Setup
```bash
# Copy environment template
cp supabase/.env.example supabase/.env.local

# Edit with your actual values
# - OPENROUTER_API_KEY
# - VERTEX_AI_PROJECT_ID  
# - VERTEX_AI_API_KEY
```

### 4. Deploy Functions
```bash
# Make deploy script executable
chmod +x supabase/deploy.sh

# Run deployment
./supabase/deploy.sh
```

## 📋 Function Details

### `resume-parse-upload`
**Endpoint:** `https://[project-ref].supabase.co/functions/v1/resume-parse-upload`

**Features:**
- ✅ Supports PDF, DOC, DOCX, HTML, RTF, TXT, JPEG, JPG, PNG
- ✅ OCR processing for images and scanned documents
- ✅ AI-powered text extraction and parsing
- ✅ Rate limiting and cost controls
- ✅ Security validation and content filtering
- ✅ Multi-tier user support (anonymous/registered/premium)

**Request Format:**
```json
{
  "fileUrl": "https://storage-url/file.pdf",
  "fileName": "resume.pdf", 
  "fileType": "pdf",
  "userId": "optional-user-id",
  "userTier": "anonymous|registered|premium"
}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "rawText": "extracted text...",
    "extractedInfo": {
      "personalInfo": { "name": "...", "email": "..." },
      "experience": [...],
      "education": [...],
      "skills": [...]
    },
    "metadata": {
      "originalName": "resume.pdf",
      "fileType": "pdf", 
      "processingMethod": "direct|ocr",
      "confidence": 95
    },
    "warnings": [],
    "suggestions": []
  },
  "processingTime": 1500,
  "tokensUsed": 250,
  "costs": {
    "ocrTokens": 100,
    "parsingTokens": 150,
    "totalEstimatedCost": 0.0003
  }
}
```

## 🔧 Configuration

### Rate Limits
| Tier | Requests/Hour | Tokens/Day | Max File Size |
|------|---------------|------------|---------------|
| Anonymous | 5 | 10,000 | 2MB |
| Registered | 20 | 50,000 | 10MB |
| Premium | 100 | 200,000 | 25MB |

### Supported File Types
- **Documents:** PDF, DOC, DOCX, HTML, RTF, TXT
- **Images:** JPEG, JPG, PNG
- **Max Dimensions:** 8192x8192 (premium), 4096x4096 (registered), 2048x2048 (anonymous)

### AI Models Used
- **Text Parsing:** Mistral 7B (~$0.0001/1K tokens)
- **OCR Processing:** Gemini 1.5 Flash (~$0.001/1K tokens)
- **Enhancement:** Claude Haiku (~$0.0005/1K tokens)

## 🛠️ Local Development

### Start Local Environment
```bash
# Start all Supabase services
supabase start

# Serve functions locally  
supabase functions serve

# Test specific function
supabase functions serve resume-parse-upload --debug
```

### Test Function Locally
```bash
curl -X POST http://127.0.0.1:54321/functions/v1/resume-parse-upload \
  -H "Authorization: Bearer eyJ..." \
  -H "Content-Type: application/json" \
  -d '{
    "fileUrl": "https://example.com/resume.pdf",
    "fileName": "resume.pdf",
    "fileType": "pdf"
  }'
```

## 📊 Monitoring & Debugging

### View Function Logs
```bash
# Real-time logs
supabase functions logs resume-parse-upload --follow

# Recent logs
supabase functions logs resume-parse-upload --limit 100
```

### Performance Metrics
- Processing time: Target <3 seconds for documents, <10 seconds for images
- Token usage: Monitored per user/IP for cost control
- Success rate: Target >95% for standard documents
- Error tracking: All errors logged with context

### Common Issues
1. **"Rate limit exceeded"** → User hit hourly/daily limits
2. **"File too large"** → Exceeds tier limits
3. **"OCR failed"** → Image quality too low or unsupported format
4. **"AI processing failed"** → Model API issue or malformed response

## 🔐 Security Features

- ✅ Input validation and sanitization
- ✅ File type verification via signatures
- ✅ Content security scanning
- ✅ Rate limiting per IP/user
- ✅ CORS protection
- ✅ Secure file download with validation
- ✅ PII detection warnings

## 💰 Cost Optimization

### Estimated Costs
- **Text document:** ~$0.0002 per resume
- **Image/OCR:** ~$0.002 per resume
- **Monthly (1000 resumes):** ~$0.50-$2.00

### Cost Controls
- Automatic model selection based on complexity
- Rate limiting prevents abuse
- File size restrictions
- Token usage tracking

## 🚨 Error Handling

### Error Codes
- `INVALID_FILE_TYPE` → Unsupported file format
- `FILE_TOO_LARGE` → Exceeds size limits
- `RATE_LIMIT_EXCEEDED` → Too many requests
- `PARSING_FAILED` → Document parsing error
- `OCR_FAILED` → Image text extraction error
- `AI_PROCESSING_FAILED` → AI model error

### Retry Logic
- Automatic retries for transient AI failures
- Fallback between different AI models
- Graceful degradation (OCR → direct parsing)

## 🔄 Roadmap

### Upcoming Features
- Additional file formats (PowerPoint, etc.)
- Enhanced OCR accuracy
- Multi-language support  
- Batch processing
- Resume quality scoring
- ATS optimization suggestions

### Performance Improvements
- Caching for repeated requests
- Parallel processing for large files
- Edge function geographic distribution
- Response compression
