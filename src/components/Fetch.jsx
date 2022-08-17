import React, {useState, useEffect} from "react";
import axios from 'axios';

export function FetchDataFromApi(){
    const [state, setState] = useState({isLoaded: false, error: null, data: null});
    const [idx, setIdx] = useState(1);

    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts/").then((response)=>{
            setState({isLoaded: true, error: null, data: response.data});
        }).catch((error)=>{
            setState({isLoaded: true, error: error.message, data: null});
        });
    }, []);

    const disableNextPostBtn = () =>{
        document.getElementById("displayNextPostBtn").disabled = true;
    }
    

    const displayNextPost = ()=>{
        setIdx(prevIdx => prevIdx + 1);

        if(idx === 101){
            disableNextPostBtn();
        }else{
            let postContainer = document.createElement("div");
            postContainer.classList.add("post-container");
    
            let titlePara = document.createElement("p");
            titlePara.textContent = "Post Title : " + state.data[idx].title;
    
            let bodyPara = document.createElement("p");
            bodyPara.textContent = "Post Body : " + state.data[idx].body;
    
            postContainer.append(titlePara, bodyPara);

            const container = document.getElementById("post-container-root");
            container.appendChild(postContainer);
        }
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
            <div className="container" id="post-container-root">
                <div style={{display: "flex"}}>
                    <h1>Assignment 05 : Fetch and display data - 2</h1>
                    <button style={{marginLeft: "auto"}} id="displayNextPostBtn" onClick={displayNextPost}>Next User Data</button>
                </div>

                <div className="post-container">
                    <p>Post Title : {state.data[0].title}</p>
                    <p>Post Body : {state.data[0].body}</p>
                </div>
            </div>
        );
    }
    
}