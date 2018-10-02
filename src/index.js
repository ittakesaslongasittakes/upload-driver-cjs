import { run } from "@cycle/run";
import { makeDOMDriver } from "@cycle/dom";
import onionify from "cycle-onionify";
import { App } from "./app";

/*
* State management for App
* https://github.com/staltz/cycle-onionify
* */
const main = onionify(App);

/*
* Connect Drivers
* https://cycle.js.org/drivers.html
* */

const drivers = {
  DOM: makeDOMDriver("#root")
};

/*
* Cycle Run
* */
run(main, drivers);
