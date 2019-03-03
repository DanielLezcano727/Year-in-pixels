const helpers = {};

const crypt = require('bcryptjs');

helpers.encryptPass = async (pass) => {
    const salt = await crypt.genSalt(10);
    return await crypt.hash(pass,salt);
}

helpers.matchPass = async (pass, mask) => {
    try{
        return await crypt.compare(pass,mask);
    }catch(e){
        console.error(e);
    }
}

helpers.first = (i) => {
    if(i == 0){
        return 'primero';
    }
    return "";
}
module.exports = helpers;