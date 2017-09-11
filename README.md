Piece of code to help you implement [Sign in with twitter](https://dev.twitter.com/web/sign-in/implementing) on your js app (including react-native). It follows the [Browser Sign In flow](https://dev.twitter.com/web/sign-in/desktop-browser).

This repo gets inspiration from [Expo's](https://docs.expo.io/versions/latest/sdk/webbrowser.html#authentication) OAuth and twitter sign in [example](https://github.com/expo/expo-twitter-login-example)

## Install
```
npm install --save twitter-web-oauth
```

## Example usage in React Native
```
import { redirectUrl, getAccessToken } from 'twitter-web-oauth'; // make imports from the package

let authToken;
let secretToken;

...

_twitterSignInAsync = async () => {
        let redirectURLResult = await redirectUrl(Constants.linkingUri, <TWITTER_KEY>, <TWITTER_SECRET>)
        authToken = redirectURLResult.token;
        secretToken = redirectURLResult.secretToken;
        // set linking listener here
        const result = await WebBrowser.openBrowserAsync(redirectURLResult.redirectURL);
        // remove linking listener here once youre done with it
}

...

//where youre handling redirects back to your app
_handleRedirect = async (event) => {
        //dismiss browser here
        const query = event.url.replace(Constants.linkingUri, '');
        let data = qs.parse(query);
        const verifier = data.oauth_verifier;
        let response = await getAccessToken(verifier, authToken, secretToken, <TWITTER_KEY>, <TWITTER_SECRET>);
        const accessTokenResponse = response.accessTokenResponse;
        const username = accessTokenResponse.screen_name;
        console.log(username);
}


```

expect responses in the following form for `redirectUrl` and `getAccessToken` respecively

```
//redirect url:
Object {
  "redirectURL": "https://api.twitter.com/oauth/authorize?oauth_token=yVKQIgAAAAAAZZfXAAABXnHhxp8",
  "secretToken": "opQTJeWzqQHBHs5sungeQeHvFVmA0gL",
  "token": "yVKQIgAAAAAAZZfXAAABXnHhxp",
}

//getAccessToken
Object {
  "accessTokenResponse": Object {
    "oauth_token": "3374266409-gdt7Enmi491grt5v9e4nw8O2RbY1NNl8t6cSGQ",
    "oauth_token_secret": "KuZfJowsA0BGuJ01SkP2PXnPtniUQX9C81iFia4Iyezz",
    "screen_name": "...",
    "user_id": "...",
    "x_auth_expires": "0",
  },
}
```

## Run sample app
- clone repo
- run `npm install` to install the dependencies
- replace `TWITTER_SECRET` & `TWITTER_KEY` with actual keys from twitter app dashboard
- open using `exp` or `expo`
- open on device