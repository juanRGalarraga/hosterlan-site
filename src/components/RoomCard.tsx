import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "components/commons/ImageWithFallback";
import { Star, MapPin, Wifi, Car, Coffee, Tv } from "lucide-react";
import type { Post } from "./PostList";

export function RoomCard({
  title,
  location,
  price,
  rating,
  reviewCount,
  imageUrl,
  roomType,
  amenities,
  isAvailable
}: Readonly<Post>) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'parking':
        return <Car className="w-3 h-3" />;
      case 'kitchen':
        return <Coffee className="w-3 h-3" />;
      case 'tv':
        return <Tv className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={isAvailable ? "default" : "secondary"}>
            {isAvailable ? "Disponible" : "Ocupado"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/90">
            {roomType}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-foreground line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold">${price}</span>
            <span className="text-sm text-muted-foreground">/mes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}