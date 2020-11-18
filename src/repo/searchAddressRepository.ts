import { ISearchAddress } from '../interfaces/ISearchAddress';
import sequelize from '../loaders/sequelize';
import { QueryTypes } from 'sequelize';
import config from "../config";
import cep from 'cep-promise'
import axios from "axios";

export class searchAddressRepository {
  async searchAddress(input: ISearchAddress): Promise<any> {
    try {
      var output: any = (
        await axios.get(
          config.Address.hostClient +
          config.Address.parameters.uf.replace(
            "{uf}",
            input.uf
          ) +
          config.Address.parameters.city.replace(
            "{city}",
            input.city
          ) +
          config.Address.parameters.address.replace(
            "{address}",
            input.address
          ),
        )
      ).data;

      const searchAddress: any = await sequelize.query(`
           INSERT INTO "address" (zip_code,street,city, neighborhood, uf)
            VALUES('${output[0].cep}', '${output[0].logradouro}', '${output[0].localidade}', '${output[0].bairro}', '${output[0].uf}')          
          `, {
        type: QueryTypes.INSERT
      });

      return Promise.resolve(output)
    } catch (e) {
      return Promise.reject({ message: "Teste novamente sem acentos e ç" } + e);
    }
  }

  async searchAddressByCep(input: ISearchAddress): Promise<any> {
    try {
      return await sequelize.transaction(async function (t) {
        const getByCep = await cep

        var address: any = await getByCep(input.zipAddress)

        await sequelize.query(`
           INSERT INTO "address" (zip_code,state,city, neighborhood, street)
           VALUES('${address.cep}', '${address.state}', '${address.city}', '${address.neighborhood}', '${address.street}')          
           `, {
          type: QueryTypes.INSERT
        });
        return Promise.resolve(address)
      })
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getAll(input: ISearchAddress): Promise<any> {
    try {
      return await sequelize.transaction(async function (t) {
        var output: any = await sequelize.query(`
          SELECT 
            *
          FROM 
            "address"          
          `, {
          type: QueryTypes.SELECT
        });
        return Promise.resolve(output)
      })
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateById(input: ISearchAddress): Promise<any> {
    try {
      return await sequelize.transaction(async function (t) {
        await sequelize.query(`
          UPDATE 
            address
          SET         
            text = :text,
            zip_code = :zipAddress,
            state = :state,
            city = :city,
            neighborhood = :neighborhood,
            street = :street,
            uf = :uf
          WHERE id = :id
          `, {
          replacements: {
            id: input.id
          },
          type: QueryTypes.UPDATE
        });
        return Promise.resolve()
      })
    } catch (e) {
      return Promise.reject(e);
    }
  }

}



