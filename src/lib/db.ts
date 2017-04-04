// typescript mysql library for internal use.

import { Server } from "./server";
import { IConnection, createConnection } from 'mysql';

export class db {
    private static instance : db;
    private static conn: IConnection;

    lastError: string;

    private constructor() {}

    public static get() : db {
        if (typeof db.instance === "undefined") {
            db.instance = new db();
        }
        return db.instance;
    }

    public query(queryString: string) : void {
        console.log(queryString);
    }

    public async connect() : Promise<boolean> {
        return new Promise<boolean>((resolve,reject)=>{
            let conn = createConnection(Server.GetConfig("db"));
            conn.connect(err=>{
                if (err) {
                    this.lastError = err.message;
                    reject(false);
                    return;
                }
                resolve(true);
            });
        });
    }
}
