import React from 'react';
import Button from 'react-bootstrap/Button';
import videojs from 'video.js'
import VideoSnapshot from 'video-snapshot';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  handelSnapshot(){
      console.log("I want to take a snapshot!")
      //this.player.snapshot()
  }

  render() {
    return (
      <div>
        <div data-vjs-player >
          <video ref={ node => this.videoNode = node } className="video-js"></video>

          
        </div>
        <div>
            <Button variant="primary" onClick={() => this.handelSnapshot()}>Take Snapshot</Button>
        </div>
      </div>
    )
  }
}