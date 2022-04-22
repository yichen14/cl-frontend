import React, { useRef, useEffect, useState } from 'react'
import { Tab, Row, Col, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import axios from 'axios';

let addImage = false

function getCursorPosition(canvas, event, setX, setY) {
    const rect = canvas.getBoundingClientRect()
    const x = parseInt(event.clientX - rect.left)
    const y = parseInt(event.clientY - rect.top)
    setX(x)
    setY(y)
    console.log("x: " + x + " y: " + y)

    const context = canvas.getContext('2d')
    context.fillRect(x,y,3,3);
}

function handelSendClick(x, y, isPostive){
    if(addImage==false){
        return 
    }
    let recieved_img
    axios.get('http://127.0.0.1:5000/getimg')
    .then((response) => {
        console.log(response);
        recieved_img = atob(response.data["img"])
    });
    console.log("x: " + x + " y: " + y + " label: " + isPostive)
}

function handelAddImage(img){
    let formData = new FormData();
    formData.append("file", img);
    //console.log(formData.get('file'))
    axios({
        method: "post",
        url: "http://127.0.0.1:5000/addimg",  
        data: img,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        console.log(response.data)
    });
    addImage = true
}

const Canvas = props => {
  const [isPostive, setIsPostive] = useState(true);
  const [x, setX] = useState(0.0);
  const [y, setY] = useState(0.0);

  //const canvasRef = useRef(null)
  
  useEffect(() => {
    const img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.setAttribute('src', props.img);
    const canvas = document.querySelector("#"+props.name);
    if (canvas){
        //console.log(props.name)
        canvas.width = 640
        canvas.height = 360
        const context = canvas.getContext('2d')

        context.fillRect(0, 0, 640, 360)
        context.drawImage(img, 0, 0, 640, 360);
        canvas.addEventListener('mousedown', function(e) {
            getCursorPosition(canvas, e, setX, setY)
        })
    }
  }, [])
  
  return(
      <>
        <div>
            <canvas id={props.name}/>
        </div>
        <div style={{display:'block'}}>
            <ButtonGroup>
                <ToggleButton
                    key = "positive"
                    checked={isPostive === true}
                    variant={'outline-danger'}
                    onClick={() => setIsPostive(true)}
                >
                    Postive
                </ToggleButton>
                <ToggleButton
                    key = "negative"
                    checked={isPostive === false}
                    variant={'outline-success'}
                    onClick={() => setIsPostive(false)}
                >
                    Negative
                </ToggleButton>
            </ButtonGroup>
            <Button variant="primary" onClick={() => handelSendClick(x,y, isPostive)} style={{marginLeft:30}}>send click</Button>        
            <Button variant="primary" onClick={() => handelAddImage(props.img)} style={{marginLeft:30}}>Add Image to annotation server</Button>     
            
        </div>
        <Button variant="primary"  style={{marginTop:30}}>Send Image to On-board Computer</Button>    
      </>
    
  ) 
}

export default Canvas