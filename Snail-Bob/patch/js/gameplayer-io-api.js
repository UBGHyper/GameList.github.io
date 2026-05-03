console.l0g= console.log;
consolel0g= console.log;

GameAPI= {
  "loadAPI": function() {
  },
  "GameBreak": {
    "request": function(fn1, fn2) {
      fn1();
      fn2();        
    }
  },
  "Branding": {
    "getLink": function(args) {
      return {
        "action": function() {
          consolel0g("--fx--GameAPI--Branding--getLink--action--");
          (function(){}()));
        }
      }      
    },
    "getLogo": function(){
      return {
        "image": "patch/images/null.png",
        "action": function() {
          consolel0g("--fx--GameAPI--Branding--getLogo--action--");
          (function(){}());
        }
      }
    }
  }
}

AudioMixer= {
  "isWebAudioSupport": function() {
    consolel0g("--fx--AudioMixer--isWebAudioSupport--");
    return false;
  }  
}
