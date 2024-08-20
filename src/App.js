import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {},
    loading: false,
  });
  const apiurl = 'http://www.omdbapi.com/?apikey=ba8e2193';

  const search = (e) => {
    if (e.key === 'Enter') {
      setState((prevState) => {
        return { ...prevState, loading: true };
      });
      axios(apiurl + '&s=' + state.s).then(({ data }) => {
        let results = data.Search;

        setState((prevState) => {
          return { ...prevState, results: results, loading: false };
        });
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;
    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (id) => {
    axios(apiurl + '&i=' + id).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Movie search</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        {state.loading ? (
          <h1 className="loader-dummy">Loading .....</h1>
        ) : (state.results.length === 0) & !state.loading ? (
          <h1 className="loader-dummy">Search your favirate movie</h1>
        ) : (state.results !== undefined) & !state.loading ? (
          <Results results={state.results} openPopup={openPopup} />
        ) : (
          <h1 className="loader-dummy">Movie not found</h1>
        )}

        {typeof state.selected.Title != 'undefined' ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
};

export default App;
