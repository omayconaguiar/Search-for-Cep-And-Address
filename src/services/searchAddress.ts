import { Service, Inject } from 'typedi';
import { ISearchAddress, searchAddressInteface } from '../interfaces/ISearchAddress';
import searchAddressModel from '../business/searchAddress';

@Service()
export default class searchAddressService extends searchAddressInteface {
  private _controller: searchAddressModel

  constructor(
    @Inject('logger') private logger: any
  ) {
    super();
    this._controller = new searchAddressModel();
  }


  public async searchAddress(input: ISearchAddress): Promise<any> {
    try {
      this.logger.silly('Calling searchAddressSchema');
      return await this._controller.searchAddress(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  public async searchAddressByCep(input: ISearchAddress): Promise<any> {
    try {
      this.logger.silly('Calling searchAddressByCepSchema');
      return await this._controller.searchAddressByCep(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }


  public getAll = async (input: ISearchAddress): Promise<any> => {
    try {
      this.logger.silly('Calling getAllSchema');
      return await this._controller.getAll(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  public async updateById(input: ISearchAddress): Promise<any> {
    try {
      this.logger.silly('Calling updateByIdSchema');
      return await this._controller.updateById(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }
}


