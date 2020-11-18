begin;

--- Suas alteracoes aqui!

CREATE TABLE address (
    id SERIAL PRIMARY KEY,    
    zip_code TEXT NOT NULL,
    state TEXT,
    city TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    street TEXT NOT NULL,
    uf TEXT
);
commit;
