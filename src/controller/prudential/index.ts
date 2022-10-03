import * as I from "./types";
import jwt from "jsonwebtoken";

import NodeRSA from "node-rsa";

/**
 * Class PrudentialService
 * @module
 */

class PrudentialService implements I.PrudentialService {
  key: NodeRSA;

  constructor() {
    this.key = new NodeRSA();
  }
  generateJWT(params: I.GenerateJWT): string {
    const dateFormatted = String(new Date().getMilliseconds());

    const token = jwt.sign(
      {
        sub: params?.consumerKey,
        iss: "https://api-dev.prudential.com",
        client_assertion_type:
          "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        user_id: params?.userId,
        aud: [params?.audienceExt, params?.audienceInt, params?.consumerKey],
        scopes: "client",
      },
      this.generatePrivateKey(params?.privateKey),
      {
        jwtid: dateFormatted,
        expiresIn: "1h",
        algorithm: "RS256",
      }
    );

    console.log(
      `<---- JWT ---> \n
  ${token} \
  `
    );

    return token;
  }
  JWT(req: I.Request, res: I.Response): void {
    const userId = req.body?.userId;
    const token = this.generateJWT({
      audienceExt: process.env.AUDIENCEEXT || "",
      audienceInt: process.env.AUDIENCEINT || "",
      consumerKey: process.env.API_KEY_AS || "",
      privateKey: process.env.API_PRIVATE_KEY || "",
      userId: userId || process.env.DEFAULT_USER_AS,
    });

    res.status(200).json({ token: token });
  }

  decodeBase64(str: string): string {
    try {
      const plain = Buffer.from(str, "base64").toString("utf8");

      return plain;
    } catch (e: any) {
      console.log(`Error decode64: ${e?.message}`);
      return str;
    }
  }

  generatePrivateKey(str: string): string {
    try {
      const pec = new NodeRSA(`${str}\n` + "pkcs8");

      return pec.exportKey("pkcs1-der").toString();
    } catch (e: any) {
      console.log(`Error: ${e.message}`);
      return str;
    }
  }
}

export const PrudentialController = new PrudentialService();
