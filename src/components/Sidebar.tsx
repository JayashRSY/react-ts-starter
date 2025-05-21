import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Bike,
  Calendar,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  expanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: NavItem[];
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

const Sidebar = ({ className, expanded: propExpanded, setExpanded: propSetExpanded }: SidebarProps) => {
  // Use props if provided, otherwise use local state
  const [localExpanded, setLocalExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  // Determine if we're using props or local state
  const expanded = propExpanded !== undefined ? propExpanded : localExpanded;
  const setExpanded = propSetExpanded || setLocalExpanded;

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setExpanded(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setExpanded]);

  // Navigation items
  const navItems: NavItem[] = [
    { title: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { title: "About", href: "/about", icon: <Info className="h-5 w-5" /> },
    { title: "Bikes", href: "/bikes", icon: <Bike className="h-5 w-5" /> },
    { 
      title: "My Bookings", 
      href: "/my-bookings", 
      icon: <ClipboardList className="h-5 w-5" />,
      requiresAuth: true
    },
    { 
      title: "Profile", 
      href: "/profile", 
      icon: <User className="h-5 w-5" />,
      requiresAuth: true
    },
    { 
      title: "Dashboard", 
      href: "/admin", 
      icon: <LayoutDashboard className="h-5 w-5" />,
      adminOnly: true,
      submenu: [
        { title: "Manage Bikes", href: "/admin?tab=bikes", icon: <Bike className="h-4 w-4" /> },
        { title: "Bookings", href: "/admin?tab=bookings", icon: <Calendar className="h-4 w-4" /> },
        { title: "Users", href: "/admin?tab=users", icon: <Users className="h-4 w-4" /> }
      ]
    },
    { title: "Contact", href: "/contact", icon: <MessageSquare className="h-5 w-5" /> },
    { title: "FAQ", href: "/faq", icon: <ClipboardList className="h-5 w-5" /> }
  ];

  // Filter items based on auth status and role
  const filteredNavItems = navItems.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    if (item.requiresAuth && !accessToken) return false;
    return true;
  });

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar content component (shared between desktop and mobile)
  const SidebarContent = () => (
    <div className={cn(
      "flex h-full flex-col gap-2",
      expanded ? "w-64" : "w-[70px]"
    )}>
      <div className="flex h-16 items-center justify-between px-4">
        {expanded && (
          <Link to="/" className="flex items-center gap-2">
            <div className="relative size-8 overflow-hidden">
              <svg
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full text-primary"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Atoot</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            expanded ? "rotate-180" : ""  
          )} />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href || 
                          (item.submenu && item.submenu.some(subItem => 
                            location.pathname + location.search === subItem.href));
            
            return (
              <div key={item.href} className="mb-1">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          isActive ? "bg-accent text-accent-foreground" : "transparent",
                          !expanded && "justify-center px-2"
                        )}
                      >
                        {item.icon}
                        {expanded && <span className="ml-3">{item.title}</span>}
                        {expanded && item.submenu && (
                          <ChevronRight className={cn(
                            "ml-auto h-4 w-4 transition-transform",
                            isActive ? "rotate-90" : ""
                          )} />
                        )}
                      </Link>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                {/* Submenu items */}
                {expanded && item.submenu && isActive && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subItem) => {
                      const isSubActive = location.pathname + location.search === subItem.href;
                      
                      return (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            isSubActive ? "bg-accent/50 text-accent-foreground" : "text-muted-foreground"
                          )}
                        >
                          {subItem.icon}
                          <span className="ml-3">{subItem.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* User section */}
      {user && accessToken && expanded && (
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name || "User"}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" asChild>
              <Link to="/logout">
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Mobile sidebar with sheet component
  const MobileSidebar = () => (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          // Remove this onClick handler - it's redundant with SheetTrigger
          // onClick={toggleMobileMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      {/* Mobile sidebar */}
      {isMobile && <MobileSidebar />}
      
      {/* Desktop sidebar */}
      {!isMobile && (
        <aside className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r bg-background lg:flex lg:flex-col",
          expanded ? "w-64" : "w-[70px]",
          className
        )}>
          <SidebarContent />
        </aside>
      )}
    </>
  );
};

export default Sidebar;