const status = require('../src/health/routes');
const users = require('../src/users/routes');
const posts = require('../src/posts/routes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');

module.exports = (app) => {
  app.use('/status', status);
  app.use('/users', users);
  app.use('/posts', posts);
  // app.use('/users', validateAuth.checkIfAuthenticated, getData.getGeoip, users);
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
