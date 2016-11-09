var Table = React.createClass({
		render: function() {
				return (
						React.createElement('table',{},
								React.createElement('tr',{},
										React.createElement('td',{},"Test")
								)
						)
				);
		}
});

/*
var Cell = React.createClass({
		propTypes: {
				id: React.PropTypes.number.isRequired,
				color: React.PropTypes.string.isRequired
		},
		
		render: function() {
				return (
						React.createElement(
				)
		}
});
*/

var rootElement = React.createElement('div',{}, 
                      React.createElement('p',{},"Test"));
/*
React.createElement('div',{},
		React.createElement('table',{},
								React.createElement('tr',{},
										React.createElement('td',{},"Test")
								)
		)
);
*/
/*
  React.createElement('div', {}, 
    React.createElement('h1', {}, "Contacts"),
    React.createElement('ul', {},
      React.createElement('li', {},
        React.createElement('h2', {}, "James Nelson"),
        React.createElement('a', {href: 'mailto:james@jamesknelson.com'}, 'james@jamesknelson.com')
      ),
      React.createElement('li', {},
        React.createElement('h2', {}, "Joe Citizen"),
        React.createElement('a', {href: 'mailto:joe@example.com'}, 'joe@example.com')
      )
    )
  );
*/
ReactDOM.render(rootElement, document.getElementById('project_dash'));