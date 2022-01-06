import React from "react";
import "./history.scss";


const history = (props) => {
  // console.log('history: ', props.data)
  return <section id="history">
    <h1>History</h1>
    {props.data.map((history, i) => <li key={i} value={i} onClick={props.showResult}> <b>Method:</b> {history.method} <b>URL:</b> {history.url}</li>)}

  </section>

};

export default history;