import React, {useState, useEffect} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button"

export default function Poemify( poemData ) {

    const [test, setTest] = useState(false);
    const [poem, setPoem] = useState("");
    const [loading, setLoading] = useState(true);

    let songs = poemData.poemData;


    console.log(songs);
    
    /*
    axios({
        method: 'POST',
        url: "http://localhost:3001/generate",
        params: {
            poemData: songs,
        }
    }).then((response) =>{
        setPoem(response.data.poem);
    }).catch(error => {
        console.log(error);
    });*/
    function generate(){
        setLoading(true);
        axios({
            method: 'POST',
            url: "http://localhost:3001/generate",
            params: {
                poemData: songs,
            }
        }).then((response) =>{
            setPoem(response.data.poem);
            console.log(response.data.poem);
            //return response.data.poem;
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }
    
    

    return (
        <div className="gen" style = {{alignContent: "center"}}>
            <><Button variant ="primary" onClick={() =>
                setPoem(generate())
            }>Generate</Button></>
            <div className="block p-3 h-full w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" style={{ whiteSpace: "pre-line", display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}>
                {loading && <img src="./loading.gif" alt="Loading" />}
                {poem}
            </div>
        </div>
    )
}

