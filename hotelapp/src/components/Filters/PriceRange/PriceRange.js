import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const priceRange = (props) => {
   
    return (
        <Range 
            allowCross={false} 
            defaultValue = {[props.searchFilters.minPrice, props.searchFilters.maxPrice]}
            marks={{0: 0, 50: 50, 100: 100 }}
            onAfterChange={(value) => {props.handlePriceRangeChange(value, props.searchFilters)}}  
        />
    );
}

export default priceRange;
