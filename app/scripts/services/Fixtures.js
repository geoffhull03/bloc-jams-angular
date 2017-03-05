(function() {
  function Fixtures() {
    var Fixtures = {};

    var albumPicasso = {
        name: 'The Colors',
        artist: 'Pablo Picasso',
        label: 'Cubism',
        year: '1881',
        albumArtUrl: '/assets/images/album_covers/01.png',
        songs: [
           { name: 'Blue', length: 268, audioUrl: '/assets/music/1' },
           { name: 'Green', length: 217.99, audioUrl: '/assets/music/2' },
           { name: 'Red', length: 252, audioUrl: '/assets/music/3' },
           { name: 'Pink', length: 240, audioUrl: '/assets/music/4' },
           { name: 'Magenta', length: 270.99, audioUrl: '/assets/music/5' }
        ]
    };

    var albumMarconi = {
        name: 'The Telephone',
        artist: 'Guglielmo Marconi',
        label: 'EM',
        year: '1909',
        albumArtUrl: '/assets/images/album_covers/20.png',
        songs: [
            { name: 'Hello, Operator?', length: '1:01' },
            { name: 'Ring, ring, ring', length: '5:01' },
            { name: 'Fits in your pocket', length: '3:21' },
            { name: 'Can you hear me now?', length: '3:14' },
            { name: 'Wrong phone number', length: '2:15' }
        ]
    };

    Fixtures.getAlbum = function() {
      return albumPicasso;
    };

    Fixtures.getCollection = function(numberOfAlbums) {
      var albums = [];
      for (var i = 0; i < numberOfAlbums; i++) {
        albums.push(angular.copy(albumPicasso));
      }
      return albums;
    };

    return Fixtures;
  }

  angular
    .module('blocJams')
    .factory('Fixtures', Fixtures);
})();