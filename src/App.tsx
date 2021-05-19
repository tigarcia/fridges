import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import SingleFridgeSummary from './SingleFridgeSummary';
import Navigation from './Navigation';
import SelectFridge from './SelectFridge';

function App() : ReactElement {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path="/fridge/:fridgeId">
          <SingleFridgeSummary />
        </Route>
        <Route exact path="/">
          <SelectFridge />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
