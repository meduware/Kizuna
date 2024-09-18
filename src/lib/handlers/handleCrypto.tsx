import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const secretKey = process.env.ENCRYPTION_SECRET!;
const salt = process.env.ENCRYPTION_SALT!;
export function handleCryptoHashValue(value: string): { hash: string } {
  const hash = crypto.pbkdf2Sync(value, salt, 1000, 64, 'sha512').toString('hex');
  return { hash };
}

export function handleCryptoVerifyValue(storedHash: string, value: string): boolean {
  const hash = crypto.pbkdf2Sync(value, salt, 1000, 64, 'sha512').toString('hex');
  return storedHash !== hash;
}

export function handleCryptoEncodeValue(value: string): string {
  const encodedValue = jwt.sign(value, secretKey);
  return encodedValue;
}

export function handleCryptoDecodeValue(value: string): any {
  const decodedValue = jwt.verify(value, secretKey);
  return decodedValue;
}
