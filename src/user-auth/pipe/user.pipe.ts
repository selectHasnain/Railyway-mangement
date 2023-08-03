import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { User } from "database/entities";
import { UserAuthService } from "../user-auth.service";

@Injectable()
export class PopulateUser implements PipeTransform<number, Promise<User>> {
    constructor(
        private readonly UserAuthService: UserAuthService
    ) { }

    async transform(id: number): Promise<User> {
        let user = await this.UserAuthService.getUser(id);

        if (!user) {
            throw new NotFoundException("user not found");
        }

        return user;
    }
}