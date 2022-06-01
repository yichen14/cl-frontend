import React from 'react';
import SnapImage from './SnapImage.js'
import { ListGroup } from 'react-bootstrap';
import { Tab, Row, Col, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Canvas from './Canvas.js';
import { Button } from 'bootstrap';
class SnapshotList extends React.Component {
    constructor(){
        super();
    }

    render(){
        return ( 
        <div>
            <h1>Snapshots:</h1>
            <Tab.Container defaultActiveKey="#Snapshot0">
                <Row>
                    <Col sm={4}>
                    <ListGroup>
                        {this.props.snapshots.map((snapshot) =>(
                            <SnapImage key={snapshot.name} snapshot={snapshot}></SnapImage>
                        ))}
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {this.props.snapshots.map((snapshot) =>(
                            <Tab.Pane eventKey={'#'+snapshot.name}>
                                <Canvas img={snapshot.image} name={snapshot.name} ></Canvas>
                                
                            </Tab.Pane>
                        ))}
                    </Tab.Content>

                    </Col>
                </Row>
            </Tab.Container>
        </div>   

    );
    }
}

export default SnapshotList

