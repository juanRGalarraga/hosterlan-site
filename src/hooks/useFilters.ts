import { useState, useMemo, useCallback } from "react";

export interface Filters {
  searchTerm?: string;
  priceRange?: string;
  roomType?: string;
  amenities?: string[];
}

export function useRemoteFilters(initial: Filters = {}) {
  const [searchTerm, setSearchTerm] = useState(initial.searchTerm ?? "");
  const [priceRange, setPriceRange] = useState(initial.priceRange ?? "all");
  const [roomType, setRoomType] = useState(initial.roomType ?? "all");
  const [amenities, setAmenities] = useState<string[]>(initial.amenities ?? []);

  
  const toggleAmenity = useCallback((amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setPriceRange("all");
    setRoomType("all");
    setAmenities([]);
  }, []);

  const filters = useMemo(
    () => ({
      searchTerm,
      priceRange,
      roomType,
      amenities,
    }),
    [searchTerm, priceRange, roomType, amenities]
  );

  return {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    roomType,
    setRoomType,
    amenities,
    toggleAmenity,
    clearFilters,
    filters,
  };
}
