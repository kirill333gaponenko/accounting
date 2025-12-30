import './App.css'
import Profile from "./components/Profile/Index.tsx";
import { Route, Routes} from "react-router";
import Guest from "./components/Guest";
import UserSafety from "./utils/UserSafety.tsx";

function App() {

    const token = ''

    return (token?

        (<Routes>
            <Route path='/profile' element={<Profile/>}/>
         <Route element={<UserSafety token={token}/>}>
             <Route path='/' element={<Guest/>}/>
         </Route>
        </Routes>)
            :(<Routes>
                <Route path='/' element={<Guest/>}/>
                <Route element={<UserSafety token={token}/>}>
                    <Route path='/profile' element={<Profile/>}/>
                </Route>
            </Routes>)




    )
}

export default App
