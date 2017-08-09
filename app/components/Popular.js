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

const RepoGrid = props => {
  return (
    <ul className='popular-list'>
        {props.repos.map((repo, index) => {
          return (
            <li key={repo.name} className='popular-item'>
              <div className='popular-rank'>
                #{index + 1}
              </div>
              <ul className='space-list-items'>
                <li>
                  <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={'Avatar for ' + repo.owner.login} />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
            </li>
          )
        })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
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
        {!this.state.repos
          ? <p>Loading</p>
          : <RepoGrid repos={this.state.repos}
        />}
      </div>
    )
  }
}

module.exports = Popular;
