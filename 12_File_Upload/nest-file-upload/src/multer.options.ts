import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname, join } from "path";

export const multerOption = {
    storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),  // 현재 디렉토리/../uploads
        filename: (req, file, cb) => {
            cb(null, randomUUID() + extname(file.originalname)) // 랜덤한 문자열과 file의 원래 이름에서 확장자를 추출하여 붙여서 저장
        }
    })
}