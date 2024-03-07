import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from "./user"

const UserWrapper = ({ children }: any) => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/ping');
                dispatch(login(response.data.data))
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser()

    }, [])


    return (
        <>{children}</>
    )
}

export default UserWrapper