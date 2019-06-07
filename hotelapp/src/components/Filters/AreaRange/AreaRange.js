import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const areaRange = (props) => {
    
    return (
        <Slider 
            allowCross={false} 
            defaultValue={props.defaultValue} 
            marks={{0: 0, 50: 50, 100: 100 }} 
            onAfterChange={(value) => {props.handleAreaRangeChange(value)}} 
        />
    );
    
}

export default areaRange;
