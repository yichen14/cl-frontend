
import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';

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


class App extends Component{


  render(){
    return(
      <VideoPlayer {...videoJsOptions} />
    )
  }
}


export default App;
