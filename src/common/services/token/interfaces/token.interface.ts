import { UserE } from "src/controllers/user/entities/user.entity";

export interface IJwtServicePayload {
    user: UserE;
}
  
export interface IJwtService {
    checkToken(token: string): Promise<any>;
    createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
}