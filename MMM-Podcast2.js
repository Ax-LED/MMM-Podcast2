/* global Module */

/* Magic Mirror
 * Module: MMM-Podcast2
 *
 * By AxLED
 * MIT Licensed.
 */

 var IntervalID2 = '';
 var isplaying = false;

Module.register('MMM-Podcast2', {
	
	defaults: {
		refreshInterval: 1000 * 1800, //refresh every 1800 seconds (30Min)
		feedUrl: 'https://www.tagesschau.de/export/video-podcast/webxl/tagesschau-in-100-sekunden_https/',
		omxargs: ' --win 320,180,1600,900 -o both '
	},
	
	// Define required scripts.
	getScripts: function() {
		//return ["moment.js", 'MMM-Podcast-xml2json.js', "font-awesome.css"];
		return ["moment.js", "font-awesome.css"];
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
		//console.log('Axled .js start:'); 
	},

	getDom: function() {
		
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
				this.startFetchingData(this.config.refreshInterval);
				//console.log('Axled STARTED Received:'); 
			} else if (notification === "DATA") {
				this.loaded = true;
				//var json=xml2json(payload);
				var json = payload;
				streamurl = json.rss.channel.item.enclosure.url;
				//console.log('Axled json:', json); 
				//console.log('Axled json enclosure:',json.rss.channel.item.enclosure.url);
			} else if(payload[0]==='ERROR'){
				//console.log('Axled ERROR: ',moment().format('LTS')); 
				this.Errormessage = payload[1];
				//console.log('MMM-Podcast2 Error :',Errormessage); 
			} 
	},
	
	startFetchingData: function(interval) {
		//console.log('Axled IntervalID2:',IntervalID2); 
		if (IntervalID2 === ''){
			// ... and then repeat in the given interval
			IntervalID2 = setInterval(() => {
			this.sendSocketNotification("FETCH_DATA", '')
			//console.log('Axled MMM-Podcast2 refresh: ',moment().format('LTS')); 
			}, interval); 
		}
	}

});