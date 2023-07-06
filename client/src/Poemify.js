import React from "react";

export default function Poemify( {selectedSongs} ) {
    var lyrics = ''
    selectedSongs.forEach( song => {
        lyrics += song.lyrics + '\n'
    })
    console.log("lyrics")
    return (
            <div>
                <b>poem</b>
            </div>
        )
}