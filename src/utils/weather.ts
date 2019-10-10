export const fToC = (f: number) => (f - 32) / 1.8

export const calculateGdd = (baseTemp: number = 40) => (d: any) => {
    const value = d.avgTemp
    const convertedTemp = fToC(baseTemp)
    const decimalValue = value / 10
    return decimalValue > convertedTemp ? decimalValue - convertedTemp : 0
}

// const calcYtdGdd = (val: any, name: string, props: any) => {
//     const {
//         payload: {
//             avgTemp: { date },
//         },
//     } = props
//     const index = ytdWeather.findIndex(
//         (data: any) => data.avgTemp.date === date,
//     )
//     const sliced = ytdWeather.slice(0, index).map(calculateGdd(base))
//     const reducer = (acc: number, curr: number) => acc + curr
//     const reduced = sliced.reduce(reducer, 0)
//     return Math.round(reduced)
// }
