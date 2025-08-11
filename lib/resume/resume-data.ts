import React from "react";

/**
 * Production-ready React (TSX) resume renderer
 * - ATS-friendly (semantic HTML, no icons required, high contrast)
 * - Print-to-PDF ready (A4/Letter safe margins, page-break handling)
 * - Theme-aware (colors, columns, density, section order)
 * - Uses Tailwind utility classes; safe defaults if Tailwind not present
 * - Minimal dependencies (React only)
 *
 * Usage:
 * <ResumeDocument data={resumeData} theme={theme} />
 * Then use browser Print → Save as PDF. Ensure background graphics are enabled.
 */

/**********************
 * Types
 **********************/
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";


export interface ResumeData {
  id: string;
  variantName?: string;
  targetRole?: string;
  targetCompany?: string;
  keywords?: string[];
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string; // "Austin, TX" or "Remote"
    pronouns?: string; // "she/her"
    workAuthorization?: string; // "US Citizen"
    clearance?: string; // "TS/SCI"
    links?: Array<{ id: string; label: string; url: string; icon?: string; order: number }>;
  };
  summary?: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string; // ISO YYYY-MM or YYYY-MM-DD
    endDate?: string; // ISO or omitted
    isCurrent?: boolean;
    bullets: Array<{
      id: string;
      text: string;
      impact?: { value: number; unit?: string; baseline?: number };
    }>;
    technologies?: string[];
    order: number;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    role?: string;
    description?: string;
    highlights?: string[];
    technologies?: string[];
    links?: Array<{ label: string; url: string }>;
    order: number;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    startYear?: string;
    endYear?: string;
    gpa?: string;
    coursework?: string[];
    honors?: string[];
    order: number;
  }>;
  skills: Array<{ name: string; level?: SkillLevel; category?: string }>;
  certifications?: Array<{ id: string; name: string; issuer?: string; date?: string; credentialId?: string; url?: string; order: number }>;
  awards?: Array<{ id: string; name: string; issuer?: string; date?: string; description?: string; order: number }>;
  languages?: Array<{ name: string; level: "A1"|"A2"|"B1"|"B2"|"C1"|"C2"|"Native" }>;
  volunteering?: Array<{ id: string; org: string; role: string; startDate: string; endDate?: string; bullets?: string[]; order: number }>;
  publications?: Array<{ id: string; title: string; venue?: string; date?: string; url?: string; order: number }>;
  interests?: string[];
  metadata?: { createdAt: string; updatedAt: string; derivedFromId?: string };
}




/**********************
 * Helpers
 **********************/
const cx = (...classes: Array<string | false | undefined | null>) => classes.filter(Boolean).join(" ");

const monthYear = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso; // fallback
  return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
};

const dateRange = (start: string, end?: string, isCurrent?: boolean) => {
  const s = monthYear(start);
  const e = isCurrent ? "Present" : monthYear(end) || "";
  return e ? `${s} – ${e}` : s;
};

const normalizeOrder = <T extends { order: number }>(arr?: T[]) =>
  (arr || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const isKeywordHit = (word: string, keywords?: string[]) => {
  if (!keywords || keywords.length === 0) return false;
  const lc = word.toLowerCase();
  return keywords.some(k => lc.includes(k.toLowerCase()));
};

/**********************
 * Layout Shell
 **********************/
// export default function ResumeDocument({ data, theme }: { data: ResumeData; theme?: Theme }) {
//   const t = theme || data.theme || defaultTheme;
//   const density = t.density || "cozy";
//   const columns = t.columns || 1;
//   const sectionOrder = t.sectionOrder || defaultTheme.sectionOrder;

//   return (
//     <div
//       className="w-[850px] mx-auto bg-white text-neutral-900 print:w-auto"
//       style={{
//         fontFamily: t.fontFamily || "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial",
//         // CSS variables for theming
//         // @ts-ignore
//         "--accent": t.accentColor || defaultTheme.accentColor || "#0f172a",
//       }}
//     >
//       <PageStyle page={t.page} />
//       <header className="pt-6 pb-4 border-b" style={{ borderColor: "#e5e7eb" }}>
//         <Header data={data} />
//       </header>

//       <main className={cx(columns === 2 ? "grid grid-cols-12 gap-6" : "", density === "compact" ? "leading-tight" : "leading-relaxed")}
//         style={{ padding: t.page?.margin ? `calc(${t.page.margin} - 2mm)` : "18mm" }}
//       >
//         {columns === 2 ? (
//           <>
//             <section className="col-span-5 space-y-6">
//               {renderSections(sectionOrder.filter(s => leftColumnSections.has(s)), data, t)}
//             </section>
//             <section className="col-span-7 space-y-6">
//               {renderSections(sectionOrder.filter(s => rightColumnSections.has(s)), data, t)}
//             </section>
//           </>
//         ) : (
//           <section className="space-y-6">
//             {renderSections(sectionOrder, data, t)}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }

// /**********************
//  * Theming & Page Styles
//  **********************/
// const defaultTheme: Theme = {
//   template: "ATSMinimal",
//   accentColor: "#0f172a", // slate-900
//   density: "cozy",
//   columns: 1,
//   sectionOrder: [
//     "summary",
//     "experience",
//     "projects",
//     "education",
//     "skills",
//     "certifications",
//     "awards",
//     "languages",
//     "publications",
//     "volunteering",
//     "interests",
//   ],
//   page: { size: "letter", margin: "0.5in" },
// };

// const leftColumnSections = new Set(["skills", "certifications", "awards", "languages", "interests"]);
// const rightColumnSections = new Set(["summary", "experience", "projects", "education", "publications", "volunteering"]);

// function PageStyle({ page }: { page?: Theme["page"] }) {
//   const size = page?.size === "a4" ? "210mm 297mm" : "8.5in 11in";
//   const margin = page?.margin || "0.5in";
//   return (
//     <style>{`
//       @page { size: ${size}; margin: ${margin}; }
//       @media print {
//         html, body { background: white; }
//         .avoid-break { break-inside: avoid; }
//         .page-break { break-before: page; }
//       }
//     `}</style>
//   );
// }

// /**********************
//  * Sections renderer
//  **********************/
// function renderSections(order: string[], data: ResumeData, theme: Theme) {
//   return order.map((key) => {
//     switch (key) {
//       case "summary":
//         return data.summary ? (
//           <Section key={key} title="Summary">
//             <p className="text-[0.92rem] text-neutral-800">{data.summary}</p>
//           </Section>
//         ) : null;
//       case "experience":
//         return (
//           <Section key={key} title="Experience">
//             {normalizeOrder(data.experience).map((exp) => (
//               <div key={exp.id} className="mb-4 avoid-break">
//                 <div className="flex flex-wrap items-baseline gap-x-2">
//                   <h3 className="font-semibold text-[1rem]">{exp.title}</h3>
//                   <span className="text-neutral-600">@ {exp.company}</span>
//                   <span className="ml-auto text-neutral-600 text-[0.9rem]">{dateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
//                 </div>
//                 <div className="text-neutral-600 text-[0.9rem]">{exp.location}</div>
//                 <ul className="list-disc ml-5 mt-2 space-y-1 text-[0.92rem]">
//                   {exp.bullets.map((b) => (
//                     <li key={b.id}>
//                       <BulletText text={b.text} keywords={data.keywords} />
//                       {b.impact && (
//                         <span className="ml-2 text-neutral-600">{formatImpact(b.impact)}</span>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//                 {exp.technologies && exp.technologies.length > 0 && (
//                   <div className="mt-2 text-[0.85rem] text-neutral-700">
//                     <span className="font-medium">Tech:</span> {exp.technologies.join(", ")}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </Section>
//         );
//       case "projects":
//         return data.projects && data.projects.length ? (
//           <Section key={key} title="Projects">
//             {normalizeOrder(data.projects).map((p) => (
//               <div key={p.id} className="mb-4 avoid-break">
//                 <div className="flex flex-wrap items-baseline gap-x-2">
//                   <h3 className="font-semibold text-[1rem]">{p.name}</h3>
//                   {p.role && <span className="text-neutral-600">— {p.role}</span>}
//                 </div>
//                 {p.description && <p className="text-[0.92rem] text-neutral-800 mt-1">{p.description}</p>}
//                 {p.highlights && p.highlights.length > 0 && (
//                   <ul className="list-disc ml-5 mt-2 space-y-1 text-[0.92rem]">
//                     {p.highlights.map((h, i) => (
//                       <li key={i}><BulletText text={h} keywords={data.keywords} /></li>
//                     ))}
//                   </ul>
//                 )}
//                 {(p.links?.length || 0) > 0 && (
//                   <div className="mt-2 text-[0.85rem]">
//                     {(p.links || []).map((l, i) => (
//                       <a key={i} href={l.url} className="underline mr-3" rel="noreferrer">{l.label}</a>
//                     ))}
//                   </div>
//                 )}
//                 {p.technologies && p.technologies.length > 0 && (
//                   <div className="mt-1 text-[0.85rem] text-neutral-700">
//                     <span className="font-medium">Tech:</span> {p.technologies.join(", ")}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </Section>
//         ) : null;
//       case "education":
//         return (
//           <Section key={key} title="Education">
//             {normalizeOrder(data.education).map((ed) => (
//               <div key={ed.id} className="mb-3 avoid-break">
//                 <div className="flex items-baseline gap-2">
//                   <h3 className="font-semibold text-[1rem]">{ed.degree}</h3>
//                   <span className="text-neutral-600">@ {ed.school}</span>
//                   <span className="ml-auto text-neutral-600 text-[0.9rem]">
//                     {[ed.startYear, ed.endYear].filter(Boolean).join(" – ")}
//                   </span>
//                 </div>
//                 {ed.gpa && <div className="text-[0.9rem] text-neutral-700">GPA: {ed.gpa}</div>}
//                 {ed.honors?.length ? (
//                   <div className="text-[0.9rem] text-neutral-700">Honors: {ed.honors.join(", ")}</div>
//                 ) : null}
//                 {ed.coursework?.length ? (
//                   <div className="text-[0.9rem] text-neutral-700">Coursework: {ed.coursework.join(", ")}</div>
//                 ) : null}
//               </div>
//             ))}
//           </Section>
//         );
//       case "skills":
//         return (
//           <Section key={key} title="Skills">
//             <SkillsBlock skills={data.skills} keywords={data.keywords} />
//           </Section>
//         );
//       case "certifications":
//         return data.certifications?.length ? (
//           <Section key={key} title="Certifications">
//             {normalizeOrder(data.certifications).map((c) => (
//               <div key={c.id} className="text-[0.92rem] flex gap-2 justify-between avoid-break">
//                 <span>
//                   <span className="font-medium">{c.name}</span>{c.issuer ? `, ${c.issuer}` : ""}
//                   {c.credentialId ? ` (ID: ${c.credentialId})` : ""}
//                 </span>
//                 <span className="text-neutral-600">{c.date}</span>
//               </div>
//             ))}
//           </Section>
//         ) : null;
//       case "awards":
//         return data.awards?.length ? (
//           <Section key={key} title="Awards">
//             {normalizeOrder(data.awards).map((a) => (
//               <div key={a.id} className="text-[0.92rem] avoid-break">
//                 <div className="flex justify-between">
//                   <span className="font-medium">{a.name}</span>
//                   <span className="text-neutral-600">{a.date}</span>
//                 </div>
//                 {a.description && <div className="text-neutral-700">{a.description}</div>}
//               </div>
//             ))}
//           </Section>
//         ) : null;
//       case "languages":
//         return data.languages?.length ? (
//           <Section key={key} title="Languages">
//             <ul className="text-[0.92rem] list-disc ml-5">
//               {data.languages.map((l, i) => (
//                 <li key={i}>{l.name} — {l.level}</li>
//               ))}
//             </ul>
//           </Section>
//         ) : null;
//       case "publications":
//         return data.publications?.length ? (
//           <Section key={key} title="Publications">
//             {normalizeOrder(data.publications).map((p) => (
//               <div key={p.id} className="text-[0.92rem] avoid-break">
//                 <div className="flex justify-between">
//                   <span className="font-medium">{p.title}{p.venue ? `, ${p.venue}` : ""}</span>
//                   <span className="text-neutral-600">{p.date}</span>
//                 </div>
//                 {p.url && (
//                   <a className="underline" href={p.url} rel="noreferrer">Link</a>
//                 )}
//               </div>
//             ))}
//           </Section>
//         ) : null;
//       case "volunteering":
//         return data.volunteering?.length ? (
//           <Section key={key} title="Volunteering">
//             {normalizeOrder(data.volunteering).map((v) => (
//               <div key={v.id} className="mb-3 avoid-break">
//                 <div className="flex items-baseline gap-2">
//                   <h3 className="font-semibold text-[1rem]">{v.role}</h3>
//                   <span className="text-neutral-600">@ {v.org}</span>
//                   <span className="ml-auto text-neutral-600 text-[0.9rem]">
//                     {dateRange(v.startDate, v.endDate)}
//                   </span>
//                 </div>
//                 {v.bullets?.length ? (
//                   <ul className="list-disc ml-5 mt-1 space-y-1 text-[0.92rem]">
//                     {v.bullets.map((b, i) => <li key={i}><BulletText text={b} keywords={data.keywords} /></li>)}
//                   </ul>
//                 ) : null}
//               </div>
//             ))}
//           </Section>
//         ) : null;
//       case "interests":
//         return data.interests?.length ? (
//           <Section key={key} title="Interests">
//             <div className="text-[0.92rem] text-neutral-800">{data.interests.join(" · ")}</div>
//           </Section>
//         ) : null;
//       default:
//         return null;
//     }
//   });
// }

// /**********************
//  * Building blocks
//  **********************/
// function Header({ data }: { data: ResumeData }) {
//   const pi = data.personalInfo;
//   return (
//     <div className="flex flex-col gap-1">
//       <h1 className="text-3xl font-bold tracking-tight">{pi.name}</h1>
//       <div className="text-[1.05rem] text-neutral-800">{pi.title}</div>
//       <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] text-neutral-700 mt-1">
//         {pi.location && <span>{pi.location}</span>}
//         {pi.email && <a className="underline" href={`mailto:${pi.email}`}>{pi.email}</a>}
//         {pi.phone && <span>{pi.phone}</span>}
//         {pi.pronouns && <span>• {pi.pronouns}</span>}
//         {pi.workAuthorization && <span>• {pi.workAuthorization}</span>}
//         {pi.clearance && <span>• {pi.clearance}</span>}
//         {(pi.links || []).sort((a,b)=>a.order-b.order).map((l) => (
//           <a key={l.id} className="underline" href={l.url} rel="noreferrer">{l.label}</a>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Section({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <section className="break-inside-avoid">
//       <h2 className="text-[0.95rem] font-semibold tracking-wide uppercase mt-4 mb-2" style={{ color: "var(--accent)" }}>{title}</h2>
//       {children}
//     </section>
//   );
// }

// function BulletText({ text, keywords }: { text: string; keywords?: string[] }) {
//   // Light keyword highlighting to support "Tailor to JD" step
//   if (!keywords || keywords.length === 0) return <>{text}</>;
//   const parts = splitByKeywords(text, keywords);
//   return (
//     <>
//       {parts.map((p, i) =>
//         p.hit ? (
//           <mark key={i} className="bg-yellow-100 text-neutral-900 rounded px-0.5">{p.text}</mark>
//         ) : (
//           <span key={i}>{p.text}</span>
//         )
//       )}
//     </>
//   );
// }

// function splitByKeywords(text: string, keywords: string[]) {
//   // naive splitter; safe and deterministic, no regex DoS
//   let remaining = text;
//   const out: Array<{ text: string; hit: boolean }> = [];
//   while (remaining.length > 0) {
//     const hit = keywords
//       .map(k => ({ k, idx: remaining.toLowerCase().indexOf(k.toLowerCase()) }))
//       .filter(x => x.idx !== -1)
//       .sort((a,b) => a.idx - b.idx)[0];
//     if (!hit) { out.push({ text: remaining, hit: false }); break; }
//     if (hit.idx > 0) out.push({ text: remaining.slice(0, hit.idx), hit: false });
//     out.push({ text: remaining.slice(hit.idx, hit.idx + hit.k.length), hit: true });
//     remaining = remaining.slice(hit.idx + hit.k.length);
//   }
//   return out;
// }

// function formatImpact(imp: { value: number; unit?: string; baseline?: number }) {
//   const { value, unit, baseline } = imp;
//   if (baseline != null && baseline !== 0) {
//     const pct = ((value / baseline) * 100).toFixed(0);
//     return `${value}${unit || ""} (${pct}% vs baseline)`;
//   }
//   return `${value}${unit || ""}`;
// }

// function SkillsBlock({ skills, keywords }: { skills: ResumeData["skills"]; keywords?: string[] }) {
//   if (!skills || skills.length === 0) return null;
//   const grouped = groupBy(skills, s => s.category || "General");
//   return (
//     <div className="space-y-1">
//       {Object.entries(grouped).map(([cat, arr]) => (
//         <div key={cat} className="text-[0.92rem]">
//           <span className="font-medium">{cat}: </span>
//           {arr.map((s, i) => (
//             <span key={i} className={cx(i < arr.length - 1 ? "mr-2" : "", isKeywordHit(s.name, keywords) && "underline decoration-2 decoration-yellow-500")}>{s.name}{i < arr.length - 1 ? "," : ""}</span>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// function groupBy<T>(arr: T[], keyFn: (t: T) => string) {
//   return arr.reduce<Record<string, T[]>>((acc, item) => {
//     const k = keyFn(item);
//     if (!acc[k]) acc[k] = [];
//     acc[k].push(item);
//     return acc;
//   }, {});
// }



// // Optional wrapper to preview/demo
// export function ResumePreview() {
//   return <ResumeDocument data={DemoResume} theme={ThemePresets.ScrantonStandard} />;
// }
