import styles from "./blog.module.css"
import Link from 'next/link'
import Image from 'next/image'

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