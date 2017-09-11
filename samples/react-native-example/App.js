import React from 'react';
import { Constants, WebBrowser } from 'expo';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { redirectUrl, getAccessToken } from 'twitter-web-oauth';
import qs from 'qs';

const TWITTER_SECRET = '<YOUR TWITTER SECRET>';
const TWITTER_KEY = '<YOUR TWITTER KEY>';

let authToken;
let secretToken;

export default class App extends React.Component {

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  }

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  }

  _handleRedirect = async (event) => {
    WebBrowser.dismissBrowser();
    const query = event.url.replace(Constants.linkingUri, '');
    let data = qs.parse(query);
    const verifier = data.oauth_verifier;
    let response = await getAccessToken(verifier, authToken, secretToken, TWITTER_KEY, TWITTER_SECRET);
    console.log(response);
    const accessTokenResponse = response.accessTokenResponse;
    const username = accessTokenResponse.screen_name;
    console.log(username);
    // this._nextScreen();
  }

  _twitterSignInAsync = async () => {
    let redirectURLResult = await redirectUrl(Constants.linkingUri, TWITTER_KEY, TWITTER_SECRET)
    console.log(redirectURLResult)
    authToken = redirectURLResult.token;
    secretToken = redirectURLResult.secretToken;
    this._addLinkingListener();
    this.setState({ twitterSignIn: true, liveSignIn: false })
    const result = await WebBrowser.openBrowserAsync(redirectURLResult.redirectURL);
    this._removeLinkingListener();
    this.setState({ result });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Press to login!</Text>
        <Button
          onPress={this._twitterSignInAsync}
          title="Twitter"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
