var React = require("react");
var PropTypes = require("prop-types");
var Link = require("react-router-dom").Link;

function PlayerPreview(props) {
    return (
        <div>
            <div className="column">
                <img
                    className="avatar"
                    src={props.avatar}
                    alt={"Avatar for " + props.userName }
                />
                <h2 className="username">@{props.userName}</h2>
            </div>
            <button
                className="reset"
                onClick={props.onReset.bind(null, props.id)}
            >Reset</button>
        </div>
    );
}

PlayerPreview.PropTypes = {
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
};

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = { userName: "" };

        this.updateUserName = this.updateUserName.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    updateUserName(event) {
        var value = event.target.value;

        this.setState(function() {
            return { userName: value }
        })
    }

    onFormSubmit (event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.userName);
    }

    render() {
        return(
            <form className="column" onSubmit={this.onFormSubmit}>
                <label className="header" htmlFor="userName">
                    {this.props.label}
                </label>
                <input
                    id="userName"
                    placeholder="github username"
                    type="text"
                    autoComplete="off"
                    value={this.state.userName}
                    onChange={this.updateUserName}
                />
                <button
                    className="button"
                    type="submit"
                    disabled={!this.state.userName}
                >Submit</button>
            </form>
        );
    }
}

PlayerInput.PropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: "",
            playerTwoName: "",
            playerOneImg: null,
            playerTwoImg: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, userName) {
        this.setState(function () {
            var newState = {};
            newState[id + "Name"] = userName;
            newState[id + "Img"] = "https://github.com/" + userName + ".png?size=200";

            return newState;
        });
    }

    handleReset(id) {
        this.setState(function() {
            var newState = {};
            newState[id + "Name"] = "";
            newState[id + "Img"] = null;

            return newState;
        })
    }

    render() {
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImg = this.state.playerOneImg;
        var playerTwoImg = this.state.playerTwoImg;

        return(
            <div>
                <div className="row">
                    {!playerOneName &&
                        <PlayerInput
                            id="playerOne"
                            label="Player One"
                            onSubmit={this.handleSubmit}
                        />}

                    {playerOneImg !== null &&
                        <PlayerPreview
                            avatar={playerOneImg}
                            userName={playerOneName}
                            onReset={this.handleReset}
                            id="playerOne"
                        />}

                    {!playerTwoName &&
                        <PlayerInput
                            id="playerTwo"
                            label="Player Two"
                            onSubmit={this.handleSubmit}
                        />}

                    {playerTwoImg !== null &&
                        <PlayerPreview
                            avatar={playerTwoImg}
                            userName={playerTwoName}
                            onReset={this.handleReset}
                            id="playerTwo"
                        />}
                </div>

                {playerOneImg && playerTwoImg &&
                    <Link
                        className="battle-button"
                        to={{
                            pathname: match.url + "/results",
                            search: "?playerOneName=" + playerOneName + "&playerTwoName=" + playerTwoName
                        }}
                    >Battle!</Link>}
            </div>
        );
    }
}

module.exports = Battle;