import './style.css'
import {Header} from "../../Components/Header"
import { getNameUser } from '../../Services/localstorage';
import { useEffect, useState } from 'react';
import folder from '../../Images/folder.svg'

export const Home = () => {

    const [user, setUser] = useState('')

    const lista = ['pest', 'poo', 'matemática']

    const getUser = () => {
        const userGet = getNameUser()
        setUser(userGet)
        console.log(userGet)

        if (!userGet){
            window.location.href ='/login'
        }
    }

    useEffect(() =>{
        getUser()
    },[user])

    return(

        <>
            <Header></Header>
            <main className='main-home'>

                {lista.map((items, index) => (
                    <div className="main-home-container">
                        <div className="main-home-container-folder">
                            <img src={folder} alt="" />

                            {/* <div className="main-home-container-folder-svg"></div> */}
                        </div>

                        <div className="main-home-container-title">
                            <p>{items}</p>
                        </div>
                    </div>

                ))}

            </main>
        
        </>

    )
}