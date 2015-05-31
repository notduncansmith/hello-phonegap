module.exports = function (
  React,
  Router,
  Route,
  DefaultRoute,
  Layout,
  Feed,
  Data,
  Notifications
) {
  var Home = React.createClass({
    render: function () {
      return (<h1>You are home! :D</h1>);
    }
  });

  var routes = (
    <Route name='app' path='/' handler={Layout}>
      <Route name='feed' handler={Feed}/>
      <Route name='notifications' handler={Notifications}/>
      <DefaultRoute handler={Home}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    var appNode = document.getElementById('app');
    React.render(<Handler db={Data}/>, appNode);
  });
};