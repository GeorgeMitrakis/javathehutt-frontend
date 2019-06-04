import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: 400, margin: 50 };
class PriceRange extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
    }

    // handlePriceRangeChange = (event) => {
	// 	console.log("Allakse to PRICE");
	// 	this.props.onAfterChange(event.target.value);
    //     // this.setState({ sliderValues });
    // };

	render(){
        return (
			<Range 
				allowCross={false} 
				defaultValue={this.props.defaultValue}
				marks={{0: 0, 50: 50, 100: 100 }}
				onAfterChange={(value) => {this.props.handlePriceRangeChange(value)}}  
				/>
        );
    }
}

export default PriceRange;
