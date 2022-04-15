import React from 'react';
import { ListGroup } from 'react-bootstrap';
class SnapImage extends React.Component {
    /*showImage(className){
        const img = document.getElementsByClassName(className)
        //console.log(img[0].style.display)
        if(img[0].style.display === 'none'){
            //console.log(img.style.display)
            img[0].style.display = 'inline'
        }
        else if(img[0].style.display === 'inline'){
            //console.log(img.style.display)
            img[0].style.display = 'none'
        }
    }*/
    render(){
        return (    
            <ListGroup.Item>
                <ListGroup.Item action href={'#'+this.props.snapshot.name}>{this.props.snapshot.name}</ListGroup.Item>
            </ListGroup.Item>
        );
    }
}

export default SnapImage