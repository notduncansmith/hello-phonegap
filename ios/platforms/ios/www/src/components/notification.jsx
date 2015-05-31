module.exports = function (React, Bootstrap, Link, UI) {
  var Row = Bootstrap.Row;
  var Col = Bootstrap.Col;
  var Grid = Bootstrap.Grid;

  var Notification = React.createClass({
    onClick: function(event) {
      event.preventDefault();

    },
    render: function () {
      var title = this.props.title;
      var route = this.props.route || '/';
      var body = this.props.body;

      return (
        <Link to={route} params={this.props}>
          <UI.Paper zDepth={1}>
            <Row className='item notification'>
              <Col xs={12}>
                <p className='title'>{title}</p>
                <p className='body'>{body}</p>
              </Col>
            </Row>
          </UI.Paper>
        </Link>
      );
    }
  });

  return Notification;
};