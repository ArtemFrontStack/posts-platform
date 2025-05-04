import { signIn } from "@/auth";
import styles from "./SigInYandex.module.css";
import { FaYandex } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export function SignInWithYandex() {
    return (
        <form
            action={async () => {
                'use server'
                await signIn('yandex', { redirectTo: "/" })
            }}
            className={styles.formContainer}
        >
            <button className={styles.yandexButton} type="submit">
        <span className={styles.buttonContent}>
          <FaYandex className={styles.yandexIcon} />
          <span className={styles.buttonText}>Войти с Яндекс ID</span>
          <FiArrowRight className={styles.arrowIcon} />
        </span>
                <span className={styles.buttonHoverEffect}></span>
            </button>
        </form>
    );
}