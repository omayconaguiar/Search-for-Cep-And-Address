import { Router } from 'express';
import searchAddress from './routes/searchAddress';

export default () => {
    const app = Router();
    searchAddress(app);
    return app;
}