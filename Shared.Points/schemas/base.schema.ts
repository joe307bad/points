import { SchemaDefinition, Schema } from 'mongoose';

export const BaseSchema = (definition: SchemaDefinition): Schema => {
    return new Schema(definition, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
    });
};

export default BaseSchema;
