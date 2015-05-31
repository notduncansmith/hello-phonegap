# What the hell's going on here?

This is the iOS portion of Frillfeed (i.e. The Main Event).
The app is built with Phonegap and React (JS, JSX).

Other tools used:

- Browserify
- LESS
- Gulp
- PouchDB

# You will need

[Homebrew](http://brew.sh/)
Phonegap `nig phonegap`
Gulp `nig gulp`
http-server `nig http-server`


# Setup

```bash
npm install
gulp
```

# Hacking

To start hacking on the app, you'll need two things going on:

1. Gulp running to compile all the assets (`gulp`)
2. A web server serving the `ios/www` directory (`cd www; http-server`)

If you want to run it in the simulator:

1. Get gulp running (see above)
2. Build and/or watch the iOS version (`gulp build:ios` or `gulp watch:ios`)
3. Open the app in Xcode (`open -a /Applications/Xcode.app platforms/ios`)
4. Within Xcode, run the app with `Cmd+R`

# If you're not sure what to do

(or if something breaks)

**HIT A BROTHA UP**