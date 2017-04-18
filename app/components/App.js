var React = require("react");
var Popular = require("./Popular");
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require("./Nav");
var Home = require("./Home");
var Battle = require("./Battle");

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/battle" exact component={Battle} />
                        <Route path="/popular" component={Popular} />
                        <Route render={function(props) {
                            return <p>This is not the route you're looking for.</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;