var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

const SelectLanguage = props => {
  var languages = ['All', 'Javascript', 'Java', 'Ruby', 'Python', 'CSS'];
  return (
    <ul className='languages'>
      {languages.map((language, index) => {
        return (
          <li style={language === props.selectedLanguage ? {color: '#d0021b'} : null}
            key={index}
            onClick={props.onSelect.bind(null, language)}>
            {language}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(language) {
    this.setState(() => {
      return {
        selectedLanguage: language,
        repos: null
      }
    })

    api.fetchPopularRepos(language)
      .then(repos => {
        this.setState(() => {
          return {
            repos
          }
        })
      })
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    )
  }
}

module.exports = Popular;
