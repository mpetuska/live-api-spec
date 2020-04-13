# Live API Specifications
This project hosts RAML API specifications for your project.

## Use cases
* API documentations and interactive console available at `http://localhost:5001/<API_NAME>/console`
* API mock service (to be used as an API replacement when developing a service depending on that particular API) available at `http://localhost:5001/<API_NAME>`

## Developing
* To update existing specification, make necessary adjustments in the following directory: `/src/raml/<API_NAME>`
* To create a new specification, just add a new folder as `/src/raml/<API_NAME>` with `index.raml` file as root API Spec file

### Running
* `yarn start:dev` - cleans out all output files
* `yarn start:dev` - starts a dev-server with generated mock API endpoints
* `yarn build:app` - builds API mock app at `/dist`
* `yarn build:console` - builds API console app at `/dist`
* `yarn build` - builds full API mock and console app at `/dist`
* `yarn build:start` - builds and starts full API mock and console
* `yarn start` - starts a node server serving `/dist`

