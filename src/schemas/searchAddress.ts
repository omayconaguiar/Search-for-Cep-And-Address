const searchAddressSchema =

{
    "title": "searchAddressSchema",
    "type": "object",
    "properties": {
        "uf": {
            "type": "string"
        },
        "city": {
            "type": "string"
        },
        "address": {
            "type": "string"
        }
    },
    "required": ["text", "city", "address"]
}

const searchAddressByCepSchema =

{
    "title": "searchAddressByCepSchema",
    "type": "object",
    "properties": {
        "zipAddress": {
            "type": "string"
        },
    },
    "required": ["zipAddress"]
}

const getAllSchema =

{
    "title": "getAllSchema",
    "type": "object",
    "properties": {
        "searchAddress": {
            "type": "string"
        },
    },
    "required": []
}

const updateByIdSchema =

{
    "title": "updateByIdSchema",
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "zipAddress": {
            "type": "string"
        },
        "state": {
            "type": "string"
        },
        "city": {
            "type": "string"
        },
        "neighborhood": {
            "type": "string"
        },
        "street": {
            "type": "string"
        },
        "uf": {
            "type": "string"
        },
    },
    "required": ["id", "uf", "zipAddress"]
}

export default [
    {
        name: "searchAddressSchema",
        schema: searchAddressSchema
    },
    {
        name: "searchAddressByCepSchema",
        schema: searchAddressByCepSchema
    },
    {
        name: "getAllSchema",
        schema: getAllSchema
    },
    {
        name: "updateByIdSchema",
        schema: updateByIdSchema
    }
]