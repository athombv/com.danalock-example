'use strict';

const ZwaveLockDevice = require('homey-meshdriver').ZwaveLockDevice;

class DanalockV3 extends ZwaveLockDevice {
	async onMeshInit() {
		await super.onMeshInit();
		this._migrateSettings();
		this.registerCapability('locked', 'DOOR_LOCK');
		this.registerCapability('locked', 'NOTIFICATION');
		this.registerCapability('measure_battery', 'BATTERY', {
			getOpts: {
				getOnStart: true,
				pollInterval: 'battery_poll_interval',
				pollMultiplication: 60000 // to minutes
			},
		});
	}

	_migrateSettings() {
		const settingsMap = [
			{ from: '1', to: 'twist_assist' },
			{ from: '2', to: 'hold_release' },
			{ from: '3', to: 'lock_till_lock' },
			{ from: '4', to: 'temp_allow_bluetooth' },
			{ from: '5', to: 'always_allow_bluetooth' },
			{ from: '6', to: 'auto_lock' },
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

module.exports = DanalockV3;
