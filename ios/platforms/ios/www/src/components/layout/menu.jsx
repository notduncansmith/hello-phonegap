module.exports = function (React, Router, UI, DraggableNav) {
  var menuItems = [
    {route: '/', text: 'Home'},
    {route: '/feed', text: 'Feed'},
    {route: '/notifications', text: 'Notifications'}
  ];

  var Menu = React.createClass({
    mixins: [Router.Navigation, Router.State],

    contextTypes: {
      router: React.PropTypes.func
    },

    toggleMenu: function (e) {
      this.refs.nav.toggleMenu(e);
    },

    navigate: function (e, key, payload) {
      this.transitionTo(payload.route);
    },

    render: function () {
      return <DraggableNav ref='nav' menuItems={menuItems} navigate={this.navigate} />;
    }
  });

  return Menu;
};