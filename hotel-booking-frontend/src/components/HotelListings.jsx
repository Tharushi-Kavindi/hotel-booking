import { useState } from "react";
import HotelCard from "./HotelCard";
import Location from "./LocationsTab";
import { Skeleton } from "./ui/skeleton";
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "../lib/api";

function HotelListings() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const {
    data: hotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery();
  const {
    data: locations,
    isLoading: isLocationsLoading,
    isError: isLocationsError,
    error: locationsError,
  } = useGetAllLocationsQuery();

  const allLocations = locations
    ? [{ _id: 0, name: "All" }, ...locations]
    : [{ _id: 0, name: "All" }];

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation._id);
    console.log("Selected Location ID:", selectedLocation._id);
  };

  const selectedLocationName = allLocations.find(
    (el) => selectedLocation === el._id
  )?.name;

  const filteredHotels =
    selectedLocation === 0
      ? hotels
      : hotels.filter((hotel) => hotel.location.includes(selectedLocationName));

  const isLoading = isHotelsLoading || isLocationsLoading;
  const isError = isHotelsError || isLocationsError;
  const error = [hotelsError, locationsError];

  if (isLoading) {
    return (
      <section className="px-8 py-0 lg:py-0">
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-bold mt-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>

        <Skeleton className="h-6 flex items-center flex-wrap gap-x-4" />

        <Skeleton className="h-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-0 lg:py-0">
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-bold mt-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <p className="text-red-500">
          {error?.data?.message || "Something went wrong. Error Loading Data."}
        </p>
      </section>
    );
  }

  return (
    <div>
      <section className="px-8 py-0 lg:py-0">
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-bold mt-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-x-4">
          {allLocations.map((location) => (
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
