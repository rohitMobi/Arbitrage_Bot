exports.validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,3}))$/.test(email)) {
        return true;
    }
    return false;
}

exports.isEmpty = (arg) => {
    if (arg !== '' && arg !== undefined && arg !== null) {
        return true;
    } else {
        return false;
    }
}

exports.validatePassword = (password) => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
        return true;
    }
    return false;
}

exports.validateMobile = (mobile) => {
    if (/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(mobile)) {
        return true;
    }
    return false;
}