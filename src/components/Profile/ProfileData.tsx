import {useAppSelector} from "../../app/hooks.ts";
import {useFetchUserQuery} from "../../features/api/accountingApi.ts";

const ProfileData = () => {

    const token = useAppSelector((state) => state.token);
    const {data:user,isLoading} = useFetchUserQuery(token)

    if(isLoading) {
        return <p>Loading...</p>
    }
    if(!user) {
        return <p>No data available</p>

    }

    return (
        <>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                {user.roles.map((role:string) => <li key={role}>{role}</li>)}
            </ul>
        </>
    )
}

export default ProfileData;