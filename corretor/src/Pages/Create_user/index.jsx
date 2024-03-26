import './style.css'

import avatar from '../../Images/avatar_female.svg'
import login from '../../Images/login.svg'
import { useState } from "react"
import {FaEyeSlash, FaEye} from 'react-icons/fa'
import { IoPersonSharp } from "react-icons/io5";
import { NavLink} from 'react-router-dom'
import { api } from "../../Services/API"

export const CreateUser = () =>{

    const [seePassword, setSeePassword] = useState(<FaEye/>)
    const [typeInput, setTypeInput] = useState('password')
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(<FaEye/>)
    const [typeInputConfirm, setTypeInputConfirm] = useState('password')

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const registerUser = async () => {

        const data = {
            name,
            password,
            confirmPassword
        }

        try{
            const res = await api.post('/create_user', data)
            setName('')
            setPassword('')
            setConfirmPassword('')
            console.log(res.data)
            window.location.href ='/'

            // if (res.data.status === 400) {
            //     setTipo('erro')
            //     setMensagem(res.data.Message)
            // }   else {
            //     setTipo('Sucesso')
            //     setMensagem(res.data.Message)
            // }
        }catch(err){
            console.log(err)
        }

    }

    const togglePassword = () =>{

        if (typeInput == 'password'){
            setTypeInput('text')
            setSeePassword(<FaEyeSlash/>)
        }else{
            setTypeInput('password')
            setSeePassword(<FaEye/>)
        }

    }

    const togglePasswordConfirm = () =>{

        if (typeInputConfirm == 'password'){
            setTypeInputConfirm('text')
            setSeePasswordConfirm(<FaEyeSlash/>)
        }else{
            setTypeInputConfirm('password')
            setSeePasswordConfirm(<FaEye/>)
        }

    }

    return(
        <main>
            <div className="create-container">
                
                <div className="create-container-right">
                    <div className="create-container-right-user">
                        <img src={avatar} alt=""/>
                    </div>
                        <div className="create-container-right-form">
            
                            <p>Nome</p>
                            <div className="create-container-right-form-name">
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>

                                <div className="create-container-right-form-name-icon">
                                    <IoPersonSharp />
                                </div>
                            </div>
                            <p>Senha</p>
                            <div className="create-container-right-form-password">
                                <input type={typeInput} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="create-container-right-form-password-icon" onClick={togglePassword} >
                                    {seePassword}            
                                </div>
                            </div>

                            <p>Confirmar Senha</p>
                            <div className="create-container-right-form-password-confirm">
                                <input type={typeInputConfirm} name="password" id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <div className="create-container-right-form-password-confirm-icon" onClick={togglePasswordConfirm} >
                                    {seePasswordConfirm}            
                                </div>
                            </div>
                            
                        </div>

                    <div className="create-container-right-button">
                        <button type="submit" onClick={registerUser} >Cadastrar</button>
                    </div>
                    
                    <div className="create-container-right-create">
                        <NavLink to={'/Login'}>
                            <p>Já possui uma conta? Faça Login</p>
                        </NavLink>
                    </div>
                </div>

                <div className="create-container-left">
                    <div className="create-container-left-title">
                        <h1>Crie uma conta</h1>
                    </div>
                    <img src={login} alt="" />
                </div>

            </div>
        </main>
    )
    

}