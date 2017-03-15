(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum(); 
        
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
                    stopSong(SongPlayer.currentSong);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
           
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
        });
            
            SongPlayer.setVolume(SongPlayer.volume);

            SongPlayer.currentSong = song;
            
            song.paused = false;
        };
        /**
        *@function playSong
        *@desc plays the current buzz song and sets the property of the object to true
        *@param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            song.paused = false;
        };
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }

        /**
        *@function SongPlayer.play
        *@desc Takes song as the parameter. If the object song is not the same as the current song, the new song should load and start playing. Else if the buzz song is equal to the current song and it's paused, the current song will play. 
        *@param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        SongPlayer.currentSong = null;
        
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;
        
        SongPlayer.volume = 75;
        SongPlayer.maxVolume = 100;
        
        SongPlayer.play = function (song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};
        /**
        *@function SongPlayer.pause
        *@desc Takes song as the parameter. If the current buzz song is paused, the song playing attribute will be set to false.    
        *@param {Object} song
        */

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            song.paused = true;
        };
        
        /**
        *@function SongPlayer.previous
        *@desc Takes song as the parameter. If the previous button is clicked, the song before the current song index will begin playing 
        *@param {Object} currentSong
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex === currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
            }
        };
        
        
        return SongPlayer;
 
    }

angular
    .module('blocJams')
    .factory('SongPlayer',['$rootScope', 'Fixtures', SongPlayer]);

})();