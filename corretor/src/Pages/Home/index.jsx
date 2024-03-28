import './style.css'
import {Header} from "../../Components/Header"
import { getNameUser, getIdUser } from '../../Services/localstorage';
import { useEffect, useState } from 'react';
import folder from '../../Images/folder.svg'
import { api } from "../../Services/API"

export const Home = () => {

    const [user, setUser] = useState('')
    const [folders, setFolders] = useState('')
    const [loading, setLoading] = useState(false)

    const getUser = () => {
        const userGet = getNameUser()
        setUser(userGet)
        console.log(userGet)

        if (!userGet){
            window.location.href ='/login'
        }
    }

    const getFolderId = (id) => {
        window.location.href = '/Files/' + id
    }

    const getFolders = async () => {
        const data = {
            id_user: getIdUser()
        }

        try{
            const res = await api.post('/show_all_folders', data)

            if (res.data.status === 400){
                setLoading(false)
            }else{

                console.log(res.data)
                setFolders(res.data)
                setLoading(true)
            }
            

        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() =>{
        getUser()
    },[user])

    useEffect(() =>{
        getFolders()
    },[])

    return(

        <>
            <Header></Header>
            <main className='main-home'>

                {loading?(
                    
                    folders.map((items, index) => (
                        <div className="main-home-container" key={index}>
                            <div className="main-home-container-folder">
                                <img src={folder} alt="" onClick={() => getFolderId(items.id)}/>
    
                                {/* <div className="main-home-container-folder-svg"></div> */}
                            </div>
    
                            <div className="main-home-container-title">
                                <p>{items.name}</p>
                            </div>
                        </div>
    
                    ))
                ):(
                    <h1>pastas não encontradas</h1>
                )}


            </main>
        
        </>

    )
}