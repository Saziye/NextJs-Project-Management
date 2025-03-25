import axios from "axios"
import { WeatherData } from "@/types/weather"

const API_KEY =
  process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ||
  "bd5e378503939ddaee76f12ad7a97608"

export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
    )
    return response.data
  } catch (error) {
    console.error("Hava durumu bilgisi alınamadı:", error)
    throw error
  }
}
