import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const configs = {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    LOG_LEVEL: process.env.LOG_LEVEL || 'silly',
    DB_NAME: process.env.DB_NAME || 'test',
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB_HOSTNAME: process.env.DB_HOSTNAME || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
};

var not_configured = [];

Object.keys(configs).map((c) => {
    if (!configs[c]) {
        not_configured.push(c);
    }
});

if (not_configured.length) {
    throw new Error('List of required environment variables not configured: ' + not_configured.toString());
}

export default {
    port: parseInt(process.env.PORT, 10) || 3000,

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    api: {
        searchAddress: {
            root: '/searchAddress',
        },
        page: {
            root: ''
        },

    },


    ibm: {
        apikey: process.env.API_KEY,
        url: process.env.URL
    },


    database: {
        name: process.env.DB_NAME || 'test',
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        host: process.env.DB_HOSTNAME || 'localhost',
        port: process.env.DB_PORT || 5432
    },


    Address: {
        hostClient: "https://viacep.com.br/ws/",
        parameters: {
            uf: "{uf}/",
            city: "{city}/",
            address: "{address}/json/",
        },
    },
};