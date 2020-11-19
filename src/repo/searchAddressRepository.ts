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

      await sequelize.query(`
           INSERT INTO "address" (zip_code,street,city, neighborhood, uf)
            VALUES('${output[0].cep}', '${output[0].logradouro}', '${output[0].localidade}', '${output[0].bairro}', '${output[0].uf}')          
          `, {
        type: QueryTypes.INSERT
      });

      return Promise.resolve(output)
    } catch (e) {
      if (!output || !output.length) {
        return Promise.reject({ message: "Endereço inválido ou indisponível. Confira o endereço, e tente novamente sem acentos e Ç", status: 400 })
      }
    }
  }

  async searchAddressByCep(input: ISearchAddress): Promise<any> {
    try {
      var getByCep = await cep

      var address: any = await getByCep(input.zipAddress)

      await sequelize.query(`
           INSERT INTO "address" (zip_code,state,city, neighborhood, street)
           VALUES('${address.cep}', '${address.state}', '${address.city}', '${address.neighborhood}', '${address.street}')          
           `, {
        type: QueryTypes.INSERT
      });
      return Promise.resolve(address)
    } catch (e) {
      if (!address) {
        return Promise.reject({ message: "Cep indisponível ou formato errado. Utilize apenas 8 dígitos com ou sem traços entre o cep", status: 400 })
      }
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
        const zip_code_var = input.zipAddress ? `zip_code = :zipAddress,` : ``;
        const state_var = input.state ? `state = :state,` : ``;
        const city_var = input.city ? `city = :city,` : ``;
        const neighborhood_var = input.neighborhood ? `neighborhood = :neighborhood,` : ``;
        const street_var = input.street ? `street = :street,` : ``;
        const uf_var = input.uf ? `uf = :uf` : ``;

        await sequelize.query(`
          UPDATE 
            "address"
          SET                     
            ${zip_code_var}
            ${state_var}
            ${city_var}
            ${neighborhood_var}
            ${street_var}
            ${uf_var}
          WHERE id = :id
          `, {
          replacements: {
            id: input.id,
            zipAddress: input.zipAddress,
            state: input.state,
            city: input.city,
            neighborhood: input.neighborhood,
            street: input.street,
            uf: input.uf
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



