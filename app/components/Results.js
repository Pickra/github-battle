var React = require("react");

class Results extends React.Component {
    render() {
        console.log("props", this.props)
        return (
            <div>Results</div>
        );
    }
}

module.exports = Results;