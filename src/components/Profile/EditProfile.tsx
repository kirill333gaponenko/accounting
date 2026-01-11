import {useState} from "react";
import { useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery, useUpdateUserMutation} from "../../features/api/accountingApi.ts";

type EditProfileProps ={
    close:() => void;
}

const EditProfile = ({close}:EditProfileProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const token = useAppSelector(state =>state.token)
    const [updateUser] = useUpdateUserMutation()
    const {data:userData} = useFetchUserQuery(token)


    const handleClickSave =async () => {

        try{
            const {error} = await updateUser({user:{firstName,lastName},token,login:userData!.login });
            if(error){
                console.log('update error', error);
            }
        }catch(e){
            console.log('error', e);
        }

        close();

    }



    const handleClickClear = () => {
        setFirstName('');
        setLastName('');
    }

    return (
        <>
            <label>First name:
                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                />
            </label>
            <label>Last name:
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                />
            </label>
            <button onClick={handleClickSave}>Save and close</button>
            <button onClick={close}>Close without Save</button>
            <button onClick={handleClickClear}>Clear</button>
        </>
    )
}

export default EditProfile;