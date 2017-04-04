// abstraction for handlers for future use.

import { Request } from 'express';

export abstract class handler {
    abstract async response(req:Request):Promise<any>;
}
