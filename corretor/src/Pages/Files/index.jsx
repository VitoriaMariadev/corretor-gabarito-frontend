import './style.css'
import {Header} from "../../Components/Header"
import { getNameUser, getIdUser } from '../../Services/localstorage';
import { useEffect, useState } from 'react';
import folder from '../../Images/folder.svg'
import file from '../../Images/file.svg'
import { AiFillPlusCircle } from "react-icons/ai";
import { api } from "../../Services/API"
import { useLocation } from 'react-router-dom';

export const Files = () => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const id = pathArray[pathArray.length - 1];

    const [files, setFiles] = useState('')
    const [loading, setLoading] = useState(false)
    const [fileModel, setFileModel] = useState(false)
    const [fileName, setFileName] = useState('')
    const [user, setUser] = useState('')
    const [nameFolder, setNameFolder] = useState('')

    const getNameFolder = async () => {
        try{
            const res = await api.get('/show_folder_id/' + id) 
            if (res.data.status === 400){
                console.log('erro')
            }else{
                setNameFolder(res.data.nome)    
            }
            

        }catch(err){
            console.log(err)

        }
    }

    const getUser = () => {
        const userGet = getNameUser()
        setUser(userGet)
        console.log(userGet)

        if (!userGet){
            window.location.href ='/login'
        }
    }

    const getFiles = async () => {

        try{
            const res = await api.get('/show_all_files/' + id) 

            if (res.data.status === 400){
                setLoading(false)
            }else{
                console.log(res.data)
                setFiles(res.data)
                setLoading(true)          
            }
            

        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    const getFilesId = (name, id) => {
        window.location.href = `/List/${name}/${id}`
    }

    const createFilesModel = () => {
        if (fileModel){
            setFileModel(false)
        }else{
            setFileModel(true)
        }
    }

    const createFile = async () => {
        const data = {
            name: fileName,
            folder_id: id
            
        }

        try{
            const res = await api.post('/create_file', data)
            console.log(res.data)
            setFileName('')
            getFiles()
            setFileModel(false)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        getUser()
    },[user])

    useEffect(() =>{
        getFiles()
        getNameFolder()
    },[])

    return(

        <>

            <Header></Header>   

            
            <main className='main-files'>

                <div className="name-folder">  

                    <div className="name-folder-icon">
                        <img src={folder} alt="" />
                    </div>

                    <div className="name-folder-name">
                        <h1>{nameFolder}</h1>
                    </div>

                </div>

                <div className="main-files-container">

                    {loading&&(
                        
                        files.map((items, index) => (
                            <div className="main-files-container-file" key={index}>
                                <div className="main-files-container-file-folder">
                                    <img src={file} alt="" onClick={() => getFilesId(items.name, items.id)}/>
        
                                    {/* <div className="main-files-container-file-folder-svg"></div> */}
                                </div>
        
                                <div className="main-files-container-file-title">
                                    <p>{items.name}</p>
                                </div>
                            </div>
        
                        ))

                    )}

                    <div className="main-files-container-file">

                        <div className="main-files-container-file-plus">
                            <AiFillPlusCircle onClick={createFilesModel}/>
                        </div>

                        {fileModel&&(
                            <div className="folder-model">
                                <div className="folder-model-name">
                                    <p>Criar Arquivo</p>
                                </div>

                                <div className="folder-model-input">
                                    <div className="folder-model-input-name">
                                        Nome do Arquivo
                                    </div>

                                    <div className="folder-model-input-field">
                                        <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="folder-model-buttom">
                                    <button onClick={createFile}>Criar</button>
                                </div>

                            </div>
                        )}
                        
                    </div>
                </div>

            </main>
        
        </>

    )
}