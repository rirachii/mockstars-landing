import { BlogPost } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 mt-12 first:mt-0 font-mattone">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-1xl font-semibold mb-6 mt-12 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 pb-2 font-mattone">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100 font-mattone">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100 font-mattone">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-outfit">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-6 space-y-3 text-gray-700 dark:text-gray-300 list-disc list-inside font-outfit">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside font-outfit">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 dark:text-gray-300 leading-relaxed font-outfit">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 mb-8 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-r-lg my-8 font-outfit">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg mb-8 overflow-x-auto shadow-lg">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline transition-colors font-medium"
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
              className="w-full h-auto rounded-xl mb-8 shadow-lg"
            />
          ),
          hr: () => (
            <hr className="my-12 border-gray-300 dark:border-gray-600" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
              {children}
            </td>
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  )
}
