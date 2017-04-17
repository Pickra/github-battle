var axios = require("axios");

module.exports = {
    fetchPopularRepos: function(language) {
        var searchStaredLanguages = "https://api.github.com/search/repositories?q=stars:>1+language:";
        var sortOrder = "&sort=stars&order=desc&type=Repositories";
        var encodedURI = window.encodeURI(searchStaredLanguages + language + sortOrder);

        return axios.get(encodedURI)
            .then(function(res) { return res.data.items; });
    }
};