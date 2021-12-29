import React from 'react';
import axios from 'axios';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
      loading: false,
      title: '-RESTy-'
    };
  }

  callApi = async (requestParams) => {
    // mock output
    const mockData = {
      count: 2,
      results: [
        { name: 'fake thing 1', url: 'http://fakethings.com/1' },
        { name: 'fake thing 2', url: 'http://fakethings.com/2' },
      ],
    };

    let data;
    try {
      this.setState({
        loading: true
      })
      data = await axios({
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.data
      });
    } catch (e) {
      data = mockData;
    }

    this.setState({ data, requestParams, loading: false });
  }

  render() {
    let footerText = '&copy; Ayrat Gimranov 2022'
    return (
      <React.Fragment>
        <Header title={this.state.title}/>
        <section>
          <div>Request Method: {this.state.requestParams.method}</div>
          <div>URL: {this.state.requestParams.url}</div>
        </section>
        <Form handleApiCall={this.callApi} />
        {this.state.loading ? <div><h1>Loading...</h1></div>
          : <Results data={this.state.data} />}
        <Footer footerText={footerText}/>
      </React.Fragment>
    );
  }
}

export default App;