# Manuscripts Folder Structure

Place your manuscript images in organized folders.

## Folder Structure

Each manuscript should have its own folder:

```
manuscripts/
├── ancient-wisdom/
│   ├── cover.jpg (card thumbnail)
│   ├── page-1.jpg (landscape format)
│   ├── page-2.jpg
│   ├── ...
│   └── page-8.jpg
│
├── royal-decree/
│   ├── cover.jpg
│   ├── page-1.jpg
│   ├── ...
│   └── page-6.jpg
│
├── medical-treatise/
│   ├── cover.jpg
│   ├── page-1.jpg
│   ├── ...
│   └── page-7.jpg
│
└── astronomy/
    ├── cover.jpg
    ├── page-1.jpg
    ├── ...
    └── page-5.jpg
```

## Image Specifications

### Cover Images (for cards)
- **Aspect Ratio**: 3:4 (portrait)
- **Size**: 600×800px recommended
- **Format**: JPG, PNG

### Page Images (for reader)
- **Aspect Ratio**: 16:9 (landscape) - for manuscript pages
- **Size**: 1920×1080px or 1600×900px recommended
- **Format**: JPG, PNG
- **Important**: These are the actual manuscript images shown in the reader

## After Adding Images

1. Create folders for each manuscript in `public/manuscripts/`
2. Add cover image and page images
3. Open `src/components/ManuscriptsSection.tsx`
4. Uncomment the `<img>` tags:
   - Line ~208 (cover images in cards)
   - Line ~348 (manuscript page images in reader)
5. Update manuscript data with your translations

## Translation Text

Each page has a `translation` field in the code. Update these with your actual translations of the manuscript text.

## Example Structure

For a manuscript called "Ancient Wisdom":
- Path: `public/manuscripts/ancient-wisdom/`
- Cover: `cover.jpg` (shown on card)
- Pages: `page-1.jpg`, `page-2.jpg`, etc. (shown in reader)
- Each page needs corresponding translation text in the code

