"use client"

import { useState } from "react"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Project",
    href: "/dashboard?tab=todo",
    icon: CheckSquare,
  },
  {
    title: "Employee",
    href: "/dashboard?tab=employee",
    icon: Users,
  },
  {
    title: "Payroll",
    href: "/dashboard?tab=payroll",
    icon: CreditCard,
  },
]

const otherItems = [
  {
    title: "Schedule",
    href: "/dashboard?tab=schedule",
    icon: Clock,
  },
  {
    title: "Open Hiring",
    href: "/dashboard?tab=hiring",
    icon: Users,
  },
  {
    title: "Integration",
    href: "/dashboard?tab=integration",
    icon: Trello,
  },
]

const preferenceItems = [
  {
    title: "Security",
    href: "/dashboard?tab=security",
    icon: Settings,
  },
  {
    title: "Help Center",
    href: "/dashboard?tab=help",
    icon: HelpCircle,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getIsActive = (href: string) => {
    const [path, query] = href.split("?")
    if (!query) return pathname === href
    return pathname === path && searchParams.get("tab") === new URLSearchParams(query).get("tab")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-4 top-4 z-50 rounded-md bg-gray-800 p-2 text-white lg:hidden"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-60 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center space-x-2 px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
              P
            </div>
            <div>
              <h1 className="text-sm font-semibold">Perfect Pixelz</h1>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-4 text-sm focus:outline-none"
              />
              <span className="absolute left-2.5 top-2 text-gray-400">⌘K</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className="mb-6">
              <h2 className="mb-2 px-2 text-xs font-semibold uppercase text-gray-400">
                GENERAL
              </h2>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = getIsActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-2 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="mb-6">
              <h2 className="mb-2 px-2 text-xs font-semibold uppercase text-gray-400">
                OTHERS
              </h2>
              <nav className="space-y-1">
                {otherItems.map((item) => {
                  const isActive = getIsActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-2 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="mb-6">
              <h2 className="mb-2 px-2 text-xs font-semibold uppercase text-gray-400">
                PREFERENCES
              </h2>
              <nav className="space-y-1">
                {preferenceItems.map((item) => {
                  const isActive = getIsActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-2 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Upgrade Banner */}
          <div className="mt-auto border-t p-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center justify-center">
                <div className="rounded-full bg-blue-600 p-1">
                  <svg
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium">
                Up To Enterprise
              </h3>
              <p className="mt-1 text-center text-xs text-gray-500">
                Get full access to all features...
              </p>
              <button className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
