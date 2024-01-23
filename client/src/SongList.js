import React,{ Component } from'react';
import './App.css'


/*
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
}*/

export default function SongList( {topSongs} ){
    if(topSongs.length === 0) {
        return <h1>No songs found</h1>
    } else{
        return (
            <table>
              <thead>
                <tr>
                  <th colSpan={6} style={{ textAlign: "center"}}>Top 10 songs</th>
                </tr>
              </thead>
              <tbody>
                {topSongs.map((song, index) => {
                  if (index % 2 === 0) {
                    return (
                      <tr key={song["id"]}>
                        <td>
                          <img
                            src={song.album.images[0].url}
                            alt={song.album.name}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td style={{ width: "200px" }}>
                          <em>{song.name}</em>
                        </td>
                        <td style={{ width: "200px" }}>
                          {song.artists[0].name}
                        </td>


                        <td>
                          <img
                            src={topSongs[index + 1].album.images[0].url}
                            alt={topSongs[index + 1].album.name}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td style={{ width: "200px" }}>
                          <em>{topSongs[index + 1].name}</em>
                        </td>
                        <td style={{ width: "200px" }}>
                          {topSongs[index + 1].artists[0].name}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          );
    }
}