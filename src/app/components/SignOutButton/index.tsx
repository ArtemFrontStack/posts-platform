'use client';

import { signOut } from "next-auth/react";
import styles from "./SignOutButton.module.css";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function SignOutButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut({ callbackUrl: '/', redirect: true });
        } catch (err) {
            console.error('Sign out error:', err);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isLoading}
            aria-label="Выйти из аккаунта"
            tabIndex={0}
            role="button"
        >
            <span className={styles.buttonContent}>
                <FiLogOut
                    className={`${styles.icon} ${isHovered ? styles.iconHover : ''} ${isLoading ? styles.loading : ''}`}
                />
                <span className={styles.text}>
                    {isLoading ? 'Выход...' : 'Выйти'}
                </span>
            </span>
            <span className={styles.hoverEffect}></span>
        </button>
    );
}
