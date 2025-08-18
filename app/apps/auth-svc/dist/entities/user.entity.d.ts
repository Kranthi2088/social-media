export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isEmailVerified: boolean;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    emailToLowerCase(): void;
    get fullName(): string;
}
