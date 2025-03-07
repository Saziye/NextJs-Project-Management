"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/auth/login")
    }
  }, [router])

  return null
}
