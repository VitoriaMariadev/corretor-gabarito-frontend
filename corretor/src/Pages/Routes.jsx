import React from 'react'
import { Routes, Route } from 'react-router-dom'

import {Login} from './Login'
import {CreateUser} from './Create_user'
import {Home} from './Home'
import {Files} from './Files'
import { List } from './List'

const RotasExistente = props => (
    <main>
        <Routes>
            <Route  exact path="/Login" element={<Login/>}></Route>
            <Route  exact path="/Create_User" element={<CreateUser/>}></Route>
            <Route  exact path="/" element={<Home/>}></Route>
            <Route  exact path="/Files/:id" element={<Files/>}></Route>
            <Route  exact path="/List/:name/:id" element={<List/>}></Route>
        </Routes>
    </main>
)

export default RotasExistente