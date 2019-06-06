import React from 'react';
import CenteredPage from '../components/CenteredPage';

const Home = () => (
  <CenteredPage>
    <h1>React SSR template</h1>
    <p>SPA Production ready setup using React and Server Side Rendering with Express</p>
    <br />

    <h2>If you run ...</h2>
    <pre>
      <code>
        git clone git@github.com:IvanDimanov/react-ssr-template.git<br />
        cd react-ssr-template<br />
        npm install<br />
        npm run local-development<br />
      </code>
    </pre>

    <h2>... you will get</h2>
    <ul>
      <li>Production Webpack config with dynamic chunks - <code>npm run build</code></li>
      <li>Local development server with webpack-serve - <a href='http://localhost:8080' rel='nofollow'>http://localhost:8080</a></li>
      <li>React app with routing and Material UI - <a href='https://material-ui.com' rel='nofollow'>https://material-ui.com</a></li>
      <li>Pre-fetch data and render pages on the server with Express - <code>npm run local-development-ssr</code></li>
    </ul>
  </CenteredPage>
);

export default Home;
