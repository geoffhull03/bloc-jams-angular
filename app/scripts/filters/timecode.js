/*(function() {
     function timecode() {
         return function(seconds) {
             var seconds = Number.parseFloat(seconds);
             
             if (Number.isNaN(seconds)) {
                return '-:--';
             }
             
             var wholeSeconds = Math.floor(seconds);
             var minutes = Math.floor(wholeSeconds / 60);
             var remainingSeconds = wholeSeconds % 60;
 
             var output = minutes + ':';
 
             if (remainingSeconds < 10) {
                 output += '0';   
             }
 
             output += remainingSeconds;
 
             return output;
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();
 */
(function() {
	function timecode() {
		return function(seconds) {
			var songTimer;

			if (seconds >= 3600) {
				songTimer = buzz.toTimer(seconds, true);
			} else {
				songTimer = buzz.toTimer(seconds);
			}

			return songTimer;
		}
	};

	angular
		.module('blocJams')
		.filter('timecode', timecode);
})();

