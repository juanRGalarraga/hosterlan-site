import type { PaginatedType } from "./PaginatedResult";
import type { User } from "./User";

export enum ROOM_TYPES {
    ROOM = 'Habitacion'
}

export interface Post {
    _id: string;
    title: string;
    body: string;
    location: string;
    price: number;
    rating: number;
    room_type: ROOM_TYPES;
    amenities: string[];
    isAvailable: boolean;
    user: User;
}

export type PaginatedPostResult = {
    posts: PaginatedType<Post>
}