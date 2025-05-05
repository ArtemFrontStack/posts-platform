// src/app/api/posts/route.ts
import { NextResponse } from "next/server";

interface Comment {
    id: number;
    text: string;
    author: string;
    createdAt: string;
    avatar?: string;
    postId: number; // Связь комментария с постом
}

// Хранение комментариев в памяти (замените на базу данных в продакшене)
const comments: Comment[] = [];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return NextResponse.json({ error: "postId обязателен" }, { status: 400 });
    }

    // Фильтрация комментариев по postId
    const postComments = comments.filter(
        (comment) => comment.postId === Number(postId)
    );
    return NextResponse.json(postComments);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text, author, avatar, postId } = body;

        if (!text || !author || !postId) {
            return NextResponse.json(
                { error: "text, author и postId обязательны" },
                { status: 400 }
            );
        }

        const newComment: Comment = {
            id: Date.now(),
            text,
            author,
            createdAt: new Date().toISOString(),
            avatar: avatar || "/default-avatar.png",
            postId: Number(postId),
        };

        comments.push(newComment);
        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Не удалось добавить комментарий" },
            { status: 500 }
        );
    }
}