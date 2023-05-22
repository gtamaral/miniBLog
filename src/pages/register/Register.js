//css
import styles from "./Register.module.css";
import '../../index.css';

//states
import { useState, useEffect } from 'react';

//hook from back end
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {


  const [displaynome, setDisplayNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("") //quando envia o form o erro fica vazio

    //formando usuario
    const user = {
      displaynome,
      email,
      password
    }

    if(password !== confirmpassword) {
      setError("as senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user)

    console.log(res);
  };

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])
  
  return (
    <div className={styles.register}>
      <h1>Cadastre-se para se conectar!</h1>
      <p>Crie seu usuário para compartilhar o que quiser! </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input 
          type="text" 
          name="displaynome"
          required
          placeholder="nome do usuário"
          value={displaynome}
          onChange={(e) => setDisplayNome(e.target.value)}
          />
        </label>
        <label>
          <span>Email: </span>
          <input 
          type="email" 
          name="email"
          required
          placeholder="nome do seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input 
          type="password" 
          name="password"
          required
          placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmação de senha: </span>
          <input 
          type="password" 
          name="confirmpassword"
          required
          placeholder="Confirme sua senha"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}

      </form>
    </div>
  )
}

export default Register;