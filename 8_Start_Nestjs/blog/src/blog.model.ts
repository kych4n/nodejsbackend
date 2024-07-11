export interface PostDto {  // 구현하지 않고, 타입만 선언할 때는 class 대신 interface를 사용함
    id: string;
    title: string;
    content: string;
    name: string;
    createdDt: Date;
    updatedDt?: Date;   // ?가 붙으면 필수가 아니라는 뜻
}