import React from 'react';
import { Route } from 'react-router-dom'
import "./button-redirect.style.css"

const ButtonRedirect = ({route, text}) => (
  
  <Route render={({ history }) => (
    <button className="redirect"
      type='button'
      onClick={() => { history.push(route) }}
    >
      {text}
    </button>
  )} />
);

export default ButtonRedirect;