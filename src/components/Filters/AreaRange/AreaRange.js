import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const MySlider = createSliderWithTooltip(Slider);

const areaRange = (props) => {
    
    return (
        <MySlider 
            allowCross={false} 
            defaultValue={props.searchFilters.maxDist} 
            marks={{0: 0, 50: 50, 100: 100 }} 
            tipFormatter={value => `${value}€`}
            tipProps={ { placement: 'top', 
                        prefixCls: 'rc-slider-tooltip', 
                        visible: 'dragging',
            }}
            onAfterChange={(value) => {props.handleAreaRangeChange(value, props.searchFilters, props.searchInfo)}} 
        />
    );
    
}

export default areaRange;
