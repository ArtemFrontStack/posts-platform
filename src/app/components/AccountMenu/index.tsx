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
                    {session?.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt="User profile"
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
                    <>
                        <Link href="/login" className={styles.menuButton}>
                            <FiLogIn className={styles.buttonIcon} />
                            <span>Войти в систему</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <div className={styles.signOutButton}>
                            <SignOutButton />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}