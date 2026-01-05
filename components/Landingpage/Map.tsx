import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IoLocationSharp } from "react-icons/io5";
import { renderToStaticMarkup } from "react-dom/server";

type LocationCategory = "alumnus" | "active" | "operating" | "staff";

interface Location {
  name: string;
  coords: [number, number];
  category: LocationCategory;
  details?: string;
}

const Map = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    LocationCategory[]
  >(["alumnus", "active", "operating", "staff"]);

  // All locations with their categories
  const locations: Location[] = [
    // Alumnus: Bangladesh, Australia, India, USA, Canada, UK
    {
      name: "Bangladesh",
      coords: [23.685, 90.3563],
      category: "alumnus",
      details: "Alumnus Network",
    },
    {
      name: "Australia",
      coords: [-25.2744, 133.7751],
      category: "alumnus",
      details: "Alumnus Community",
    },
    {
      name: "India",
      coords: [20.5937, 78.9629],
      category: "alumnus",
      details: "Alumnus Community",
    },
    {
      name: "United States",
      coords: [37.0902, -95.7129],
      category: "alumnus",
      details: "Alumnus Network",
    },
    {
      name: "Canada",
      coords: [56.1304, -106.3468],
      category: "alumnus",
      details: "Alumnus Hub",
    },
    {
      name: "United Kingdom",
      coords: [55.3781, -3.436],
      category: "alumnus",
      details: "Alumnus Community",
    },

    // Active Members: 8 in Bangladesh, 2 in Australia
    {
      name: "Bangladesh",
      coords: [23.8103, 90.4125],
      category: "active",
      details: "8 Active Members",
    },
    {
      name: "Australia",
      coords: [-33.8688, 151.2093],
      category: "active",
      details: "2 Active Members",
    },

    // Operating Areas: Bangladesh (Dhaka, Chittagong, CHT)
    {
      name: "Dhaka",
      coords: [23.8103, 90.4125],
      category: "operating",
      details: "Dhaka Operations",
    },
    {
      name: "Chittagong",
      coords: [22.3569, 91.7832],
      category: "operating",
      details: "Chittagong Operations",
    },
    {
      name: "Chittagong Hill Tracts",
      coords: [23.1793, 91.9882],
      category: "operating",
      details: "CHT Operations",
    },

    // Staff: Bangladesh, Australia, Canada, India
    {
      name: "Bangladesh",
      coords: [23.685, 90.3563],
      category: "staff",
      details: "Staff Office",
    },
    {
      name: "Australia",
      coords: [-37.8136, 144.9631],
      category: "staff",
      details: "Staff Office",
    },
    {
      name: "Canada",
      coords: [45.5017, -73.5673],
      category: "staff",
      details: "Staff Office",
    },
    {
      name: "India",
      coords: [12.9716, 77.5946],
      category: "staff",
      details: "Staff Office",
    },
  ];

  const categoryColors: Record<
    LocationCategory,
    { fill: string; stroke: string }
  > = {
    alumnus: { fill: "#802390", stroke: "#5a1966" },
    active: { fill: "#FF951B", stroke: "#cc7716" },
    operating: { fill: "#2ECC71", stroke: "#27ae60" },
    staff: { fill: "#3498DB", stroke: "#2980b9" },
  };

  const categoryLabels: Record<LocationCategory, string> = {
    alumnus: "Alumnus",
    active: "Active Members",
    operating: "Partners",
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

  // Toggle category selection
  const toggleCategory = (category: LocationCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">

      {/* Category Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        {(Object.keys(categoryColors) as LocationCategory[]).map((category) => {
          const isSelected = selectedCategories.includes(category);
          const colors = categoryColors[category];
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? "shadow-md transform scale-105"
                  : "opacity-50 hover:opacity-75"
              }`}
              style={{
                backgroundColor: isSelected ? colors.fill : "#e0e0e0",
                color: isSelected ? "white" : "#666",
              }}
            >
              <IoLocationSharp className="text-lg" />
              {categoryLabels[category]}
            </button>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <div className="z-0 w-full h-[600px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            scrollWheelZoom={true}
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
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Location Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IoLocationSharp style={{ color: categoryColors.alumnus.fill }} />
              <span className="font-medium text-gray-700">Alumnus</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              Bangladesh, Australia, India, USA, Canada, UK
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IoLocationSharp style={{ color: categoryColors.active.fill }} />
              <span className="font-medium text-gray-700">Active Members</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              8 in Bangladesh, 2 in Australia
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IoLocationSharp
                style={{ color: categoryColors.operating.fill }}
              />
              <span className="font-medium text-gray-700">Partners</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">Dhaka, Chittagong, CHT</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IoLocationSharp style={{ color: categoryColors.staff.fill }} />
              <span className="font-medium text-gray-700">Staff</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              Bangladesh, Australia, Canada, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
