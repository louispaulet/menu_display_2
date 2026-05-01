import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../menu_display_2/public/menu_examples');
const outputDir = path.join(__dirname, '../menu_display_2/public/menu_examples_json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp'));

console.log("Starting wrangler...");
const wrangler = spawn('npx', ['wrangler', 'dev'], { cwd: path.join(__dirname, '..') });

wrangler.stdout.on('data', (data) => console.log(`wrangler: ${data}`));
wrangler.stderr.on('data', (data) => console.error(`wrangler: ${data}`));

setTimeout(async () => {
  for (const filename of images) {
    const jsonFilename = filename.replace('.webp', '.json');
    const outputPath = path.join(outputDir, jsonFilename);
    
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${filename}`);
      continue;
    }
    
    console.log(`Processing ${filename}...`);
    const imgPath = path.join(imagesDir, filename);
    const buffer = fs.readFileSync(imgPath);
    const blob = new Blob([buffer], { type: 'image/webp' });
    
    const formData = new FormData();
    formData.append('menuImage', blob, filename);
    
    try {
      const response = await fetch('http://localhost:8787/api/menu-extractions', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const text = await response.text();
        fs.writeFileSync(outputPath, text);
        console.log(`Saved ${jsonFilename}`);
      } else {
        console.log(`Failed ${filename}: ${await response.text()}`);
      }
    } catch (e) {
      console.error(`Error ${filename}: ${e.message}`);
    }
  }
  
  console.log("Terminating wrangler...");
  wrangler.kill();
}, 5000);
