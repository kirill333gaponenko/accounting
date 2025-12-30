import './App.css'
import Profile from "./components/Profile/Index.tsx";
import { Route, Routes} from "react-router";
import Guest from "./components/Guest";
import {Navigate} from "react-router-dom";

function App() {

    const token = 'sfds'

    return (

        <Routes>
            <Route path='/profile' element={token?<Profile/>:<Navigate to={'/'} replace/>}/>

             <Route path='/' element={token?<Navigate to={'/profile'}/>:<Guest/>}/>

        </Routes>


    )
}

export default App
