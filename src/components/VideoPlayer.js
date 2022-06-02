import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class VideoPlayer extends React.Component {
  constructor(){
    super();
    this.state = {
      capture: false,
      videoWidth: 1280,
      videoHeight: 720
    };
  }

  handelSnapshot(){
      console.log("I want to take a snapshot!")
      axios.get(`http://127.0.0.1:7000/snapshot`)
      .then(res => {
        this.props.addSnapshot(`data:image/png;base64,${res.data["img"]}`)
      })
  }

  resetCapture = () => this.setState({ capture: false });

  render() {
    let button
    const showButton = this.props.showButton;
    if (showButton) {
      button = <div style={{ padding: 20 }}><Button variant="primary" onClick={() => this.handelSnapshot()}>Take Snapshot</Button> </div>
    } else {
      button = <></>;
    }
    return (
      <div style={{}} >
        <div id="view_div">
          {/* <video ref={ node => this.videoNode = node } className="video-js" ></video> */}
          <img src="http://127.0.0.1:7000/camera" width="640px" height="360px" id="view"></img>
        </div>
        {button}
        
      </div>
    )
  }
}