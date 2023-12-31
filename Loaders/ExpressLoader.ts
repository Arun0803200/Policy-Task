import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";
import {Application} from 'express'
const express = require('express');
import * as bodyParser from 'body-parser';
import {useExpressServer} from 'routing-controllers';
import * as controller from '../src/common/index.controller';

export const expressLoader: MicroframeworkLoader = async(settings: MicroframeworkSettings) => {    
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json({limit: '50mb'}));
    const connection = await settings.getData('connection');
    const expressApp: Application = useExpressServer(app, {
        cors: true,
        routePrefix: '/api',
        defaultErrorHandler: true,
        classTransformer: true,
        controllers: Object.values(controller),
    });
    const expressSerer = expressApp.listen(3000);
    if (settings) {
        settings.setData('express_app', expressApp);
        settings.setData('express_server', expressSerer);
    }
}
