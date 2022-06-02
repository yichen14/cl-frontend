import React, { useRef, useEffect, useState } from 'react'
import { Tab, Row, Col, ButtonGroup, ToggleButton, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import {Buffer} from 'buffer';
import '../css/annotator.css'

let addImage = false
let is_postive = true
let click_x = -1.0
let click_y = -1.0


function getCursorPosition(canvas, event) {
    
    const rect = canvas.getBoundingClientRect()
    click_x = parseInt(event.clientX - rect.left)
    click_y = parseInt(event.clientY - rect.top)

    console.log("x: " + click_x + " y: " + click_y)

    const context = canvas.getContext('2d')
    context.fillStyle = "#00FF00";
    if (!is_postive){
        context.fillStyle = "#FF0000";
    }

    context.beginPath();
    context.arc(click_x, click_y, 3, 0, 2 * Math.PI);
    context.fill();
}

function handelSendClick(x, y, isPostive, name, setImgsrc){
    if(addImage===false){
        return 
    }
    if(x < 0 || y < 0) return
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
        
        response_img = Buffer.from(response.data["img"], 'base64')
        setImgsrc(`data:image/png;base64,${response.data["img"]}`)
        console.log("x: " + x + " y: " + y + " label: " + isPostive)
    })

    
}

function handelAddImage(img){
    let formData = new FormData();
    formData.append("file", img);
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

function handleDrawClick(setIsPostive, value){
    setIsPostive(value)
    is_postive = value
}

const Canvas = props => {
  const [isPostive, setIsPostive] = useState(true);
  const [imgsrc, setImgsrc] = useState(null);
  const [label, setLabel] = useState(null);
  
  useEffect(() => {
    handelAddImage(props.img)
    const img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.setAttribute('src', props.img);
    setImgsrc(props.img)
    const canvas = document.querySelector("#"+props.name);
    if (canvas){
        canvas.width = 1280
        canvas.height = 720
        const context = canvas.getContext('2d')

        context.clearRect(0, 0, 1280, 720)
        canvas.addEventListener('mousedown', function(e) {
            getCursorPosition(canvas, e)
            console.log("x: " + click_x + " y: " + click_y + " label: " + is_postive)
            handelSendClick(click_x,click_y, is_postive, props.name, setImgsrc)
        })
    }
  }, [])
  
  return(
      <>
        <div class="outsideWrapper">
            <div class="insideWrapper">
                <img id="show" src={imgsrc} class="coveredImage"/>
                <canvas id={props.name} class="coveringCanvas"/>
                
            </div>
        </div>
        
        <div style={{display:'block', marginTop:30}}>
            <ButtonGroup style={{marginLeft:40}}>
                <ToggleButton
                    key = "positive"
                    checked={isPostive === true}
                    variant={'outline-success'}
                    onClick={() => handleDrawClick(setIsPostive, true)}
                >
                    Postive
                </ToggleButton>
                <ToggleButton
                    key = "negative"
                    checked={isPostive === false}
                    variant={'outline-danger'}
                    onClick={() => handleDrawClick(setIsPostive, false)}
                >
                    Negative
                </ToggleButton>
            </ButtonGroup>
            <Button variant="primary"  style={{marginLeft:30}} onClick={() => handleStartTrain(label)}>Start fine-tune model</Button>
        </div>
            
        <InputGroup className="mb-3" style={{marginTop:30,marginLeft:40}}>
            <InputGroup.Text id="basic-addon1">Label</InputGroup.Text>
            <FormControl
            aria-describedby="basic-addon1"
            style={{maxWidth:330}}
            onChange={(event) => handleLabelChange(event, setLabel)}
            />
        </InputGroup>
      </>
    
  ) 
}

export default Canvas