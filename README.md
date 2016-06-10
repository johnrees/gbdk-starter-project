
# GBDK Starter Project

Quickly get started making your own Gameboy game using the Gameboy Development Kit (GBDK).

![Gameboy](http://i.imgur.com/DVvag10.png "Gameboy")

## Mac OS X

Install the GBDK using [homebrew](http://brew.sh)

`brew tap mistydemeo/homebrew-formulae`

`brew install --HEAD mistydemeo/formulae/gbdk`

Get the required [Gameboy HTML5 Emulation JS files](https://mega.nz/#!tBhTVCrZ!LvXz3lM-ERedLb5ex58__Y_iTMCcZUTm_hVZzIz09i8
), put them in src/js and unzip the archive.

Install the required npm packages and run the gulp command to build the project into your /dist directory and start a local webserver

`npm install`

`gulp`

Open [http://localhost:8080](http://localhost:8080) in your browser, to test the starter game

Any changes you make to [/src/rom/game.c](/src/rom/game.c) will be reflected in the browser via live-reloading when you save the file.
