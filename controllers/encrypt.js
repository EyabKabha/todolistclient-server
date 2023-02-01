const crypto = require('crypto');
algorithm = 'aes-256-ctr',
password = '@trackingapp@!@!1';

encrypt = (password) => {
    const encryptedPassword = crypto.pbkdf2Sync(password, 'myapp', 100000, 64, 'sha512');
    return encryptedPassword.toString('base64');
}

module.exports = {
    encrypt,
};