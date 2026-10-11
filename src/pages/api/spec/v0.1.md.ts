import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const prerender = true;

export async function GET(): Promise<Response> {
  const specPath = join(process.cwd(), 'SPEC.md');
  const content = readFileSync(specPath, 'utf-8');

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Spec-Version': '0.1',
    },
  });
}
