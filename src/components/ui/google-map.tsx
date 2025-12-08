import { useMemo, useCallback, useRef, useEffect, useState, memo } from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';

// Export constants for use in App.tsx LoadScript
export const GOOGLE_MAPS_API_KEY = 'AIzaSyD7hwFvGbx4CASdblx-mQP-DefCVS36RV0';

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
const GOOGLE_MAP_ID = 'cbf154d6132a7b8ea6638884';

interface Monastery {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
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
    
    // Configure Street View options
    streetView.setOptions({
      visible: false,
      enableCloseButton: true,
      linksControl: true,
      panControl: true,
      zoomControl: true
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
          
          // Check for Street View availability and open if available
          if (!mapRef.current) return;
          
          const streetView = mapRef.current.getStreetView();
          
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
                    streetView.setVisible(true);
                    mapRef.current?.setStreetView(streetView);
                  }, 300); // 300ms delay to prevent Google from hitting tile burst
                }
              }, 100);
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
              location: { lat: monastery.lat, lng: monastery.lng }, 
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
                      streetView.setVisible(true);
                      mapRef.current?.setStreetView(streetView);
                    }, 300); // 300ms delay to prevent Google from hitting tile burst
                  }
                }, 100);
              } else {
                // No Street View available - cache null result
                // Don't check further to avoid 429 errors
                streetViewCacheRef.current.set(cacheKey, null);
              }
            }
          );
        }
      };
    });
  }, [memoizedMonasteries, onMarkerClick]);

  return (
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
  );
};

// Memoize component to prevent unnecessary re-renders and remounts
// This prevents the map from reloading tiles when parent components update
export default memo(GoogleMapComponent);
