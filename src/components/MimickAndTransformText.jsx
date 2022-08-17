import React, {useState} from "react";

export function MimickAndTransformText(){
    const [text, setText] = useState("");
    const [style, setStyle] = useState({bold: false, underline: false, italic: false});

    const handleChange = (e) =>{
        setStyle({...style, [e.target.name]: !style[e.target.name]});
    } 

    const textBold = style.bold && {"fontWeight": "bold"};
    const textUnderline = style.underline && {"text-decoration": "underline"};
    const textItalic = style.italic && {"font-style" : "italic"};

    const css = {...textBold, ...textUnderline, ...textItalic};

    return(
        <div className="container">
            <h1>Assignment 01 : Mimick And Transform Text.</h1>
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter Text Here..." />
            <br />
            <span>
                <input type="checkbox" onChange={handleChange} name="bold" /> Bold
            </span>
            <br />
            <span>
                <input type="checkbox" onChange={handleChange} name="underline" /> Underline
            </span>
            <br />
            <span>
                <input type="checkbox" onChange={handleChange} name="italic" /> Italic
            </span>
            <br /><br />
            <p style={css}>{text}</p>
        </div>
    );
}