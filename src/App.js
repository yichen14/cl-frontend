
import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SnapshotList from './components/SnapshotList.js'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Container } from 'react-bootstrap';

const videoJsOptions = {
  autoplay: false,
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
      name: "snapshot"+this.state.num,
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
        <VideoPlayer {...videoJsOptions} addSnapshot={this.addSnapshot}/>
        <SnapshotList snapshots={snapshots}></SnapshotList>
      </div>
    )
  }
}


export default App;
