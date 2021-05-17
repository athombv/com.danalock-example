'use strict';

const Homey = require('homey');
const Log = require('homey-log');

class Danalock extends Homey.App {
	onInit() {
		this.log(`${Homey.app.id} is running...`);
	}
}

module.exports = Danalock;
