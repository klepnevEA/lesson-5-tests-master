import React, {Component} from 'react';
import './App.css';
import {addListener, removeListener, isAuthorized} from './AuthorizeApi';
import {Link,Route,Switch,Redirect} from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import Private from './Private';
import Public from './Public';

class App extends Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({isAuthorized});
  };

  render() {
    const { isAuthorized } = this.state;
    return (
      <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>
                            <Link to="/auth">Войти</Link>
                        </li>
                        <li>
                            <Link to="/private">Секретная страница</Link>
                        </li>
                        <li>
                            <Link to="/public">Публичная страница</Link>
                        </li>
                        
                    </ul>
                </nav>
                <hr />
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/auth"
                            render={props => (
                                <Auth isAuthorized={isAuthorized} {...props} />
                            )}
                        />
                        {isAuthorized === true ? (
                            <Route path="/private" component={Private} />
                        ) : (
                            <Redirect from="/private" to="/auth" />
                        )}
                        <Route path="/public" component={Public} />
                        

                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
    );
  }
}

export default App;
