import styles from "./PostDetail.module.css";


import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title}></img>
        <h2>{post.title}</h2>
        <h3 className={styles.createdBy}>{post.createdBy}</h3>
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <div className={styles.central_button}>
          <Link to={`/posts/${post.id}`} className="btn btn-outline">Ler mais</Link>
        </div>
    </div>
  )
}

export default PostDetail;