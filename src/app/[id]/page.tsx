// src/app/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { mockPosts } from '@/app/data/data';
import styles from './SinglePostPage.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { FiArrowLeft, FiMessageSquare, FiSend } from 'react-icons/fi';

interface Comment {
    id: number;
    text: string;
    author: string;
    createdAt: string;
    avatar?: string;
    postId: number;
}

export default function SinglePostPage() {
    const { data: session } = useSession();
    const params = useParams();
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [isCommenting, setIsCommenting] = useState(false);

    const id = params?.id;
    const post = mockPosts.find((p) => p.id === Number(id));

    useEffect(() => {
        if (id) {
            const fetchComments = async () => {
                try {
                    const response = await fetch(`/api/posts?postId=${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setComments(data);
                    } else {
                        console.error('Не удалось загрузить комментарии');
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке комментариев:', error);
                }
            };
            fetchComments();
        }
    }, [id]);

    if (!post) {
        return <div className={styles.notFound}>Пост #{id} не найден</div>;
    }

    function handleComment(e: React.ChangeEvent<HTMLInputElement>) {
        setCommentText(e.target.value);
    }

    async function handleSubmitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            text: commentText,
            author: session?.user?.name || 'Аноним',
            avatar: session?.user?.image || '/default-avatar.png',
            postId: Number(id),
        };

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (response.ok) {
                const savedComment = await response.json();
                setComments([...comments, savedComment]);
                setCommentText('');
                setIsCommenting(false);
            } else {
                console.error('Не удалось отправить комментарий');
            }
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backButton}>
                    <FiArrowLeft size={20} /> Назад
                </Link>
                <div className={styles.postMeta}>
                    <span className={styles.postDate}>{new Date().toLocaleDateString()}</span>
                    <span className={styles.readTime}>5 мин чтения</span>
                    <span className={styles.postCategory}>Категория: {post.category}</span>
                </div>
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.content}>
                <p className={styles.body}>{post.body}</p>

                <div className={styles.tags}>
                    <span className={styles.tag}>#{post.category.toLowerCase()}</span>
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
                                        src={session.user?.image || '/default-avatar.png'}
                                        alt={session.user?.name || 'User'}
                                        className={styles.avatar}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input
                                        className={styles.commentInput}
                                        value={commentText}
                                        onChange={handleComment}
                                        placeholder='Ваш комментарий...'
                                        autoFocus
                                    />
                                    <button className={styles.submitButton} type='submit'>
                                        <FiSend />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : (
                    <div className={styles.loginPrompt}>
                        <Link href='/login' className={styles.loginButton}>
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
