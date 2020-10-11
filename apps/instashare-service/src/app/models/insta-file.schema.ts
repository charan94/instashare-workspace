import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MInstaFileDocument = MInstaFile & Document;

@Schema()
export class MInstaFile {

    @Prop({required: false})
    id: number;

    @Prop({ required: true })
    tempId: string;

    @Prop({required: false})
    fileName: string;

    @Prop({required: false})
    fileStatus: string;

    @Prop({required: false})
    fileSize: number;

    @Prop({required: false})
    uploadedDate: number;

    @Prop({required: false})
    file: string;

    @Prop({required: false})
    mimeType: string;

    @Prop({ required: true })
    userId: number;

}

export const MInstaFileSchema = SchemaFactory.createForClass(MInstaFile);
