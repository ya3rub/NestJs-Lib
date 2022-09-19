
import { Request } from 'express';
import {User} from '../../users/models/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}

