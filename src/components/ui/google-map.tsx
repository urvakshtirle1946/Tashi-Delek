import { useMemo, useCallback, useRef, useEffect, useState, memo } from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { Viewer as MapillaryViewer } from 'mapillary-js';
import 'mapillary-js/dist/mapillary.css';

// Export constants for use in App.tsx LoadScript
export const GOOGLE_MAPS_API_KEY = 'AIzaSyA5Nl4L4FLicH5i8sdpyJHyMIbDpDs45_I';

// Move libraries array outside component to prevent LoadScript reloading
// React treats new arrays as different references, causing unnecessary reloads
// Export for use in App.tsx LoadScript
export const GOOGLE_LIBRARIES: ('marker')[] = ['marker'];

// Move map container style outside component to prevent re-renders
// This prevents GoogleMap from thinking the style changed and reloading tiles
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
} as const;

// Stable default center - defined outside component to prevent re-creation
const DEFAULT_CENTER = { lat: 27.5, lng: 88.5 } as const;

// Stable Sikkim bounds - defined outside component
const SIKKIM_BOUNDS = {
  north: 28.0,
  south: 27.0,
  east: 89.0,
  west: 88.0
} as const;

// Stable Sikkim polygon path - defined outside component
const SIKKIM_POLYGON_PATH = [
  { lat: 27.0, lng: 88.0 },
  { lat: 28.0, lng: 88.0 },
  { lat: 28.0, lng: 89.0 },
  { lat: 27.0, lng: 89.0 },
  { lat: 27.0, lng: 88.0 }
] as const;

// Map ID is REQUIRED for Advanced Markers to work
// Using provided Map ID to help resolve 429 error issues
const GOOGLE_MAP_ID = 'bb30942387f26fc2328895ea';

interface Monastery {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  mapillaryImageId?: string; // Mapillary image ID for street view
  photoSphereUrl?: string; // URL for PhotoSphereViewer 360 interior
}

interface GoogleMapComponentProps {
  monasteries?: Monastery[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (monastery: Monastery) => void;
}

// Advanced Marker Component using the new API with custom styling
const AdvancedMarker = ({ 
  position, 
  map, 
  title,
  onClick 
}: { 
  position: { lat: number; lng: number };
  map: google.maps.Map | null;
  title?: string;
  onClick?: () => void;
}) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;
    
    // LoadScript ensures marker library is loaded before rendering children
    if (!window.google?.maps?.marker?.AdvancedMarkerElement) {
      return;
    }

    // Create custom marker content
    const content = document.createElement('div');
    content.style.width = '24px';
    content.style.height = '24px';
    content.style.borderRadius = '50%';
    content.style.backgroundColor = '#EE4B2B';
    content.style.border = '3px solid #FFFFFF';
    content.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    content.style.cursor = 'pointer';
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.justifyContent = 'center';
    content.style.transition = 'transform 0.2s ease';
    content.style.zIndex = '999';
    
    // Add inner dot
    const innerDot = document.createElement('div');
    innerDot.style.width = '10px';
    innerDot.style.height = '10px';
    innerDot.style.borderRadius = '50%';
    innerDot.style.backgroundColor = '#FFFFFF';
    content.appendChild(innerDot);
    
    // Hover effect
    content.addEventListener('mouseenter', () => {
      content.style.transform = 'scale(1.3)';
    });
    content.addEventListener('mouseleave', () => {
      content.style.transform = 'scale(1)';
    });
    
    contentRef.current = content;
    
    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      position,
      map,
      title,
      content: content,
      zIndex: 999  // Ensure markers appear above polygon
    });

    if (onClick) {
      markerRef.current.addListener('click', onClick);
      content.addEventListener('click', onClick);
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
        markerRef.current = null;
      }
      if (contentRef.current) {
        contentRef.current = null;
      }
    };
  }, [map, position, title, onClick]);

  return null;
};

const defaultMonasteries: Monastery[] = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    lat: 27.2885915,
    lng: 88.5615189,
    description: 'One of the largest and most significant monasteries in Sikkim'
  },
  {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery (Peling)',
    lat: 27.3052201,
    lng: 88.2515852,
    description: 'One of the oldest and most important monasteries in Sikkim'
  },
  {
    id: 'ravangla',
    name: 'Ravangla Monastery',
    lat: 27.3284964,
    lng: 88.3352477,
    description: 'Beautiful monastery with panoramic views of the Himalayas'
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    lat: 27.3359368,
    lng: 88.6191659,
    description: 'Beautiful Buddhist monastery belonging to the Nyingma order'
  },
  {
    id: 'phodong',
    name: 'Phodong Monastery',
    lat: 27.4128715,
    lng: 88.5838205,
    description: 'One of the six major monasteries of the Karma Kagyu order'
  }
];

const GoogleMapComponent = ({ 
  monasteries = defaultMonasteries, 
  center,
  zoom,
  onMarkerClick 
}: GoogleMapComponentProps) => {
  // Use stable default center from outside component
  const mapCenter = useMemo(() => center || DEFAULT_CENTER, [center]);
  
  // Don't set initial zoom - let fitBounds handle it
  const mapZoom = useMemo(() => zoom, [zoom]);

  // Memoize map options
  // Note: When using mapId, styles must be configured in Google Cloud Console, not via the styles property
  const mapOptions = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: true,
    scrollwheel: true,
    minZoom: 7,  // Lower min zoom to allow seeing whole Sikkim
    maxZoom: 18,
    mapId: GOOGLE_MAP_ID,  // REQUIRED FOR ADVANCED MARKERS - Get from Google Cloud Console
    streetViewControl: false,  // Disable default pegman - Street View only accessible via monastery markers
    fullscreenControl: true,  // Keep fullscreen control enabled
    mapTypeControl: true,  // Keep map type control enabled
    zoomControl: true,  // Keep zoom control enabled
    gestureHandling: "greedy",  // Reduce unnecessary tile loading by handling gestures better
    // Styles are configured in Google Cloud Console when using mapId
    // To hide POI labels, configure it in your Map Style settings in Google Cloud Console
  }), []);

  // Memoize monasteries array
  const memoizedMonasteries = useMemo(() => monasteries, [monasteries]);

  // Map instance state - important for triggering re-renders when map loads
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const hasInitializedRef = useRef(false); // Prevent fitBounds from running multiple times
  
  // Cache for Street View availability to prevent repeated API calls and 429 errors
  const streetViewCacheRef = useRef<Map<string, google.maps.StreetViewPanoramaData | null>>(new Map());
  const checkingStreetViewRef = useRef<Set<string>>(new Set()); // Track ongoing checks to prevent duplicates
  
  // Viewer states for Mapillary and PhotoSphereViewer
  const [showMapillary, setShowMapillary] = useState(false);
  const [showPhotoSphere, setShowPhotoSphere] = useState(false);
  const [showViewerMenu, setShowViewerMenu] = useState(false);
  const [currentMonastery, setCurrentMonastery] = useState<Monastery | null>(null);
  const photoSphereContainerRef = useRef<HTMLDivElement>(null);
  const mapillaryContainerRef = useRef<HTMLDivElement>(null);
  const photoSphereViewerRef = useRef<Viewer | null>(null);
  const mapillaryViewerRef = useRef<MapillaryViewer | null>(null);

  // Handle map load - set state and ref, enforce Sikkim bounds
  // This should only run ONCE when the map first loads
  // Using stable SIKKIM_BOUNDS from outside component prevents re-creation
  const onLoad = useCallback((map: google.maps.Map) => {
    // Prevent multiple initializations - critical to prevent 429 errors
    if (hasInitializedRef.current) {
      return;
    }
    hasInitializedRef.current = true;

    setMapInstance(map);  // Update state to trigger marker re-renders
    mapRef.current = map;
    
    // Create bounds for the entire Sikkim region using stable constants
    const fullBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(SIKKIM_BOUNDS.south, SIKKIM_BOUNDS.west),
      new google.maps.LatLng(SIKKIM_BOUNDS.north, SIKKIM_BOUNDS.east)
    );
    
    // Restrict map bounds (less strict to allow better viewing)
    // Only set this once to prevent repeated tile requests
    const restrictionOptions = {
      restriction: {
        latLngBounds: fullBounds,
        strictBounds: false  // Allow some flexibility
      }
    };
    
    map.setOptions(restrictionOptions);
    
    // Fix Street View: Remove restriction when Street View is active
    // Street View needs to move camera outside bounds, causing 429 errors if restricted
    const streetView = map.getStreetView();
    
    // Handle Street View visibility changes
    streetView.addListener("visible_changed", () => {
      if (streetView.getVisible()) {
        // Entering Street View - remove restriction and disable dragging to prevent 429 errors
        // This stops Street View from loading extra tiles when dragging
        map.setOptions({ 
          restriction: null,
          gestureHandling: "none",  // Disable gestures to prevent tile loading bursts
          draggable: false  // Disable dragging to reduce tile requests
        });
      } else {
        // Exiting Street View - restore restriction and re-enable gestures
        map.setOptions({
          ...restrictionOptions,
          gestureHandling: "greedy",  // Re-enable gesture handling
          draggable: true  // Re-enable dragging
        });
      }
    });
    
    // Configure Street View options for better display
    streetView.setOptions({
      visible: false,
      enableCloseButton: true,
      linksControl: true,
      panControl: true,
      zoomControl: true,
      addressControl: true,
      fullscreenControl: true,
      motionTracking: false,
      motionTrackingControl: false,
      pov: {
        heading: 0,
        pitch: 0
      }
    });
    
    // Fit bounds to show the entire Sikkim region, or use provided zoom
    // Only run this ONCE on initial load - prevents 429 rate limit errors
    if (!zoom) {
      // Add padding to bounds for better visibility
      const padding = { top: 50, right: 50, bottom: 50, left: 50 };
      map.fitBounds(fullBounds, padding);
    }
  }, [zoom]); // Removed memoizedMonasteries from deps to prevent re-initialization

  // Handle map unmount
  const onUnmount = useCallback(() => {
    hasInitializedRef.current = false; // Reset flag on unmount
    setMapInstance(null);
    mapRef.current = null;
  }, []);

  // Memoize marker positions and click handlers
  // Enhanced click handler to check for Street View availability with caching
  const markerData = useMemo(() => {
    return memoizedMonasteries.map((monastery) => {
      const cacheKey = `${monastery.lat}-${monastery.lng}`;
      
      return {
        ...monastery,
        position: { lat: monastery.lat, lng: monastery.lng },
        onClick: () => {
          // Call custom onClick if provided
          if (onMarkerClick) {
            onMarkerClick(monastery);
          }
          
          // Show viewer selection menu
          setCurrentMonastery(monastery);
          setShowViewerMenu(true);
        }
      };
    });
  }, [memoizedMonasteries, onMarkerClick]);

  // Mapillary Access Token (get from https://www.mapillary.com/developer)
  const MAPILLARY_ACCESS_TOKEN = 'YOUR_MAPILLARY_ACCESS_TOKEN'; // Replace with your token

  // Initialize PhotoSphereViewer for 360 interior views
  useEffect(() => {
    if (!showPhotoSphere || !currentMonastery?.photoSphereUrl || !photoSphereContainerRef.current) return;

    const viewer = new Viewer({
      container: photoSphereContainerRef.current,
      panorama: currentMonastery.photoSphereUrl,
      caption: currentMonastery.name,
      navbar: [
        'zoom',
        'move',
        'caption',
        'fullscreen',
        'close'
      ],
      defaultZoomLvl: 30,
      sphereCorrection: { pan: 0, tilt: 0, roll: 0 }
    });

    photoSphereViewerRef.current = viewer;

    return () => {
      if (photoSphereViewerRef.current) {
        photoSphereViewerRef.current.destroy();
        photoSphereViewerRef.current = null;
      }
    };
  }, [showPhotoSphere, currentMonastery]);

  // Initialize Mapillary SDK for street view
  useEffect(() => {
    if (!showMapillary || !mapillaryContainerRef.current || !currentMonastery) return;

    // Check if we have Mapillary image ID for this monastery
    if (!currentMonastery.mapillaryImageId) {
      console.warn(`No Mapillary image ID found for ${currentMonastery.name}`);
      return;
    }

    // Check if access token is configured
    if (MAPILLARY_ACCESS_TOKEN === 'YOUR_MAPILLARY_ACCESS_TOKEN') {
      console.warn('Mapillary access token not configured. Please add your token in google-map.tsx');
      return;
    }

    // Create Mapillary viewer
    const viewer = new MapillaryViewer({
      container: mapillaryContainerRef.current,
      accessToken: MAPILLARY_ACCESS_TOKEN,
      imageId: currentMonastery.mapillaryImageId,
    });

    mapillaryViewerRef.current = viewer;

    return () => {
      if (mapillaryViewerRef.current) {
        mapillaryViewerRef.current.remove();
        mapillaryViewerRef.current = null;
      }
    };
  }, [showMapillary, currentMonastery]);

  const closeViewers = useCallback(() => {
    setShowPhotoSphere(false);
    setShowMapillary(false);
    setShowViewerMenu(false);
    setCurrentMonastery(null);
  }, []);

  const openMapillary = useCallback(() => {
    setShowViewerMenu(false);
    setShowMapillary(true);
  }, []);

  const openPhotoSphere = useCallback(() => {
    setShowViewerMenu(false);
    if (currentMonastery?.photoSphereUrl) {
      setShowPhotoSphere(true);
    }
  }, [currentMonastery]);

  const openGoogleStreetView = useCallback(() => {
    if (!mapRef.current || !currentMonastery) return;
    
    setShowViewerMenu(false);
    
    const streetView = mapRef.current.getStreetView();
    const cacheKey = `${currentMonastery.lat}-${currentMonastery.lng}`;
    
    // Check cache first to avoid repeated API calls
    const cachedResult = streetViewCacheRef.current.get(cacheKey);
    
    if (cachedResult !== undefined) {
      // Use cached result - add delay to prevent tile loading burst
      if (cachedResult && cachedResult.location) {
        setTimeout(() => {
          if (mapRef.current) {
            streetView.setPosition(cachedResult.location.latLng);
            // Delay making Street View visible to throttle tile loading
              setTimeout(() => {
                if (mapRef.current) {
                  // Ensure Street View is properly configured before showing
                  streetView.setOptions({
                    visible: true,
                    pov: {
                      heading: 0,
                      pitch: 0
                    },
                    addressControl: true,
                    fullscreenControl: true,
                    linksControl: true,
                    panControl: true,
                    zoomControl: true
                  });
                  mapRef.current.setStreetView(streetView);
                }
              }, 300); // 300ms delay to prevent Google from hitting tile burst
          }
        }, 100);
      } else {
        // No Street View available at this location
        alert(`Google Street View is not available at ${currentMonastery.name}. Please try another location.`);
      }
      return;
    }
    
    // Prevent multiple simultaneous checks for the same location
    if (checkingStreetViewRef.current.has(cacheKey)) {
      return;
    }
    
    checkingStreetViewRef.current.add(cacheKey);
    const panoramaService = new google.maps.StreetViewService();
    
    // Check for Street View within 200 meters (increased radius to reduce retries)
    // Larger radius means fewer retries, which reduces 429 errors
    panoramaService.getPanorama(
      { 
        location: { lat: currentMonastery.lat, lng: currentMonastery.lng }, 
        radius: 200  // Increased from 50 to 200 to reduce tile retries
      },
      (data, status) => {
        checkingStreetViewRef.current.delete(cacheKey);
        
        if (status === 'OK' && data && data.location) {
          // Street View available - cache and show it with delay to throttle tile loading
          streetViewCacheRef.current.set(cacheKey, data);
          setTimeout(() => {
            if (mapRef.current) {
              streetView.setPosition(data.location.latLng);
              // Delay making Street View visible to throttle tile loading
              setTimeout(() => {
                if (mapRef.current) {
                  // Ensure Street View is properly configured before showing
                  streetView.setOptions({
                    visible: true,
                    pov: {
                      heading: 0,
                      pitch: 0
                    },
                    addressControl: true,
                    fullscreenControl: true,
                    linksControl: true,
                    panControl: true,
                    zoomControl: true
                  });
                  mapRef.current.setStreetView(streetView);
                }
              }, 300); // 300ms delay to prevent Google from hitting tile burst
            }
          }, 100);
        } else {
          // No Street View available - cache null result
          // Don't check further to avoid 429 errors
          streetViewCacheRef.current.set(cacheKey, null);
          alert(`Google Street View is not available at ${currentMonastery.name}. Please try another location.`);
        }
      }
    );
  }, [currentMonastery]);

  return (
    <div className="relative w-full h-full">
      {/* Ensure Street View container has proper styling */}
      <style>{`
        .gm-style iframe {
          filter: none !important;
          -webkit-filter: none !important;
        }
        .gm-style > div {
          filter: none !important;
          -webkit-filter: none !important;
        }
      `}</style>
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={mapCenter}
        zoom={mapZoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Sikkim Region Highlight Polygon */}
        <Polygon
          paths={SIKKIM_POLYGON_PATH}
          options={{
            fillColor: '#FFD700',
            fillOpacity: 0.15,
            strokeColor: '#FFD700',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            clickable: false,
            zIndex: 1  // Lower zIndex so markers appear above
          }}
        />
        
        {/* Monastery Markers */}
        {markerData.map((data) => (
          <AdvancedMarker
            key={data.id}
            map={mapInstance}  // Use state instead of ref to trigger re-renders
            position={data.position}
            title={data.name}
            onClick={data.onClick}
          />
        ))}
      </GoogleMap>

      {/* Viewer Selection Menu */}
      {showViewerMenu && currentMonastery && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{currentMonastery.name}</h3>
            <p className="text-sm text-gray-600 mb-6">{currentMonastery.description}</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={openGoogleStreetView}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Google Street View
              </button>
              {currentMonastery.mapillaryImageId && (
                <button
                  onClick={openMapillary}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Street View (Mapillary)
                </button>
              )}
              {currentMonastery.photoSphereUrl && (
                <button
                  onClick={openPhotoSphere}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                >
                  360° Interior View
                </button>
              )}
              <button
                onClick={closeViewers}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PhotoSphereViewer Modal for 360 Interiors */}
      {showPhotoSphere && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <button
              onClick={closeViewers}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div ref={photoSphereContainerRef} className="w-full h-full rounded-lg" />
          </div>
        </div>
      )}

      {/* Mapillary Modal for Street View */}
      {showMapillary && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <button
              onClick={closeViewers}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div ref={mapillaryContainerRef} className="w-full h-full rounded-lg" />
            {currentMonastery && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">{currentMonastery.name}</p>
                <p className="text-xs text-gray-600">Street View via Mapillary</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders and remounts
// This prevents the map from reloading tiles when parent components update
export default memo(GoogleMapComponent);
