var React = require('react');

var Popular = require('./Popular');

class App extends React.Component {
  render() {
    return (
      <div className='Container'>
        <Popular />
      </div>
    )
  }
}

module.exports = App;
