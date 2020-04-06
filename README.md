# serverless-image-processing
Serverless image processing solution like [imgix](https://www.imgix.com/) by Google Cloud Functions.
You can resize and composite image by simple URL parameters.

## Overview
XXX: All urls are dummy.

**resize**
https://your.cloudfunctions.net/convertImage/path/to/image.png?w=1200&h=800

**composite**
https://your.cloudfunctions.net/convertImage/path/to/image.png?mark=https://yourdomain.com/image/credit.png&mark-gravity=southwest

**with secure token(MD5)**
https://your.cloudfunctions.net/convertImage/path/to/image.png?w=1200&s=900150983cd24fb0d6963f7d28e17f72


## How to use
```sh
$ git clone https://github.com/nullnull/serverless-image-processing

# edit src/config.ts to update SOURCE_URL
$ vi src/index.ts

# deploy to your cloud functions
$ yarn run deploy
```


## Development
```sh
# compile typescript
$ yarn run watch

# start local server
$ yarn run dev
# curl http://localhost:8080/convertImage/path/to/image.png?w=1200&h=800
```
