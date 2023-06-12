import styles from "./blog.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Button from "@/components/button/Button";

async function getData() {
  const res = await fetch(`https://next-porfolio-nu.vercel.app/api/posts`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

const Blog = async () => {

  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      <div className={styles.hero}>
        <div className={styles.heroImgContainer}>
          <Image src={"/websites.jpg"} alt="" fill className={styles.heroImg}/>
        </div>
        <div className={styles.heroContent}>
          <h3 className={styles.contentTitle}>Post By Users</h3>
          <p className={styles.contentDesc}>You can writte your own post in this community!</p>
          <Button text="Add new post" url={"/dashboard"}/>
        </div>
      </div>
      <h1 className={styles.postTitle}>Post List</h1>
      {data.map((item) => (
        <Link href={`/blog/${item?._id}`} className={styles.container} key={item?._id}>
          <div className={styles.imageContainer}>
            <Image
              src={item?.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item?.title}</h1>
            <p className={styles.desc}>{item?.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Blog