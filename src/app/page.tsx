// src/app/page.tsx
import { mockPosts } from "@/app/data/data";
import PostCard from "@/app/components/PostCard";
import AccountMenu from "@/app/components/AccountMenu";
import Link from "next/link";
import styles from "./Globals.module.css";

interface Post {
    id: number;
    title: string;
    body: string;
    category: string;
}

// Server component
export default async function BlogPage({
                                           searchParams,
                                       }: {
    searchParams?: Promise<{ page?: string; category?: string }> ;
}) {
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams?.page) || 1;
    const selectedCategory = resolvedSearchParams?.category || "";

    // Фильтрация постов по категории
    const filteredPosts = selectedCategory
        ? mockPosts.filter((post) => post.category === selectedCategory)
        : mockPosts;

    const postsPerPage = 5;
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const currentPosts = filteredPosts.slice(
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
                {/* Категории фильтрации */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {["все", "frontend", "бизнес", "безопасность"].map((cat) => (
                        <Link
                            key={cat}
                            href={cat === "все" ? "/" : `/?category=${cat}`}
                            className={`${styles.filterButton} ${
                                selectedCategory === cat || (cat === "все" && !selectedCategory)
                                    ? "active"
                                    : ""
                            }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {/* Текущий фильтр */}
                {selectedCategory && (
                    <p className="text-center text-gray-500 mb-4">
                        Фильтр: {selectedCategory}
                    </p>
                )}

                {/* Посты */}
                {currentPosts.map((post: Post) => (
                    <PostCard id={post.id} key={post.id} title={post.title} body={post.body} category={post.category} />
                ))}

                {/* Пагинация */}
                <div className="flex flex-wrap justify-center items-center gap-4 my-8 text-white">
                    {currentPage > 1 ? (
                        <Link
                            href={`?page=${currentPage - 1}${
                                selectedCategory ? `&category=${selectedCategory}` : ""
                            }`}
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
                            href={`?page=${currentPage + 1}${
                                selectedCategory ? `&category=${selectedCategory}` : ""
                            }`}
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
