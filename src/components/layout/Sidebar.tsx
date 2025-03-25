"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  LayoutDashboard,
  CheckSquare,
  Trello,
  Calendar,
  Menu,
  X,
  Users,
  CreditCard,
  Clock,
  Settings,
  HelpCircle,
  Search,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: "",
  },
  {
    title: "Project",
    href: "/dashboard?tab=todo",
    icon: CheckSquare,
    badge: "5",
  },
  {
    title: "Employee",
    href: "/dashboard?tab=employee",
    icon: Users,
    badge: "",
  },
  {
    title: "Payroll",
    href: "/dashboard?tab=payroll",
    icon: CreditCard,
    badge: "",
  },
]

const otherItems = [
  {
    title: "Schedule",
    href: "/dashboard?tab=schedule",
    icon: Clock,
    badge: "New",
  },
  {
    title: "Open Hiring",
    href: "/dashboard?tab=hiring",
    icon: Users,
    badge: "",
  },
  {
    title: "Integration",
    href: "/dashboard?tab=integration",
    icon: Trello,
    badge: "",
  },
]

const preferenceItems = [
  {
    title: "Security",
    href: "/dashboard?tab=security",
    icon: Settings,
    badge: "",
  },
  {
    title: "Help Center",
    href: "/dashboard?tab=help",
    icon: HelpCircle,
    badge: "",
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const getIsActive = (href: string) => {
    const [path, query] = href.split("?")
    if (!query) return pathname === href
    return (
      pathname === path &&
      searchParams.get("tab") === new URLSearchParams(query).get("tab")
    )
  }

  useEffect(() => {
    // Ekran genişliğini takip et ve otomatik daralt/genişlet
    const handleResize = () => {
      if (window.innerWidth < 1280 && !isMobileMenuOpen) {
        setIsCollapsed(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-4 top-4 z-50 rounded-full bg-white p-2 text-gray-800 shadow-lg hover:bg-gray-50 lg:hidden"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full transform transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-r-xl bg-white shadow-xl">
          {/* Logo ve Daralt/Genişlet Butonu */}
          <div className="relative border-b">
            <div
              className={cn(
                "flex h-16 items-center px-4 transition-all",
                isCollapsed ? "justify-center" : "space-x-3"
              )}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
                <Sparkles size={18} />
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <h1 className="truncate text-base font-semibold text-gray-800">
                    Perfect Pixelz
                  </h1>
                  <p className="text-xs text-gray-500">Premium Workspace</p>
                </div>
              )}
            </div>

            {/* Daralt/Genişlet Butonu */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-1/2 hidden -translate-y-1/2 transform rounded-full border border-gray-200 bg-white p-1 text-gray-400 shadow-md hover:bg-gray-50 hover:text-gray-600 lg:block"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isCollapsed ? "rotate-180" : ""
                )}
              />
            </button>
          </div>

          {/* Search */}
          <div
            className={cn(
              "border-b px-3 py-3",
              isCollapsed ? "flex justify-center" : ""
            )}
          >
            {isCollapsed ? (
              <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100">
                <Search className="h-4 w-4 text-gray-500" />
              </button>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-4 text-sm text-gray-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring focus:ring-indigo-100"
                />
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-6">
              {!isCollapsed && (
                <h2 className="mb-2 px-2 text-xs font-medium text-gray-400">
                  GENEL
                </h2>
              )}
              <nav className="space-y-1">
                <Link
                  href="/dashboard"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    pathname === "/dashboard"
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      pathname === "/dashboard"
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                  </div>

                  {!isCollapsed && <span className="ml-3">Dashboard</span>}
                </Link>

                <Link
                  href="/dashboard?tab=todo"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=todo")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=todo")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <CheckSquare className="h-4 w-4" />
                  </div>

                  {!isCollapsed && (
                    <>
                      <span className="ml-3">Project</span>
                      <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                        5
                      </span>
                    </>
                  )}

                  {isCollapsed && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-medium text-white">
                      5
                    </span>
                  )}
                </Link>

                <Link
                  href="/dashboard?tab=employee"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=employee")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=employee")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <Users className="h-4 w-4" />
                  </div>

                  {!isCollapsed && <span className="ml-3">Employee</span>}
                </Link>

                <Link
                  href="/dashboard?tab=payroll"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=payroll")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=payroll")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <CreditCard className="h-4 w-4" />
                  </div>

                  {!isCollapsed && <span className="ml-3">Payroll</span>}
                </Link>
              </nav>
            </div>

            <div className="mb-6">
              {!isCollapsed && (
                <h2 className="mb-2 px-2 text-xs font-medium text-gray-400">
                  DİĞER
                </h2>
              )}
              {isCollapsed && (
                <div className="mx-auto my-2 h-[1px] w-6 bg-gray-200"></div>
              )}
              <nav className="space-y-1">
                <Link
                  href="/dashboard?tab=schedule"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=schedule")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=schedule")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <Clock className="h-4 w-4" />
                  </div>

                  {!isCollapsed && (
                    <>
                      <span className="ml-3">Schedule</span>
                      <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        New
                      </span>
                    </>
                  )}

                  {isCollapsed && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-medium text-white">
                      N
                    </span>
                  )}
                </Link>

                <Link
                  href="/dashboard?tab=hiring"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=hiring")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=hiring")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <Users className="h-4 w-4" />
                  </div>

                  {!isCollapsed && <span className="ml-3">Open Hiring</span>}
                </Link>

                <Link
                  href="/dashboard?tab=integration"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=integration")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=integration")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <Trello className="h-4 w-4" />
                  </div>

                  {!isCollapsed && <span className="ml-3">Integration</span>}
                </Link>
              </nav>
            </div>

            <div className="mb-6">
              {!isCollapsed && (
                <h2 className="mb-2 px-2 text-xs font-medium text-gray-400">
                  TERCİHLER
                </h2>
              )}
              {isCollapsed && (
                <div className="mx-auto my-2 h-[1px] w-6 bg-gray-200"></div>
              )}
              <nav className="space-y-1">
                <Link
                  href="/dashboard?tab=security"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=security")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=security")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <Settings className="h-4 w-4" />
                  </div>

                  {!isCollapsed && <span className="ml-3">Security</span>}
                </Link>

                <Link
                  href="/dashboard?tab=help"
                  className={cn(
                    "group relative flex items-center rounded-lg px-2 py-2 text-sm transition-all",
                    getIsActive("/dashboard?tab=help")
                      ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      getIsActive("/dashboard?tab=help")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 group-hover:text-indigo-600"
                    )}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </div>

                  {!isCollapsed && <span className="ml-3">Help Center</span>}
                </Link>
              </nav>
            </div>
          </div>

          {/* Light/Dark Mode Toggle and User Profile */}
          <div className="mt-auto border-t p-3">
            {!isCollapsed ? (
              <>
                <div className="mb-3 flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
                  <button
                    className={cn(
                      "rounded-md px-2 py-1 text-sm",
                      !isDarkMode
                        ? "bg-white text-gray-800 shadow-sm"
                        : "text-gray-600"
                    )}
                    onClick={() => setIsDarkMode(false)}
                  >
                    <Sun className="mr-1 inline-block h-3 w-3" />
                    Açık
                  </button>
                  <button
                    className={cn(
                      "rounded-md px-2 py-1 text-sm",
                      isDarkMode
                        ? "bg-white text-gray-800 shadow-sm"
                        : "text-gray-600"
                    )}
                    onClick={() => setIsDarkMode(true)}
                  >
                    <Moon className="mr-1 inline-block h-3 w-3" />
                    Koyu
                  </button>
                </div>

                <div className="flex items-center rounded-lg px-2 py-1.5 hover:bg-gray-50">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="User"
                    className="h-8 w-8 rounded-lg border border-gray-200"
                  />
                  <div className="ml-2 flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-gray-700">
                      Ali Yılmaz
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      ali@sirket.com
                    </p>
                  </div>
                  <button className="rounded-md p-1 hover:bg-gray-100">
                    <LogOut className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="User"
                  className="h-8 w-8 rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
