import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from '../../_app';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain='dev-a6frsqhf.eu.auth0.com'
    clientId='SHDjkyyaEcFG60xo1E8kIuHE8PQoNPmK'
    redirectUri={window.location.origin}
  >
    <MyApp Component={undefined} pageProps={undefined} />
  </Auth0Provider>,
  document.getElementById('root')
);
