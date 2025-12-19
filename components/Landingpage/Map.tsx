"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IoLocationSharp } from "react-icons/io5";
import { renderToStaticMarkup } from "react-dom/server";

type LocationCategory = "alumni" | "active" | "operating" | "staff";

interface Location {
  name: string;
  coords: [number, number];
  category: LocationCategory;
  details?: string;
}

interface WhereWeWorkMapProps {
  selectedCategories: LocationCategory[];
}

const Map = ({ selectedCategories }: WhereWeWorkMapProps) => {
  // All locations with their categories
  const locations: Location[] = [
    // Alumni (Bangladesh, India, Canada)
    {
      name: "Bangladesh",
      coords: [23.685, 90.3563],
      category: "alumni",
      details: "Dhaka - Alumni Network",
    },
    {
      name: "India",
      coords: [20.5937, 78.9629],
      category: "alumni",
      details: "Mumbai - Alumni Community",
    },
    {
      name: "Canada",
      coords: [56.1304, -106.3468],
      category: "alumni",
      details: "Toronto - Alumni Hub",
    },

    // Active Members (Australia, India, UK)
    {
      name: "Australia",
      coords: [-25.2744, 133.7751],
      category: "active",
      details: "Sydney - Active Chapter",
    },
    {
      name: "India",
      coords: [28.6139, 77.209],
      category: "active",
      details: "New Delhi - Active Members",
    },
    {
      name: "United Kingdom",
      coords: [55.3781, -3.436],
      category: "active",
      details: "London - Active Community",
    },

    // Operating Areas (Bangladesh, Australia, India, America, Canada, UK)
    {
      name: "Bangladesh",
      coords: [22.3569, 91.7832],
      category: "operating",
      details: "Chittagong - Operations Center",
    },
    {
      name: "Australia",
      coords: [-33.8688, 151.2093],
      category: "operating",
      details: "Sydney - Regional Office",
    },
    {
      name: "India",
      coords: [19.076, 72.8777],
      category: "operating",
      details: "Mumbai - Operations",
    },
    {
      name: "United States",
      coords: [37.0902, -95.7129],
      category: "operating",
      details: "New York - Operations Hub",
    },
    {
      name: "Canada",
      coords: [43.6532, -79.3832],
      category: "operating",
      details: "Toronto - Operations",
    },
    {
      name: "United Kingdom",
      coords: [51.5074, -0.1278],
      category: "operating",
      details: "London - Operations",
    },

    // Staff (Bangladesh, India, UK, Canada, Australia, America)
    {
      name: "Bangladesh",
      coords: [23.8103, 90.4125],
      category: "staff",
      details: "Dhaka HQ - Main Staff Office",
    },
    {
      name: "India",
      coords: [12.9716, 77.5946],
      category: "staff",
      details: "Bangalore - Tech Staff",
    },
    {
      name: "United Kingdom",
      coords: [53.4808, -2.2426],
      category: "staff",
      details: "Manchester - Staff Office",
    },
    {
      name: "Canada",
      coords: [45.5017, -73.5673],
      category: "staff",
      details: "Montreal - Staff Center",
    },
    {
      name: "Australia",
      coords: [-37.8136, 144.9631],
      category: "staff",
      details: "Melbourne - Staff Hub",
    },
    {
      name: "United States",
      coords: [34.0522, -118.2437],
      category: "staff",
      details: "Los Angeles - Staff Office",
    },
  ];

  const categoryColors: Record<
    LocationCategory,
    { fill: string; stroke: string }
  > = {
    alumni: { fill: "#802390", stroke: "#5a1966" },
    active: { fill: "#FF951B", stroke: "#cc7716" },
    operating: { fill: "#2ECC71", stroke: "#27ae60" },
    staff: { fill: "#3498DB", stroke: "#2980b9" },
  };

  const categoryLabels: Record<LocationCategory, string> = {
    alumni: "Alumni",
    active: "Active Members",
    operating: "Operating Area",
    staff: "Staff",
  };

  // Create custom icon for each category
  const createCustomIcon = (category: LocationCategory) => {
    const colors = categoryColors[category];
    const iconMarkup = renderToStaticMarkup(
      <IoLocationSharp className="text-2xl" style={{ color: colors.fill }} />
    );

    return L.divIcon({
      html: iconMarkup,
      className: "custom-marker-icon",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  // Filter locations based on selected categories
  const filteredLocations = locations.filter((loc) =>
    selectedCategories.includes(loc.category)
  );

  return (
    <div className="z-0 w-full h-[600px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <MapContainer
        center={[20, 20]}
        zoom={2}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        style={{ background: "#f0f0f0" }}
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredLocations.map((location, index) => {
          const colors = categoryColors[location.category];
          return (
            <Marker
              key={`${location.category}-${index}`}
              position={location.coords}
              icon={createCustomIcon(location.category)}
            >
              <Popup>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <IoLocationSharp
                      className="text-2xl"
                      style={{ color: colors.fill }}
                    />
                    <strong style={{ color: colors.fill }}>
                      {location.name}
                    </strong>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    {location.details}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {categoryLabels[location.category]}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
