import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try {
        const {values} = await req.json();

        console.log(values);
        

        return NextResponse.json(values)
    } catch (error) {
        console.log("[CHAPTER_ID_PROGRESS]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}