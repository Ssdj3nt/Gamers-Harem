 document.addEventListener('DOMContentLoaded', function () {
    var gameNameElements = document.querySelectorAll('.game-name');

    gameNameElements.forEach(function (element) {
      var originalText = element.innerText;
      var truncatedText = originalText.length > 25 ? originalText.substring(0, 25) + '...' : originalText;

      element.innerText = truncatedText;
    });
  });
