module.exports = function (React, UI) {
  var DraggableNav = React.createClass({
    getInitialState: function () {
      return {x: 0, initial: 0};
    },

    updatePosition: function (e) {
      var cx = e.clientX
        , initial = this.state.initial
        , offset;

      if (e.changedTouches) {
        cx = e.changedTouches[0].clientX;
      }

      if (this.state.initial === 0) {
        initial = cx;
      }

      offset = cx - initial;

      if (offset > 20) {
        this.reset();
      }
      else if (offset < -100) {
        this.closeIfOpen(e);
      }
      else {
        this.setState({x: offset, initial: initial});
      }
    },

    snapNav: function (e) {
      if (this.state.x < -50) {
        this.closeIfOpen(e);
      }
      else {
        this.reset();
      }
    },

    reset: function () {
      this.setState({x: 0, initial: 0});
    },

    toggleMenu: function (e) {
      e.preventDefault();
      this.refs.nav.toggle();
      this.reset();
    },

    startDrag: function (e) {
      e.preventDefault();
      console.log(e);
    },

    closeIfOpen: function (e) {
      if (this.refs.nav.state.open) {
        e.preventDefault();
        this.refs.nav.close();
        this.reset();
      }
    },

    render: function () {
      var props = {
        onDrag: this.updatePosition,
        onTouchMove: this.updatePosition,
        onTouchEnd: this.snapNav,
        draggable: true,
        style: {
          left: this.state.x,
          height: 800,
        },
        ref: 'nav',
        docked: false,
        menuItems: this.props.menuItems,
        onChange: this.props.navigate
      };

      return <UI.LeftNav {...props} />;
    },
  });

  return DraggableNav;
}