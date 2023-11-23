/*import Authorization from './Authorization';
import SongList from './SongList';
import { useState, useEffect, Component } from'react';
import axios from 'axios';
import { Button } from "react-bootstrap"
import Poemify from './Poemify';

export default function Dashboard({ code }) {
    const access_token = Authorization(code);
    const [topSongs, setTopSongs] = useState([]);
    const [timeFrame, setTimeFrame] = useState("medium_term");
    useEffect(() => {
        if(!access_token) { return; }
        axios({
            method: 'GET',
            url: `https://api.spotify.com/v1/me/top/tracks?time_range=${timeFrame}&limit=10&offset=0`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(response => {
            setTopSongs(response.data.items);
        })
        .catch(error => {
            console.log(error)
        });
    }, [timeFrame, access_token]);



    return (
        <div>
            <h1>Dashboard</h1>
            <><Button variant="primary" onClick={() => setTimeFrame("short_term")} >4 weeks</Button></>
            <><Button variant="secondary" onClick={() => setTimeFrame("medium_term")} >6 months</Button></>
            <><Button variant="success" onClick={() => setTimeFrame("long_term")} >All time</Button></>
            <SongList topSongs={topSongs} />
            <><Button variant ="dark" onClick={() => setDashLoaded(!dashLoaded)}> start </Button></>
        </div>
    );

}*/