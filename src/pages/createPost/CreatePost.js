import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';


const CreatePost = () => {

    const[title, setTitle] = useState("");
    const[image, setImage] = useState("");
    const[body, setBody] = useState("");
    const[tags, setTags] = useState([]);
    const[formError, setFormError] = useState("");

    const { insertDocument, response } = useInsertDocument("posts")

    const {user} = useAuthValue()
    
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        //validate image url
        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URl.");
        }
        
        // criar o array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // checar todos os valores
        if(!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os cmampos!");
        }

        if (formError) return;

        insertDocument({
            title, 
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        //redirect to home page
        navigate("/")
    };


  return (
    <div className={styles.create_post}>
        <h2>CreatePost</h2>
        <p>Escreva sobre o que quiser e compartilhe!</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Titulo:</span>
                <input 
                type='text' 
                name="title" 
                required 
                placeholder='Pense em um bom título para sua postagem...'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                ></input>
            </label>
            <label>
                <span>URL da imagem:</span>
                <input
                type='text'
                name='image'
                required
                placeholder='coloque sua imagem'
                onChange={(e) => setImage(e.target.value)}
                value={image}
                ></input>
            </label>
            <label>
                <span>Conteúdo:</span>
                <textarea
                type='text'
                name='body'
                required
                placeholder='Escreva sobre o conteudo do seu post.'
                onChange={(e) => setBody(e.target.value)}
                value={body}
                ></textarea>
            </label>
            <label>
                <span>Tags:</span>
                <input
                type='text'
                name='tags'
                required
                placeholder='obs: insira as tags separadas por vírgula.'
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                ></input>
            </label>
            {!response.loading && <button className="btn">Cadastrar</button>}
            {response.loading && (<button className="btn" disabled>Aguarde...</button>)} 
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}

        </form>
    
    </div>
  )
}

export default CreatePost;