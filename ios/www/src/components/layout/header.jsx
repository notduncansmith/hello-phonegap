module.exports = function (React, UI) {
  var Header = React.createClass({
    render: function () {
      return (
        <div className='header-wrap'>
          <div className='header'>
            <UI.RaisedButton onTouchTap={this.props.toggleMenu} onClick={this.props.toggleMenu}>
              <span className='glyphicon glyphicon-menu-hamburger'></span>
            </UI.RaisedButton>

            <h1 style={{fontFamily: 'Italianno'}}>cordova</h1>
          </div>
        </div>
      );
    }
  });

  return Header;
};