import morgan, { StreamOptions } from "morgan";
import { NODE_ENV } from "../config";
import { logger } from "../utils/logger";
import { NextFunction, Request, Response } from "express";

export default class MorganMiddleware {

    constructor () {}

    static async createInstance (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const morganMiddleware = new MorganMiddleware()
        const skip = morganMiddleware.skip
        const stream: StreamOptions = await morganMiddleware.getOptions()

        const morganInstance = morgan(
            ":method :url :status :res[content-length] - :response-time ms",
            { stream, skip }
        )

        morganInstance(req, res, (err: any) => {
            if (err) {
                return next(err);
            }
            next();
        })
    }

    skip(): boolean {
        const env = NODE_ENV || "development";
        return env !== "development";
    }

    async getOptions (): Promise<StreamOptions> {
        return {
            write: (message: string) =>
                logger.http(message.substring(0, message.lastIndexOf("\n")))
        }
    }

}