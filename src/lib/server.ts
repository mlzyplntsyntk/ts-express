// express app starter class with bodyParser and cookieSession middlewares
// We will also use our own session generator/checker middleware
// for internal usage.

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import cookieSession = require('cookie-session');
import * as express from "express";
import fs = require("fs");

import { handler } from "./handler";

export class Server {
    private static app : express.Application;
    private static instance : Server;
    private static handlers : Array<handler>;

    private static Config:JSON;
    public static GetConfig(key: string):JSON {
        return Server.Config[key];
    }

    private constructor() {
        //read config file to private property Config
        this.readConfig();

        Server.handlers = new Array<handler>();

        //initialize our application instance
        Server.app = express();

        //use json form parser middlware
        Server.app.use(bodyParser.json());

        //use query string parser middlware
        Server.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie session middleware
        let session = Server.GetConfig("session");
        Server.app.use(cookieSession({
            "name": session["name"],
    		"keys": session["keys"],
    		"maxAge": session["maxAge"]
        }));

        //use custom session checker middleware
        Server.app.use(this.beforeRequestHandled);

        //handle request, see lib/handler abstract class
        Server.app.use(this.handleRequest);



    }

    private readConfig():void {
        Server.Config = JSON.parse(fs.readFileSync(__dirname+"/../webconfig.json", "utf-8"));
    }

    public static get(): void {
        if (typeof this.instance === "undefined") {
            this.instance = new Server();
        }
    }

    private beforeRequestHandled(req:express.Request,
        res:express.Response,
        next:express.NextFunction) : void {
        if (typeof req.session["id"] === "undefined") {
            req.session["id"] = 0;
        }
        next();
    }

    private async handleRequest(req:express.Request,
        res:express.Response,
        next:express.NextFunction) {
            console.log(req.session);
            for(var a in Server.handlers) {
                var c = await Server.handlers[a].response(req);
                res.send(c);
            }
    }

    public static registerHandler(handler:handler) : void {
        this.get();
        this.handlers.push(handler);
    }

    public static async start(portNumber:number, callback?:Function) : Promise<string> {
        this.get();
        return new Promise<string>((resolve,reject)=>{
            this.app.listen(portNumber, (err)=>{
                if (err) {
                    reject(err);
                    return;
                }
                console.log("app listening");
                resolve("ok");
            });
        });
    }
}
