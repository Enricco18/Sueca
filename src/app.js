import {resolve} from 'path'
import express from 'express';
import cors from 'cors'
import router from './routes'
class App{
    constructor(){
        this.server= express()

        this.middlewares();
        this.routes()
    }

    middlewares(){
        this.server.use(express.json())
        this.server.use(cors())
        this.server.use( express.static(resolve(__dirname,'public')))
    }

    routes(){
        this.server.use(router)
    }
}

export default new App().server