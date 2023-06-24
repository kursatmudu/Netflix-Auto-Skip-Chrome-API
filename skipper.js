function main() {
  document.addEventListener('DOMContentLoaded', function () {

    var switch_button = document.getElementById("switch-button");
    chrome.storage.sync.get("extensionEnabled", function (data) {
      var extensionEnabled = data.extensionEnabled || false;
      document.querySelector("#switch-button").checked = extensionEnabled;

      switch_button.addEventListener("click", function () {
        extensionEnabled = !extensionEnabled;
        chrome.storage.sync.set({ "extensionEnabled": extensionEnabled });
      });
    });
  })
}

function skipIntro() {
  var host = window.location.host;
  if (host.includes("netflix")) {
    let button = document.documentElement.querySelector('[data-uia="player-skip-recap"]') || document.documentElement.querySelector('[data-uia="player-skip-preplay"]') || document.documentElement.querySelector('[data-uia="player-skip-intro"]');
    if (button) {
      button.click();
    }
  }
}

main();
setInterval(function () {
  chrome.storage.sync.get("extensionEnabled", function (data) {
    var extensionEnabled = data.extensionEnabled || false;
    if (extensionEnabled) {
      skipIntro();
    }
  })
}, 2000)