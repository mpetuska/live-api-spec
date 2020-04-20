# Live API Specifications
This project hosts RAML API specifications for your project.

## Use cases
* API documentations and interactive console available at `http://localhost:5001`
* API mock service (to be used as an API replacement when developing a service depending on that particular API) available at `http://localhost:5001/<API_NAME>`

## Running
* `yarn clean` - cleans all build outputs
* `yarn build` - builds required modules and packages their outputs into a production bundle at `build/` 
* `yarn build:start` - same as `yarn build`, except also triggers `yarn start:production` after build
* `yarn start` - starts a DEV server on `http://localhost:5001`, serving `build/` directory

## Modules
the project consists of two modules. **mock-server** serves as a main entry point, whereas **mock-console** is just a static 
react app wrapper over `api-console` lib and is served by server module in the final bundle.

### Mock Server
This module located at `packages/mock-server` is the main connecting point, setup to serve static API console and generated RAML
responses. This module's `src/raml` directory should be the only place where you need to make any changes.

#### Running
* `yarn clean` - cleans previous build outputs
* `yarn start` - starts a DEV server on `http://localhost:5001`, serving `build/` directory & `mock-console` if built
* `yarn start:full` - same as `yarn start`, except also prebuilds `mock-console`
* `yarn start:production` - starts a node server serving `build/` directory
* `yarn build` - builds an optimised production bundle at `build/`
* `yarn build:start` - same as `yarn build`, except also triggers `yarn start:production` after build
* `yarn design` - opens `api-designer` webapp as an alternative IDE for RAML edits
* `yarn validate` - validates your RAML files (also triggered by husky before each commit)

#### Developing
* To update existing specification, make necessary adjustments in the following directory: `/src/raml/<API_NAME>`
* To create a new specification, just add a new folder as `/src/raml/<API_NAME>` with `index.raml` file as root API Spec file
  > **IMPORTANT:** Following names are reserved and are not valid RAML root folder names: `raml`, `public`

### Mock console
This module located at `packages/mock-console` should not need any changes as it's just a wrapper to provide an interactive console to query your `mock-server`

#### Running
* `yarn clean` - cleans previous build outputs
* `yarn start` - starts a DEV server on `http://localhost:3000`, querying `mock-server` on `http://localhost:5001`
* `yarn build` - builds an optimised production bundle at `build/`
