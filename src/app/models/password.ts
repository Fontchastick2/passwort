// Define Password model
export interface Password {
    id?: number;
    category: string;
    app: string;
    userName: string;
    encryptedPassword: string;
}

// Define Decrypted Password model
export interface DecryptedPassword {
    id: number;
    category: string;
    app: string;
    userName: string;
    decryptedPassword: string;
}
