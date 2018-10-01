const { ipcRenderer } = require('electron');

// In renderer process (web page).
ShepherdIPC = function (data) {
	let shepherdreply = ipcRenderer.sendSync('shepherd-command', data);
	return shepherdreply;
}

// Login button
$('.login-dex-btn').click(function (e) {
    console.log('login btn!!');
    var value = ShepherdIPC({ "command": "login" });
    console.log('result: ',value);
});