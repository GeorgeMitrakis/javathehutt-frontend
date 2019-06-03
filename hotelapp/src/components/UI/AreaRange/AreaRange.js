import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: 400, margin: 50 };

class AreaRange extends React.Component{
    constructor(props) {
        super(props);
    }
	render(){
        return (
			<Slider allowCross={false} defaultValue={[0, 20]} marks={{0: 0, 50: 50, 100: 100 }}  />
        );
    }
}

export default AreaRange;
