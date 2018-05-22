import * as mongoose from 'mongoose';

export const BaseSchema = (definition: mongoose.SchemaDefinition): mongoose.Schema => {
    return new mongoose.Schema(definition, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
    });
};
