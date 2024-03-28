import './style.css'

import { getNameUser, getToken, disconnect } from '../../Services/localstorage';
import { useEffect, useState } from 'react';
import arrow from '../../Images/arrow.svg'

export const Header = () => {

    const [user, setUser] = useState('')
    const [div, setDiv] = useState('header')

    const getUser = () => {
        const userGet = getNameUser()

        setUser(userGet)
        console.log(user)
    }

    const getMenu = () => {

        if (div === 'header'){
            setDiv('header close')
        }else{
            setDiv('header')
        }

    }

    useEffect(() =>{
        getUser()
    },[user])

    return(
        <main className={div}>

            <div className="header-user">

                <div className="header-user-svg"></div>

                <div className="header-user-name">
                    <p>{user}</p>
                </div>

            </div>

            <div className="header-arrow" onClick={getMenu}>

                <img src={arrow} alt="" />
                
            </div>
            
        </main>
    )
}