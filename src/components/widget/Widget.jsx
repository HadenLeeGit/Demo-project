import "./widget.scss"

import { CircularProgressbar } from "react-circular-progressbar";
import React, { useState, useEffect } from 'react';
import "react-circular-progressbar/dist/styles.css";

const Widget = (data) => {
    const [barValue, setBarValue] = useState(data.value)

    useEffect(() => {
        setBarValue(data.value)
    }, [data]);
    return (
        <div className="widget">
            <div className="top">
                <h1 className="title"> {data.title}</h1>
            </div>
            <div className="bottom">
                <div className="batteryChart">
                    <CircularProgressbar value={barValue} text={barValue} strokeWidth={5} />
                </div>
            </div>
        </div>
    )
}

export default Widget