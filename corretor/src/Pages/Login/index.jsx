import './style.css'

import avatar from '../../Images/avatar.svg'
import login from '../../Images/login.svg'
import { useState } from "react"
import {FaEyeSlash, FaEye} from 'react-icons/fa'
import { IoPersonSharp } from "react-icons/io5";
import { NavLink} from 'react-router-dom'
import { loginToken, setIdUser, setNameUser, setTypeUser } from "../../Services/localstorage"
import { api } from "../../Services/API"

export const Login = () =>{

    const [seePassword, setSeePassword] = useState(<FaEye/>)
    const [typeInput, setTypeInput] = useState('password')

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const togglePassword = () =>{

        if (typeInput == 'password'){
            setTypeInput('text')
            setSeePassword(<FaEyeSlash/>)
        }else{
            setTypeInput('password')
            setSeePassword(<FaEye/>)
        }

    }

    const logar = async () => {

        const data = {
            name:name,
            password:password
        }

        try{
            const res = await api.post('/login', data)
            console.log(res.data.userId)
            setIdUser(res.data.userId)
            setNameUser(res.data.name)
            loginToken(res.data.token)
            setName('')
            setPassword('')
            window.location.href ='/'

        }catch(err){
            console.log(err)
        }
    }

    return(
        <main>
            <div className="login-container">
                <div className="login-container-left">
                    <div className="login-container-left-title">
                        <h1>Login</h1>
                    </div>
                    <img src={login} alt="" />
                </div>
                <div className="login-container-right">
                    <div className="login-container-right-user">
                        <img src={avatar} alt=""/>
                    </div>
                        <div className="login-container-right-form">
            
                            <p>Nome</p>
                            <div className="login-container-right-form-name">
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>

                                <div className="login-container-right-form-name-icon">
                                    <IoPersonSharp />
                                </div>
                            </div>
                            <p>Senha</p>
                            <div className="login-container-right-form-password">
                                <input type={typeInput} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="login-container-right-form-password-icon" onClick={togglePassword} >
                                    {seePassword}            
                                </div>
                            </div>
                            
                        </div>

                    <div className="login-container-right-button">
                        <button type="submit" onClick={logar} >Login</button>
                    </div>
                    
                    <div className="login-container-right-create">

                        <NavLink to={'/Create_User'}>
                            <p>Não tem uma conta? Cadastre-se</p>
                        </NavLink>

                    </div>
                </div>
            </div>
        </main>
    )
    

}