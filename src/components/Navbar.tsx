import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { RootState } from "../store";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

const Navbar = () => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="flex-1 md:max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]" 
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          {user && accessToken ? (
            <ProfileButton />
          ) : (
            <div className="hidden sm:flex sm:gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm" className="font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="font-medium">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
