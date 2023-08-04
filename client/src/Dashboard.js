import Authorization from './Authorization';
import SongList from './SongList';
import { useState, useEffect, Component } from'react';
import axios from 'axios';
import { Button } from "react-bootstrap"
import Poemify from './Poemify';
import topSongs from './topSongs.js';

export default function Dashboard({ code }) {
    const access_token = Authorization(code);
    const [dashLoaded, setDashLoaded] = useState(true);
    const [topSongs, setTopSongs] = useState([]);
    const [timeFrame, setTimeFrame] = useState("medium_term"); // change when hit 4week, etc
    const [poemData, setPoemData] = useState([]);

    const [testTrack, setTestTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    useEffect(() => {
        if(!access_token) { return; }
    }, [access_token]);

    // get top 10 songs
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



    useEffect(() => {
        let songs = ''
        topSongs.forEach(song => {
            //data.push([song.artists[0].name, song.name]);
            songs += song.name + ' - ' + song.artists[0].name + '\n'
        });
        setPoemData(songs);
        console.log(songs);
    }, [topSongs]);






    useEffect(() => {
        if(!access_token) { return; }
        axios
            .get("http://localhost:3001/lyrics", {
                params: {
                    track: testTrack.name,
                    artist: testTrack.artists[0].name,
                },
            })
            .then(res => {
                setLyrics(res.data.lyrics)
            })
    }, [testTrack]);



    useEffect(() => {
        console.log(lyrics);
    }, [lyrics]);


    if(dashLoaded){
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
    } else {

        return (
            <div className="poem">
                <Poemify poemData = {poemData}/>
                <Button variant ="dark" onClick={() => setDashLoaded(!dashLoaded)}> start </Button>
            </div>
        )
    }

}
