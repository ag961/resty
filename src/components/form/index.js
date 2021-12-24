import React, { useEffect, useState } from "react";

import "./form.scss";

function Form(props) {

  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    console.log(method)
    e.preventDefault();

    const formData = {
      method: method || "GET",
      url: url || "https://pokeapi.co/api/v2/pokemon",
      data,
    };
    props.handleApiCall(formData);
    setMethod('');
    setUrl('');
  };

  const handleMethodChoice = (e) => {
    setMethod(e.target.innerText);
  }

  const handleChange = (e) => {
    setUrl(e.target.value);
  }

  const handleText = (e) => {
    setData(e.target.value);
  }

  const methodsArr = ['GET', 'POST', 'PUT', 'DELETE'];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            onChange={handleChange}
            placeholder="https://pokeapi.co/api/v2/pokemon" />
          <button type="submit">GO!</button>
        </label>
        <label>
          <div>JSON object</div>
          <textarea
            name="text"
            rows="10" 
            cols="50"
            onChange={handleText}
          >
          </textarea>
        </label>
        <label className="methods">
          {methodsArr.map((arrMethod, index) => (<span
            key={index}
            id={arrMethod.toLowerCase()}
            className={method === arrMethod ? "active" : ""}
            onClick={handleMethodChoice}>
            {arrMethod}
          </span>
          ))
          }
        </label>
      </form>
    </>
  );
}

export default Form;
