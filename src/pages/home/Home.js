//css
import styles from './Home.module.css'

//hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts")

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return navigate(`/search?q=${query}`);
    }

  }


  return (
    <div className={styles.home}>
        <h2>Veja os nossos posts mais recentes</h2>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input 
          type="text" 
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button className="btn btn-outline">Pesquisar</button>
        </form>
        <div>
          {loading && <p>Carregando...</p>}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
            <p>Nao foram encontrados posts ainda... :(</p>
            <Link to="/posts/create" className="btn"> Seja o primeiro a criar um post!</Link>
            </div> 
          )}
          {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        </div>
    </div>
  )
}

export default Home;