# Testing Offline Support - Step by Step Guide

## Method 1: Using Browser DevTools (Recommended)

### Chrome/Edge/Brave:
1. **Open your app** in the browser (e.g., `http://localhost:8080`)
2. **Open DevTools**:
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)
3. **Go to Network tab**
4. **Enable Offline mode**:
   - Click the dropdown that says "No throttling" or "Online"
   - Select **"Offline"**
5. **Refresh the page** (`F5` or `Ctrl+R`)
6. **Test the features**:
   - Navigate to different pages
   - Check if 3D models load
   - Check if images display
   - Check if packages/vendors data shows (from cache)

### Firefox:
1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Click the **"Offline"** checkbox
4. Refresh the page
5. Test features

### Safari:
1. Open DevTools (`Cmd+Option+I`)
2. Go to **Network** tab
3. Check **"Offline"** checkbox
4. Refresh the page
5. Test features

## Method 2: Disconnect Network (Real Test)

### Windows:
1. Open **Network Settings**
2. Turn off WiFi or disconnect Ethernet
3. Refresh browser
4. Test app

### Mac:
1. Click WiFi icon in menu bar
2. Select **"Turn Wi-Fi Off"**
3. Refresh browser
4. Test app

### Mobile Testing:
1. Turn on **Airplane Mode**
2. Open the app
3. Test features

## Method 3: Using Service Worker DevTools

### Chrome:
1. Open DevTools (`F12`)
2. Go to **Application** tab
3. Click **"Service Workers"** in left sidebar
4. You should see your service worker registered
5. Check **"Offline"** checkbox
6. Refresh page

## What to Test:

### ✅ Static Content:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] CSS styles apply
- [ ] JavaScript functions work

### ✅ Images:
- [ ] Hero images display
- [ ] Monastery images show
- [ ] Logo displays
- [ ] All images load from cache

### ✅ 3D Models:
- [ ] Go to `/tours/rumtek`
- [ ] 3D model loads (if cached)
- [ ] Model rotates/interacts
- [ ] Other tour models work

### ✅ API Data:
- [ ] Go to `/packages` page
- [ ] Packages list shows (from cache)
- [ ] Go to `/guides` page
- [ ] Vendors/guides show (from cache)

### ✅ Offline Indicator:
- [ ] Yellow "You are offline" badge appears
- [ ] Badge disappears when back online

## Expected Behavior:

### When Online:
- ✅ Fresh data loads from API
- ✅ New content caches automatically
- ✅ No offline indicator

### When Offline:
- ✅ Cached content displays
- ✅ Offline indicator shows
- ✅ API calls use cached data
- ✅ App remains functional

## Troubleshooting:

### Service Worker Not Registering:
1. Check browser console for errors
2. Ensure you're on `localhost` or HTTPS
3. Clear browser cache and reload
4. Check `Application` → `Service Workers` tab

### Cache Not Working:
1. Visit pages while online first (to cache)
2. Check `Application` → `Cache Storage`
3. Verify files are cached
4. Check `Application` → `IndexedDB` for data

### Offline Indicator Not Showing:
1. Check browser console
2. Verify `OfflineIndicator` component is imported
3. Check network status detection

## Quick Test Checklist:

```
□ 1. Open app while online
□ 2. Navigate to all pages (cache content)
□ 3. View packages and guides (cache API data)
□ 4. Enable offline mode in DevTools
□ 5. Refresh page
□ 6. Verify content still loads
□ 7. Check offline indicator appears
□ 8. Disable offline mode
□ 9. Verify indicator disappears
□ 10. Test on mobile device
```

## Console Commands for Testing:

Open browser console and run:

```javascript
// Check if service worker is registered
navigator.serviceWorker.getRegistrations().then(regs => console.log(regs));

// Check IndexedDB
indexedDB.databases().then(dbs => console.log(dbs));

// Check online status
console.log('Online:', navigator.onLine);

// Clear all caches
caches.keys().then(keys => keys.forEach(key => caches.delete(key)));

// Clear IndexedDB
indexedDB.deleteDatabase('TashiDelekDB');
```

## Video Guide:

1. **First Load (Online)**:
   - Open app
   - Navigate pages
   - Check Network tab - requests go to server
   - Check Application → Cache Storage - files cached

2. **Second Load (Offline)**:
   - Enable offline mode
   - Refresh page
   - Check Network tab - requests served from cache
   - App works normally

## Success Criteria:

✅ App loads completely offline
✅ All images display
✅ 3D models work (if previously cached)
✅ API data shows from cache
✅ Offline indicator appears
✅ No console errors
✅ Smooth user experience

