# Dashboard (frontend)

An intuitive developer dashboard that displays the most important key figures of a sprint. The data is collected from Pivotal Tracker and Github, processed and clearly presented. The progress of the sprint, the complexity of the individual tickets, the number of open pull requests and the average lifetime of bugs and pull requests can thus be read at a glance by the members of the development team. 

![Screenshot](/docs/images/Dashboard-full.png)

## Architecture

The dashboard consists of two parts: 

 * a frontend application, which is written in JavaScript (React) and
 * a backend application, which is written in Java (Spring Boot).

![UML Component Diagram](/docs/images/architecture.png)

The [backend application](https://github.com/huddeldaddel/dashboard-backend) implements the integration of the various APIs (e.g. for Pivotal Tracker and Github). The data obtained from these external services is cached in the backend for a few minutes so that the dashboard does not encounter the API limits of the providers, even with frequent access. 

The [frontend application](https://github.com/huddeldaddel/dashboard-frontend) retrieves the data from the backend and displays it on a scaling dashboard view. The representation is roughly similar to that of Geckoboard, so that the dashboard can be seamlessly integrated into such an environment.

This repository contains the frontend code of the dashboard.

## Getting started

### Setup

1) The frontend application depends on the [backend application](https://github.com/huddeldaddel/dashboard-backend). So first of all you should follow the README of the backend application to setup your backend environment.
2) Make sure you have node and npm installed
3) Run npm install to download and install all dependencies

### Configuration

The frontend has a configuration file called `config.js` that is located in the root folder of the application. It looks something like like:

`export const CONFIG = {
    serverUrl: '',
    trackerProject: 1234567
};`

When running the frontend locally (using `npm run start`) against a local backend system, you might want to set the serverUrl prooperty to something like 'http://localhost:8080', where 8080 is the port of your backend. The value for production should be just an empty string. This will send all REST requests to the backend server that served the HTML file for the frontend. 

The trackerProject property should be set to the ID of the tracker project. It will be used to generate links to that project.

### Running the code

To run the frontend application locally, just type `npm run start`

### Compiling the code for production use

To compile the frontend application for production use, just type `webpack`
