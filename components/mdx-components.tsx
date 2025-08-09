import Link from "next/link"
import type { MDXComponents } from "mdx/types"

function isInternal(href?: string) {
  return href?.startsWith("/") || href?.startsWith("#")
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings — keep semantic tags AND preserve ids/props for ToC & anchors
    h1: ({ children, ...props }) => (
      <h1 {...props} className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 font-mattone" >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 {...props} className="text-3xl font-semibold mb-6 mt-10 text-gray-900 dark:text-gray-100 font-mattone">
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100 font-mattone">
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 {...props} className="text-xl font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100 font-mattone">
        {children}
      </h4>
    ),

    p: ({ children, ...props }) => (
      <p {...props} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed font-outfit">
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 font-outfit list-disc pl-6">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 list-decimal pl-6 font-outfit">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className="mb-1 text-gray-700 dark:text-gray-300 font-outfit">
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote {...props} className="border-l-4 border-blue-500 pl-4 mb-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-r font-outfit">
        {children}
      </blockquote>
    ),

    code: ({ children, ...props }) => (
      <code {...props} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre {...props} className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
        {children}
      </pre>
    ),

    // Smart link handling
    a: ({ href = "", children, ...props }) =>
      isInternal(href) ? (
        <Link href={href} {...props} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline transition-colors font-outfit">
          {children}
        </Link>
      ) : (
        <a
          href={href}
          {...props}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline transition-colors font-outfit"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),

    // Images — keep alt; add loading hints
    img: ({ src = "", alt = "", ...props }) => (
      // If you prefer next/image, swap this for <Image /> and pass width/height.
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-auto rounded-lg mb-6 shadow-lg" {...props} />
    ),

    hr: (props) => <hr {...props} className="my-8 border-gray-300 dark:border-gray-600" />,

    // Optional: FAQ-friendly tags
    details: ({ children, ...props }) => (
      <details {...props} className="mb-4 rounded-md border border-gray-200 dark:border-gray-700 p-4">
        {children}
      </details>
    ),
    summary: ({ children, ...props }) => (
      <summary {...props} className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200">
        {children}
      </summary>
    ),

    // Optional: tables for comparisons (LLMs and humans both like these)
    table: ({ children, ...props }) => (
      <div className="mb-6 overflow-x-auto">
        <table {...props} className="w-full text-left border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead {...props} className="bg-gray-50 dark:bg-gray-800">
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th {...props} className="px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 border-b">
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td {...props} className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border-b align-top">
        {children}
      </td>
    ),

    // Optional semantic helpers you can use in MDX:
    AnswerBox: ({ title = "Direct answer", children, ...props }) => (
      <aside role="note" aria-label={title} {...props} className="mb-6 rounded-xl border p-4 bg-white/70 dark:bg-zinc-900/60">
        <p className="font-semibold mb-2">{title}</p>
        <div>{children}</div>
      </aside>
    ),
    KeyPoints: ({ title = "TL;DR — Key Points", children, ...props }) => (
      <section role="doc-abstract" aria-label="Key points" {...props} className="mb-8 rounded-xl border p-4 bg-white/70 dark:bg-zinc-900/60">
        <p className="font-semibold mb-2">{title}</p>
        <ul className="list-disc pl-6 space-y-2">{children}</ul>
      </section>
    ),

    ...components,
  }
}
