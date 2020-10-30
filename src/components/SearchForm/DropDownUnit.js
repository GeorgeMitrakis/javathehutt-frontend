import React from 'react';

const dropDownUnit = (props) => {
    return (
        <div className="d-flex align-items-center">
            <div className={"pr-5 "+props.nameMargin}>
                {props.unitName}
            </div>
            <div className="pr-3">
                <button className="form-control rm_hl" onClick={props.dec}><i className="fas fa-minus"></i></button>
            </div>
            <div className="pr-3">
                {props.unitAmount}
            </div>
            <div className="">
                <button className="form-control rm_hl" onClick={props.inc}><i className="fas fa-plus"></i></button>
            </div>
        </div>
    )
}

export default dropDownUnit;