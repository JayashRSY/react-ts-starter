import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  CreditCard,
  PiggyBank,
  Calculator,
  Briefcase,
  HelpCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Calendar,
  Wallet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/hooks/useRedux";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  const { pathname } = location;
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const initialOpenSubMenus: Record<string, boolean> = {};
    navItems.forEach((item, index) => {
      if (
        item.subItems &&
        item.subItems.some(
          (subItem) => pathname === `/dashboard${item.href}${subItem.href}`
        )
      ) {
        initialOpenSubMenus[index] = true;
      }
    });
    setOpenSubMenus(initialOpenSubMenus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navItems.forEach((item, index) => {
      if (
        item.subItems &&
        item.subItems.some(
          (subItem) => pathname === `/dashboard${item.href}${subItem.href}`
        )
      ) {
        setOpenSubMenus((prev) => ({
          ...prev,
          [index]: true,
        }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="w-5 h-5" />,
      color: "text-blue-500",
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <LineChart className="w-5 h-5" />,
      color: "text-purple-500",
    },
    {
      label: "Credit Card",
      href: "/",
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-green-500",
      subItems: [
        {
          label: "Recommender",
          href: "/credit-card",
        },
        {
          label: "Upload Statement",
          href: "/credit-card/statement-upload",
        },
        {
          label: "Statement History",
          href: "/credit-card/statement-history",
        },
      ],
    },
    {
      label: "Finance Tracker",
      href: "/finance-tracker",
      icon: <Wallet className="w-5 h-5" />,
      color: "text-orange-500",
    },
    {
      label: "Financial Planning",
      href: "/financial-planning",
      icon: <PiggyBank className="w-5 h-5" />,
      color: "text-orange-500",
    },
    {
      label: "Finance Calculators",
      href: "/calculators",
      icon: <Calculator className="w-5 h-5" />,
      color: "text-cyan-500",
    },
    {
      label: "Services",
      href: "/services",
      icon: <Briefcase className="w-5 h-5" />,
      color: "text-indigo-500",
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-pink-500",
    },
  ];

  const bottomNavItems = [
    {
      label: "Help",
      href: "/help",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "text-gray-500",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-gray-500",
    },
  ];

  const toggleSubMenu = (index: number) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!hasMounted || !user) {
    return <div className="w-64 bg-background border-r border-border"></div>;
  }

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "flex flex-col h-screen bg-background border-r border-border shadow-sm transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1">
                <span className="font-mono">Your Money,</span>
                <span className="font-sans italic"> Your Way</span>
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item, index) => {
            const isActive =
              pathname === `/dashboard${item.href}` ||
              (item.href === "/" && pathname === "/dashboard") ||
              (item.subItems &&
                item.subItems.some(
                  (subItem) =>
                    pathname === `/dashboard${item.href}${subItem.href}`
                ));

            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isSubMenuOpen = openSubMenus[index] || false;

            return (
              <li key={index}>
                <div className="flex flex-col">
                  <Link
                    to={hasSubItems ? "#" : `/dashboard${item.href}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      "group relative",
                      isCollapsed ? "justify-center" : "",
                      isActive
                        ? "bg-muted text-foreground"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                    onClick={(e) => {
                      if (hasSubItems) {
                        e.preventDefault();
                        toggleSubMenu(index);
                      }
                    }}
                  >
                    <motion.span
                      initial={{ scale: 1 }}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        color: isActive ? item.color : "inherit",
                      }}
                      className={cn(
                        "transition-colors",
                        isActive ? item.color : "text-muted-foreground"
                      )}
                    >
                      {item.icon}
                    </motion.span>
                    {!isCollapsed && (
                      <>
                        <span
                          className={cn(
                            "font-medium flex-1",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {item.label}
                        </span>
                        {hasSubItems && (
                          <motion.span
                            animate={{ rotate: isSubMenuOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.span>
                        )}
                      </>
                    )}
                    {isCollapsed && hasSubItems && (
                      <div className="absolute left-full ml-6 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-md">
                        {item.label}
                      </div>
                    )}
                  </Link>

                  {/* Sub-menu items */}
                  {!isCollapsed && hasSubItems && (
                    <AnimatePresence>
                      {isSubMenuOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-8 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.subItems?.map((subItem, subIndex) => {
                            const isSubActive =
                              pathname ===
                              `/dashboard${item.href}${subItem.href}`;
                            return (
                              <motion.li
                                key={subIndex}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  to={`/dashboard${item.href}${subItem.href}`}
                                  className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm",
                                    isSubActive
                                      ? "bg-muted/70 text-foreground font-medium"
                                      : "hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                                  )}
                                >
                                  <motion.span
                                    initial={{ scale: 1 }}
                                    animate={{
                                      scale: isSubActive ? 1.1 : 1,
                                      color: isSubActive
                                        ? item.color
                                        : "inherit",
                                    }}
                                  >
                                    {subItem.label === "Upload Statement" && (
                                      <FileText className="h-3.5 w-3.5" />
                                    )}
                                    {subItem.label === "Statement History" && (
                                      <Calendar className="h-3.5 w-3.5" />
                                    )}
                                    {subItem.label === "Recommender" && (
                                      <CreditCard className="h-3.5 w-3.5" />
                                    )}
                                  </motion.span>
                                  <span>{subItem.label}</span>
                                  {isSubActive && (
                                    <motion.span
                                      className="absolute left-0 w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                                      layoutId="activeSubmenuIndicator"
                                    />
                                  )}
                                </Link>
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border py-4 px-3">
        <ul className="space-y-1">
          {bottomNavItems.map((item, index) => {
            const isActive = pathname === `/dashboard${item.href}`;
            return (
              <li key={index}>
                <Link
                  to={`/dashboard${item.href}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                    "group relative",
                    isCollapsed ? "justify-center" : "",
                    isActive
                      ? "bg-muted text-foreground"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      color: isActive ? item.color : "inherit",
                    }}
                    className={cn(
                      "transition-colors",
                      isActive ? item.color : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                  </motion.span>
                  {!isCollapsed && (
                    <span
                      className={cn(
                        "font-medium",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-6 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-md">
                      {item.label}
                    </div>
                  )}
                  {isActive && !isCollapsed && (
                    <motion.span
                      className="absolute left-0 w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
