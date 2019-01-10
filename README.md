# MMM-Podcast2
A module to stream Tagesschau 100 Sekunden to your magic mirror


## Requirements
<b>omxplayer:</b> Omxplayer is normally already installed on raspbian. You can check it by commmanline ````which omxplayer````. The result should be a path like ````/usr/bin/omxplayer````.
<br>
<b>MMM-Remote-Control:</b> [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) is required, if you want to use the sample links for communication, as mentioned at the end of this file.

## Installing the module
Clone this repository in your `~/MagicMirror/modules/` folder `( $ cd ~/MagicMirror/modules/ )`:
````javascript
git clone https://github.com/Ax-LED/MMM-Podcast2
````

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
{
	module: 'MMM-Podcast2',
	config: {
		feedUrl: 'https://www.tagesschau.de/export/video-podcast/webxl/tagesschau-in-100-sekunden_https/',
		refreshInterval: 1000 * 1800, //refreshs streaming link every 1800 seconds (30Min)
		omxargs: ' --win 320,180,1600,900  -o both '
		}
},
````
## Configuration options

The following properties can be configured:


<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>feedUrl</code></td>
			<td>URL of the feed, <code>default: 'https://www.tagesschau.de/export/video-podcast/webxl/tagesschau-in-100-sekunden_https/'</code>.</td>
		</tr>
			<tr>
			<td><code>refreshInterval</code></td>
			<td>refreshs streaming link <code>default: 1000 * 1800, //refreshs streaming link every 1800 seconds (30Min)</code>.</td>
		</tr>
		<tr>
			<td><code>omxargs</code></td>
			<td>Arguments for the omxplayer, like <code>' --win 320,180,1600,900  -o both '</code>. Attention, <b>leading</b> and <b>last</b> blanks are required.</td>
		</tr>
   </table>

   ## Further options
   You can communication with this module also by sending notifications.
   <br>Examples:
   - <code>yourmmip:8080/remote?action=NOTIFICATION&notification=BUTTON_PRESSED</code> starts the stream (with omxplayer) and stops the stream if its already running
   
   To use this examples the module [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) is required.

   ## Version
   1.0 initial release
