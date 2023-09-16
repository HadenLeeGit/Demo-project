
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    LineChart,
    XAxis,
    AreaChart,
    Area,
    YAxis,
    Tooltip,
    CartesianGrid,
    Line,
} from "recharts";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import moment from 'moment';
import "./graph.scss"
import { ChatOutlined } from "@mui/icons-material";



const Graph = (props) => {
    // const [domain, setDomain] = useState([[props.value[0]['Surface Temperature Output of Sensor 1'], props.value[props.value.length - 1]['Surface Temperature Output of Sensor 1']]])
    const [data, setData] = useState([...props.value])
    // const [domain, setDomain] = useState([[data[0]['Surface Temperature Output of Sensor 1'], data[data - 1]['Surface Temperature Output of Sensor 1']]])
    useEffect(() => {
        setData([...props.value])
    }, [props]);

    const filterByDay = () => {
        let data2 = [...data]
        console.log(data2)
        data2 = props.value.filter(d => moment(d["Relative Time Since Turned On"]).format('MM/DD/YY') === moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('MM/DD/YY'))
        console.log(data2)
        console.log("Hello")
        setData(data2)

    }
    const filterByMonth = () => {
        let data2 = [...data]
        console.log(data2)
        data2 = props.value.filter(d => moment(d["Relative Time Since Turned On"]).format('MM') === moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('MM'))
        console.log(data2)
        data2 = data2.filter(d => moment(d["Relative Time Since Turned On"]).format('YY') === moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('YY'))
        console.log("Hello")
        setData(data2)
    }
    const filterByYear = () => {
        let data2 = [...data]
        console.log(data2)
        data2 = props.value.filter(d => moment(d["Relative Time Since Turned On"]).format('YY') === moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('YY'))
        console.log(data2)
        console.log("Hello")
        setData(data2)
    }
    const filterByAll = () => {
        let data2 = [...data]
        console.log(data2)
        data2 = props.value.filter(d => moment(d["Relative Time Since Turned On"]).format('MM/DD/YY') <= moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('MM/DD/YY'))
        console.log(data2)
        console.log("Hello")
        setData(data2)
    }
    const dateFormatter = date => {
        // return moment(date).unix();
        const month = moment(date).startOf("month").format('MMM')
        const day = moment(date).startOf("day").format('DD')
        const year = moment(date).startOf("year").format('YYYY')
        return month + " " + day+ " " +year;
    };
    const roundFormatter = num => {
        // return moment(date).unix();
        return num.toFixed(2);
    };
    return (
        <div className="graphs">
            <div className="top">
                <AreaChart
                    width={600} height={400} data={data}
                    margin={{ top: 50, right: 30, left: 20, bottom: 50 }} >
                    <defs>
                        <linearGradient id={props.id} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={props.color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={props.color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <text x={600 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan fontSize="16">{props.title}</tspan>
                    </text>
                    <XAxis
                        // label={{ value: 'Relative Time Since Turned On', dy: 30 }}
                        dataKey="Relative Time Since Turned On"
                        type="number"
                        scale="time"
                        axisLine={false}
                        tickLine={false} 
                        tickCount="8"
                        tickFormatter={dateFormatter}
                        domain={[[data[0][props.val], data[data.length - 1][props.val]]]} />
                    <YAxis
                        // label={{
                        //     value: props.val,
                        //     angle: -90, dx: -35
                        // }}
                        axisLine={false}
                        tickLine={false} 
                        type="number" tickCount="5" domain={[data[0][props.val], data[data.length - 1][props.val]]}
                        tickFormatter={roundFormatter}
                    />
                    <Tooltip labelFormatter={dateFormatter} />
                    <Area type="monotone" dataKey={props.val} stroke={props.color} fillOpacity={1} fill={props.fill} />
                </AreaChart>
            </div>
            <div class="bottom">
                <Button onClick={filterByAll} variant={props.variant}>
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span class="visually-hidden">Loading...</span>Live</Button>{' '}
                <Button onClick={filterByYear} variant={props.variant}>1Y</Button>{' '}
                <Button onClick={filterByMonth} variant={props.variant}>1M</Button>{' '}
                <Button onClick={filterByDay} variant={props.variant}>1D</Button>{' '}
                <Button onClick={filterByAll} variant={props.variant}>All</Button>{' '}
            </div>
        </div>
    )
}

export default Graph