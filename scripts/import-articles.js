import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonlPath = path.join(__dirname, '../../phase4_articles.jsonl');
const outputDir = path.join(__dirname, '../src/content/articles');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processLineByLine() {
  const fileStream = fs.createReadStream(jsonlPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
        const article = JSON.parse(line);
        // Construct frontmatter
        const frontmatter = `---
title: "${article.title}"
description: "${article.meta_description}"
silo: "${article.silo}"
pubDate: "${new Date().toISOString()}"
---

`;
        // Write markdown file
        fs.writeFileSync(
          path.join(outputDir, article.filename),
          frontmatter + article.content_markdown
        );
        console.log(`Generated: ${article.filename}`);
    } catch (e) {
        console.error("Error parsing line:", e);
    }
  }
}

processLineByLine();
