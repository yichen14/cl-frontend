import React from 'react';
import { ListGroup } from 'react-bootstrap';
class SnapImage extends React.Component {

    handleSelect(key){
        console.log(key)
    }

    render(){
        return (    
            <ListGroup.Item >
                <ListGroup.Item action href={'#'+this.props.snapshot.name}>{this.props.snapshot.name}</ListGroup.Item>
            </ListGroup.Item>
        );
    }
}

export default SnapImage