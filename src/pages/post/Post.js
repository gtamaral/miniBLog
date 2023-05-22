import { useParams } from 'react-router-dom';
import styles from './Post.module.css';
import { useFetchDocument } from "../../hooks/useFetchDocument";
//hooks

const Post = () => {
    const { id } = useParams();
    const {document: post} = useFetchDocument("post", id)

  return (
    <div>
        {post && (
         <>
            <h2>{post.title}</h2>
         </>
            )} 
    </div>
  )
}

export default Post;