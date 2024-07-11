import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})  // 구글 OAuth 인증을 받으면, 패스워드가 직접적으로 전달되지 않는데, 그런 경우에도 저장할 수 있게 하기 위해서
    password: string;

    @Column()
    username: string;

    @Column({nullable: true})   // 구글 OAuth로 인증받지 않는 경우를 대비하여 providerId에 빈 값 허용
    providerId: string;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdDt: Date = new Date();
}