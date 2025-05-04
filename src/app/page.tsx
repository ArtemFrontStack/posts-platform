import {mockPosts} from "@/app/data/data";
import PostCard from "@/app/components/PostCard";
import AccountMenu from "@/app/components/AccountMenu";
import Link from "next/link";
import styles from "./Globals.module.css"

interface Post {
    id: number;
    title: string;
    body: string;
}

export default async function BlogPage() {
    return (
        <div className='flex mx-3 '>
            <div className='w-4/5'>
                {mockPosts.map((post: Post) => (
                    <PostCard id={post.id} key={post.id} title={post.title} body={post.body}/>
                ))}
            </div>
            <div className='w-1/5 flex flex-col items-center gap-10'>
                <AccountMenu />
                <Link className={styles.Button} href={'/account'}>Личный кабинет</Link>
            </div>
        </div>
    );
}
