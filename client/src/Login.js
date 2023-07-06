import React from 'react';
import { Container } from 'react-bootstrap';
import querystring from 'query-string';



var client_id = '43f35112e711443db1fbcce02e3c90fb';
var scope = "playlist-modify-public playlist-modify-private user-top-read";
var redirect_uri = "http://localhost:3000"

var authURL = 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
});

export default function Login() {
    return (
            <Container>
                <h1>Login</h1>
                <a  className="btn btn-success btn-lg" href={authURL}>Login with Spotify</a>
            </Container>
        )
}
