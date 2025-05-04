import {NextResponse} from "next/server";
import {mockPosts} from "@/app/data/data";

export async function GET() {
    return NextResponse.json(mockPosts)
}