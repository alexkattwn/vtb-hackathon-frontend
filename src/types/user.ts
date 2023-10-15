export interface IUserData {
    email: string
    login: string
    password: string
    name_role: string
}

export interface IResponseUserData {
    id_user: number
    email: string
    login: string
    password: string
    id_role: number
    first_name: string | undefined
    last_name: string | undefined
    patronymic: string | undefined
    phone: string | undefined
    description: string | undefined
    image: string | undefined
}

export interface IUserLogin {
    login: string
    password: string
}

export interface IUserResponseLogin {
    token: string
    user: {
        email: string
        id_user: number
        role: {
            id_role: number
            name_role: string
        }
    }
}

export interface IUser {
    email: string
    id_user: number
    role: {
        id_role: number
        name_role: string
    },
    iat: number
    exp: number
}