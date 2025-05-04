import { signIn } from '@/auth';
import styles from "./SignInGoogle.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";

export function SignInWithGoogle() {
    return (
        <form
            action={async () => {
                'use server'
                await signIn('google', { redirectTo: "/" })
            }}
            className={styles.form}
        >
            <button className={styles.googleButton} type='submit'>
        <span className={styles.iconContainer}>
          <FcGoogle className={styles.googleIcon} />
        </span>
                <span>Continue with Google</span>
                <FaArrowRight className={styles.arrowIcon} />
            </button>
        </form>
    );
}