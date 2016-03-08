// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '823445711267-uha9rt9p0liumujq79uuvtjepmekns9u.apps.googleusercontent.com ',
        'clientSecret'  : 'tYAU3vuPTZDNctacky0zB8ja',
        'callbackURL'   : 'http://localhost:80/auth/google/callback'
    }

};