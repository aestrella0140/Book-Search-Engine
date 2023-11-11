const express = require('express');
const { ApolloServer } = require('@apollow/server');
const { expressMiddleware } = require('@apolloj/server/express4');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//create new instance of an Apollo server with Graphql schema

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist.index.html'));
    });
  }

  app.use(routes);
  
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`use GraphQl at http://localhsot:${PORT}/graphql`)
  });


};

startApolloServer();


// if we're in production, serve client/build as static assets


