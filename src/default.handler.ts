// a default handler for demonstration purposes.

import { handler } from './lib/handler';
import { Request } from 'express';

export class defaultHandler extends handler {

    public async response(req:Request) : Promise<string> {
        let result = await this.prepare();
        return result+req.path;
    }

    async prepare(): Promise<any> {
        return new Promise<any>((resolve)=> {
            //introduce a timeout for demo
            setTimeout(() => {
                resolve("Requested Path : ");
            }, 1000);
        });
    }
}
