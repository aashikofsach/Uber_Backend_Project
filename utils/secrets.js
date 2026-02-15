let secrets = {} ;

const setSecrets =(data)=>
{
    secrets = data ;

}

const getSecret = (key)=> secrets[key];

module.exports = {setSecrets , getSecret};