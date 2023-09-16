import "./battery.scss";
import "react-circular-progressbar/dist/styles.css";
import BatteryGauge from 'react-battery-gauge'

const Battery = (data) =>{
    return (
        <div className="batteryPercentage">
            <div className="top">
                <h1 className="title">Battery</h1>
            </div>
            <div className="bottom">
                <div className="batteryChart">
                    <BatteryGauge value={data.value} size={100} orientation="vertical"/>
                </div>
            </div>
        </div>

    );
};

export default Battery;