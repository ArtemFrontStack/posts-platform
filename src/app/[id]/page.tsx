'use client'

import {useParams} from 'next/navigation';
import {mockPosts} from "@/app/data/data";
import styles from './SinglePostPage.module.css';
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {FiArrowLeft, FiMessageSquare, FiSend} from "react-icons/fi";

interface Comment {
    id: number;
    text: string;
    author: string;
    createdAt: string;
    avatar?: string;
}

export default function SinglePostPage() {
    const {data: session} = useSession();
    const params = useParams();
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState<Comment[]>([]);
    const [isCommenting, setIsCommenting] = useState(false);

    const id = params?.id;

    function handleComment(e: React.ChangeEvent<HTMLInputElement>) {
        setCommentText(e.target.value);
    }

    function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            text: commentText,
            author: session?.user?.name || "Аноним",
            createdAt: new Date().toISOString(),
            avatar: session?.user?.image || "/default-avatar.png"
        }

        setComments([...comments, newComment]);
        setCommentText('');
        setIsCommenting(false);
    }

    const post = mockPosts.find((p) => p.id === Number(id));

    if (!post) {
        return <div className={styles.notFound}>Пост #{id} не найден</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href={"/"} className={styles.backButton}>
                    <FiArrowLeft size={20} /> Назад
                </Link>
                <div className={styles.postMeta}>
                    <span className={styles.postDate}>{new Date().toLocaleDateString()}</span>
                    <span className={styles.readTime}>5 мин чтения</span>
                </div>
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.content}>
                <p className={styles.body}>{post.body}</p>

                <div className={styles.tags}>
                    <span className={styles.tag}>#технологии</span>
                    <span className={styles.tag}>#2025</span>
                    <span className={styles.tag}>#тренды</span>
                </div>
            </div>

            <div className={styles.commentsSection}>
                <h2 className={styles.commentsTitle}>
                    <FiMessageSquare /> {comments.length} комментариев
                </h2>

                {session ? (
                    <div className={`${styles.commentForm} ${isCommenting ? styles.active : ''}`}>
                        {!isCommenting ? (
                            <button
                                onClick={() => setIsCommenting(true)}
                                className={styles.startCommentButton}
                            >
                                Написать комментарий...
                            </button>
                        ) : (
                            <form onSubmit={handleSubmitComment}>
                                <div className={styles.avatarContainer}>
                                    <img
                                        src={session.user?.image || "/default-avatar.png"}
                                        alt={session.user?.name || "User"}
                                        className={styles.avatar}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input
                                        className={styles.commentInput}
                                        value={commentText}
                                        onChange={handleComment}
                                        placeholder="Ваш комментарий..."
                                        autoFocus
                                    />
                                    <button className={styles.submitButton} type="submit">
                                        <FiSend />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : (
                    <div className={styles.loginPrompt}>
                        <Link href="/login" className={styles.loginButton}>
                            Войдите, чтобы комментировать
                        </Link>
                    </div>
                )}

                <div className={styles.commentsList}>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className={styles.comment}>
                                <div className={styles.commentHeader}>
                                    {comment.avatar && (
                                        <img
                                            src={comment.avatar}
                                            alt={comment.author}
                                            className={styles.commentAvatar}
                                        />
                                    )}
                                    <div>
                                        <span className={styles.commentAuthor}>{comment.author}</span>
                                        <span className={styles.commentDate}>
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <p className={styles.commentText}>{comment.text}</p>
                                <button className={styles.replyButton}>Ответить</button>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noComments}>Пока нет комментариев. Будьте первым!</p>
                    )}
                </div>
            </div>
        </div>
    );
}