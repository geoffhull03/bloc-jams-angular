(function() {
    function SongPlayer() {
        var SongPlayer = {};

        var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };
        /**
        *@function playSong
        *@desc plays the current buzz song and sets the property of the object to true
        *@param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        *@function SongPlayer.play
        *@desc Takes song as the parameter. If the object song is not the same as the current song, the new song should load and start playing. Else if the buzz song is equal to the current song and it's paused, the current song will play. 
        *@param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    
                }
            }
        };
        /**
        *@function SongPlayer.pause
        *@desc Takes song as the parameter. If the current buzz song is paused, the song playing attribute will be set to false.    
        *@param {Object} song
        */

        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();