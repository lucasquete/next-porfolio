"use client"
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr"
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {

  const session = useSession();

  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user?.name}`, fetcher);

  if (session.status === "loading") {
    return <p>Loading...</p>
  }
  
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, desc, img, content, username: session?.data?.user?.name })
      });

      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE"
      })

      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading ? "Loading" : data?.map((item) => (
            <div className={styles.post} key={item?._id}>
              <div className={styles.ImageContainer}>
                <Image src={item?.img} fill={true} alt="" className={styles.img}/>
              </div>
              <h2 className={styles.postTitle}>{item?.title}</h2>
              <span className={styles.delete} onClick={() => handleDelete(item?._id)}>X</span>
            </div>
          ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add new post</h1>
          <input type="text" placeholder="Title" className={styles.input}/>
          <textarea placeholder="Description" className={styles.textarea} cols="30" rows="10"></textarea>
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea placeholder="Content" className={styles.textarea} cols="30" rows="10"></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    )
  }

}

export default Dashboard