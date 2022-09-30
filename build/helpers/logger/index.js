"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.getDate = function () {
        console.log("Server started: ".concat((0, date_fns_1.format)(new Date(), "PPp")));
    };
    return Logger;
}());
exports.default = new Logger();
