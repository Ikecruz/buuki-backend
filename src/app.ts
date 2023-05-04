import express, { Application } from "express";


export default class App {

    private app: Application

    constructor () {
        this.app = express()
    }

    public listen(): void {
        this.app.listen(8000, () => {
            console.log(`[server] server running @ http:localhost:8000`)
        })
    }

}