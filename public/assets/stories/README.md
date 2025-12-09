# Story Images - Manga Reader Format

This folder contains two story collections, each with 12 pages.

## Folder Structure

```
stories/
├── yak-dance/
│   ├── cover.jpg       (Cover image for story card)
│   ├── page-1.jpg      (First page)
│   ├── page-2.jpg
│   ├── ...
│   └── page-12.jpg     (Last page)
│
├── buddha-teachings/
│   ├── cover.jpg       (Cover image for story card)
│   ├── page-1.jpg      (First page)
│   ├── page-2.jpg
│   ├── ...
│   └── page-12.jpg     (Last page)
│
└── README.md (this file)
```

## Total Images Required

- **Yak Dance**: 13 images (1 cover + 12 pages)
- **Buddha Teachings**: 13 images (1 cover + 12 pages)
- **Grand Total**: 26 images

## Image Specifications

- **Aspect Ratio**: 4:5 (portrait, like manga format)
- **Recommended Dimensions**: 800px × 1000px or 1200px × 1500px
- **Format**: JPG, PNG, or WebP
- **File Size**: Keep under 500KB per image for optimal loading

## How to Add Images

1. Prepare your 26 images (13 per story)
2. Rename them according to the structure above
3. Place Yak Dance images in: `src/assets/stories/yak-dance/`
4. Place Buddha Teachings images in: `src/assets/stories/buddha-teachings/`
5. Uncomment the `<img>` tags in `src/components/StorySection.tsx`

## Features

Once images are added, the manga reader provides:
- ✅ Full-screen reading experience
- ✅ Page navigation with arrow keys (← →)
- ✅ Visual progress bar
- ✅ Page indicators (dots)
- ✅ Smooth page transitions
- ✅ Responsive design for all devices

See detailed instructions in `IMAGE_INSTRUCTIONS.md` in the project root.

