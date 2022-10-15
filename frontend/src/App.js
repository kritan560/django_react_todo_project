import React, { useState } from "react";
import { Switch, Route, Link, useHistory, useLocation } from 'react-router-dom' // in dom@6^ we use Routes instead of Switch
import 'bootstrap/dist/css/bootstrap.min.css'
import AddTodo from "./components/add-todo";
import Login from "./components/login";
import TodosList from "./components/todos-list";
import Signup from "./components/Signup";
import Container from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import TodoDataService from "./services/todos";
import PageNotFound from "./components/PageNotFound";
import NotLoggedin from "./components/NotLoggedIn";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn";

let trapLocation = []
function App() {
  const navigate_to = useHistory()
  const [userName, setUser] = useState(null)
  const [token, setToken] = React.useState(localStorage.getItem('token'))
  const [error, setError] = React.useState('')
  let location = useLocation()
  trapLocation.push(location.pathname)
  if (trapLocation.length > 2) {
    trapLocation = []
  }
  console.log('traplocation', trapLocation.length)
  console.log(trapLocation)
  
  // 1st load login.jsx and the it ask for username and password and return it via props to login function (app.js) and 2nd further app.js runs with login function where tododataservice api class login method which takes username and password then returns the response.
  async function login(user) {
    //default user to null
    await TodoDataService.login(user)
      .then(response => {
        setToken(response.data.token) // it gets token from views.py return JsonResponse({'token':str(token)}, status=201)
        setUser(user.username) // it gets username from login.jsx. where it send the json format username and password
        localStorage.setItem('token', response.data.token); // can use getItem to take the token
        localStorage.setItem('user', user.username);// can use get item to get username
        setError('');
        navigate_to.push(trapLocation[0])
      })
      .catch(e => {
        console.log('login', e);
        setError(e.toString());
      });
  }

  async function logout() {
    setToken('')
    setUser('')
    localStorage.setItem('token', '')
    localStorage.setItem('user', '')
    navigate_to.push('/')
  }

  async function signup(user = null) {
    // calls to the API and returns the response 
    TodoDataService.signup(user)
      .then((response) => {
        setToken(response.data.token)
        setUser(user.username)
        console.log('signup token state', token)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', user.username)
      })
      .catch((error) => {
        console.log(error)
        setError(error.toString())
      })
  }

  function getById(){
    TodoDataService.getById()
  }

  return (
    <div className="App">
      <Navbar bg="warning" variant="light">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to="/todos">Todos</Link>
              {token ? (
                <Link to='/#' className="nav-link" onClick={logout}>Logout ({localStorage.getItem('user')})</Link>
              ) : (
                <>
                  <Link className="nav-link" to="/login">Login</Link>
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
      <div className="container mt-4">
        <Switch>

          <Route path="/login" render={(props) => localStorage.getItem('token').length > 0 ? <AlreadyLoggedIn /> : <Login {...props} login={login} />}></Route>

          <Route path="/signup" render={(props) => <Signup {...props} signup={signup} />}></Route>

          <Route exact path={['/', '/todos']} render={(props) => <TodosList {...props} token={token} />}></Route>

          <Route path={'/todos/create'} render={(props) => <AddTodo {...props} token={token} />}></Route>

          <Route path="/todos/:id" render={(props) => <AddTodo {...props} token={token} />}></Route>

          {/* <Route path="/login" render={(props) => <Login {...props} login={login} />}></Route> */}

          <Route path="*" render={PageNotFound}></Route>

        </Switch>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4 fixed-bottom">
        <div className="text-center p-4">
          © Copyright -
          <a
            // target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/KritanShresth13"> Kritan Shrestha
          </a>
        </div>
      </footer>
    </div>
  )

}

export default App;
