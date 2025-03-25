"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "./Sidebar"
import Image from "next/image"
import {
  Bell,
  Search,
  Settings,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  // Şimdilik kullanılmayan state değişkenleri, ihtiyaç olduğunda yeniden etkinleştir
  const [unreadNotifications] = useState(3)
  const [unreadMessages] = useState(5)

  // Sayfa kaydırılınca başlık çubuğunun görünümünü değiştirme
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mobil kenar çubuğunu kapatmak için sayfa değiştiğinde izleme
  useEffect(() => {
    setIsMobileSidebarOpen(false)
  }, [pathname])

  // Sayfa başlığını güzelleştirme
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard"

    // Tab parametresini kontrol et
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get("tab")

    if (tab) {
      const formattedTab = tab.charAt(0).toUpperCase() + tab.slice(1)
      return formattedTab
    }

    // Yolu bileşenlere ayır
    const pathSegments = pathname.split("/").filter(Boolean)
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1]
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    }

    return "Dashboard"
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex w-full flex-1 flex-col lg:pl-64">
        {/* Top Bar */}
        <header
          className={cn(
            "sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 transition-all duration-200",
            isScrolled && "shadow-sm"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
            >
              {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {getPageTitle()}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <Sparkles className="mr-1 h-3 w-3" />
                <span>Perfect Pixelz Workspace</span>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-1">
            {/* Global Search */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Küresel arama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-4 text-sm text-gray-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring focus:ring-indigo-100"
                />
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
                <div className="absolute right-2.5 top-1.5 rounded-md border border-gray-200 bg-white px-1 py-0.5 text-xs font-medium text-gray-400">
                  ⌘K
                </div>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Messages */}
            <button className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <MessageSquare size={20} />
              {unreadMessages > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                  {unreadMessages}
                </span>
              )}
            </button>

            {/* Help */}
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <HelpCircle size={20} />
            </button>

            {/* Settings */}
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <Settings size={20} />
            </button>

            {/* User Profile */}
            <div className="ml-1 flex cursor-pointer items-center rounded-lg px-1 py-1 hover:bg-gray-100">
              <Image
                src="https://i.pravatar.cc/150?img=12"
                alt="User"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg border border-gray-200"
              />
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium text-gray-700">Ali Yılmaz</p>
                <p className="text-xs text-gray-500">Premium Kullanıcı</p>
              </div>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
