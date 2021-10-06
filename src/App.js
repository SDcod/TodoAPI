import React from "react";
import { Todos } from "./Todos";
import Todo from "./Todo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <div className='mainPage'>
            <Route path='/' children={<Todos />} />
            <Route path='/todo/:id/:Todoid/:Todotitle' children={<Todo />} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
