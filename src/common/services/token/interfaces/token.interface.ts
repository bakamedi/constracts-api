export interface IJwtServicePayload {
    id: string;
}
  
export interface IJwtService {
    checkToken(token: string): Promise<void>;
    createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
}