import React, {useState} from 'react';

const getData = (key, initialValue) =>{
    const data = JSON.parse(localStorage.getItem(key));
    if(data !== undefined) return data;
    if(initialValue instanceof Function) return initialValue();
    return initialValue; 
}

const useLocalStorage = (key, initialvalue)=>{
    const [savedValue, setStoredValue] = useState(()=>{
        return getData(key, initialvalue);
    });

    const setvalue = (value) =>{
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    }

    return[savedValue, setvalue];
}

export function UseLocalStorageHook(){
    const [data, setData] = useLocalStorage('name', "");
    const [name, setName] = useState('');

    return(
        <div className='container'>
            <h1>Assignment 02 : Create useLocalStorage Hook.</h1>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Add name to the localstorage list.' />
            <button onClick={()=>{ setData(name) }}>Save</button>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}