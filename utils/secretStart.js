const getSecretData = require("../services/secretManagerService");
const {setSecrets, getSecret} = require("./secrets");


const secretStart = async () => {
    const secrets = await getSecretData();
    console.log(secrets, "we are in secretStart");
    setSecrets(secrets) ;

    console.log("AWS secrets loaded");


}

module.exports = secretStart;
