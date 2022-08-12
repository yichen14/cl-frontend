import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {IMG_HEIGHT, IMG_WIDTH} from './constants';

export default class VideoPlayer extends React.Component {
  constructor(){
    super();
    this.state = {
      capture: false,
      store: false,
      videoWidth: IMG_WIDTH,
      videoHeight: IMG_HEIGHT
    };
  }

  handelSnapshot(){
      console.log("I want to take a snapshot!")
      axios.get(`http://127.0.0.1:7000/snapshot`)
      .then(res => {
        this.props.addSnapshot(`data:image/png;base64,${res.data["img"]}`)
      })
  }

  handelRestore(){
    axios.post('http://127.0.0.1:7000/undo')
    .then(function (response) {
        console.log(response)
    })
  }

  resetCapture = () => this.setState({ capture: false });

  render() {
    let button
    const showButton = this.props.showButton;
    if (showButton) {
      button = <div style={{ padding: 20 }}>
                <Button variant="primary" onClick={() => this.handelSnapshot()}>Take Snapshot</Button>
                <Button variant="primary" onClick={() => this.handelRestore()} style={{marginLeft: 10}}>restore</Button> 
               </div>
    } else {
      button = <></>;
    }
    return (
      <div style={{}} >
        <div id="view_div">
          <img src="http://127.0.0.1:7000/pred_cam" width="1280px" height="720px"  id="view"></img>
        </div>
        {button}
    
      </div>
    )
  }
}