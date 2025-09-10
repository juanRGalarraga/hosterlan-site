import type { Post } from "interfaces/Post";
import { Badge } from "./ui/badge";

interface StatsProps { 
    postList?: Post[];
    availablesPostList?: Post[];
}

export default function Stats({ postList, availablesPostList }: Readonly<StatsProps>) { 
    const postListLength = postList?.length ?? 0;
    const availablesPostListLength = availablesPostList?.length ?? 0;
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Habitaciones disponibles</h2>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                    {postListLength} resultados
                    </Badge>
                    <Badge variant="outline">
                    {availablesPostListLength} disponibles
                    </Badge>
                </div>
            </div>
        </div>
    )
}