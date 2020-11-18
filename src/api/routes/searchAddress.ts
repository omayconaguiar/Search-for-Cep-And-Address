import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { ISearchAddress } from '../../interfaces/IsearchAddress';
import searchAddress from '../../services/searchAddress';
import middlewares from '../middlewares';
import config from '../../config';

const route = Router();

export default (app: Router) => {
    app.use(config.api.searchAddress.root, route);
    route.post('/',
        //middlewares.validateInput('searchAddressSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling POST /searchAddress: with: %o', {
                "params": req.params,
                "headers": req.headers,
                "query": req.query,
                "body": req.body
            });
            try {
                const communicationServiceInstance = Container.get(searchAddress);
                const communicationRequest: ISearchAddress = {
                    ...req.query,
                    ...req.body
                }
                const response = await communicationServiceInstance.searchAddress(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling POST /searchAddress: %o', e);
                return next(e);
            }

        });

    route.post('/byCep',
        middlewares.validateInput('searchAddressByCepSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling POST /searchAddress/byCep: with: %o', {
                "params": req.params,
                "headers": req.headers,
                "query": req.query,
                "body": req.body
            });
            try {
                const communicationServiceInstance = Container.get(searchAddress);
                const communicationRequest: ISearchAddress = {
                    ...req.query,
                    ...req.body
                }
                const response = await communicationServiceInstance.searchAddressByCep(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling POST /searchAddress: %o', e);
                return next(e);
            }
        });

    route.get('/',
        middlewares.validateInput('getAllSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling GET /searchAddress/ with: %o', {
                "params": req.params,
                "headers": req.headers,
                "query": req.query,
                "body": req.body
            });
            try {
                const communicationServiceInstance = Container.get(searchAddress);
                const communicationRequest: ISearchAddress = {
                    ...req.query,
                    ...req.body,
                    ...req.params
                }
                const response = await communicationServiceInstance.getAll(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling GET /searchAddress/ %o', e);
                return next(e);
            }

        });

    route.patch('/:id',
        middlewares.validateInput('updateByIdSchema'),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            // @ts-ignore
            logger.debug('Calling PATCH /searchAddress/:id: with: %o', {
                "params": req.params,
                "headers": req.headers,
                "query": req.query,
                "body": req.body
            });
            try {
                const communicationServiceInstance = Container.get(searchAddress);
                const communicationRequest: ISearchAddress = {
                    ...req.query,
                    ...req.body,
                    ...req.params
                }
                const response = await communicationServiceInstance.updateById(communicationRequest);
                res.status(200).json(response);
            } catch (e) {
                // @ts-ignore
                logger.error('🔥 Error calling PATCH /searchAddress/:id: %o', e);
                return next(e);
            }

        });

}