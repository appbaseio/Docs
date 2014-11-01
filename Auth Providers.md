# Authentication - additional guide

Every provider requires Oauth paramters to be passed while authenticating. Mostly, they are the same across all providers, for eg. redirect_url, token_type, client_id etc. Appbase takes care of these paramters, except for some cases, which depends on the developer's need. This document explains how to provide these paramters while authenticating with Appbase and a provider, plus provides links to provider's additional documentation.

You can directly use the code snippets given here for a provider, and the authentication will work out of the box.

## Scopes

Scoping allows OAuth clients to tell an authorization server what permissions they’ll need on resources they’re accessing. The required scopes, can be specified while calling `Appbase.authPopup()`, and then we can access the data using `requestObject`, and calling provider's data endpoints.

## Google

### Required paramters

* __scope__: 'openid', which allows us to access basic information about the user.

### Minimal Code

```js
Appbase.authPopup('google', { authorize: { scope: ['openid'] } }, function(error, result, requestObj) {
    console.log('Logged in as:', result.uid);
});
```

### Additional docs

Find out more about scopes and API endpoints supported by Google [here](https://developers.google.com/+/api/oauth#scopes).

### Calling APIs

```js
Appbase.authPopup('google', { authorize: { scope: ['openid email profile'] } }, function(error, result, requestObj) {
    console.log('Logged in as:', result.uid);
    request.get('plus/v1/people/me', function(error, data) { // requests the profile of the user
        ...
    });
});
```

## Facebook

### Minimal Code

```js
Appbase.authPopup('facebook', function(error, result, requestObj) {
    console.log('Logged in as:', result.uid);
});
```

### Additional docs

Find out more about scopes and API endpoints supported by Facebook [here](https://developers.facebook.com/docs/facebook-login/permissions/v2.1).


## LinkedIn

### Minimal Code

```js
Appbase.authPopup('linkedin', function(error, result, requestObj) {
    console.log('Logged in as:', result.uid);
});
```

### Additional docs

Find out more about scopes and API endpoints supported by LinkedIn [here](https://developer.linkedin.com/documents/authentication#granting).


## Github

### Minimal Code

```js
Appbase.authPopup('github', function(error, result, requestObj) {
    console.log('Logged in as:', result.uid);
});
```

### Additional docs

Find out more about scopes and API endpoints supported by Github [here](https://developer.github.com/v3/oauth/#scopes).



## Dropbox

### Minimal Code

```js
Appbase.authPopup('dropbox', function(error, result, requestObj) {
    console.log('Logged in as:', result.uid);
});
```

### Additional docs

Find out more about API endpoints supported by Dropbox [here](https://www.dropbox.com/developers/core/docs#account-info).

