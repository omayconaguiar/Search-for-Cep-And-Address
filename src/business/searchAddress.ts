import { searchAddressRepository } from "../repo/searchAddressRepository";
import { ISearchAddress } from '../interfaces/ISearchAddress';

export default class searchAddress implements searchAddress {
    private _searchAddressRepository: searchAddressRepository

    constructor() {
        this._searchAddressRepository = new searchAddressRepository();
    }

    async searchAddress(input: ISearchAddress): Promise<any> {
        return await this._searchAddressRepository.searchAddress(input);
    }

    async searchAddressByCep(input: ISearchAddress): Promise<any> {
        return await this._searchAddressRepository.searchAddressByCep(input);
    }

    async getAll(input: ISearchAddress): Promise<any> {
        return await this._searchAddressRepository.getAll(input);
    }

    async updateById(input: ISearchAddress): Promise<any> {
        return await this._searchAddressRepository.updateById(input);
    }
}