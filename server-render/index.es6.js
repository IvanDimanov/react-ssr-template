import fs from 'fs';
import path from 'path';

import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';

import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';
import {ServerStyleSheets} from '@material-ui/styles';

import generateInitialFetchedServerData from './generateInitialFetchedServerData';
import {clearInitialFetchedServerData} from '../src/dataFetchers/initialFetchedServerData';
import Routes from '../src/routes.server';

const PORT = 3000;

express()
    .disable('x-powered-by')

    /* Keep track of each request and how much time did it took to resolve */
    .use(expressWinston.logger({
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
      ),
      meta: false,
      colorize: true,
      expressFormat: true,
    }))

    /* Serve all static files like App JS, bundles for vendors, CSS, static images, etc. */
    .use( express.static(path.resolve(__dirname, '../dist')) )

    /**
     * Handles every request that is not a static file.
     * Main purpose of this route is to generate the React App into static HTML, fill it with pre-fetched data,
     * and return the updated `index.html` file so the Browser can `hydrate` the React App wil the data and HTML markup.
     */
    .use(async (request, response) => {
      const indexFileContent = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');

      /* Have a fresh data copy for each Page load */
      clearInitialFetchedServerData();

      /* Pre-fetch all data needed for the current Page `request` */
      await generateInitialFetchedServerData(request);

      /* Generate a static HTML of the App for the specific request URL */
      const context = {};
      const sheets = new ServerStyleSheets();
      const appHtmlString = renderToString(
          sheets.collect(
              <StaticRouter context={context} location={request.url}>
                <Routes />
              </StaticRouter>
          )
      );

      /* Check if the App needs to redirect to a different page, e.g. route `/` redirects to route `/home` */
      if (context.url) {
        response.redirect(context.url);
        return;
      }

      /* Grab the CSS from the generated HTML App */
      const css = sheets.toString()
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' '); // Basic code minimization

      /* Replace the App place holder with statically generated HTML for this specific URL */
      const updatedPageContent = indexFileContent
          .replace('</head>', `<style id="jss-server-side">${css}</style></head>`)
          .replace('</head>', `
              <script>
                window.__INITIAL_FETCHED_SERVER_DATA__ = ${JSON.stringify(global.__INITIAL_FETCHED_SERVER_DATA__)};
              </script>
            </head>
          `)
          .replace('<div id="app" />', `<div id="app">${appHtmlString}</div>`);

      response
          .status(200)
          .send(updatedPageContent);
    })

    .listen(PORT, () => {
      process.stdin.write(`\nServer Side Rendering on port ${PORT}\n`);
    });
