import React, { useEffect, useState, useRef } from "react";

function useInterval(callback, delay){
    const saveCallBack = useRef();

    useEffect(()=>{
        saveCallBack.current = callback; 
    }, [callback]);

    useEffect(()=>{
        if(delay !== undefined){
            let id = setInterval(()=>{
                saveCallBack.current();
            }, delay);

            return ()=>{
                clearInterval(id);
            }
        }
    });
}

export function UseIntervalHook(){
    const[count, setCount] = useState(0);
    const[isPaused, setPause] = useState(false);
    const[delay, setDelay] = useState(1000);

    useInterval(()=>{
        setCount(count + 1);
    }, isPaused === false ? delay : undefined);

    function changePauseStatus(){
        setPause(!isPaused);
    }
    
    return(
        <div className="container">
            <h1>Assignment 03 : Create useInterval Hook.</h1>
            <h1>Count: {count}</h1>
            <p>Delay (in ms:)<input type="text" value={delay} onChange={(e)=>{
                setDelay(Number(e.target.value));
            }}/></p>

            <button onClick={changePauseStatus}>{isPaused === true ? 'Resume' : 'Pause'}</button>
        </div>
    );
}
