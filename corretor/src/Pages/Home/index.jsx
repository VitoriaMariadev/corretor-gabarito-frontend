import './style.css'
import {Header} from "../../Components/Header"
import { getNameUser } from '../../Services/localstorage';
import { useEffect, useState } from 'react';

export const Home = () => {

    const [user, setUser] = useState('')

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
                
            </main>
        
        </>

    )
}