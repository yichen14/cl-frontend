
import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SnapshotList from './components/SnapshotList.js'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Container, Col, Row, Tab } from 'react-bootstrap';
import {IMG_HEIGHT, IMG_WIDTH} from './components/constants';

const videoJsOptions = {
  autoplay: false,
  controls: true,
  sources: [
    {
      src:
        "https://dash.akamaized.net/dash264/TestCases/1b/qualcomm/1/MultiRatePatched.mpd",
      type: "application/dash+xml"
    }
  ]
};

class App extends Component{

  constructor(){
    super();
    this.state = {
      snapshots: [],
      num: 0
    };
    this.addSnapshot = this.addSnapshot.bind(this)
  }

  addSnapshot(src){
    const info = {
      name: "Snapshot"+this.state.num,
      image: src
    }
    this.setState({num: this.state.num+1})
    var newSnapshots = this.state.snapshots
    newSnapshots.push(info)
    this.setState({snapshots: newSnapshots})
  }

  render(){
    const {snapshots} = this.state
    return(
      <div> 
          <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">IMLab Continual Learning System for Robot</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Row>
          <Col sm={6}>
            <VideoPlayer videoJsOptions={videoJsOptions} addSnapshot={this.addSnapshot} showButton={true} />
          </Col>
          <Col sm={6}>
            {/* <img src="http://127.0.0.1:7000/pred_cam" width="640px" height="360px" ></img> */}
          </Col>
        </Row>
        
        
        <SnapshotList snapshots={snapshots}></SnapshotList>
      </div>
    )
  }
}


export default App;
