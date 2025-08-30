import { useState } from "react";
import { hotels, locations } from "@/data";
import HotelCard from "./HotelCard";
import Location from "./LocationsTab";

function HotelListings() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation._id);
    console.log("Selected Location ID:", selectedLocation._id);
  };

  const selectedLocationName = locations.find(
    (el) => selectedLocation === el._id
  )?.name;

  const filteredHotels =
    selectedLocation === 0
      ? hotels
      : hotels.filter((hotel) => hotel.location.includes(selectedLocationName));

  return (
    <div>
      <section className="px-8 py-0 lg:py-0">
        <div className="mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-x-4">
          {locations.map((location) => (
            <Location
              onClick={handleLocationSelect}
              key={location._id}
              location={location}
              selectedLocation={selectedLocation}
            />
          ))}
        </div>
        {/* Add your hotel listings here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </section>
    </div>
  );
}
export default HotelListings;
