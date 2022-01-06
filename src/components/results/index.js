import React from "react";
import "./results.scss";
import ReactJson from 'react-json-view';

const Results = (props) => {

  let data = props.data ? props.data.data : null
  let headers = props.data ? props.data.headers : null

  return <section id="results">
    {props.data ?
      <>
        <ReactJson src={headers} name={'Headers'} displayDataTypes={true} enableClipboard={false} theme="chalk" />
        <ReactJson src={data} name={'Response'} displayDataTypes={true} enableClipboard={false} theme="chalk" />
      </>
      : props.errorResult ? <h3>Error fetching data from an API. Check your URL, method and body.</h3> : ''}
  </section>
};

export default Results;