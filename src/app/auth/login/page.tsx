"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { getWeatherByCoords } from "@/lib/weather"
import type { WeatherData } from "@/types/weather"
import Image from "next/image"
const formSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir email adresi giriniz.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const weatherData = await getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            )
            setWeather(weatherData)
          } catch (error) {
            console.error("Hava durumu alınamadı:", error)
          } finally {
            setWeatherLoading(false)
          }
        },
        (error) => {
          console.error("Konum alınamadı:", error)
          setWeatherLoading(false)
        }
      )
    } else {
      setWeatherLoading(false)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      localStorage.setItem("user", JSON.stringify(values))
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherBackground = () => {
    if (!weather) return "from-blue-400 to-purple-500"

    const weatherMain = weather.weather[0].main.toLowerCase()
    switch (weatherMain) {
      case "clear":
        return "from-yellow-400 to-orange-500"
      case "clouds":
        return "from-gray-400 to-gray-600"
      case "rain":
        return "from-blue-600 to-gray-700"
      case "snow":
        return "from-blue-100 to-gray-200"
      default:
        return "from-blue-400 to-purple-500"
    }
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gradient-to-r ${getWeatherBackground()}`}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {weather && !weatherLoading && (
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center">
              <Image
                width={64}
                height={64}
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="h-16 w-16"
              />
              <div className="ml-2 text-left">
                <p className="text-2xl font-bold">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-sm capitalize text-gray-600">
                  {weather.weather[0].description}
                </p>
                <p className="text-xs text-gray-500">{weather.name}</p>
              </div>
            </div>
          </div>
        )}

        <h2 className="mb-6 text-center text-2xl font-bold">
          Proje Yönetim Sistemi
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...form.register("email")}
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="ornek@email.com"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <input
              {...form.register("password")}
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="********"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  )
}
