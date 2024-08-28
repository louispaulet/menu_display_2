# Image generation

## from JSON menus to prompts and filenames

We convert a list JSON menus into image prompts for each dish, and corresponding filenames.  

The notebook `from_recipes_to_prompts_FLUX.ipynb` outputs the dataset `food_prompts_and_filenames.csv`.  

The filenames can be built again from the JSON menus.  

## from prompts to images  

The image generation is carried out in the notebook `flux pipeline for food photography - menu display.ipynb`.  
We use a local image generation env with Pytorch 24 and CUDA 12.1.  