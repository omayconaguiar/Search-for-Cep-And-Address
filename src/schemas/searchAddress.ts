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
        "text": {
            "type": "string"
        }
    },
    "required": ["text"]
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