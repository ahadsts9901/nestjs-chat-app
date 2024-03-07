import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignupUserDto } from 'src/dto/auth/signup-user.dto';
import { LoginUserDto } from 'src/dto/auth/login-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Req() req: Request, @Res() res: Response, @Body() signupUserDto: SignupUserDto) {
        return this.authService.signup(req, res, signupUserDto)
    }

    @Post('login')
    loign(@Req() req: Request, @Res() res: Response, @Body() loginUserDto: LoginUserDto) {
        return this.authService.login(req, res, loginUserDto)
    }

    @Post('logout')
    logout(@Req() req: Request, @Res() res: Response) {
        return this.authService.logout(req, res)
    }

}