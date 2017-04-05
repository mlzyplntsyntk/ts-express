import { Server } from "../src/lib/server";
import request = require('request');
import { handler } from "../src/lib/handler";

export class testHelper {

    static init(handler:handler):void {
        Server.registerHandler(handler);
        Server.start(1151);
    }

    static async requset(path:string): Promise<structRequest> {
        return new Promise<structRequest>((resolve, reject)=>{
            request({
                url : "http://localhost:1151"+path
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }

                resolve(new structRequest(response,body));
            });
        });
    }
}

export class structRequest {
    response:request.response;
    body:string;
    constructor(response:request.response,body:string) {
        this.response = response;
        this.body = body;
    }
}
