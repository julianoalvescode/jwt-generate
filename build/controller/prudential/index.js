"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrudentialController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var node_rsa_1 = __importDefault(require("node-rsa"));
/**
 * Class PrudentialService
 * @module
 */
var PrudentialService = /** @class */ (function () {
    function PrudentialService() {
        this.key = new node_rsa_1.default();
    }
    PrudentialService.prototype.generateJWT = function (params) {
        var dateFormatted = String(new Date().getMilliseconds());
        var token = jsonwebtoken_1.default.sign({
            sub: params === null || params === void 0 ? void 0 : params.consumerKey,
            iss: "https://api-dev.prudential.com",
            client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            user_id: params === null || params === void 0 ? void 0 : params.userId,
            aud: [params === null || params === void 0 ? void 0 : params.audienceExt, params === null || params === void 0 ? void 0 : params.audienceInt, params === null || params === void 0 ? void 0 : params.consumerKey],
            scopes: "client",
        }, this.generatePrivateKey(params === null || params === void 0 ? void 0 : params.privateKey), {
            jwtid: dateFormatted,
            expiresIn: "1h",
            algorithm: "RS256",
        });
        console.log("<---- JWT ---> \n\n  ".concat(token, "   "));
        return token;
    };
    PrudentialService.prototype.JWT = function (req, res) {
        var _a;
        var userId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userId;
        var token = this.generateJWT({
            audienceExt: process.env.AUDIENCEEXT || "",
            audienceInt: process.env.AUDIENCEINT || "",
            consumerKey: process.env.API_KEY_AS || "",
            privateKey: process.env.API_PRIVATE_KEY || "",
            userId: userId || process.env.DEFAULT_USER_AS,
        });
        res.status(200).json({ token: token });
    };
    PrudentialService.prototype.decodeBase64 = function (str) {
        try {
            var plain = Buffer.from(str, "base64").toString("utf8");
            return plain;
        }
        catch (e) {
            console.log("Error decode64: ".concat(e === null || e === void 0 ? void 0 : e.message));
            return str;
        }
    };
    PrudentialService.prototype.generatePrivateKey = function (str) {
        try {
            var pec = new node_rsa_1.default("".concat(str, "\n") + "pkcs8");
            return pec.exportKey("pkcs1-der").toString();
        }
        catch (e) {
            console.log("Error: ".concat(e.message));
            return str;
        }
    };
    return PrudentialService;
}());
exports.PrudentialController = new PrudentialService();
