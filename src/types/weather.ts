
export interface DailyTemp {
    date: string,
    avgTemp: number
    maxTemp?: number
    minTemp?: number
}

export type YtdWeather = DailyTemp[]