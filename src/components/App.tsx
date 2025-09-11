import { FilterBar } from "./FilterBar";
import Stats from "./Stats";
import "../styles/globals.css";
import PostList from "./PostList";
import { SWRConfig } from "swr";
import { POST_LIST_QUERY } from "queries/post";
import { useRemoteFilters } from "hooks/useFilters";
import type { PaginatedPostResult, Post } from "interfaces/Post";
import { Loader2 } from "lucide-react";
import { AuthProvider, useAuth } from "contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthenticatedSWR, useAuthenticatedMutation, swrConfig } from 'lib/swr-config';
import { useEffect, useState } from "react";

const App: React.FC = () => {
  return (
    <SWRConfig value={swrConfig}>
      <AuthProvider>
        <ProtectedRoute>
          <PostListComponent/>
        </ProtectedRoute>
      </AuthProvider>
    </SWRConfig>
  );
};

function PostListComponent() {
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

  const { user, logout } = useAuth();
  const { mutate } = useAuthenticatedMutation();
  
  const { data: posts, error, mutate: mutatePosts, isLoading } = useAuthenticatedSWR<PaginatedPostResult>(POST_LIST_QUERY, { pagination: { page: 1, limit: 25 } });

  if (error) {
    return <div className="text-red-600">Error cargando datos: {error.message}</div>;
  }

  const postList = posts?.posts.items as Post[] ?? [];

  return (
    <>
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

      {
        !isLoading ?
        <PostList list={postList} handleClearFilters={clearFilters} /> :
        <PostListPlaceholder/>
      }
    </>
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

export default App;