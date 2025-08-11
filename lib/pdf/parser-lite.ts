// export function extractResumeData(parsedText: string): {
//   personalInfo: { name?: string | null; email?: string | null; phone?: string | null };
//   sections: { experience: string | null; education: string | null; skills: string | null; summary: string | null };
//   rawText: string;
// } {
//   const text = parsedText.toLowerCase();
//   const lines = parsedText.split('\n').filter((line) => line.trim());

//   const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
//   const phoneRegex = /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;

//   const email = parsedText.match(emailRegex)?.[0] || null;
//   const phone = parsedText.match(phoneRegex)?.[0] || null;

//   const potentialName =
//     lines.find(
//       (line) =>
//         line.length > 5 &&
//         line.length < 50 &&
//         !line.includes('@') &&
//         !line.match(/\d{4}/)
//     ) || null;

//   function findSection(t: string, keywords: string[]): string | null {
//     for (const keyword of keywords) {
//       const index = t.indexOf(keyword);
//       if (index !== -1) {
//         const afterKeyword = t.substring(index + keyword.length);
//         const nextSectionIndex = afterKeyword.search(
//           /\b(experience|education|skills|summary|objective|projects)\b/
//         );
//         if (nextSectionIndex !== -1) {
//           return afterKeyword.substring(0, nextSectionIndex).trim();
//         } else {
//           return afterKeyword.substring(0, 500).trim();
//         }
//       }
//     }
//     return null;
//   }

//   const sections = {
//     experience: findSection(text, ['experience', 'work history', 'employment']),
//     education: findSection(text, ['education', 'academic', 'degree']),
//     skills: findSection(text, ['skills', 'technical skills', 'competencies']),
//     summary: findSection(text, ['summary', 'objective', 'profile'])
//   };

//   return {
//     personalInfo: {
//       name: potentialName,
//       email,
//       phone
//     },
//     sections,
//     rawText: parsedText
//   };
// } 