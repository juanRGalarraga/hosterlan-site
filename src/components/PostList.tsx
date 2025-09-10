import { Home } from "lucide-react";
import { RoomCard } from "./RoomCard";
import { Button } from "./ui/button";
import type { Post } from "interfaces/Post";

interface PostListProps { 
    list?: Post[];
    handleClearFilters: () => void;
}

export default function PostList({ list, handleClearFilters }: PostListProps) {
    const listLength = list?.length ?? 0;
    return (
        listLength > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((post) => (
              <RoomCard key={post._id} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Home className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              No se encontraron habitaciones
            </h3>
            <p className="text-muted-foreground mb-4">
              Intenta ajustar los filtros para encontrar más opciones
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              Limpiar filtros
            </Button>
          </div>
        )
    )
}