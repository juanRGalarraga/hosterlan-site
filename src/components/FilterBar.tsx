import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Search, Filter, X } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  roomType: string;
  onRoomTypeChange: (value: string) => void;
  selectedAmenities: string[];
  onAmenityToggle: (amenity: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  roomType,
  onRoomTypeChange,
  selectedAmenities,
  onAmenityToggle,
  onClearFilters
}: Readonly<FilterBarProps>) {
  
  const amenitiesList = ["WiFi", "Parking", "Kitchen", "TV"];

  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por ubicación o título..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Rango de precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los precios</SelectItem>
              <SelectItem value="0-500">$0 - $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
              <SelectItem value="1500+">$1,500+</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roomType} onValueChange={onRoomTypeChange}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Habitación">Habitación</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Amenidades:</span>
            {amenitiesList.map((amenity) => (
              <Badge
                key={amenity}
                variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onAmenityToggle(amenity)}
              >
                {amenity}
              </Badge>
            ))}
          </div>

          {(searchTerm || priceRange !== "all" || roomType !== "all" || selectedAmenities.length > 0) && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}