import moment from 'moment';

export const checkValidity = ( value, rules, name ) => {

    if ( !rules ) {
        return {report: true, msg: ""}
    }

    if ( rules.required && value.trim() === '' )
    {
        return {report: false, msg: "Το συγκεκριμένο πεδίο είναι υποχρεωτικό"};
    }

    if ( rules.minLength && (value.length < rules.minLength) )
    {
        return {report: false, msg: "Πρέπει να περιέχει τουλάχιστον " + rules.minLength + " χαρακτήρες"};
    }

    if ( rules.maxLength && (value.length > rules.maxLength))
    {
        return {report: false, msg: "Δεν μπορεί να υπερβαίνει τους " + rules.maxLength + " χαρακτήρες"};
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Εισάγετe μια σωστή διεύθυνση email"};
        }
    }

    if ( rules.isPassword ) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Ο κωδικός πρέπει να αποτελείται μόνο από λατινικούς χαρακτήρες, να περιέχει τουλάχιστον 1 πεζό, 1 κεφαλαίο γράμμα και 1 ψηφίο"}
        }
    }

    if ( rules.onlyLetters ) {
        const pattern = /^[a-zA-Zα-ωΑ-ΩίϊΐόάέύϋΰήώΆΈΉΊΎΌΏΪΫ]+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Πρέπει να αποτελείται μόνο από γράμματα"}
        }
	}
	
	if ( rules.onlyLettersDotsAndSpace ) {
        const pattern = /^[a-zA-Zα-ωΑ-ΩίϊΐόάέύϋΰήώΆΈΉΊΎΌΏΪΫ\. ]+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Πρέπει να αποτελείται μόνο από γράμματα, τελείες ή και κενά"}
        }
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Πρέπει να αποτελείται μόνο απο αριθμούς"};
        }
    }

    return {report: true, msg: ""};
}

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
}

export const getUserInfoField = (field) => {
    const userInfo = getUserInfo();
    if (userInfo)
    {
        return userInfo[field];
    }
    else
    {
        return null;
    }
}

export const createQueryParams = params => 
    Object.entries(params).map(kv => kv.map(encodeURIComponent).join("=")).join("&");


export const getQueryParams = (URLsearch) => {
    let queryParams = {};
    const query = new URLSearchParams(URLsearch);
    for (let param of query.entries()) {
        // console.log(param); 
        queryParams[param[0]] = param[1];
    }

    return queryParams;
}

//the method below returns the current date in form "YYYY-MM-DD"
// export const todayIs = () => {
//     let initialdate = new Date();
//     let fulldate = "";
//     fulldate  = fulldate  + initialdate.getFullYear() +"-";
//     if(initialdate.getMonth()+1<10)
//         fulldate  = fulldate  + "0";
//     fulldate  = fulldate  +  (initialdate.getMonth()+1) +"-";
//     if(initialdate.getDate()<10)
//         fulldate  = fulldate  + "0";
//     fulldate  = fulldate  +  initialdate.getDate();

//     return fulldate;
// }


//the methods below return the date in form "YYYY-MM-DD"

export const todayIs = () => {
    return formatDate(new Date());
}

export const tomorrowIs = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return formatDate(date);
}

export const nextDayIs = (currDate) => {
    let date = new Date(currDate);
    date.setDate(date.getDate() + 1);
    return formatDate(date);
}

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export const isLegitDate = (input) => {
    return moment(input, 'YYYY-MM-DD', true).isValid(); 
}

export const cmpDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (d1.getTime() === d2.getTime())
    {
        return 0;
    }
    
    if (d1 < d2)
    {
        return -1;
    }
    else 
    {
        return 1;
    }

}