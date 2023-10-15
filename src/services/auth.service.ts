import { instance, instanceWithAuth } from "@/api/axios.api"
import {
    IResponseUserData,
    IUser,
    IUserData,
    IUserLogin,
    IUserResponseLogin
} from "@/types/user"

export const AuthService = {

    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        const { data } = await instance.post<IResponseUserData>('/auth/registration', userData)
        return data
    },

    async login(userData: IUserLogin): Promise<IUserResponseLogin | undefined> {
        const { data } = await instance.post<IUserResponseLogin>('/auth/login', userData)
        return data
    },

    async getProfile(): Promise<IUser | undefined> {
        const { data } = await instanceWithAuth.get<IUser>('/auth')
        if (data) return data
    }
}