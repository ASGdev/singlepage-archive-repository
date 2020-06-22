import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import History from './History';
import Repository from './Repository';
import Login from './Login';
import Logout from './Logout';
import { Menu, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
	constructor(props) {		
		super(props);

		this.state = {
		  isLoggedIn: false
		};
	}
	
	componentDidMount() {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ isLoggedIn: true });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ isLoggedIn: false });
        });
    }
	
	
  render() {
    return (
      <div>
		  <Menu size='huge'>
			<Menu.Item name='home'>
				<Link to="/">History</Link>
			</Menu.Item>
			<Menu.Item name='repository'>
				<Link to="/rep">Repository</Link>
			</Menu.Item>

			<Menu.Menu position='right'>
				<Menu.Item disabled>warcreate-repository</Menu.Item>
				<Menu.Item>
					<Button primary as={Link} to="/login">Login</Button>
					<Button primary as={Link} to="/logout">Logout</Button>
			  </Menu.Item>
			</Menu.Menu>
		  </Menu>

        <Switch>
			<Route path="/" exact component={withAuth(History)} />
			<Route path="/rep" component={withAuth(Repository)} />
			<Route path="/logout" component={Logout} />
			<Route path="/login" component={Login} /> }
        </Switch>
      </div>
    );
  }
}

export default App;
