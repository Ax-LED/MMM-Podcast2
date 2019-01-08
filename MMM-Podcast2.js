/* global Module */

/* Magic Mirror
 * Module: MMM-Podcast2
 *
 * By AxLED
 * MIT Licensed.
 */

 var isplaying = false;

Module.register('MMM-Podcast2', {
	
	defaults: {
		//refreshInterval: 1000 * 30, //refresh every 30 seconds
		feedUrl: 'https://www.tagesschau.de/export/video-podcast/webxl/tagesschau-in-100-sekunden_https/',
		omxargs: ' --win 320,180,1600,900  -o both '
	},
	
	// Define required scripts.
	getScripts: function() {
		return ["moment.js", 'MMM-Podcast-xml2json.js', "font-awesome.css"];
	},
	
	getStyles: function() {
		return ['MMM-Podcast2.css'];
	},

	/*getTranslations: function() {
		return {
			//de: "translations/de.json",
			//en: "translations/en.json",
		};
	},*/

	start: function() {
		Log.info('Starting module: ' + this.name);
		//this.loaded = false;
		this.sendSocketNotification('CONFIG', this.config);
	},

	getDom: function() {
		/*var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");

		//Errorhandling
		var Errorinfo = document.createElement("div");
		Errorinfo.setAttribute('class', 'float');
		Errorinfo.setAttribute('id','error1');
		Errorinfo.setAttribute('style','display: none;');
		Errorinfo.innerHTML = '';
		var Separator = document.createElement("hr");
		Separator.setAttribute('class', 'db');
		Separator.setAttribute('id','error2');
		Separator.setAttribute('style','display: none;');
		wrapper.appendChild(Errorinfo);
		wrapper.appendChild(Separator);
		
		return wrapper;*/
	},

	
	//Helper, to use module with notification system

    notificationReceived: function(notification, payload) {
		if(notification === "BUTTON_PRESSED"){
			if (isplaying === false){
				isplaying = true;
				payload = [streamurl,'PLAY'];
			} else {
				//Stop omx senden
				isplaying = false;
				payload = [streamurl,'STOP'];
			}
			this.sendSocketNotification('BUTTON_PRESSED', payload);
		}
    },
	
 	socketNotificationReceived: function(notification, payload) {
    		if (notification === "STARTED") {
				//this.startFetchingData(this.config.refreshInterval);
			} else if (notification === "DATA") {
				this.loaded = true;
				var json=xml2json(payload);
				streamurl = json.rss.channel.item.enclosure.url;
				//console.log('Axled json:', json); 
				//console.log('Axled json enclosure:',json.rss.channel.item.enclosure.url);
				
				/*
				} else if(payload[0]==='ERROR'){
					//console.log('Axled ERROR: ',moment().format('LTS')); 
					this.Errormessage = payload[1];
					document.getElementById('error1').innerHTML = this.Errormessage;
					document.getElementById('error1').removeAttribute('style');//do make it visible
					document.getElementById('error2').removeAttribute('style');//do make it visible
				} */
			}
	},
	
	/*startFetchingData: function(interval) {
		if (IntervalID === ''){
			// ... and then repeat in the given interval
			IntervalID = setInterval(() => {
			this.sendSocketNotification("FETCH_DATA", '');
			}, interval); 
		}
	}*/

});