import {Navigate} from "react-router-dom";

type EditProfileProps ={
    token:string;
}

const UserSafety = ({token}:EditProfileProps) => {


    return token?<Navigate to='/profile' replace/>:<Navigate to='/' replace/>
}

export default UserSafety;