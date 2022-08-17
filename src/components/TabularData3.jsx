import React, {useState, useEffect} from 'react';
import axios from 'axios';

export function ShowTabularData3(){

    const [state, setState] = useState({isLoaded: false, error: null, data: null});
    const [searchedText, setSearchedText] = useState('');
    const [sortingOrder, setSortingOrder] = useState(new Array(8).fill(0));
    

    useEffect(()=>{
        axios.get("https://randomuser.me/api/?results=50").then((response)=>{
            const organisedData = response.data.results.map(({name, location, login, phone})=>[
                name.first, 
                location.city,
                location.state,
                location.country,
                login.username,
                phone,
                location.coordinates.latitude,
                location.coordinates.longitude
            ]);
            setState({isLoaded: true, error: null, data: organisedData});
        }).catch((error)=>{
            setState({isLoaded: true, error: error.message, data: null});
        });
    }, []);

    const getfilteredRow = (data, searchedText) => {
        if(searchedText === undefined || searchedText === null) return data;
        return data.filter((row) => {
            return row.some((s) => { return`${s}`.toLowerCase().includes(searchedText) });
        });
    }

    const doSorting = (idx) =>{
        let temp = state.data;

        if(sortingOrder[idx] === 0 || sortingOrder[idx] === 1){
            // then do ascending order sorting
            temp.sort((a,b)=>{
                if(a[idx] < b[idx]) return -1;
                if(a[idx] > b[idx]) return 1;
                return 0;
            });
            sortingOrder[idx] = 2;
            setSortingOrder(sortingOrder);
        }else{
            // then do descending order sorting
            temp.sort((a,b)=>{
                if(a[idx] < b[idx]) return 1;
                if(a[idx] > b[idx]) return -1;
                return 0;
            });
            sortingOrder[idx] = 1;
            setSortingOrder(sortingOrder);
        }
        
        setState({isLoaded: true, error: null, data: temp});
    }
 

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
                <div style={{display: "flex"}}>
                    <h1>Assignment 08 : Display Tabular Data 3</h1>
                    <input type="text" value={searchedText} style={{marginLeft: "auto"}} onChange={e => setSearchedText(e.target.value)} placeholder='Search Here...'/>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th onClick={()=> doSorting(0)}>First name</th>
                            <th onClick={()=> doSorting(1)}>City</th>
                            <th onClick={()=> doSorting(2)}>State</th>
                            <th onClick={()=> doSorting(3)}>Country</th>
                            <th onClick={()=> doSorting(4)}>Username</th>
                            <th onClick={()=> doSorting(5)}>Phone</th>
                            <th onClick={()=> doSorting(6)}>Latitude</th>
                            <th onClick={()=> doSorting(7)}>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getfilteredRow(state.data, searchedText).map((ary, idx)=>{
                            return (
                                <tr key={idx}>
                                    <td>{ary[0]}</td>
                                    <td>{ary[1]}</td>
                                    <td>{ary[2]}</td>
                                    <td>{ary[3]}</td>
                                    <td>{ary[4]}</td>
                                    <td>{ary[5]}</td>
                                    <td>{ary[6]}</td>
                                    <td>{ary[7]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}