import { NextResponse } from "next/server";

//api router handler 예제
export function GET() {
  return NextResponse.json({
    hello: "trello",
  });
}

export function POST() {
  return NextResponse.json({
    hello: "trello",
  });
}

export function PATCH() {
  return NextResponse.json({
    hello: "trello",
  });
}
