import { mockPosts } from "@/app/data/data";
import PostCard from "@/app/components/PostCard";
import AccountMenu from "@/app/components/AccountMenu";
import Link from "next/link";
import styles from "./Globals.module.css";

interface Post {
    id: number;
    title: string;
    body: string;
}

// Убедитесь, что это серверный компонент (нет 'use client' сверху)
export default function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
    const currentPage = Number(searchParams?.page) || 1;
    const postsPerPage = 5;
    const totalPages = Math.ceil(mockPosts.length / postsPerPage);

    const currentPosts = mockPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    return (
        <div className="flex flex-col md:flex-row mx-3">
            <div className="w-full md:w-1/5 flex flex-col items-center gap-6 mb-6 md:mb-0">
                <AccountMenu />
                <Link className={styles.Button} href="/account">Профиль</Link>
            </div>
            <div className="w-full md:w-4/5">
                {currentPosts.map((post: Post) => (
                    <PostCard id={post.id} key={post.id} title={post.title} body={post.body} />
                ))}

                <div className="flex flex-wrap justify-center items-center gap-4 my-8 text-white">
                    {currentPage > 1 ? (
                        <Link
                            href={`?page=${currentPage - 1}`}
                            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition-colors"
                        >
                            Назад
                        </Link>
                    ) : (
                        <span className="px-4 py-2 rounded bg-gray-500 cursor-not-allowed">Назад</span>
                    )}

                    <span>
                        Страница {currentPage} из {totalPages}
                    </span>

                    {currentPage < totalPages ? (
                        <Link
                            href={`?page=${currentPage + 1}`}
                            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition-colors"
                        >
                            Вперед
                        </Link>
                    ) : (
                        <span className="px-4 py-2 rounded bg-gray-500 cursor-not-allowed">Вперед</span>
                    )}
                </div>
            </div>
        </div>
    );
}
