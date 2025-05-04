import Link from "next/link";
import styles from "./PostCard.module.css";
import { FiArrowRight, FiCalendar, FiClock, FiEye } from "react-icons/fi";

interface Post {
    id: number;
    title: string;
    body: string;
    date?: string;
    readTime?: string;
    views?: number;
}
export default function PostCard({ id, title, body, date = `год ${new Date().getFullYear()}`, readTime = "5 мин", views = Math.floor(Math.random() * (100 -50  + 1))} : Post) {
    const excerpt = body.length > 150 ? `${body.substring(0, 150)}...` : body;

    return (
        <Link href={`/${Number(id)}`} className={styles.container}>
            <div className={styles.content}>
                <div className={styles.meta}>
          <span className={styles.metaItem}>
            <FiCalendar className={styles.metaIcon} />
              {date}
          </span>
                    <span className={styles.metaItem}>
            <FiClock className={styles.metaIcon} />
                        {readTime} чтения
          </span>
                    <span className={styles.metaItem}>
            <FiEye className={styles.metaIcon} />
                        {views} просмотров
          </span>
                </div>

                <h2 className={styles.title}>{title}</h2>
                <p className={styles.excerpt}>{excerpt}</p>
            </div>

            <div className={styles.footer}>
        <span className={styles.readMore}>
          Читать полностью <FiArrowRight className={styles.arrowIcon} />
        </span>
            </div>
        </Link>
    );
}