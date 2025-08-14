#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const UNUSED_IMAGES_DIR = path.join(ROOT, 'public', 'images', 'unused')
const BLOG_IMAGES_DIR = path.join(ROOT, 'public', 'images', 'blog')
const USED_MANIFEST = path.join(UNUSED_IMAGES_DIR, '.used.json')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function today() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

function loadTopicsFromArg(arg) {
  const p = path.isAbsolute(arg) ? arg : path.join(process.cwd(), arg)
  if (!fs.existsSync(p)) return null
  const raw = fs.readFileSync(p, 'utf8')
  // Support JSON array or newline-separated text
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch (_) {}
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
}

function parseTopicLine(line) {
  // Format: Title ; category=Interview Guides ; tags=tag1,tag2
  const parts = line.split(';').map((p) => p.trim()).filter(Boolean)
  const title = parts.shift() || 'Untitled Post'
  const meta = { category: 'Interview Guides', tags: [] }
  for (const p of parts) {
    const [k, v] = p.split('=').map((x) => x.trim())
    if (!k || !v) continue
    if (k === 'category') meta.category = v
    if (k === 'tags') meta.tags = v.split(',').map((t) => t.trim()).filter(Boolean)
  }
  if (meta.tags.length === 0) {
    // derive simple tags from words in title
    meta.tags = title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .slice(0, 5)
  }
  return { title, ...meta }
}

function loadUnusedManifest() {
  try {
    return JSON.parse(fs.readFileSync(USED_MANIFEST, 'utf8'))
  } catch (_) {
    return { used: [] }
  }
}

function saveUnusedManifest(man) {
  fs.writeFileSync(USED_MANIFEST, JSON.stringify(man, null, 2))
}

function pickUnusedImage() {
  ensureDir(UNUSED_IMAGES_DIR)
  ensureDir(BLOG_IMAGES_DIR)
  const files = fs
    .readdirSync(UNUSED_IMAGES_DIR)
    .filter((f) => !f.startsWith('.'))
    .filter((f) => /\.(png|jpg|jpeg|gif|webp)$/i.test(f))
  const man = loadUnusedManifest()
  const chosen = files.find((f) => !man.used.includes(f))
  if (!chosen) return null
  return { file: chosen, manifest: man }
}

function copyImageToBlog(chosenFile, slug) {
  const ext = path.extname(chosenFile)
  const destName = `${slug}${ext}`
  const from = path.join(UNUSED_IMAGES_DIR, chosenFile)
  const to = path.join(BLOG_IMAGES_DIR, destName)
  fs.copyFileSync(from, to)
  return `/images/blog/${destName}`
}

function frontmatter({ title, description, date, lastUpdated, category, tags, image, featured = false }) {
  return `---\n` +
`title: "${title}"\n` +
`description: "${description}"\n` +
`date: "${date}"\n` +
`lastUpdated: "${lastUpdated}"\n` +
`author: "Mockstars Team"\n` +
`image: "${image}"\n` +
`category: "${category}"\n` +
`tags: [${tags.map((t) => `"${t}"`).join(', ')}]\n` +
`featured: ${featured ? 'true' : 'false'}\n` +
`published: true\n` +
`\n# Optional JSON-LD for SEO and LLMs\n` +
`jsonLd:\n` +
`  "@context": "https://schema.org"\n` +
`  "@type": "Article"\n` +
`  headline: "${title}"\n` +
`  description: "${description}"\n` +
`  author:\n` +
`    "@type": "Person"\n` +
`    name: "Mockstars Team"\n` +
`  datePublished: "${date}"\n` +
`  dateModified: "${lastUpdated}"\n` +
`\nfaqs:\n` +
`  - q: "Who is this for?"\n` +
`    a: "Tech professionals preparing for interviews who want concise, structured guidance."\n` +
`  - q: "How long should I spend on this?"\n` +
`    a: "Aim for focused, 60–120 second answers and practice each story out loud."\n` +
`---\n\n`
}

function stubBody(title) {
  return `# ${title}\n\n` +
`> Direct answer: <two-sentence takeaway aligned to the user's goal>.\n\n` +
`## Key Points\n\n` +
`- Key insight one.\n- Key insight two.\n- Key insight three.\n\n` +
`## Why This Matters\n\n` +
`Explain the problem/opportunity in 2–3 sentences.\n\n` +
`"One quotable standalone sentence summarizing its importance."\n\n` +
`## Framework / Method\n\n` +
`### Element One\nBrief definition and example.\n\n` +
`### Element Two\nBrief definition and example.\n\n` +
`## Step-by-Step\n\n` +
`1. Step one with outcome.\n2. Step two with outcome.\n3. Step three with outcome.\n\n` +
`## Examples / Case Studies\n\n` +
`### Example Scenario\n- Situation / Task / Action / Result.\n\n` +
`## Advanced Tips\n\n` +
`- Forward-looking tip or best practice.\n\n` +
`## Conclusion\n\n` +
`Restate the single most important takeaway and give one next step.\n`
}

async function generateBodyWithOpenAI(title, category, tags) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || typeof fetch !== 'function') return null
  const system = `You are a senior tech career writer for the Mockstars Blog. Follow the OUTPUT FORMAT and STYLE RULES from the internal template. Write MDX that strictly follows the structure: H1, Direct Answer blockquote, Key Points, Why This Matters, optional Framework/Method with H3s, Step-by-Step, Examples/Case Studies, Advanced Tips, Conclusion. Keep paragraphs short (2–3 sentences).`
  const user = `Title: ${title}\nCategory: ${category}\nTags: ${tags.join(', ')}\nWrite the MDX body only (no frontmatter), optimized for tech roles.`
  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0.4,
      }),
    })
    if (!resp.ok) return null
    const data = await resp.json()
    const content = data?.choices?.[0]?.message?.content
    if (typeof content !== 'string') return null
    return content.trim() + '\n'
  } catch (e) {
    return null
  }
}

async function generateBodyWithPerplexity(title, category, tags, model = 'sonar') {
  const apiKey = process.env.PPLX_API_KEY
  if (!apiKey || typeof fetch !== 'function') return null
  const system = `You browse the web to produce accurate, up-to-date content. Write MDX body only (no frontmatter) following this structure: H1, Direct Answer blockquote, Key Points, Why This Matters, optional Framework/Method with H3s, Step-by-Step, Examples/Case Studies, Advanced Tips, Conclusion. Keep paragraphs short (2–3 sentences). Include a 'References' section at the end listing sources with titles and URLs if available.`
  const user = `Title: ${title}\nCategory: ${category}\nTags: ${tags.join(', ')}\nWrite the MDX body only, with citations summarized in a References section.`
  try {
    const resp = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0.3,
      }),
    })
    if (!resp.ok) return null
    const data = await resp.json()
    let content = data?.choices?.[0]?.message?.content || ''
    const citations = data?.choices?.[0]?.message?.citations || data?.citations || []
    if (citations && citations.length > 0) {
      const unique = Array.from(new Set(citations))
      const refs = unique.map((u, i) => `- [${i + 1}] ${u}`).join('\n')
      const refSection = `\n\n## References\n\n${refs}\n`
      // Append references if not already present
      if (!/##\s*References/.test(content)) content += refSection
    }
    return typeof content === 'string' ? content.trim() + '\n' : null
  } catch (_) {
    return null
  }
}

async function main() {
  ensureDir(CONTENT_DIR)
  ensureDir(BLOG_IMAGES_DIR)

  const rawArgs = process.argv.slice(2)
  const flags = rawArgs.filter((a) => a.startsWith('--'))
  const args = rawArgs.filter((a) => !a.startsWith('--'))

  const usePerplexity = flags.includes('--perplexity')
  const pplxModelFlag = flags.find((f) => f.startsWith('--pplx-model='))
  const pplxModel = pplxModelFlag ? pplxModelFlag.split('=')[1] : 'sonar'

  if (args.length === 0) {
    console.error('Usage: node scripts/generate-blog-posts.js [--perplexity] [--pplx-model=sonar|sonar-pro] <topicsFile.txt|json>|"Title; category=Interview Guides; tags=tag1,tag2" ...')
    process.exit(1)
  }

  let topics = []
  if (args.length === 1) {
    const loaded = loadTopicsFromArg(args[0])
    if (loaded) {
      topics = Array.isArray(loaded) ? loaded : loaded
    } else {
      topics = [args[0]]
    }
  } else {
    topics = args
  }

  for (const raw of topics) {
    const { title, category, tags } = typeof raw === 'string' ? parseTopicLine(raw) : raw
    const slug = slugify(title)
    const postPath = path.join(CONTENT_DIR, `${slug}.mdx`)
    if (fs.existsSync(postPath)) {
      console.log(`Skipping existing: ${slug}.mdx`)
      continue
    }

    // Image selection
    let image = '/images/blog/placeholder.jpg'
    const picked = pickUnusedImage()
    if (picked) {
      image = copyImageToBlog(picked.file, slug)
      picked.manifest.used.push(picked.file)
      saveUnusedManifest(picked.manifest)
    }

    const date = today()
    const fm = frontmatter({
      title,
      description: `Actionable guide: ${title}.` ,
      date,
      lastUpdated: date,
      category,
      tags,
      image,
      featured: false,
    })

    // Body content
    let body = null
    if (usePerplexity) {
      body = await generateBodyWithPerplexity(title, category, tags, pplxModel)
    }
    if (!body) {
      body = await generateBodyWithOpenAI(title, category, tags)
    }
    body = body || stubBody(title)

    fs.writeFileSync(postPath, fm + body)
    console.log(`Created: ${path.relative(ROOT, postPath)}`)
  }
}

main() 