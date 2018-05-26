import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Upload } from "../shared/interfaces";
import { DatabaseService } from "../core/mongo";
import { UploadDto } from "../shared/dtos";

@Injectable()
export class UploadService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Upload') private readonly uploadModel: Model<Upload>) { }

    async create(uploadDto: UploadDto): Promise<Upload>{
        const upload = new this.uploadModel(uploadDto);
        return this.db.save(upload);
    }


}
