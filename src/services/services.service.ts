import { instance } from "@/api/axios.api"
import { IService } from "@/types/services"

export const ServicesService = {
    async getAllServices(): Promise<IService[] | undefined> {
        const { data } = await instance.get<IService[]>('/services')
        return data
    },
}