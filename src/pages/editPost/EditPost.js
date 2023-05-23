import styles from './EditPost.module.css';

import { useDebugValue, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
    const {id} = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const[title, setTitle] = useState("");
    const[image, setImage] = useState("");
    const[body, setBody] = useState("");
    const[tags, setTags] = useState([]);
    const[formError, setFormError] = useState("");

    useEffect(() => {

        if(post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ")

            setTags(textTags);
        }
    }, [post])

    const { updateDocument, response } = useUpdateDocument("posts")

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

        const data = {
            title, 
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };

        updateDocument(id, data);
        //redirect to dash
        navigate("/dashboard");
    };


  return (
    <div className={styles.edit_post}>
        <h2>EditPost</h2>
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
            <p className={styles.preview_title}>preview da imagem atual:</p>
            <img className={styles.image_review} src={image} alt={title} />

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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (<button className="btn" disabled>Aguarde...</button>)} 
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}

        </form>
    
    </div>
  )
}

export default EditPost;