const isUser = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401);
    }
}
const isGuest = (req, res, next) => {
    if (!req.user) {
        next();
    } else {
        res.status(401);
    }
}
const isOwner = (req, res, next) => {
    //Check if needed and how to get shit from the DB

    next();
}

module.exports = {
    isGuest,
    isUser,
    isOwner
}