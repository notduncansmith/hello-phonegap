module.exports = function (React, Router, Header, Menu) {
  var Layout = React.createClass({
    toggleMenu: function (e) {
      this.refs.nav.toggleMenu(e)
    },

    render: function () {
      return (
        <div>
          <Header toggleMenu={this.toggleMenu} />
          <Menu ref='nav' />

          <div className='container-fluid'>
            <Router.RouteHandler {...this.props} />
          </div>
        </div>
      );
    }
  });

  return Layout;
};