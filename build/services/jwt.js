"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * The function to generate JWT Prudential (Auto Service)
 * return String
 */
function generateJWT() {
    var dateFormatted = String(new Date().getMilliseconds());
    // const date = Date.now();
    var token = jsonwebtoken_1.default.sign({
        sub: "",
        agentType: "CLI",
        roles: [""],
        iss: "https://api-dev.prudential.com",
        channelType: "CLI",
        user_id: "ola",
        aud: "",
        scopes: "client",
    }, "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDU7fJ7XkGA5smuhiI0/cjyZdF3aCjQBl18vMLVcFWWNPuG7aIqP4vv0S3+jV5PuFhemqi2j0PNfWIcsN5JOuOyUhrDZnY+WoLKuEvGnyDVj4EeyF71p62ViJ6jRcqJ/cKtypTJE1Knhmjy3VvjTnfogiP2aL1i1ghEYJ3M04YJVlb/aQG77To0PtLinwD9czOBxfVaMlXN32nAGrOYAhniR1ttKHgk1rT+966jPHCNCiLHl6U85r0zMhJcI1E/PUl8y/hhkbbipe0GHMDd998GUcKyakTfWXtAFbyDiFokmcfM/FI6o3atucOqGTgouYlsyx3cmPc7XFWsP72TiJcNAgMBAAECggEAJ3wsgBYdfYLOmY+EHmGFdvXMnyDwmIrloTD7zEq1hFI05nOAo+b+0yzuI4shlxTvRjPV32y3vQ5oODvQLLI/8RxqnBuPB8cPA/qjCqUNmKyw2/16JoG+ncEk8dAKXAZzqHitmI/9vtUc9xR3arJtZ+9iLdqEbCSWid+Ew6vh6i8CqVKebvX6xFDMHD2LqR2PLCnRoy1UQCP3naZnInzwjUj2r6xlUy9GJJb20ORpKjx1zjMwVJK9wDo8zBW/UXNK1wgLZboDbyAWEhDoyzhcy4ee+FlKU48dmbHBcNtzrjatUgTOIs9JMTZdfu+Ni6RYUs++WhbTu6J6iIo+/TugXQKBgQD/SF8pYQ+4QPMwSEWqCVk+aI3ab+jDacZuV6bYx1HMZGKgRaQqJTlGWupTfFxxRV/tlE8iGhEFGVnEh2GNOOBT39IxrPOqxHu5CxGE+f02nA9n8hS9880Ze6yj7yUOA9AR3phf4+Os+7O7Dj2jmL0J4gRlzq27ZpEU9UL12Lkh6wKBgQDVhxw3/299++YoQg2CNORXb0TVG05IBcPX7AXLwZVsWM8Dj8O7D0DjR33Ki5oVAVEEzPjKwuIj+WfL8H", {
        jwtid: dateFormatted,
    });
    console.log("<---- JWT ---> : ".concat(token, " "));
    return token;
}
exports.generateJWT = generateJWT;
