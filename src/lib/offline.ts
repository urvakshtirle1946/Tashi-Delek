// Offline support utilities
// Using native IndexedDB API since idb package might not be installed

let db: IDBDatabase | null = null;
const DB_NAME = 'TashiDelekDB';
const DB_VERSION = 1;

// Initialize IndexedDB using native API
export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // API Cache store
      if (!database.objectStoreNames.contains('apiCache')) {
        database.createObjectStore('apiCache', { keyPath: 'url' });
      }

      // Packages store
      if (!database.objectStoreNames.contains('packages')) {
        const packagesStore = database.createObjectStore('packages', { keyPath: 'id' });
        packagesStore.createIndex('timestamp', 'timestamp');
      }

      // Vendors store
      if (!database.objectStoreNames.contains('vendors')) {
        const vendorsStore = database.createObjectStore('vendors', { keyPath: 'id' });
        vendorsStore.createIndex('timestamp', 'timestamp');
      }
    };
  });
}

// Check if online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Store API response
export async function storeApiResponse(url: string, data: any): Promise<void> {
  try {
    const database = await initDB();
    const tx = database.transaction('apiCache', 'readwrite');
    const store = tx.objectStore('apiCache');
    await new Promise<void>((resolve, reject) => {
      const request = store.put({
        url,
        data,
        timestamp: Date.now(),
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Failed to store API response:', error);
  }
}

// Get cached API response
export async function getCachedApiResponse(url: string): Promise<any | null> {
  try {
    const database = await initDB();
    const tx = database.transaction('apiCache', 'readonly');
    const store = tx.objectStore('apiCache');
    
    return new Promise((resolve) => {
      const request = store.get(url);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          // Check if cache is still valid (24 hours)
          const age = Date.now() - result.timestamp;
          if (age < 24 * 60 * 60 * 1000) {
            resolve(result.data);
            return;
          }
        }
        resolve(null);
      };
      request.onerror = () => {
        console.error('Failed to get cached API response:', request.error);
        resolve(null);
      };
    });
  } catch (error) {
    console.error('Failed to get cached API response:', error);
    return null;
  }
}

// Store packages
export async function storePackages(packages: any[]): Promise<void> {
  try {
    const database = await initDB();
    const tx = database.transaction('packages', 'readwrite');
    const store = tx.objectStore('packages');
    
    const promises = packages.map(pkg => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put({
          id: pkg.id,
          data: pkg,
          timestamp: Date.now(),
        });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
    
    await Promise.all(promises);
  } catch (error) {
    console.error('Failed to store packages:', error);
  }
}

// Get cached packages
export async function getCachedPackages(): Promise<any[]> {
  try {
    const database = await initDB();
    const tx = database.transaction('packages', 'readonly');
    const store = tx.objectStore('packages');
    
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const all = request.result;
        resolve(all.map((item: any) => item.data));
      };
      request.onerror = () => {
        console.error('Failed to get cached packages:', request.error);
        resolve([]);
      };
    });
  } catch (error) {
    console.error('Failed to get cached packages:', error);
    return [];
  }
}

// Store vendors
export async function storeVendors(vendors: any[]): Promise<void> {
  try {
    const database = await initDB();
    const tx = database.transaction('vendors', 'readwrite');
    const store = tx.objectStore('vendors');
    
    const promises = vendors.map(vendor => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put({
          id: vendor.id,
          data: vendor,
          timestamp: Date.now(),
        });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });
    
    await Promise.all(promises);
  } catch (error) {
    console.error('Failed to store vendors:', error);
  }
}

// Get cached vendors
export async function getCachedVendors(): Promise<any[]> {
  try {
    const database = await initDB();
    const tx = database.transaction('vendors', 'readonly');
    const store = tx.objectStore('vendors');
    
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const all = request.result;
        resolve(all.map((item: any) => item.data));
      };
      request.onerror = () => {
        console.error('Failed to get cached vendors:', request.error);
        resolve([]);
      };
    });
  } catch (error) {
    console.error('Failed to get cached vendors:', error);
    return [];
  }
}

// Clear old cache (older than 7 days)
export async function clearOldCache(): Promise<void> {
  try {
    const database = await initDB();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    // Clear old API cache
    const apiTx = database.transaction('apiCache', 'readwrite');
    const apiStore = apiTx.objectStore('apiCache');
    const apiRequest = apiStore.openCursor();
    
    apiRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const item = cursor.value;
        if (item.timestamp < sevenDaysAgo) {
          cursor.delete();
        }
        cursor.continue();
      }
    };

    // Clear old packages
    const packagesTx = database.transaction('packages', 'readwrite');
    const packagesStore = packagesTx.objectStore('packages');
    const packagesIndex = packagesStore.index('timestamp');
    const packagesRange = IDBKeyRange.upperBound(sevenDaysAgo);
    const packagesRequest = packagesIndex.openCursor(packagesRange);
    
    packagesRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    // Clear old vendors
    const vendorsTx = database.transaction('vendors', 'readwrite');
    const vendorsStore = vendorsTx.objectStore('vendors');
    const vendorsIndex = vendorsStore.index('timestamp');
    const vendorsRange = IDBKeyRange.upperBound(sevenDaysAgo);
    const vendorsRequest = vendorsIndex.openCursor(vendorsRange);
    
    vendorsRequest.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  } catch (error) {
    console.error('Failed to clear old cache:', error);
  }
}

