import { useState, useEffect } from'react';
import axios from 'axios';

export default function Authorization( code ) {

    const [accessToken, setAccessToken] = useState()
    useEffect(() => {
        axios.post("http://localhost:3001/login", {code})
        .then(res => {
            console.log(res)
            setAccessToken(res.data.access_token)
            window.history.pushState({}, null, "/");
        })
        .catch(() => {
            window.location = '/'
        })
    }, [code])

    return accessToken;
}