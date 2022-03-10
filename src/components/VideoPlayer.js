import React from 'react';
import Button from 'react-bootstrap/Button';
import videojs from 'video.js'
import VideoSnapshot from 'video-snapshot';
import CaptureScreenshot from './VideoCapture';

export default class VideoPlayer extends React.Component {
  constructor(){
    super();
    this.state = {
      capture: false,
      videoWidth: 640,
      videoHeight: 360
    };
  }

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
      this.setState({capture:true})
  }

  resetCapture = () => this.setState({ capture: false });

  handleMetadata = () => {
      const video = document.querySelector('video');
      console.log("handle meta data")
      if (video) {
        this.setState({
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        });
      console.log(this.state.videoHeight)
      }
  }

  render() {
    return (
      <div style={{}} >
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js" ></video>
        </div>
        <CaptureScreenshot
          captured={this.state.capture}
          videoWidth={this.state.videoWidth}
          videoHeight={this.state.videoHeight}
          resetCapture={this.resetCapture}
          addSnapshot={this.props.addSnapshot}
        />
        <div style={{ padding: 20 }}>
            <Button variant="primary" onClick={() => this.handelSnapshot()} onLoadedMetadata={this.handleMetadata}>Take Snapshot</Button>
        </div>
        
      </div>
    )
  }
}