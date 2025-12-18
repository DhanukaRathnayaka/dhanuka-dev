# Hero section build





## Overview



## Deployment

Your project is live at:



## Build your app

Continue building your app on:



## How It Works

1. Create and modify your project using
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Projects Section (UI updates)

I've refactored the `Projects` section to use a `ProjectCard` model that supports:

- Screenshot preview image (place under `public/projects/` with the filename used in the project config)
- Optional project demo video (MP4 files under `public/videos/` or a hosted URL)
- Tech badges (simple initials are rendered by default; you can replace with icons)
- Live Demo and GitHub links (use full URLs in the project config)

To add/change project entries, edit `components/sections/projects-section.tsx` and update the `projects` array near the bottom of the file with fields: `id, title, subtitle, description, image, tech, demo, github, video`.

The video overlay uses a simple modal that opens an HTML5 `<video>` (controls enabled). For YouTube embeds, replace the modal's `<video>` with an iframe and adjust the source accordingly.
