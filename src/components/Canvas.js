import React, { useRef, useEffect, useState } from 'react'
import { Tab, Row, Col, ButtonGroup, ToggleButton, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import {Buffer} from 'buffer';

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

function handelSendClick(x, y, isPostive, name, setImgsrc){
    if(addImage==false){
        return 
    }
    var response_img
    const json = JSON.stringify({
        click:{
            is_postive: isPostive,
            coords_x: x,
            coords_y: y
        } 
    });
    axios.post('http://127.0.0.1:5000/click', json, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        //console.log(`data:image/png;base64,${response.data["img"]}`)
        
        response_img = Buffer.from(response.data["img"], 'base64')
        setImgsrc(`data:image/png;base64,${response.data["img"]}`)
        // const res_img = document.createElement('img');
        // res_img.setAttribute('crossOrigin', 'anonymous');
        // res_img.src = `data:image/png;base64,${response.data["img"]}`
        const show = document.getElementById("show");
        const canvas = document.querySelector("#"+name);
        const context = canvas.getContext('2d')
        //context.fillRect(0, 0, 640, 360)
        //context.drawImage(show, 0, 0, 640, 360);
    })

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

function handleLabelChange(event, setLabel){
    //console.log(event.target.value)
    setLabel(event.target.value)
}

function handleStartTrain(mask_label){
    console.log(mask_label)
    const json = JSON.stringify({
        label:mask_label
    });
    axios.post('http://127.0.0.1:5000/train', json, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response)
    })
}
const Canvas = props => {
  const [isPostive, setIsPostive] = useState(true);
  const [x, setX] = useState(0.0);
  const [y, setY] = useState(0.0);
  const [imgsrc, setImgsrc] = useState(null);
  const [label, setLabel] = useState(null);
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
        <img id="show" src={imgsrc}/>
        <div style={{display:'block', marginTop:30}}>
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
            <Button variant="primary" onClick={() => handelSendClick(x,y, isPostive, props.name, setImgsrc)} style={{marginLeft:30}}>send click</Button>        
            <Button variant="primary" onClick={() => handelAddImage(props.img)} style={{marginLeft:30}}>Add Image to annotation server</Button>     
            
        </div>
        <Button variant="primary"  style={{marginTop:30}} onClick={() => handleStartTrain(label)}>Start Fine-tune model</Button>    
        <InputGroup className="mb-3" style={{marginTop:30}}>
            <InputGroup.Text id="basic-addon1">Label</InputGroup.Text>
            <FormControl
            placeholder="Cat"
            aria-label="Cat"
            aria-describedby="basic-addon1"
            style={{maxWidth:300}}
            onChange={(event) => handleLabelChange(event, setLabel)}
            />
        </InputGroup>
      </>
    
  ) 
}

export default Canvas