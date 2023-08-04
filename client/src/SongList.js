import React,{ Component } from'react';
import './App.css'



export default function SongList( {topSongs} ){
    if(topSongs.length === 0) {
        return <h1>No songs found</h1>
    } else{
        const list = topSongs.map(song => 
        <li key = {song["id"]}>
            <img
                src={song.album.images[0].url}
                alt={song.album.name}
                width={100}
                height={100}
            />
            <p>
                <b>{song.name}</b>
            </p>
        </li>
        )
        return <ul>{list}</ul>
    }
}