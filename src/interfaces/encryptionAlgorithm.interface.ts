export interface EncryptionAlgorithmInterface {
  encrypt(data: string): string;

  decrypt(data: string): string;
}
