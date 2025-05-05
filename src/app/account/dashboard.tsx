// app/account/dashboard.tsx
import { auth } from "@/auth";
import AccountMenu from "@/app/components/AccountMenu";
import styles from "./Dashboard.module.css";
import { FiActivity, FiBookmark, FiUser } from "react-icons/fi";
import Link from "next/link";
import SignOutButton from "@/app/components/SignOutButton";

export default async function Dashboard() {
    const session = await auth();

    if (!session?.user) {
        return (
            <div className={styles.unauthorizedContainer}>
                <div className={styles.unauthorizedCard}>
                    <h2 className={styles.unauthorizedTitle}>Доступ запрещен</h2>
                    <p className={styles.unauthorizedText}>Пожалуйста, войдите в систему для просмотра этой страницы</p>
                    <Link href="/login" className={styles.loginButton}>
                        Войти
                    </Link>
                </div>
            </div>
        );
    }

    const stats = [
        { value: "24", label: "Новых сообщений", icon: <FiActivity />, trend: "up" },
        { value: "153", label: "Всего постов", icon: <FiBookmark /> },
        { value: "1.2k", label: "Посетителей", icon: <FiUser />, trend: "up" },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <AccountMenu />

                <nav className={styles.navigation}>
                    <Link href="/" className={styles.navItem}>
                        <FiUser className={styles.navIcon} />
                        <span>Посты</span>
                    </Link>
                    <SignOutButton />
                </nav>
            </div>

            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.greeting}>
                        Добро пожаловать, <span>{session.user.name}</span>
                    </h1>
                    <p className={styles.subtitle}>Ваша статистика за сегодня</p>
                </header>

                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                            {stat.trend && <div className={styles.statTrend}>{stat.trend === "up" ? "↑" : "↓"}</div>}
                        </div>
                    ))}
                </div>

                <div className={styles.recentActivity}>
                    <h2 className={styles.sectionTitle}>Последняя активность</h2>
                    <div className={styles.activityList}>
                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>✍️</div>
                            <div className={styles.activityText}>
                                <p>Вы опубликовали новый пост</p>
                                <span className={styles.activityTime}>2 часа назад</span>
                            </div>
                        </div>
                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>💬</div>
                            <div className={styles.activityText}>
                                <p>Новый комментарий к вашему посту</p>
                                <span className={styles.activityTime}>5 часов назад</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}