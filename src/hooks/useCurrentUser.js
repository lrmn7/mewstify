import { useContext } from 'react';
import { CurrentUserContext } from '../context/currentUser';

export function useCurrentUser() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    return {
        currentUser,
        setCurrentUser
    };
}
