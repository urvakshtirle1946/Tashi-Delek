# Offline Support Documentation

## Overview
Tashi-Delek now supports offline functionality, allowing users to access cached content, 3D models, and API data even when offline.

## Features

### 1. Service Worker
- Caches static assets (HTML, CSS, JS)
- Caches 3D models (.glb files)
- Caches images and media files
- Caches API responses
- Automatically updates cache when new content is available

### 2. IndexedDB Storage
- Stores API responses (packages, vendors)
- Stores data locally for offline access
- Automatically clears old cache (7+ days)
- Fast local data retrieval

### 3. Offline API Support
- API calls automatically fallback to cached data when offline
- Packages and vendors data available offline
- Seamless user experience

### 4. Offline Indicator
- Visual indicator when user goes offline
- Shows at bottom-right corner
- Automatically hides when connection is restored

## How It Works

### Service Worker Registration
- Automatically registered on production build
- Located at `/public/sw.js`
- Handles all network requests

### Caching Strategy
1. **Static Assets**: Cached on install
2. **3D Models**: Cached on first load
3. **Images**: Cached on first load
4. **API Responses**: Cached after successful fetch
5. **IndexedDB**: Stores structured data for fast access

### Offline Flow
1. User makes API request
2. If online: Fetch from network, cache response
3. If offline: Check cache, then IndexedDB
4. Return cached data or show offline message

## Files Structure

```
/public/sw.js                    # Service Worker
/src/lib/offline.ts              # IndexedDB utilities
/src/lib/serviceWorker.ts        # SW registration
/src/lib/api.ts                  # Updated API with offline support
/src/components/OfflineIndicator.tsx  # Offline UI indicator
```

## Usage

### For Developers

#### Check Online Status
```typescript
import { isOnline } from '@/lib/offline';
const online = isOnline();
```

#### Store Data Manually
```typescript
import { storePackages, storeVendors } from '@/lib/offline';
await storePackages(packages);
await storeVendors(vendors);
```

#### Get Cached Data
```typescript
import { getCachedPackages, getCachedVendors } from '@/lib/offline';
const packages = await getCachedPackages();
const vendors = await getCachedVendors();
```

## Testing Offline Mode

1. Open browser DevTools
2. Go to Network tab
3. Select "Offline" from throttling dropdown
4. Refresh page
5. App should work with cached data

## Cache Management

- **Cache Expiry**: API cache expires after 24 hours
- **Auto Cleanup**: Old cache (7+ days) automatically cleared
- **Manual Clear**: Users can clear cache via browser settings

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 11.3+)
- Opera: Full support

## Notes

- Service Worker only works on HTTPS (or localhost)
- IndexedDB has browser storage limits
- Cache size depends on content and browser limits
- First load requires internet connection to cache content

