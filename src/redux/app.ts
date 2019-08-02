import { AppState } from ".";

/* Selectors */
export const selectIsAppLoading = (state: AppState) => {
    const isClimateLoading = state.climate.loading
    const isWeatherLoading = state.weather.loading
    const isCountyLoading = state.county.loading
    const isStationLoading = state.station.loading

    return isClimateLoading || isWeatherLoading || isCountyLoading || isStationLoading
}