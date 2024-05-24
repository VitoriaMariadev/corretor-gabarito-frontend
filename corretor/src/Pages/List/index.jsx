import './style.css';
import { Header } from "../../Components/Header";
import { getNameUser } from '../../Services/localstorage';
import { useEffect, useState } from 'react';
import file from '../../Images/file.svg';
import { useLocation } from 'react-router-dom';
import { MyDropzone } from '../../Components/DropZone';

export const List = () => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const id = pathArray[pathArray.length - 1];
    const nameFile = pathArray[pathArray.length - 2];

    const [files, setFiles] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileModel, setFileModel] = useState(false);
    const [fileName, setFileName] = useState('');
    const [user, setUser] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});
    const [questionsCount, setQuestionsCount] = useState(20);
    const [alternativesCount, setAlternativesCount] = useState(6);

    const getUser = () => {
        const userGet = getNameUser();
        setUser(userGet);
        console.log(userGet);

        if (!userGet) {
            window.location.href = '/login';
        }
    };

    const handleOptionClick = (questionId, option) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: prev[questionId] === option ? null : option,
        }));
    };

    const getCheckBoxClass = (questionId, option) => {
        return selectedOptions[questionId] === option ? 'checkbox selected' : 'checkbox';
    };

    const getSelectedOptionsList = () => {
        const list = Object.entries(selectedOptions).map(([questionId, option]) => ({
            questionId,
            option
        }));
        console.log(list);
        return list;
    };

    useEffect(() => {
        getUser();
    }, [user]);

    return (
        <>
            <Header />

            <main className='main-files'>
                <div className="name-folder">
                    <div className="name-folder-icon">
                        <img src={file} alt="" />
                    </div>

                    <div className="name-folder-name">
                        <h2>{nameFile}</h2>
                    </div>
                </div>

                <div className="main-list-container">
                    <div className="main-list-container-one">
                        <div className="main-list-container-one-container">
                            <div className="main-list-container-one-container-questions">
                                <p>Questões</p>
                                <div className="main-list-container-one-container-questions-input">
                                    <input 
                                        type="number" 
                                        value={questionsCount} 
                                        onChange={(e) => setQuestionsCount(Number(e.target.value))} 
                                    />
                                </div>
                            </div>

                            <div className="main-list-container-one-container-questions">
                                <p>Alternativas</p>
                                <div className="main-list-container-one-container-questions-input">
                                    <input 
                                        type="number" 
                                        className="input-number" 
                                        value={alternativesCount} 
                                        onChange={(e) => setAlternativesCount(Number(e.target.value))} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main-list-container-two">
                        <div className="main-list-container-two-list">
                            <div className="main-list-container-two-list-title">
                                <p>Gabarito</p>
                            </div>

                            <div className="main-list-container-two-list-container">
                                {[...Array(questionsCount)].map((_, questionId) => (
                                    <div key={questionId} className="main-list-container-two-list-container-question">
                                        <div className="main-list-container-two-list-container-question-number">
                                            <p>{String(questionId + 1).padStart(2, '0')}</p>
                                        </div>

                                        <div className="main-list-container-two-list-container-question-option">
                                            {[...Array(alternativesCount)].map((_, optionId) => {
                                                const option = String.fromCharCode(65 + optionId);
                                                return (
                                                    <div 
                                                        key={optionId} 
                                                        className="main-list-container-two-list-container-question-option-container"
                                                        onClick={() => handleOptionClick(questionId + 1, option)}
                                                    >
                                                        <div className={getCheckBoxClass(questionId + 1, option)}></div>
                                                        <p>{option}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="main-list-container-two-dropzone">

                            <MyDropzone/>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
