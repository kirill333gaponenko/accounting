import {useAppSelector} from "../../app/hooks.ts";

const ProfileData = () => {

    const user = useAppSelector((state) => state.user);

    return (
        <>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                {user.roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
        </>
    )
}

export default ProfileData;