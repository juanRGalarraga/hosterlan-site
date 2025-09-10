import { Home, Plus } from "lucide-react";
import { Button } from "./ui/button";


interface NavBarProps { 
    title: string;
    appName: string;
}

export default function NavBar({title, appName='My App'}: Readonly<NavBarProps>){ 
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Home className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold">{appName}</h1>
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {title}
            </Button>
          </div>
        </div>
      </header>
    )
}