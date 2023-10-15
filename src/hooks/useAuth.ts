import { useAppSelector } from "@/store/hooks"
import { IUser } from "@/types/user"

export const useAuth = (): boolean => {
    const isAuth = useAppSelector((state) => state.user.isAuth)
    return isAuth
}

export const useUser = (): IUser | null => {
    const user = useAppSelector((state) => state.user.user)
    return user
}