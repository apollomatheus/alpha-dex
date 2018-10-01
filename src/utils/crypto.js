const crypto = require('crypto')

module.exports = {
    __encrypt(hash,key) {
        var iv = new Buffer.alloc(16);
        const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        const h = cipher.update(hash,'utf8', 'hex') + cipher.final('hex');
        return h;
    },
    __decrypt(hash,key) {
        var iv = new Buffer.alloc(16); // fill with zeros
        let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(hash, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    },
    encrypt(text,key) {
        try {
            var text = this.__encrypt(text,key);
            if (text) return text;
        } catch (e) {
            return null;
        }
        return null;
    },
    decrypt(hash,key) {
        try {
            var text = this.__decrypt(text,key);
            if (text) return text;
        } catch (e) {
            return null;
        }
        return null;
    },
    randomKey() {
        var dc = ['0','1','2','3','4','9','7','5','a','b','c','d'];
        var de = '';
        var sz = Math.random() * (16 - 6) + 16;
        for (var i = 0; i < sz; i++) {
            var cx += dc[Math.random() * dc.length];
        }
        return cx;
    }
};