/// <reference path="../typings/globals/mocha/index.d.ts" />

import { defaultHandler } from '../src/default.handler';
import { testHelper, structRequest } from '../helper/test.helper';

var assert = require('assert');

describe("default handler test", ()=>{
    before(()=>{
        testHelper.init(new defaultHandler());
    });
    it(("should respond with the path given"), () =>{
        return testHelper.requset("/").then((res:structRequest)=>{
            assert.equal(res.body, "Requested Path : /");
        });
    });
});
