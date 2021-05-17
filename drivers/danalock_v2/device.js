'use strict';

const ZwaveLockDevice = require('homey-meshdriver').ZwaveLockDevice;

class DanalockV2 extends ZwaveLockDevice {
	async onMeshInit() {
		await super.onMeshInit();
		this._migrateSettings();
		this.registerCapability('locked', 'DOOR_LOCK');
		this.registerCapability('locked', 'NOTIFICATION');
		this.registerCapability('measure_battery', 'BATTERY');
	}

	_migrateSettings() {
		const settingsMap = [
			{ from: '1', to: 'direction' },
			{ from: '2', to: 'speed' },
			{ from: '6', to: 'sound' },
			{ from: '8', to: 'battery_alarm' },
			{ from: '9', to: 'turn_go' },
		];

		const settingsObj = {};
		for (const { from, to } of settingsMap) {
			if (this.getSetting(from) !== null) {
				settingsObj[to] = this.getSetting(from);
				settingsObj[from] = null; // Reset legacy setting to prevent migration multiple times
			}
		}
		this.setSettings(settingsObj)
	}
}

module.exports = DanalockV2;
