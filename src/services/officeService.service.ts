import { instance } from "@/api/axios.api"
import { IDataService } from "@/types/officeService"

export const OfficeService = {
    async getAllDataBanks(): Promise<IDataService[] | undefined> {
        const { data } = await instance.get<IDataService[]>('/officeService')
        return data
    },
}