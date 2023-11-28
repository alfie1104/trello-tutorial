import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

//next.js는 development에서 hot-reload를 사용하는데 hot reload를 할때 PrismaClient가 여러번 initialize되는걸 방지하기 위해서
//최초호출 시 초기화된 db 내용을 globalThis.prisma 변수에 기록해놓고 재활용함
//production에서는 어차피 globalThis 부분이 undefined이고, hot reload와 관계없으므로 아래 코드가 한번만 실행되기때문에 문제없음
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
