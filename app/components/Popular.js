const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

const Loading = require('./Loading');

const SelectLanguage = ({selectedLanguage, onSelect}) => {
  const languages = ['All', 'Javascript', 'Java', 'Ruby', 'Python', 'CSS'];
  return (
    <ul className='languages'>
      {languages.map((language) => (
        <li
          style={language === selectedLanguage ? {color: '#d0021b'} : null}
          key={language}
          onClick={() => onSelect(language)}>
          {language}
        </li>
      ))}
    </ul>
  )
}

const RepoGrid = ({repos}) => {
  return (
    <ul className='popular-list'>
        {repos.map(({name, owner, stargazers_count, html_url}, index) => (
            <li key={name} className='popular-item'>
              <div className='popular-rank'>
                #{index + 1}
              </div>
              <ul className='space-list-items'>
                <li>
                  <img
                    className='avatar'
                    src={owner.avatar_url}
                    alt={`Avatar for ${owner.login}`} />
                </li>
                <li><a href={html_url}>{name}</a></li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
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
    this.setState(() => ({
        selectedLanguage: language,
        repos: null
      }));

    api.fetchPopularRepos(language)
      .then(repos => this.setState(() => ({repos})));
  }
  render() {
    const { selectedLanguage, repos } = this.state;

    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos
          ? <Loading text='DOWNLOADING' speed={200}/>
          : <RepoGrid repos={repos}
        />}
      </div>
    )
  }
}

module.exports = Popular;
