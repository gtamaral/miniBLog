// css
import styles from './About.module.css';

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o mini <span>Blog</span></h2>
        <p>Este projeto consite em um blog feito com React no front-end e Firebase no back-end com o intuito de aprimorar meus estudos.</p>
        <h3>Divirta-se!</h3>
        <Link to="/posts/create" className="btn">
          Criar post
        </Link>

    </div>
  )
}

export default About