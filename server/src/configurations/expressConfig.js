
const { auth } = require('../middlewares/authenticationMiddleware');

const initExpress = (app, express) => {
    app.use(express.json());
    app.use(auth);
}

module.exports = initExpress;