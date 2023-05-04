import express, { Application } from "express";
import { PORT } from "./config";
import { logger } from "./utils/logger";
import ErrorMiddleWare from "./middlewares/error.middleware";
import MorganMiddleware from "./middlewares/morgan.middleware";

export default class App {

    private app: Application
    private port: string | number

    constructor () {
        this.app = express();
        this.port = PORT || 8080;
        this.initializeMiddlewares();
        this.initializeErrorHandling();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            logger.info(`[server] server running @ http://localhost:${this.port}`)
        })
    }

    private initializeMiddlewares() {
        this.app.use(MorganMiddleware.createInstance)
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleWare.handleErrors);
    }

}