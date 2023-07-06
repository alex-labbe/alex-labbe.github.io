import React from'react';
import './App.css';

export default function Song( { song }){
    return(<div>    
        <img
            src={song.album.images[0].url}
            alt={song.album.name}
            width={100}
            height={100}
        />
        <p>
            <b>{song["name"]}</b>
        </p>
    </div>);

}