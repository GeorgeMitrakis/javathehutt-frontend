

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
        const pattern = /^[a-zA-Zα-ωΑ-Ω]+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Πρέπει να αποτελείται μόνο από γράμματα"}
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