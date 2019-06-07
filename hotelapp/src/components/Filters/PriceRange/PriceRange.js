import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const priceRange = (props) => {
   
    return (
        <Range 
            allowCross={false} 
            defaultValue={props.defaultValue}
            marks={{0: 0, 50: 50, 100: 100 }}
            onAfterChange={(value) => {props.handlePriceRangeChange(value)}}  
        />
    );
}

export default priceRange;
