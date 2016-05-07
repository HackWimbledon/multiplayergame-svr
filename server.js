var restify = require('restify');

function doWorld(objUser){
  var response={
    success:true,
    status:"OK",
    gametime:new Date()
  }
  return response;
}
function doAct(action){
  var response={
    success:false,
    message:"no message"
  }
  if(action=="thrust"){
    response.success=true;
    response.message="thrusting";
  }
  if(action=="fire"){
    response.success=true;
    response.message="firing";
  }
  if(action=="turn"){
    response.success=true;
    response.message="turning"
  }
  return response;
}

function respond(req, res, next) {
  var actionResponse={success:false}
  var worldResponse={success:false}
  if(req.params.act){
    actionResponse=doAction(req.params.act,req.params.user);
  }
  worldResponse=doWorld(req.params.user);
  var response={
    world:worldResponse,
    action:actionResponse
  }
  res.send(response);
  next();
}

function respondPing(req, res, next) {
  var actionResponse={success:false}
  var worldResponse={success:false}

  worldResponse=doWorld(req.params.user);
  var response={
    world:worldResponse,
    action:actionResponse
  }
  res.send(response);
  next();
}

var server = restify.createServer();
server.get('/action/:user/:act/:value', respond);
server.head('/action/:user/:act/:value', respond);
server.get('/ping/:user', respondPing);
server.head('/ping/:user', respondPing);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
