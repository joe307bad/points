import { Post, Controller, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';

import { SeedService } from "./seed.service";

export interface SeedResults {
    categories: number;
    achievements: number;
    users: number;
}

@Controller('seed')
export class SeedController {
    constructor(private readonly seed: SeedService) { }

    @Post()
    @UseInterceptors(FileInterceptor('data'))
    async seedData(@UploadedFile() data): Promise<SeedResults> {
        const json = JSON.parse(data.buffer.toString());
        return this.seed.seed(json).catch(e => e);
    }
}
