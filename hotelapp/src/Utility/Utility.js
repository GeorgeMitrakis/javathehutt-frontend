

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

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Πρέπει να αποτελείται μόνο απο αριθμούς"};
        }
    }

    return {report: true, msg: ""};
}