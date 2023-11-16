module.exports = (app) => {
    app.use(
        '/admin',
        require('./genre.routes'),
        require('./login.routes'),
    );
};
