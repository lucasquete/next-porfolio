"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr"
import { useRouter } from "next/navigation";

const Edit = ({ params }) => {
    
    const id = params?.id;
    
    const router = useRouter();

    const [post, setPost] = useState({});

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data } = useSWR(`http://localhost:3000/api/posts/${id}`, fetcher);

    useEffect(() => {
        if (!data) return;

        setPost(data)
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const title = post.title;
        const desc = post.desc;
        const img = post.img;
        const content = post.content;
    
        try {
            await fetch("/api/posts/" + id, {
                method: "PUT",
                body: JSON.stringify({ title, desc, img, content })
            })
                .then(() => router.push("/dashboard"))
                .catch((err) => console.log(err))
    
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div className={styles.container}>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Edit post</h1>
          <input 
            type="text" 
            placeholder="Title" 
            className={styles.input} 
            required 
            value={post?.title === undefined ? "" : post?.title} 
            onChange={(e) => setPost((prev) => ({...prev, title: e.target.value}))}
        />
          <textarea 
            placeholder="Description" 
            className={styles.textarea} 
            cols="30" 
            rows="10" 
            required
            value={post?.desc === undefined ? "" : post?.desc} 
            onChange={(e) => setPost((prev) => ({...prev, desc: e.target.value}))}   
        />
          <input 
            type="text" 
            placeholder="Image" 
            className={styles.input} 
            required
            value={post?.img === undefined ? "" : post?.img}  
            onChange={(e) => setPost((prev) => ({...prev, img: e.target.value}))}
        />
          <textarea 
            placeholder="Content" 
            className={styles.textarea} 
            cols="30" 
            rows="10" 
            required
            value={post?.content === undefined ? "" : post?.content} 
            onChange={(e) => setPost((prev) => ({...prev, content: e.target.value}))}
        />
          <button className={styles.button}>Send</button>
        </form>
    </div>
  )
}

export default Edit