import { createCipheriv, randomBytes, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

export const generateKey = async (): Promise<Buffer> => {
    const key = await promisify(scrypt)(process.env.ENCRYPTION_KEY, 'salt', 32);
    return key as Buffer;
}

export const encrypt = async (data: string) => {
    const key = await generateKey();
    const iv = randomBytes(16);

    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedData = Buffer.concat([
        iv,
        cipher.update(data),
        cipher.final(),
    ]);

    return encryptedData.toString('base64');
}

export const decrypt = async (data: string) => {
    const key = await generateKey();

    const encryptedBuffer = Buffer.from(data, 'base64');
    const iv = encryptedBuffer.slice(0, 16); // Extract IV from the beginning

    const decipher = createDecipheriv('aes-256-ctr', key, iv);

    const decryptedBuffer = Buffer.concat([
        decipher.update(encryptedBuffer.slice(16)), // Slice off the IV and decrypt the rest
        decipher.final(),
    ]);

    return decryptedBuffer.toString();
}