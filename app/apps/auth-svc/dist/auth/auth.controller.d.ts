import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, AuthResponseDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto, req: any): Promise<AuthResponseDto>;
    getProfile(req: any): any;
    refreshToken(req: any): Promise<{
        accessToken: string;
    }>;
}
