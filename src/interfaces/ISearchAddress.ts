export abstract class searchAddressInteface {
    abstract getAll: (input: ISearchAddress) => Promise<{ message: string, erros: any[] }>;
}

export interface ISearchAddress {
    id: string
    zipAddress: string
    city: string
    state: string
    uf: string
    address: string
}

