# Intro

Welcome! This is a discord bot that is used for the purpose of streaming data from td ameritrade (or potentially other brokers in the future) to discord.

# Requirements

- mongodb (mongoose)
- robo 3t
- heroku
- node

# Quarantined Installations

Run the following command to allow mac to run unrecognized apps:

```
sudo xattr -d com.apple.quarantine /Applications/APPNAME.app
```

# Authenticating with TDAmeritrade API

Enter the following url with the parameters URL encoded:

- CALLBACK_URL
- TD_CONSUMER_KEY

```
https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=CALLBACK_URL&client_id=TD_CONSUMER_KEY%40AMER.OAUTHAP
```

Take the code returned and decode:

```
CALLBACK_URL/?code=TD_CODE
```

Enter the code params to get the token:
https://developer.tdameritrade.com/authentication/apis/post/token-0

Params:

- grant_type: authorization_code
- access_type: offline
- code: TD_CODE
- client_id: TD_CONSUMER_KEY
- redirect_uri: CALLBACK_URL (not encoded)
