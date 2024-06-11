const config = require('./config');
const app = require('./app')

const PORT = process.env.PORT || config.port;

const start = async () => {
  // Dynamically import AdminJS and @adminjs/mongoose
  const { default: AdminJS } = await import('adminjs');
  const AdminJSMongoose = await import('@adminjs/mongoose');
  const { buildRouter } = await import('@adminjs/express');

  // Import User and Post models
  const User = require('./src/users/models/mongoose'); // Ensure this path is correct
  const Post = require('./src/posts/models/mongoose'); // Ensure this path is correct

  // Register AdminJS Mongoose adapter
  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  // Configure AdminJS
  const adminOptions = {
    resources: [
      { resource: User, options: { parent: { name: 'User Management' } } },
      { resource: Post, options: { parent: { name: 'Content Management' } } },
    ],
    rootPath: '/admin',
  };

  const admin = new AdminJS(adminOptions);
  const adminRouter = buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
