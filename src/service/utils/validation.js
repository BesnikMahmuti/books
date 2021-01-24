exports.RequestParamsValidator = params => {
    console.log("requestParamsValidator", params);
    if(!params || (params && !Object.keys(params).length)) {
        return {
            "error": {
                "location":"request_parameters",
                "msg":"Parameters should not be empty"
            }
        }
    }

    if(!params.id) {
        return {
            "error": {
                "location":"request_parameters",
                "msg":"Please provide the book id",
                "field":"id"
            }
        }
    }

    return false;
}

exports.RequestBodyValidator = body => {
    if(!body || (body && !Object.keys(body).length)) {
        return {
            "error": {
                "location":"request_body",
                "msg":"body should not be empty"
            }
        }
    }

    return false;
}

exports.BookPropertiesValidator = props => {
    if(!props) {
        return {
            "error": {
                "location":"request_body",
                "msg":"Properties of body should not be empty"
            }
        }
    }
    const { title = "", ISBN = "", author = "" } = props;

    console.log(props.hasOwnProperty("ISBN"));

    if(props.hasOwnProperty("title") && !title) {
        return {
            "error": {
                "location":"request_body",
                "msg":`Title should not be empty`,
                "field": `title`,
            }
        }
    }

    if(props.hasOwnProperty("ISBN") && !ISBN) {
        return {
            "error": {
                "location":"request_body",
                "msg":`ISBN should not be empty`,
                "field": `ISBN`,
            }
        }
    }

    if(props.hasOwnProperty("author") && !author) {
        return {
            "error": {
                "location":"request_body",
                "msg":`Author should not be empty`,
                "field": `author`,
            }
        }
    }
    
    if(props.hasOwnProperty("title") && title && typeof title !== "string") {
        return {
            "error": {
                "location":"request_body",
                "msg":`Title value should be of type string`,
                "field": `title`,
            }
        }
    }

    if(props.hasOwnProperty("ISBN") && ISBN && typeof ISBN !== "string") {
        return {
            "error": {
                "location":"request_body",
                "msg":`ISBN value should be of type string`,
                "field": `ISBN`,
            }
        }
    }

    if(props.hasOwnProperty("author") && author && typeof author !== "string") {
        return {
            "error": {
                "location":"request_body",
                "msg":`Author value should be of type string`,
                "field": `author`,
            }
        }
    }


    return false;
}

exports.ErrorHandler = (errorMessage) => {
    return {
        "error": {
            "msg": errorMessage
        }
    }
}

exports.SuccesHandler = (type, message) => {
    return {
        [type]: {
            "msg":message
        }
    }
}