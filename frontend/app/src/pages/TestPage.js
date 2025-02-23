import React, { useState, useEffect } from 'react';
import giveSomeYummyStuff from '../api.js';
import { Image } from 'antd';
import arisImage from "../aris.png"

function Mainpage() {
    const [colorIdx, setColorIdx] = useState(0);
    const [msg, setMsg] = useState('');

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);

    const colors = ['red', 'blue', 'green', 'orange', 'purple'];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setColorIdx((colorIdx + 1) % colors.length);
        }, 10);

        return () => clearInterval(intervalId);
    });

    return (
        <div className='App'>
            <h1 style={{color: colors[colorIdx]}}>
                Welcome to the Main Page!
            </h1>
            <button onClick={() => { giveSomeYummyStuff(name, quantity) }}>
                Click me to talk to backend chan!
            </button>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <p>
                Hi my name is {msg}
            </p>
            <Image src={arisImage}/>
        </div>
    )
}

export default Mainpage;