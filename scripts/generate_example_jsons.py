import os
import glob
import subprocess
import time
import requests

images_dir = '../menu_display_2/public/menu_examples'
output_dir = '../menu_display_2/public/menu_examples_json'

os.makedirs(output_dir, exist_ok=True)

# Find images
images = glob.glob(os.path.join(images_dir, '*.webp'))

# Start wrangler
print("Starting wrangler...")
wrangler_process = subprocess.Popen(['npx', 'wrangler', 'dev'], cwd='..')
time.sleep(5)  # give it time to start

try:
    for img_path in images:
        filename = os.path.basename(img_path)
        json_filename = os.path.splitext(filename)[0] + '.json'
        output_path = os.path.join(output_dir, json_filename)
        
        if os.path.exists(output_path):
            print(f"Skipping {filename}")
            continue
            
        print(f"Processing {filename}...")
        with open(img_path, 'rb') as f:
            files = {'menuImage': (filename, f, 'image/webp')}
            response = requests.post('http://localhost:8787/api/menu-extractions', files=files)
            if response.status_code == 200:
                with open(output_path, 'w') as out_f:
                    out_f.write(response.text)
                print(f"Saved {json_filename}")
            else:
                print(f"Failed {filename}: {response.text}")
finally:
    print("Terminating wrangler...")
    wrangler_process.terminate()
