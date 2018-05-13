import { UserDto } from "./user.dto";

export class RoleDto {
    readonly name: String;
    readonly users: UserDto[];
}