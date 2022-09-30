import {
  Request as RequestExpress,
  Response as ResponseExpress,
} from "express";

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
