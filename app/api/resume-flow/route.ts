import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import YAML from 'yaml'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'resume_flow_detailed.yaml')
    const yamlText = await readFile(filePath, 'utf-8')
    const data = YAML.parse(yamlText)
    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('Failed to load resume flow YAML', error)
    return NextResponse.json({ ok: false, error: 'Failed to load resume flow' }, { status: 500 })
  }
} 