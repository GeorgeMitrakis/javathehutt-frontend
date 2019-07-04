import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Range = createSliderWithTooltip(Slider.Range);



const priceRange = (props) => {
   
    return (
        <Range 
            allowCross={false} 
            defaultValue = {[props.searchFilters.minPrice, props.searchFilters.maxPrice]}
            marks={{0: 0, 50: 50, 100: 100 }}
            tipFormatter={value => `${value}€`}
            tipProps={ { placement: 'top', 
                        prefixCls: 'rc-slider-tooltip', 
                        visible: 'dragging',
            }}
            onAfterChange={(value) => {props.handlePriceRangeChange(value, props.searchFilters, props.searchInfo)}}  
        />
    );
}

export default priceRange;
