import "./Dashboard.scss";
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Widget from "./components/widget/Widget";
import Sidebar from "./components/sidebar/Sidebar"
import Battery from "./components/battery/Battery";
import Navbar from "./components/NavigationBar/Navbar";
import Graph from "./components/graph/Graph";


import { getUserData, pushData, getAllUsers } from "./Firebase";

// var data = [
//   { "Relative Time Since Turned On": "5473", "Surface Temperature Output of Sensor 1": "26.659", "Thermal Energy of Sensor 1": "23.071", "Surface Temperature Output of Sensor 2": "28.084", "Thermal Energy of Sensor 2": "63.751", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "6473", "Surface Temperature Output of Sensor 1": "26.66", "Thermal Energy of Sensor 1": "22.308", "Surface Temperature Output of Sensor 2": "28.08", "Thermal Energy of Sensor 2": "64.819", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "7475", "Surface Temperature Output of Sensor 1": "26.662", "Thermal Energy of Sensor 1": "23.59", "Surface Temperature Output of Sensor 2": "28.082", "Thermal Energy of Sensor 2": "65.613", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "8474", "Surface Temperature Output of Sensor 1": "26.663", "Thermal Energy of Sensor 1": "24.445", "Surface Temperature Output of Sensor 2": "28.08", "Thermal Energy of Sensor 2": "66.589", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "9474", "Surface Temperature Output of Sensor 1": "26.665", "Thermal Energy of Sensor 1": "23.804", "Surface Temperature Output of Sensor 2": "28.079", "Thermal Energy of Sensor 2": "65.704", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "10476", "Surface Temperature Output of Sensor 1": "26.666", "Thermal Energy of Sensor 1": "22.583", "Surface Temperature Output of Sensor 2": "28.08", "Thermal Energy of Sensor 2": "66.711", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "11475", "Surface Temperature Output of Sensor 1": "26.668", "Thermal Energy of Sensor 1": "23.315", "Surface Temperature Output of Sensor 2": "28.081", "Thermal Energy of Sensor 2": "66.833", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "12475", "Surface Temperature Output of Sensor 1": "26.67", "Thermal Energy of Sensor 1": "23.743", "Surface Temperature Output of Sensor 2": "28.081", "Thermal Energy of Sensor 2": "66.803", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "13477", "Surface Temperature Output of Sensor 1": "26.672", "Thermal Energy of Sensor 1": "23.346", "Surface Temperature Output of Sensor 2": "28.085", "Thermal Energy of Sensor 2": "66.376", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "14476", "Surface Temperature Output of Sensor 1": "26.675", "Thermal Energy of Sensor 1": "24.506", "Surface Temperature Output of Sensor 2": "28.086", "Thermal Energy of Sensor 2": "66.589", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "15477", "Surface Temperature Output of Sensor 1": "26.677", "Thermal Energy of Sensor 1": "24.292", "Surface Temperature Output of Sensor 2": "28.088", "Thermal Energy of Sensor 2": "66.772", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "16479", "Surface Temperature Output of Sensor 1": "26.679", "Thermal Energy of Sensor 1": "23.59", "Surface Temperature Output of Sensor 2": "28.091", "Thermal Energy of Sensor 2": "66.589", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "17479", "Surface Temperature Output of Sensor 1": "26.682", "Thermal Energy of Sensor 1": "24.384", "Surface Temperature Output of Sensor 2": "28.091", "Thermal Energy of Sensor 2": "66.559", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "18480", "Surface Temperature Output of Sensor 1": "26.685", "Thermal Energy of Sensor 1": "22.766", "Surface Temperature Output of Sensor 2": "28.094", "Thermal Energy of Sensor 2": "67.139", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "19482", "Surface Temperature Output of Sensor 1": "26.687", "Thermal Energy of Sensor 1": "23.743", "Surface Temperature Output of Sensor 2": "28.097", "Thermal Energy of Sensor 2": "68.604", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "20482", "Surface Temperature Output of Sensor 1": "26.69", "Thermal Energy of Sensor 1": "23.743", "Surface Temperature Output of Sensor 2": "28.099", "Thermal Energy of Sensor 2": "67.932", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "21483", "Surface Temperature Output of Sensor 1": "26.693", "Thermal Energy of Sensor 1": "23.193", "Surface Temperature Output of Sensor 2": "28.104", "Thermal Energy of Sensor 2": "67.383", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "22484", "Surface Temperature Output of Sensor 1": "26.696", "Thermal Energy of Sensor 1": "24.231", "Surface Temperature Output of Sensor 2": "28.107", "Thermal Energy of Sensor 2": "67.932", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "23484", "Surface Temperature Output of Sensor 1": "26.699", "Thermal Energy of Sensor 1": "23.041", "Surface Temperature Output of Sensor 2": "28.109", "Thermal Energy of Sensor 2": "69.824", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "24484", "Surface Temperature Output of Sensor 1": "26.702", "Thermal Energy of Sensor 1": "23.621", "Surface Temperature Output of Sensor 2": "28.114", "Thermal Energy of Sensor 2": "68.97", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "25485", "Surface Temperature Output of Sensor 1": "26.706", "Thermal Energy of Sensor 1": "24.414", "Surface Temperature Output of Sensor 2": "28.114", "Thermal Energy of Sensor 2": "68.634", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "26486", "Surface Temperature Output of Sensor 1": "26.709", "Thermal Energy of Sensor 1": "22.888", "Surface Temperature Output of Sensor 2": "28.119", "Thermal Energy of Sensor 2": "68.451", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "27486", "Surface Temperature Output of Sensor 1": "26.712", "Thermal Energy of Sensor 1": "24.292", "Surface Temperature Output of Sensor 2": "28.123", "Thermal Energy of Sensor 2": "68.726", "Battery Percentage": "101", "0x0*": "0x0*" },
//   { "Relative Time Since Turned On": "28488", "Surface Temperature Output of Sensor 1": "26.715", "Thermal Energy of Sensor 1": "24.414", "Surface Temperature Output of Sensor 2": "28.128", "Thermal Energy of Sensor 2": "69.458", "Battery Percentage": "101", "0x0*": "0x0*" }
// ];


function Dashboard(props) {
  const { isAuthenticated } = useAuth0();

  const [data, setData] = useState(getUserData("wowuser"))
  var originalData = getUserData("wowuser");

  getAllUsers()

  const dateFormatter = date => {

    // return moment(date).unix();
    return moment(date).format('MM/DD/YY');
  };

  function dataIsEmpty() {
    if (data.length == 0) {
      return true
    }
    else {
      return false
    }
  }

  const roundOneDecimal = (value) => {
    return Number(value.toFixed(2))
  }

  const filterByDay = () => {
    let data2 = [...data]
    // console.log(data)
    console.log(data2)
    data2 = data2.filter(d => moment(d["Relative Time Since Turned On"])
      .format('MM/DD/YY') >= moment(data2[data2.length - 1]['Relative Time Since Turned On']).format('MM/DD/YY'))
    setData(data2)
  }
  const filterByMonth = () => {
    let data2 = [...data]
    console.log(data2)
    data2 = props.value.filter(d => moment(d["Relative Time Since Turned On"]).format('MM') === moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('MM'))
    data2 = data2.filter(d => moment(d["Relative Time Since Turned On"])
      .format('YY') === moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('YY'))

    setData(data2)
  }

  const filterByYear = () => {
    let data2 = [...data]
    console.log(data2)
    data2 = props.value.filter(d => moment(d["Relative Time Since Turned On"])
      .format('YY') === moment(props.value[props.value.length - 1]['Relative Time Since Turned On']).format('YY'))
    setData(data2)
  }

  const resetFilter = () => {
    setData(originalData)
  }

  return (
    isAuthenticated && (
      <div className="dashboard">
        <Sidebar value={data} />
        <div className="dashboardContainer">
          <Navbar />

          <div className="widgets">
            <Widget value={dataIsEmpty() ? 0 : parseFloat(data[data.length - 1]["Surface Temperature Output of Sensor 1"]).toFixed(2)} title={"Surface Temperature Sensor 1"}></Widget>
            <Widget value={dataIsEmpty() ? 0 : parseFloat(data[data.length - 1]["Surface Temperature Output of Sensor 2"]).toFixed(2)} title={"Surface Temperature Sensor 2"}></Widget>
            <Widget value={dataIsEmpty() ? 0 : parseFloat(data[data.length - 1]["Average Surface Temp"]).toFixed(2)} title={"Average Surface Temp"}></Widget>
            <Widget value={dataIsEmpty() ? 0 : parseFloat(data[data.length - 1]["Thermal Energy of Sensor 1"]).toFixed(2)} title={"Thermal Energy Sensor 1"}></Widget>
          </div>
          
          <div className="widgets">
            <Widget value={dataIsEmpty() ? 0 : parseFloat(data[data.length - 1]["Thermal Energy of Sensor 2"]).toFixed(2)} title={"Thermal Energy Sensor 2"}></Widget>
            <Widget value={dataIsEmpty() ? 0 : parseFloat(data[data.length - 1]["Average Thermal Energy"]).toFixed(2)} title={"Average Thermal Energy"}></Widget>
            <Battery value={dataIsEmpty() ? 0 : data[data.length - 1]["Battery Percentage"]}></Battery>
          </div>

          <div className="charts">
            <Graph value={data} val={"Surface Temperature Output of Sensor 1"} title={"Relative Time vs Surface Temperature of Sensor 1"} color="#00BFFF"id="colorUv" fill="url(#colorUv)" variant="outline-primary"> </Graph>
            <Graph value={data} val={"Thermal Energy of Sensor 1"} title={"Relative Time vs Thermal Energy of Sensor 1"} color="#3cb371" id="colorBv" fill="url(#colorBv)" variant="outline-success"> </Graph>
          </div>

          <div className="charts">
            <Graph value={data} val={"Surface Temperature Output of Sensor 2"} title={"Relative Time vs Surface Temperature of Sensor 2"} color="#00BFFF" id="colorUv" fill="url(#colorUv)" variant="outline-primary"> </Graph>
            <Graph value={data} val={"Thermal Energy of Sensor 2"} title={"Relative Time vs Thermal Energy of Sensor 2"} color="#3cb371" id="colorBv" fill="url(#colorBv)" variant="outline-success"> </Graph>
          </div>
          
          <div className="charts">
            <Graph value={data} val={"Average Surface Temp"} title={"Relative Time vs Average Surface Temp"} color="#00BFFF" id="colorUv" fill="url(#colorUv)" variant="outline-primary"> </Graph>
            <Graph value={data} val={"Average Thermal Energy"} title={"Relative Time vs Average Thermal Temp"} color="#3cb371" id="colorBv" fill="url(#colorBv)"variant="outline-success"> </Graph>
          </div>

        </div>
      </div>
    )
  );
};
export default Dashboard;