export interface WeatherData {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  name: string
} 