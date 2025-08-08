import { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override the default <h1> element to use a custom component.
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 font-mattone">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-6 mt-10 text-gray-900 dark:text-gray-100 font-mattone">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100 font-mattone">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100 font-mattone">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed font-outfit">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 font-outfit">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside font-outfit">
        {children}
      </ol>
    ),    li: ({ children }) => (
      <li className="mb-1 text-gray-700 dark:text-gray-300 font-outfit">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 mb-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-r font-outfit">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200 font-outfit">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto font-outfit">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline transition-colors font-outfit"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg mb-6 shadow-lg font-outfit"
      />
    ),
    hr: () => <hr className="my-8 border-gray-300 dark:border-gray-600 font-outfit" />,
    ...components,
  }
}
