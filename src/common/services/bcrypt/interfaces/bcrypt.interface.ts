export interface IBcryptService {
    hash(hashString: string): string;
    compare(password: string, hashPassword: string): boolean;
}