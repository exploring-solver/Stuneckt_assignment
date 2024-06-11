const status = require('../src/health/routes');
const users = require('../src/users/routes');
const posts = require('../src/posts/routes');
const follow = require('../src/follow/routes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Welcome to the  Stuneckt API made by aman sharma @exploring-solver!')
  })
  app.use('/status', status);
  app.use('/users', users);
  app.use('/posts', posts);
  app.use('/follow', follow);
  // app.use('/users', validateAuth.checkIfAuthenticated, getData.getGeoip, users);
  app.use('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/admin')) {
      return next(); // Pass the request to the next middleware
    }

    // For all other URLs, return a 404 response
    res.status(404).send('Not found!!!');
  });
};
