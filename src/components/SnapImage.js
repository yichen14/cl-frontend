import React from 'react';

class SnapImage extends React.Component {
    showImage(className){
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
    }
    render(){
        return (    
            <li>
                <a onClick={() => this.showImage(this.props.snapshot.name)} href="#">{this.props.snapshot.name}</a>
                <img src={this.props.snapshot.image} style={{display:'none'}} className={this.props.snapshot.name}></img>
            </li>
        );
    }
}

export default SnapImage