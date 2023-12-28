import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from './interfaces/bcrypt.interface';

@Injectable()
export class BcryptService implements IBcryptService {
  rounds: number = 10;

  hash(hashString: string): string {
    return bcrypt.hashSync(hashString, this.rounds);
  }

  compare(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}