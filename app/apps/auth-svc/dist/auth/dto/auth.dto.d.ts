export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        fullName: string;
    };
}
