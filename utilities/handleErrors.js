
//Wraps controllers so errors are passed to Express

function handleErrors(fn){
    return(req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = handleErrors;