import * as I from "./types";
import jwt from "jsonwebtoken";

/**
 * Class PrudentialService
 * @module
 */

class PrudentialService implements I.PrudentialService {
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
      params?.privateKey,
      {
        jwtid: dateFormatted,
        expiresIn: "1h",
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
}

export const PrudentialController = new PrudentialService();
