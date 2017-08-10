const React = require('react');
const ReactRouter = require('react-router-dom');
const Link = ReactRouter.Link;

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Github Battle!</h1>

        <Link className='button' to='/battle'>
          Battle
        </Link>
      </div>
    )
  }
}

module.exports = Home;
