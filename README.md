# Domoticz Home Theatre Controller
[![GPL-3.0](https://img.shields.io/badge/license-GPL-blue.svg)]()
[![npm](https://img.shields.io/npm/v/npm.svg)]()
[![node](https://img.shields.io/node/v/gh-badges.svg)]()

NodeJS service interfaces with various Home Theatre hardware and Domoticz to provide a unified and extensable solution.

This program communicates with my tv via rs232 and with my audio receiver via TCP-Socket. Volume/Mute/Power/Default input are all provided by a PowerMate USB Knob. Communicaiton with Domoticz is done via MQTT API.

> I have completely redone this project so its more portable and easier to adopt.

## Install:
```bash
git clone https://github.com/nayrnet/domoticz-htc.git htc
cd htc
npm install
nano systemd/htc.service
// update paths and users, save.
sudo cp systemd/htc.service /etc/systemd/service/
cp config.example config.js
nano config.js
// Edit aproprately, save.
```

### My Hardware:
* Pioneer SC-1222-K
  * Google Nexus Player
  * Sony PlayStation 3
  * Sony PlayStation 4
  * Mini Super NVR (Display Only, no storage)
* Sharp Aquos LC-C3242U
* Griffin PowerMate NA16029

### Software:
* AVR Controller - ME!
* Domoticz - http://www.domoticz.com
* Debian Jessie w/NodeJS from NodeSource repository
* AndroidTV OSD Remote - https://github.com/nayrnet/androidtv-osd-remote
* Mosquitto MQTT Broker

### Domoticz Devices:
* Input Selector - Change Video Inputs and Toggle Power
* Audio Mode Selector - Change the audio proccessor.
* Volume Slider - Toggle Mute and set volume level.
* Display - Text Sensor showing the front display.
* Audio Mode - Show current audio proccessor (may not always be the one you select).

### PowerMate Functions: 
* Left/Right = Vol Down/Vol Up
* Quick tap = Mute toggle
* Double tap = Change to Nexus Input, power on if needed.
* Long hold = Power off
* Down and Left = Dim Living Room Lights.
* Down and Right = Brighten Living Room Lights.
* LED Pulse on Power/Input change, On/Off with TV & AVR.

### Files:
* config.js - Main configuration, use provided example.. not overwritten on update.
* server.js - The main app, if debugging you can run this directly from command line.
* daemon.js - This is app forks the daemon and starts/stops the server.
* hardware/pioneeravr.js - Functions for AVR Commands.
* hardware/sharptv.js - Functions for TV Commands.
* screenshots/ - Images of Domoticz & Setup
* systemd/avrcontroller.service - SystemD Service for Starting/Restarting.

### Credits:
* My Pioneer-AVR Starting point: https://github.com/stormboy/node-pioneer-avr/blob/master/pioneer-avr.js
* My PowerMate Starting point: https://github.com/mattwelch/sonospowermate/blob/master/sonospowermate.js

### Web Screenshot:
Selector Switch:

![Domoticz Selector Switch](screenshots/screenshot-button.png)

#### TO-DO:
* Volume Slider in Domoticz
* Add support for ZONE2

#### Support:
> No support provided or warranty impied, this project is avilable for educational use and my own personal tracking.
