import React,{useState, useEffect} from "react";
import axios from 'axios';

export function ShowTabularData2(){
    const [state, setState] = useState({isLoaded: false, error: null, data: null});

    useEffect(()=>{
        axios.get("https://randomuser.me/api/?results=50").then((response)=>{
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
                <h1>Assignment 07 : Display Tabular Data 2</h1>

                <table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Username</th>
                            <th>Phone</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.data.results.map((obj)=>{
                            return (
                                <tr key={obj.phone}>
                                    <td>{obj.name.first}</td>
                                    <td>{obj.location.city}</td>
                                    <td>{obj.location.state}</td>
                                    <td>{obj.location.country}</td>
                                    <td>{obj.login.username}</td>
                                    <td>{obj.phone}</td>
                                    <td>{obj.location.coordinates.latitude}</td>
                                    <td>{obj.location.coordinates.longitude}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}