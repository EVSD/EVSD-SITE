if (Meteor.isServer){
  //Server code
WebApp.rawConnectHandlers.use('/signup', function(req, res, next) {
  res.setHeader('cache-control', 'no-cache');
  next();
});
}
