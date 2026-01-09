import './App.css'
import Profile from "./components/Profile";
import { Route, Routes} from "react-router";
import Guest from "./components/Guest";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "./app/hooks.ts";

function App() {

    const token = useAppSelector((state) => state.token);

    return (
        <Routes>
            <Route path='/profile' element={token?<Profile/>:<Navigate to={'/'} replace/>}/>
             <Route path='/' element={token?<Navigate to={'/profile'} replace/>:<Guest/>}/>
        </Routes>
    )
}

export default App
