import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as isbot from 'isbot';
import * as path from 'path';

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();
global['navigator'] = mock.getNavigator();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const server = express();

  const distFolder = join(process.cwd(), './dist/Licenta');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  isbot.extend(['Mozilla/5.0 (compatible; vkShare; +http://vk.com/dev/Share)', 'PostmanRuntime/7.25.0']);

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y',
  }));

  // server.get('*', (req, res) => {
  //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  // });
  server.get('*', (req: express.Request, res: express.Response) => {

    let header = req.header('User-Agent');
    // check whether User-Agent is bot
    if (isbot(header) && header.includes('facebookexternalhit')) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      res.render(indexHtml, {
        req, providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
        ]
      });

    } else {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
      res.sendFile(path.join(__dirname, '../index.html'));
    }
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';