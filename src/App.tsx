import './App.css'
import Profile from "./components/Profile/Index.tsx";
import {Route, Routes} from "react-router";
import Guest from "./components/Guest";

function App() {

    return (


        <Routes>
            <Route path='/' element={<Guest/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>



    )
}

export default App
