import { AuthGuard } from "@nestjs/passport";
import { JWT_ACCESS_TOKEN_STRATEGY } from "../constants";

export class JwtAuthGuard extends AuthGuard(JWT_ACCESS_TOKEN_STRATEGY){
    
}