import moment from 'moment'
import { YtdWeather, DailyTemp } from '../types/weather'
import { Entry } from '../types/entities'
import { AddEntryInput } from '../types/user'

export const fToC = (f: number) => (f - 32) / 1.8

export const calculateGdd = (baseTemp: number = 40) => (d: any) => {
    const value = d.avgTemp
    const convertedTemp = fToC(baseTemp)
    const decimalValue = value / 10
    const gdd = decimalValue > convertedTemp ? decimalValue - convertedTemp : 0
    return Math.round(gdd)
}

export const calcYtdGdd = (ytdWeather: YtdWeather) =>  (day: string) => {
    const index = ytdWeather.findIndex(findSameDate(day))
    const sliced = ytdWeather.slice(0, index).map(calculateGdd())
    const reducer = (acc: number, curr: number) => acc + curr
    const reduced = sliced.reduce(reducer, 0)
    return Math.round(reduced)
}

const findSameDate = (day: string) => (d: DailyTemp) => {
    const created = moment(day)
    const date = moment(d.date)
    const dayOfYear = date.get("dayOfYear")
    return dayOfYear === created.get("dayOfYear")
}

const findWeatherForEntry = (e: Entry | AddEntryInput, ytdWeather: YtdWeather) => ytdWeather.find(findSameDate(e.created))

export const getGddForEntry = (e: Entry | AddEntryInput, ytdWeather: YtdWeather) => {
    const weatherForDate = findWeatherForEntry(e, ytdWeather)
    if (weatherForDate) {
        const gdd = calculateGdd()(weatherForDate)
        const ytdGdd = calcYtdGdd(ytdWeather)(e.created)
        return { gdd, ytdGdd }
    }
    else { 
        return {gdd: undefined, ytdGdd: undefined }
    }
}