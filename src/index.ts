// initial script to start our server.

import { Server } from "./lib/server";
import { defaultHandler } from "./default.handler";

Server.registerHandler(new defaultHandler());
Server.start(1151); 
