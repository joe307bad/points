import { Model, Document, DocumentQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';

export class DatabaseService {

    static async save(model: any): Promise<any> {
        return model.save().catch(err => err);
    }

}