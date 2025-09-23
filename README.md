# mfd-pi-app
a macro pad disguised as a Multi Function Display. It currently set up to be used with Star Citizen, but was designed to be adaptable for any game. Unfortunelty, my simpit was dissasembled when I moved and I have not had a chance to get it back up and functioning, so the controls are very much out of date, but should be easy to update.

# installing
there really needs to be a script for this. 
- your Raspberry will need to have the USB Gadget system set up. i used the `enable-usb-hid` from https://github.com/mtlynch/key-mime-pi/
- clone this repository to your raspberry pi
- in bash, run `npm install` in both the `client` and `server` directories
- on startup, make sure `npm run` in both the `client` and `server` directories is run and then launch a fullscreen browser pointing to `loader.html` in the root of the project. this will display a loading screen until the client is ready and then redirect to it.

# star citizen
to update your keybindings, you will need to do the following on the computer you intend to run Star Citizen on:
- Ensure you have [Node.js](https://nodejs.org/en/download)
- Ensure you have [Git](https://git-scm.com/downloads) installed
- open up a command prompt and do the following

```cmd
git clone https://github.com/tmillage/mfd-pi-app
cd mfd-pi-app/scripts
npm install
npm run sc
```
this should generate 2 files in `/mfd-pi-app/server/applications/`
- `star-citizen-keybinds.json` - file with the keybinds.
- `star-citizen-missing-keybinds.txt` - file with actions that have been set to a button, but do not have a keybind. you will need to set them in game and re-run the script. i currently push them up to the repository to get the to the Pi, these will have to be manually transfered for anyone else.

to update the buttons that appear for each pannel, you will need to update `/mfd-pi-app/server/applications/star-citizen.json`. the `action` property must match an `action` proprty from the file `star-citizen-keybinds.json`

# to do
- make this proprly useable by people other than me
- update the server and script to push the the keybinds to the server without the github step
- proper install directions for getting this running on the Pi
- control interface and API to be accessed from the host computer
  - UI for configuring pannels
  - UI for updating keybinds
  - turning the screen on and off
  - switching between games
  - updating the code from github
  - setting the currently active pannels
  - sending messages to the mfd screens
  - send a url to the screen to open webpage
- support for a mouse pannel to control the mouse of the host
- proper support for other games
  - Elite Dangerous is a likely target
