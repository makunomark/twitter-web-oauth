DISCLAIMER!! I am yet to test this as an independent module. It works in a project where I use the code within the project. I will make an example app shortly

Piece of code to help you implement [Sign in with twitter](https://dev.twitter.com/web/sign-in/implementing) on your js app (including react-native). It follows the [Browser Sign In flow](https://dev.twitter.com/web/sign-in/desktop-browser).

This repo gets inspiration from [Expo's](https://docs.expo.io/versions/latest/sdk/webbrowser.html#authentication) OAuth and twitter sign in [example](https://github.com/expo/expo-twitter-login-example)

## How to use it?
I will use react-native in my examples

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
