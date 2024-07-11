import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";  

export type BlogDocument = Blog & Document; // 블로그 타입이면서 몽고DB 도큐먼트로 사용할 수 있는 BlogDocument 타입 생성, C=A&B일 때, C는 A와 B의 모든 속성을 프로퍼티를 가지고 있어야 함, C=A|B라면, C는 A 또는 B의 프로퍼티를 가저야 함

@Schema()
export class Blog {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updateDt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);   // class를 이용하여 Schema 생성
