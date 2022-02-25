
import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer';


const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src:
        "https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd",
      type: "application/dash+xml"
    }
  ]
};

function App() {
  return <VideoPlayer {...videoJsOptions} />;
}

export default App;
