import { ApprovalDto } from './approval.dto';

export class UserCheckinDto {
    readonly userName: string = "";
    readonly firstName: string = "";
    readonly approvals!: ApprovalDto[];
}
