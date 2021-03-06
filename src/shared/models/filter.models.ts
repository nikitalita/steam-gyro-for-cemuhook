/**
 * Array of available filters.
 */
export const availableFilters: ["disabled", "kalman-1d", "low-high-pass"]
    = ["disabled", "kalman-1d", "low-high-pass"];

/**
 * Available filters.
 */
export type AvailableFilters = (typeof availableFilters)[number];

/**
 * Object implementing available filters.
 */
export type AvailableFiltersObject = {
    [T in AvailableFilters]: number[]
};

/**
 * Filter data object.
 */
export interface FilterData extends AvailableFiltersObject {
    "disabled": [];
    "kalman-1d": [number, number, number, number, number, number, number, number];
    "low-high-pass": [number, number];
}

/**
 * Separated filter data object.
 */
export type TypedFilterData<V = {
    [T in keyof FilterData]: {
        type: T,
        value: FilterData[T],
    }
}> = V[keyof V];
