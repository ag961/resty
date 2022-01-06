import React, { useState, useEffect, useRef, useReducer } from 'react';
import axios from 'axios';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import History from './components/history';
import Results from './components/results';

const initialState = {
  requestParams: {},
  response: null,
  loading: false,
  errorResult: false,
  history: []
}

const ACTIONS = {
  ADD_REQUESTPARAMS: 'ADD_REQUESTPARAMS',
  UPDATE_RESPONSE: 'UPDATE_RESPONSE',
  RECEIVED_ERROR_RESULT: 'RECEIVED_ERROR_RESULT',
  CLEAR_PREV_RESPONSE_AND_ERROR: 'CLEAR_PREVIOUS_RESPONSE',
  SHOW_SAVED_RESPONSE: 'SHOW_SAVED_RESPONSE'
}

function App() {
  function reducer(state, action) {
    // console.log(action)
    switch (action.type) {
      case ACTIONS.ADD_REQUESTPARAMS:
        return { ...state, requestParams: action.payload, loading: true, history: [...state.history, action.payload] }
      case ACTIONS.UPDATE_RESPONSE:
        let historyCopy = [...state.history];
        historyCopy[historyCopy.length - 1]['response'] = action.payload
        return { ...state, response: action.payload, loading: false, history: historyCopy}
      case ACTIONS.RECEIVED_ERROR_RESULT:
        return { ...state, response: null, errorResult: true, loading: false }
      case ACTIONS.CLEAR_PREVIOUS_RESPONSE:
        return { ...state, response: null, errorResult: false }
      case ACTIONS.SHOW_SAVED_RESPONSE:
        return {...state, response: state.history[action.payload].response}
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const isInitialMount = useRef(true)

  function callApi(requestParams) {
    dispatch({ type: ACTIONS.ADD_REQUESTPARAMS, payload: requestParams })
  }

  function showSavedResponse(e) {
    console.log('click event', e.target)
    dispatch({type: ACTIONS.SHOW_SAVED_RESPONSE, payload: e.target.value})
  }

  useEffect(() => {
    console.log('running useEffect')
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      async function fetchData() {
        try {
          let response = await axios({
            method: state.requestParams.method,
            url: state.requestParams.url,
            data: state.requestParams.data
          });
          dispatch({ type: ACTIONS.UPDATE_RESPONSE, payload: response })
        } catch (e) {
          // console.log(e);
          dispatch({ type: ACTIONS.RECEIVED_ERROR_RESULT })
        }
      }

      fetchData();

      return () => {
        dispatch({ type: ACTIONS.CLEAR_PREV_RESPONSE_AND_ERROR })
      }
    }

  }, [state.requestParams])

  return (
    <React.Fragment>
      <Header />
      <section>
        <div> Request Method: {state.requestParams.method} : </div>
        <div>URL: {state.requestParams.url}</div>
      </section>
      <Form handleApiCall={callApi} />
      <div id="history-results">

        <History data={state.history} showResult={showSavedResponse} />
        {state.loading ? <div><h1>Loading...</h1></div>
          : <Results data={state.response} errorResult={state.errorResult} />}
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default App;