import { AuthGuard } from "@nestjs/passport";
import { LOCAL_STRATEGY } from "../constants";

export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY){

}