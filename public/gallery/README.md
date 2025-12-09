# Gallery Images

Place your gallery images here. The gallery supports images of different aspect ratios!

## Folder Structure

```
public/gallery/
├── 1.jpg
├── 2.jpg
├── 3.jpg
├── ...
└── 12.jpg
```

## Image Specifications

- **Aspect Ratio**: Any (portrait, landscape, or square - all supported!)
- **Formats**: JPG, PNG, WebP
- **Recommended Width**: 800px to 1920px
- **File Size**: Under 1MB per image

## Naming Convention

Name your images as numbers:
- `1.jpg`, `2.jpg`, `3.jpg`, etc.

Or keep your original names and update the paths in `GallerySection.tsx`

## After Adding Images

1. Add your images to `public/gallery/`
2. Open `src/components/GallerySection.tsx`
3. Uncomment the `<img>` tags (around lines 144 and 239)
4. Update the `galleryImages` array with your actual image data

## Features

- ✅ Masonry grid layout (handles different aspect ratios)
- ✅ Click to view full size
- ✅ Navigation arrows (next/previous)
- ✅ Keyboard navigation (arrow keys)
- ✅ Image counter
- ✅ Hover effects with info overlay
- ✅ Responsive design

