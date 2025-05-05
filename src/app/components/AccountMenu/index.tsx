import { auth } from "@/auth";
import SignOutButton from "@/app/components/SignOutButton";
import Link from "next/link";
import styles from "./AccountMenu.module.css";
import Image from "next/image";
import { FiUser, FiLogIn } from "react-icons/fi";

export default async function AccountMenu() {
    const session = await auth();

    return (
        <div className={styles.container}>
            <div className={styles.userContainer}>
                <div className={styles.avatarSection}>
                    <Link href={'/account'} tabIndex={0} aria-label="Перейти в профиль">
                        {session?.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt={session.user.name ? `${session.user.name} profile` : "User profile"}
                                width={80}
                                height={80}
                                className={styles.avatar}
                                quality={100}
                                priority
                            />
                        ) : (
                            <div className={styles.placeholderAvatar}>
                                <FiUser size={32} />
                            </div>
                        )}
                    </Link>
                </div>

                <div className={styles.nameSection}>
                    <h1 className={styles.userName}>
                        {session?.user?.name || "Гость"}
                    </h1>
                    <p className={styles.userEmail}>
                        {session?.user?.email || "Войдите в систему"}
                    </p>
                </div>
            </div>

            <div className={styles.menuItems}>
                {!session?.user ? (
                    <Link href="/login" className={styles.menuButton}>
                        <FiLogIn className={styles.buttonIcon} />
                        <span>Войти в систему</span>
                    </Link>
                ) : (
                    <div className={styles.signOutButton}>
                        <SignOutButton />
                    </div>
                )}
            </div>

            {/* Mobile-only login button */}
            {!session?.user && (
                <Link href="/login" className={`${styles.menuButtonMobile} md:hidden`} aria-label="Войти">
                    <span className={styles.menuButton}>войти <FiLogIn /></span>

                </Link>
            )}
        </div>
    );
}
