# Cafienne-UI


This is the Cafienne-UI which serves as a front-end for the Cafienne case file engine.

The UI is built using [Google Polymer Project 1.0](https://www.polymer-project.org/1.0/).

Development was started using the [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit) and
Yeoman generator [Generator Polymer](https://github.com/yeoman/generator-polymer)


## Development/Local running

To start developing this UI you there are some prerequisites:

* node.js ~ 4.2.1
* npm ~ 3.3.8
* bower @1.6.3
* yeoman @1.4.8
* gulp @3.9.0
* generator-polymer @1.2.4

They all need to be installed globally (i.e. with `npm install -g`)

To develop/run the ui locally execute the following steps:

1. Install the prereqs mentioned above.
2. Check out the project from GitHub [cafienne-ui](https://github.com/cafienne/cafienne-ui.git)
3. Run `npm install` and `bower install`
4. To run the local server (in dev mode) run `gulp serve`

> For now the UI expects that the cafienne engine is running on localhost:18082


For the various other commands for Gulp and Yeoman generator, please read the documentation of the respective projects.



