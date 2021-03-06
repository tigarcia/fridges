import React, {
  ReactElement,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SingleFridgeAllCharts from './SingleFridgeAllCharts';
import Navigation from './Navigation';
import SelectFridge from './SelectFridge';
import computeSummaryStats from './computeSummaryStats';

const FRIDGE_SERVER_URL = (
  process.env.NODE_ENV === 'production'
    ? 'https://rigetti-backend.herokuapp.com'
    : 'http://localhost:5000'
);

/**
 * The main entry point to the application
 *
 * The component makes the request for the data
 * from the backend and saves that data to state.
 *
 * There is a memoized function call that computes
 * statistics on that data.
 *
 * The component renders the fridge selection component
 * if the user is on the '/' route or the fridge details
 * if the user is on the '/fridges/id' route
 */
function App() : ReactElement {
  const [fridgeData, setFridgeData] = useState([]);
  const [error, setError] = useState(false);

  const summaryFridgeData = useMemo(
    () => computeSummaryStats(fridgeData),
    [fridgeData],
  );

  useEffect(() => {
    async function getFridgeData() {
      const url = `${FRIDGE_SERVER_URL}/fridge-stats`;
      try {
        const data = await axios.get(url);
        setFridgeData(data.data);
      } catch {
        setError(true);
      }
    }

    getFridgeData();
  }, []);

  function renderPage() {
    if (error) {
      return <h3>The server is currently unavailable</h3>;
    }

    if (fridgeData.length === 0) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <Switch>
        <Route exact path="/fridge/:fridgeId">
          <SingleFridgeAllCharts data={summaryFridgeData} />
        </Route>
        <Route exact path="/">
          <SelectFridge data={summaryFridgeData} />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        {renderPage()}
      </div>
    </BrowserRouter>
  );
}

export default App;
