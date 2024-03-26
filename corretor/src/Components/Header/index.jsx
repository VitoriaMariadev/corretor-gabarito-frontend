import './style.css'

import { getNameUser, getToken, disconnect } from '../../Services/localstorage';
import { useEffect, useState } from 'react';
import arrow from '../../Images/arrow.svg'

export const Header = () => {

    const [user, setUser] = useState('')

    const getUser = () => {
        const userGet = getNameUser()

        setUser(userGet)
        console.log(user)
    }

    const getMenu = () => {
        const menu = document.querySelector('.header')

        if (menu.style.width === ''){
            menu.style.width = '5%'
        }
        else{
            if (menu.style.width === '20%'){
                menu.style.width = '5%'
            }else{
                menu.style.width = '20%'
            }
        }
    }

    useEffect(() =>{
        getUser()
    },[user])

    return(
        <main className="header">

            <div className="header-arrow" onClick={getMenu}>

                <img src={arrow} alt="" />
                
            </div>
            
        </main>
    )
}