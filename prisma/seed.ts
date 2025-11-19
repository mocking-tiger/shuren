import { Level, PrismaClient } from "@prisma/client";
import * as fs from 'fs'; // node.js의 내장 모듈, 파일 입출력을 담당하는 유틸리티
import * as path from "path"; // node.js의 내장 모듈, 파일 경로를 다루는 유틸리티
import { fileURLToPath } from 'url'; // Node.js 내장 모듈, URL 관련 유틸리티 제공

const prisma = new PrismaClient();

async function main(){
    // ES Module 환경에서는 __dirname이 없으므로 직접 생성
    const __filename = fileURLToPath(import.meta.url); // url스킴을 os에 맞는 파일 경로로 변환
    const __dirname = path.dirname(__filename); // 파일명 제외한 디렉토리 경로 추출

    // CSV파일 읽기
    const csvPath = path.join(__dirname, 'seed', 'words.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8'); // readFileSync(경로, 인코딩): 동기적으로 파일을 읽어옴

    // CSV 파싱
    const lines = csvData.split('\n').slice(1); // 첫 번째 줄은 헤더이므로 제외

    const words = lines.filter(line=>line.trim()).map(line=>{
        const [word, wordKana, wordMeaning, example, exampleKana, exampleMeaning, level] = line.split(',');
        return {
            word,
            wordKana,
            wordMeaning,
            example,
            exampleKana,
            exampleMeaning,
            level: level as Level,
        }
    })

    await prisma.word.createMany({
        data: words,
        skipDuplicates: true, // 중복 데이터 건너뛰기
    })

    console.log(`${words.length}개의 데이터 삽입 완료`);
}

main().catch((e)=>{ // Promise 체이닝 방식(함수 안에서는 로직만, 에러 처리는 밖에서)
    console.error(e)
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});
