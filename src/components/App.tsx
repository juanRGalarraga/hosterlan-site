import { FilterBar } from "./FilterBar";
import NavBar from "./NavBar";
import Stats from "./Stats";
import "../styles/globals.css";
import PostList from "./PostList";
import useSwr from "swr";
import { POST_LIST } from "queries/post/post";
import { fetcher } from "lib/fetcher";
import { useRemoteFilters } from "hooks/useFilters";
import type { Post, PaginatedPostResult } from "interfaces/Post";
import { Loader2 } from "lucide-react";

export default function App() {
  const {
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
  } = useRemoteFilters();

  const { data, error, isLoading } = useSwr<PaginatedPostResult>(
    [POST_LIST],
    ([query]) => fetcher<PaginatedPostResult>(query, { pagination: {page:1, limit: 25 }})
  )

  const postList = data?.posts.items;
  
  if (error) return <p>Error al cargar los posts: {(error as Error).message}</p>;

  

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="Publicar habitación" appName="Hosterlan" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <Stats postList={postList} availablesPostList={postList} />

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          roomType={roomType}
          onRoomTypeChange={setRoomType}
          selectedAmenities={amenities}
          onAmenityToggle={toggleAmenity}
          onClearFilters={clearFilters}
        />

        {isShowPlaceholder({postList, clearFilters}, isLoading)}
      </main>
    </div>
  );
}

export function PostListPlaceholder() {
  return (
    <div className="text-center py-12 animate-pulse">
      <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
      </div>
      <h3 className="text-lg font-medium mb-2">Cargando publicaciones...</h3>
      <p className="text-muted-foreground mb-4">
        Esto puede tardar unos segundos
      </p>
      <div className="flex justify-center space-x-2">
        <div className="w-20 h-10 bg-muted rounded-lg" />
        <div className="w-20 h-10 bg-muted rounded-lg" />
      </div>
    </div>
  );
}

function isShowPlaceholder({ postList, clearFilters } : { postList?: Post[], clearFilters: () => void }, isLoading: boolean = true) {
  if (isLoading) {
    return <PostListPlaceholder/>
  }
  return <PostList list={postList} handleClearFilters={clearFilters} />
}