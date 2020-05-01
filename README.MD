# Live API Specifications
This project provides a wrapper for your RAML api specifications.

## Use cases
* API documentations and interactive console available at `http://localhost:5001`
* API mock service (to be used as an API replacement when developing a service depending on that particular API) available at `http://localhost:5001/<API_NAME>`

### Mock Server
This module located at project root is the main connecting point, setup to serve static API console and generated RAML
responses. This module's `raml/` directory should be the only place where you need to make any changes.

#### Running
* `yarn clean` - cleans previous build outputs
* `yarn start` - starts a DEV server on `http://localhost:5001`, serving `console` if built
* `yarn start:console` - starts a console DEV server on `http://localhost:3000`
* `yarn start:full` - same as `yarn start`, except also prebuilds `console`
* `yarn start:production` - starts a node server serving `build/` directory
* `yarn build` - builds an optimised production bundle at `build/`
* `yarn build:server` - builds mock server at `build/index.js`
* `yarn build:server` - builds mock console and copies the output to `build/public/`
* `yarn build:amf` - builds AMF models from RAML at `build/raml/<api>/index.json`. Takes optional api names args to only build those, otherwise builds all.
* `yarn build:start` - same as `yarn build`, except also triggers `yarn start:production` after build
* `yarn design` - opens `api-designer` webapp as an alternative IDE for RAML edits
* `yarn validate` - validates your RAML files (also triggered by husky before each commit). Takes optional api names args to only validate those, otherwise validates all.

#### Developing
* To update existing specification, make necessary adjustments in the following directory: `raml/<API_NAME>`
* To create a new specification, just add a new folder as `/src/raml/<API_NAME>` with `index.raml` file as root API Spec file
  > **IMPORTANT:** Following names are reserved and are not valid RAML root folder names: `raml`, `public`

### Mock console
This module located at `console` should not need any changes as it's just a wrapper to provide an interactive console to query your `mock-server`

#### Running
* `yarn clean` - cleans previous build outputs
* `yarn start` - starts a DEV server on `http://localhost:3000`, querying `mock-server` on `http://localhost:5001`
* `yarn build` - builds an optimised production bundle at `console/build/`
