const  { ipcMain } = require('electron');
const crypto = require('../utils').crypto;
const keys = require('../config').keys;

const defaultPreferences = {
    theme: 'light',
    pair: ['ZCR','ZCR'],
}

const defaultUser = {
    name: 'jhon doe',
    currency: {
        myOrders: [],
        myUniqueId: null,
        myPrivateKeys: [],
        myCurrencies: ['ZCR'],
    },
};

ipcMain.on('EIPC-command', (event, arg) => {
    console.log('Trigger',arg);

    switch (arg.command) {
        case 'tryLogin':
            if (arg.password) {
                var pwd = localStorage.getItem('password');
                var lts = localStorage.getItem('timestamp');

                if (pwd && lts) {
                    var dlts = crypto.decrypt(lts,arg.password);
                    if (!dlts) {
                        event.returnValue = { code: 102, error:'Not authorized' };
                        return;
                    }
                    var enc = crypto.encrypt(arg.password,keys[0]+dlts);
                    if (enc) {
                        if (pwd == enc) {
                            //new information
                            var lts = Date.now();
                            var elts = crypto.encrypt(lts,arg.password);
                            var sesskey = crypto.randomKey();

                            localStorage.setItem('timestamp', elts);
                            localStorage.setItem('session', sesskey);

                            //all set
                            event.returnValue = { code: 200, session: sesskey };
                        }
                    } else {
                        event.returnValue = { code: 102, error:'Not authorized' };
                    }
                } else {
                    event.returnValue = { code: 101, error:'Not registered' };
                }
            } else {
                event.returnValue = { code: 100, error: 'Missing password' };
            }
        break;
    
        case 'tryRegister':
            if (arg.password) {
                var pwd = localStorage.getItem('password');
                var lts = localStorage.getItem('timestamp');

                if (pwd && lts) {
                    event.returnValue = { code: 103, error: 'One account per computer! Try to reset.' };
                } else {
                    var lts = Date.now();
                    var elts = crypto.encrypt(lts,arg.password);
                    var epwd = crypto.encrypt(arg.password, keys[0]+lts);
                    if (epwd) {
                        localStorage.setItem('password', epwd);
                        localStorage.setItem('timestamp', elts);
                        localStorage.setItem('preferences', JSON.stringfy(defaultPreferences));
                        localStorage.setItem('user', JSON.stringfy(defaultUser));
                        event.returnValue = { code: 200 };
                    }
                }
            }
            break;

        case 'validateSession':
            if (arg.session) {
                var sesskey = localStorage.getItem('session');
                if (sesskey) {
                    if (arg.session == session) {
                        event.returnValue = { code: 200 };
                        return;
                    } 
                }
                localStorage.setItem('session', null);
                event.returnValue = { code: 105, error: 'Not authorized, please login again.' };
            } else {
                event.returnValue = { code: 104, error: 'You must be logged.' };
            }
            break;

        case 'getPreferences':
            if (arg.session) {
                var sesskey = localStorage.getItem('session');
                if (arg.session == session) {
                    event.returnValue = { 
                        code: 200,
                        preferences: localStorage.getItem('preferences'),
                    };
                } else {
                    localStorage.setItem('session',null);
                    event.returnValue = { code: 105, error: 'Not authorized, please login again.' };
                }
            } else {
                event.returnValue = { code: 104, error: 'You must be logged.' };
            }
            break;

        case 'defaultPreferences':
            event.returnValue = 'ok';
            break;

        default:
            event.returnValue = 'pong';
            break;
    }
});
