import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ThemeState {
    mode: string
}

const initialState: ThemeState = {
    mode: JSON.parse(localStorage.getItem('mode') as string) || 'light'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<{ mode: string }>) => {
            state.mode = action.payload.mode
        }
    }
})

export const { setMode } = themeSlice.actions

export const selectMode = (state: RootState) => state.theme

export default themeSlice.reducer