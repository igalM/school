import { Service } from "typedi";
import { User, Users, UserDocument } from "../models/user.model";
import * as bcrypt from 'bcryptjs';

@Service()
export class UserRepository {

    async save(user: User): Promise<UserDocument> {
        user.password = await bcrypt.hash(user.password, 12);
        return Promise.resolve(Users.create(user));
    }

    findOne(email: string): Promise<User> {
        return Promise.resolve(Users.findOne({ email: email }));
    }
}