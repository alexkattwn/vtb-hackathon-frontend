import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import { IUser } from '@/types/user'

interface UserState {
    user: IUser | null,
    isAuth: boolean
}

const initialState: UserState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginFunc: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logoutFunc: (state) => {
            state.user = null
            state.isAuth = false
        }
    }
})

export const { loginFunc, logoutFunc } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer