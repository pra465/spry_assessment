import { createContext, useContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { SortOrder } from '../types';

export type FiltersState = {
    categories: string[];
    minRating: number;
    sortOrder: SortOrder;
};

type FiltersAction =
    | { type: 'TOGGLE_CATEGORY'; category: string }
    | { type: 'SET_MIN_RATING'; minRating: number }
    | { type: 'SET_SORT_ORDER'; sortOrder: SortOrder }
    | { type: 'CLEAR_ALL' };

const initialState: FiltersState = {
    categories: [],
    minRating: 0,
    sortOrder: 'asc',
};

function filtersReducer(state: FiltersState, action: FiltersAction): FiltersState {
    switch (action.type) {
        case 'TOGGLE_CATEGORY': {
            const isSelected = state.categories.includes(action.category);
            return {
                ...state,
                categories: isSelected
                    ? state.categories.filter((c) => c !== action.category)
                    : [...state.categories, action.category],
            };
        }
        case 'SET_MIN_RATING':
            return { ...state, minRating: action.minRating };
        case 'SET_SORT_ORDER':
            return { ...state, sortOrder: action.sortOrder };
        case 'CLEAR_ALL':
            return { ...state, categories: [], minRating: 0 };
        default:
            return state;
    }
}

type FiltersContextValue = FiltersState & {
    toggleCategory: (category: string) => void;
    setMinRating: (minRating: number) => void;
    setSortOrder: (sortOrder: SortOrder) => void;
    clearAll: () => void;
    hasActiveFilters: boolean;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filtersReducer, initialState);

    const value = useMemo<FiltersContextValue>(
        () => ({
            ...state,
            toggleCategory: (category) => dispatch({ type: 'TOGGLE_CATEGORY', category }),
            setMinRating: (minRating) => dispatch({ type: 'SET_MIN_RATING', minRating }),
            setSortOrder: (sortOrder) => dispatch({ type: 'SET_SORT_ORDER', sortOrder }),
            clearAll: () => dispatch({ type: 'CLEAR_ALL' }),
            hasActiveFilters: state.categories.length > 0 || state.minRating > 0,
        }),
        [state],
    );

    return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters(): FiltersContextValue {
    const ctx = useContext(FiltersContext);
    if (!ctx) throw new Error('useFilters must be used within a FiltersProvider');
    return ctx;
}
