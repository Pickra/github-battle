var axios = require("axios");

// GH api id info
// var id = "YOUR_CLIENT_ID";
// var sec = "YOUR_SECRET_ID";
// var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(userName) {
    return axios.get("https://api.github.com/users/" + userName) // add params if needed
        .then(function(user) { return user.data; })
}

function getRepos(userName) {
    return axios.get("https://api.github.com/users/" + userName + "/repos" + "&per_page=100");  // add params if needed
}

function getStarCount(repos) {
    return repos.data.reduce(function(count, repo) {
        return count + repo.stargazers_count;
    }, 0)
}

function calcualteScore(profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios
        .all([getProfile(player), getRepos(player)])
        .then(function(data) {
            var profile = data[0];
            var repos = data[1];

            return {
                profile: profile,
                score: calcualteScore(profile, repos)
            }
        })
}

function sortPlayers(players) {
    return players.sort(function(a, b) { return b.score - a.score; })
}

module.exports = {
    battle: function(players) {
        return axios
            .all([players.map(getUserData)])
            .then(sortPlayers)
            .catch(handleError)
    },
    fetchPopularRepos: function(language) {
        var searchStaredLanguages = "https://api.github.com/search/repositories?q=stars:>1+language:";
        var sortOrder = "&sort=stars&order=desc&type=Repositories";
        var encodedURI = window.encodeURI(searchStaredLanguages + language + sortOrder);

        return axios.get(encodedURI)
            .then(function(res) { return res.data.items; });
    }
};