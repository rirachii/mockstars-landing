// import * as pdfjsLib from 'pdfjs-dist';

// // Set up the worker
// if (typeof window !== 'undefined') {
//   pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// }

// export interface ParsedResumeData {
//   text: string;
//   pages: string[];
//   metadata?: {
//     title?: string;
//     author?: string;
//     creator?: string;
//     producer?: string;
//     creationDate?: Date;
//     modificationDate?: Date;
//   };
// }

// export class PDFParser {
//   /**
//    * Parse a PDF file and extract text content
//    * @param file - File object from input[type="file"]
//    * @returns Promise with parsed text and metadata
//    */
//   static async parseFile(file: File): Promise<ParsedResumeData> {
//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       return await this.parseArrayBuffer(arrayBuffer);
//     } catch (error) {
//       console.error('Error parsing PDF file:', error);
//       throw new Error('Failed to parse PDF file');
//     }
//   }

//   /**
//    * Parse a PDF from array buffer
//    * @param arrayBuffer - PDF file as ArrayBuffer
//    * @returns Promise with parsed text and metadata
//    */
//   static async parseArrayBuffer(arrayBuffer: ArrayBuffer): Promise<ParsedResumeData> {
//     try {
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//       const pages: string[] = [];
//       let fullText = '';

//       // Extract text from each page
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
        
//         // Combine text items into a single string for the page
//         const pageText = textContent.items
//           .map((item: any) => item.str)
//           .join(' ')
//           .replace(/\s+/g, ' ')
//           .trim();
        
//         pages.push(pageText);
//         fullText += pageText + '\n';
//       }

//       // Get PDF metadata
//       const metadata = await pdf.getMetadata();
//       const info: any = (metadata as any)?.info ?? {};

//       return {
//         text: fullText.trim(),
//         pages,
//         metadata: {
//           title: info?.Title,
//           author: info?.Author,
//           creator: info?.Creator,
//           producer: info?.Producer,
//           creationDate: info?.CreationDate,
//           modificationDate: info?.ModDate,
//         },
//       };
//     } catch (error) {
//       console.error('Error parsing PDF:', error);
//       throw new Error('Failed to parse PDF content');
//     }
//   }

//   /**
//    * Parse PDF from URL
//    * @param url - URL to PDF file
//    * @returns Promise with parsed text and metadata
//    */
//   static async parseFromUrl(url: string): Promise<ParsedResumeData> {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const arrayBuffer = await response.arrayBuffer();
//       return await this.parseArrayBuffer(arrayBuffer);
//     } catch (error) {
//       console.error('Error fetching and parsing PDF from URL:', error);
//       throw new Error('Failed to fetch and parse PDF from URL');
//     }
//   }

//   /**
//    * Extract structured data from parsed resume text
//    * This is a basic parser - you might want to enhance with AI/ML
//    */
//   static extractResumeData(parsedText: string): Partial<any> {
//     const text = parsedText.toLowerCase();
//     const lines = parsedText.split('\n').filter(line => line.trim());
    
//     // Basic extraction patterns
//     const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
//     const phoneRegex = /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
    
//     // Extract basic info
//     const email = parsedText.match(emailRegex)?.[0];
//     const phone = parsedText.match(phoneRegex)?.[0];
    
//     // Find potential name (usually first line or first substantial text)
//     const potentialName = lines.find(line => 
//       line.length > 5 && 
//       line.length < 50 && 
//       !line.includes('@') && 
//       !line.match(/\d{4}/) // Avoid years
//     );

//     // Basic section detection
//     const sections = {
//       experience: this.findSection(text, ['experience', 'work history', 'employment']),
//       education: this.findSection(text, ['education', 'academic', 'degree']),
//       skills: this.findSection(text, ['skills', 'technical skills', 'competencies']),
//       summary: this.findSection(text, ['summary', 'objective', 'profile']),
//     };

//     return {
//       personalInfo: {
//         name: potentialName,
//         email,
//         phone,
//       },
//       sections,
//       rawText: parsedText,
//     };
//   }

//   /**
//    * Helper method to find sections in resume text
//    */
//   private static findSection(text: string, keywords: string[]): string | null {
//     for (const keyword of keywords) {
//       const index = text.indexOf(keyword);
//       if (index !== -1) {
//         // Extract text after the keyword until next major section
//         const afterKeyword = text.substring(index + keyword.length);
//         const nextSectionIndex = afterKeyword.search(/\b(experience|education|skills|summary|objective|projects)\b/);
        
//         if (nextSectionIndex !== -1) {
//           return afterKeyword.substring(0, nextSectionIndex).trim();
//         } else {
//           return afterKeyword.substring(0, 500).trim(); // Limit to reasonable length
//         }
//       }
//     }
//     return null;
//   }
// }
