import React, {useState, useEffect} from 'react';
import axios from 'axios';

export function ShowTabularData1(){
    const [state, setState] = useState({isLoaded: false, error: null, data: null});

    useEffect(()=>{
        axios.get("https://randomuser.me/api/?results=20").then((response)=>{
            setState({isLoaded: true, error: null, data: response.data});
        }).catch((error)=>{
            setState({isLoaded: true, error: error.message, data: null});
        });
    }, []);

    if(state.isLoaded === false){
        return(
            <div className="container">
                loading...
            </div>
        );
    }else if(state.error !== null){
        return(
            <div className="container">
                Error: {state.error}
            </div>
        );
    }else{
        return(
            <div className="container">
                <h1>Assignment 06 : Display Tabular Data 1</h1>

                {state.data.results.map((obj)=>{
                    return <div key={obj.phone}>
                        <h1>{obj.name.title +" "+ obj.name.first +" "+ obj.name.last}</h1>
                        <img src={obj.picture.medium} alt="Profile" />
                    </div>
                })}
            </div>
        );
    }
}