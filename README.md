# BUSCA POR ENDEREÇOS ATRAVÉS DO CEP OU NOME DA RUA

## Getting Started

### Installing

    * yarn install

### Executing program

    * yarn dev

### Description

    * Api que busca endereços através do cep e atráves de informações como: rua, cidade e UF.


## Buildando tabelas

Criar banco de dados no postgres com nomes iguais do arquivo .env.

rodar: yarn migrations:run v1605730616 OU

copiar e colar código da pasta migrations/v1605730616-address.sql para criar tabela.

## Author

    Maycon Aguiar 

## Endpoints

    * POST - busca endereço com nome da rua, cidade e UF:
       
        http://localhost:3000/searchAddress

    * POST - busca endereço atráves do cep:

        http://localhost:3000/searchAddress/byCep
     
     * GET - pega todos endereços que foram cadastrados no banco de dados:

        http://localhost:3000/searchAddress

    * PATCH - atualiza endereços pelo id:

        http://localhost:3000/searchAddress/{id}


    
