import { UserE } from "src/controllers/user/entities/user.entity";

export interface IJwtServicePayload {
    user: UserE;
}
  
export interface IJwtService {
    checkToken(token: string): Promise<void>;
    createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
}