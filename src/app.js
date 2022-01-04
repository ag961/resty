import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {
  const [requestParams, setRequestParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorResult, setErrorResult] = useState(false);
  const isInitialMount = useRef(true);

  const callApi = async (requestParams) => {
    setRequestParams(requestParams);
    setLoading(true);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      async function fetchData() {
        try {
          let response = await axios({
            method: requestParams.method,
            url: requestParams.url,
            data: requestParams.data
          });
          setResponse(response);
        } catch (e) {
          console.log(e);
          setErrorResult(true)
        }
        setLoading(false);
      }

      fetchData();

      return () => {
        setResponse(null);
        setErrorResult(false);
      }
    }

  }, [requestParams])

  return (
    <React.Fragment>
      <Header />
      <section>
        <div> Request Method: {requestParams.method} : </div>
        <div>URL: {requestParams.url}</div>
      </section>
      <Form handleApiCall={callApi} />
      {loading ? <div><h1>Loading...</h1></div>
        : <Results data={response} errorResult={errorResult}/>}
      <Footer />
    </React.Fragment>
  )
}

export default App;