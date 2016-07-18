// const Path = require('path');
// const Hapi = require('hapi');
// const Inert = require('inert');
//
// const server = new Hapi.Server();
// server.connection({ port: 3000 });
//
// server.register(Inert, function (err) {
//     if (err) console.log(err);
// });
// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
//         //reply.file(Path.join(__dirname, 'client/index.html'));
//     }
// });
//
// server.start((err) => {
//
//     if (err) {
//         throw err;
//     }
//
//     console.log('Server running at:', server.info.uri);
// });
var Hapi = require('hapi')

// create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: process.env.HOST || 'localhost',
  port: 3000,
  routes:{
    cors: true
  }
});


// server.route({
//   method:'GET',
//   path:'/',
//   handler:function(request, response) {
//     response('I am working')
//   }
// })
//   server.start(function(err) {
//     console.log('Server started at: ' + server.info.uri)
//   })

server.register({
  register: require('inert')
}, function(err) {
  if (err) throw err

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
      reply.file('./client/index.html')
    }
  });

  server.route({
    method: 'GET',
    path: '/js/{path}',
    handler: function(request, reply){
      reply.file('./client/js/' + request.params.path);
    }
  });

  server.route({
    method: 'GET',
    path: '/styles/{path}',
    handler: function(request, reply){
      reply.file('./client/styles/' + request.params.path);
    }
  });

  server.start(function(err) {
    console.log('Server started at: ' + server.info.uri)
  })
})
