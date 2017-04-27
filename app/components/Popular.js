var React = require("react");
var PropTypes = require("prop-types");
var api = require("../utils/api");
var Loading = require("./Loading");

function SelectLanguage(props) {
    var languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

    return (
        <ul className="languages">
            {languages.map(function(l) {
                return (
                    <li
                        style={l === props.selectedLanguage ? {color: "red"} : null}
                        onClick={props.onSelect.bind(null, l)}
                        key={l}
                    >{l}</li>
                );
            })}
        </ul>
    )
}

function RepoGrid(props) {
    return (
        <ul className="popular-list">
            {props.repos.map(function(repo, index) {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="popular-item-info">
                            <li>
                                <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={"Avatar for " + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>
                                <a href={repo.owner.html_url}>@{repo.owner.login}</a>
                            </li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    );
}

RepoGrid.PropTypes = {
    repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: "All",
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(function() {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang)
            .then(function(repos) {
                this.setState(function() {
                    return { repos: repos }
                })
            }.bind(this));
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                { !this.state.repos ?
                    <Loading text="Hold Your Horses" speed={100} /> :
                    <RepoGrid repos={this.state.repos} />
                }
            </div>
        )
    }
}

module.exports = Popular;