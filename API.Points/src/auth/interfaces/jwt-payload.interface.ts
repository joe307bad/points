import { RoleDto } from "../../shared/dtos";

export interface JwtPayload {
  username: string;
  id: string;
  roles: String[];
}
