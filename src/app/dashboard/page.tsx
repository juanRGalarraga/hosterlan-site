'use client'

import { useAuth } from "../providers/AuthProvider";

const items = Array.from({ length: 25 });

export default function Page() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log("No está autenticado")
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {items.map((_, index) => (
          <div
            key={index}
            className="bg-muted/50 aspect-video rounded-xl"
          />
        ))}
      </div>
    </div>
  )
}
