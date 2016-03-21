// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '451557218375838', // your App ID
        'clientSecret'  : 'cb665c5a489540e995b3c61eed7a209a', // your App Secret
        'callbackURL'   : 'http://shopsho.es/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://shopsho.es/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '823445711267-uha9rt9p0liumujq79uuvtjepmekns9u.apps.googleusercontent.com',
        'clientSecret'  : 'tYAU3vuPTZDNctacky0zB8ja',
        'callbackURL'   : 'http://shopsho.es/auth/google/callback'
    }

};