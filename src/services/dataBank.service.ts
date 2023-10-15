import { instance } from "@/api/axios.api"
import { IDataBank } from "@/types/dataBank"

export const DatabBankService = {
    async getAllDataBanks(): Promise<IDataBank[] | undefined> {
        const { data } = await instance.get<IDataBank[]>('/viewDataBank')
        return data
    },
}