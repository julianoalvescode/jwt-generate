import {
  Request as RequestExpress,
  Response as ResponseExpress,
} from "express";
import NodeRSA from "node-rsa";

/**
 * Type for Class Prudential (Auto Service)
 * @type
 */
export interface PrudentialService {
  /**
   * Method Generate JWT
   * @method
   */
  generateJWT(params: GenerateJWT): string;

  /**
   * Method JWT
   * @method
   */
  JWT(req: Request, res: Response): void;

  /**
   * Method for Generate Private Key RSA256
   * @method
   */

  generatePrivateKey(key: string): string;

  /**
   * Instance for NodeRSA
   * @instance
   */

  key: NodeRSA;
}

/**
 * Type params for method Generate JWT
 * @type
 */
export type GenerateJWT = {
  userId: string;
  audienceExt: string;
  audienceInt: string;
  consumerKey: string;
  privateKey: string;
};

export type Request = RequestExpress;
export type Response = ResponseExpress;
