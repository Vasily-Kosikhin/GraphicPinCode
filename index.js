  "use strictct"
// доработать логику пинкодов 
// добавить уведомления
// добавить вибрацию

  const container = document.querySelector(`#container`)

  document.addEventListener(`pointerdown`, choseDote);
  document.addEventListener(`pointerup`, savePin);
  let pinResetButton = document.querySelector(`#pinResetButton`)
  let targetNumber;
  let target;
  let pinCode = []
  let trigger;
  let all = document.querySelectorAll(`*`)
  let showTrigger = false;

  for (let item of all) {
    item.ondragstart = function() {
      return false;
    };
  }
  showTip(`Enter Pin Code`)

  function savePin() {
    document.removeEventListener(`pointermove`, drawLine);

    let lines = document.querySelectorAll(`.line`)
    let connectedLines = document.querySelectorAll(`.connectedLine`)
    let dotes = document.querySelectorAll(`.dot`)

    if (`LS pinCode`,localStorage.getItem(`pinCode`)) {
      tryPin();
      for (let line of lines) {
        line.remove()
      }
  
      setTimeout(clear, 200);
      function clear() {
        for (let dote of dotes) {
          dote.classList.remove(`slectedDot`)
        }
        for (let connectedLine  of connectedLines) {
          connectedLine.remove()
        }
      }
      return
    }

    for (let line of lines) {
      line.remove()
    }

    setTimeout(clear, 200);
    function clear() {
      for (let dote of dotes) {
        dote.classList.remove(`slectedDot`)
      }
      for (let connectedLine  of connectedLines) {
        connectedLine.remove()
      }
    }
    
    trigger = true;
    if (pinCode.length < 4) {
      showTip(`Pin code should contains at least 4 characters`)
      pinCode = []
      localStorage.removeItem(`pinCode`)
    } else {
      showTip(`Pin code saved`)
      localStorage.setItem(`pinCode`, JSON.stringify(pinCode))
      pinCode = []
    }
  }

  function choseDote() {
    // localStorage.removeItem(`pinCode`)
    if(!document.elementFromPoint(event.pageX, event.pageY).classList.contains(`dot`) || document.elementFromPoint(event.pageX, event.pageY).classList.contains(`slectedDot`)) {
      return
    }

    target = document.elementFromPoint(event.pageX, event.pageY)

    targetNumber = target.getAttribute(`id`).slice(-1) 

    // if (!localStorage.getItem(`pinCode`)) {
    //   pinCode.push(targetNumber)
    // } 
    pinCode.push(targetNumber);
    
    console.log(pinCode)


    let line = document.createElement(`div`)
    line.classList.add(`line`)
    line.setAttribute(`id`,`line${targetNumber}`)
    line.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + `px`
    line.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 + `px`

    target.classList.add(`slectedDot`)

    if (pinCode.length == 9) {
      savePin()
      return
    }

    target.append(line)
    

    document.addEventListener(`pointermove`, drawLine);
      
  }


  function drawLine() {

    let widthGrow = event.pageX - target.getBoundingClientRect().left - target.clientWidth / 2 


    let heightGrow = event.pageY - target.getBoundingClientRect().top - target.clientHeight / 2 
    let deg = Math.atan(heightGrow/widthGrow) 
    let degRad = deg * 57.3
    let lineLength 
    let shiftX;
    let shiftY;
    let line;
    let elemBelow;
  
    if (widthGrow > 0 && heightGrow > 0) {
      if (trigger) {
        trigger = false;
        return 
      }
      document.querySelector(`#line${targetNumber}`).remove()

      lineLength = widthGrow / Math.cos(deg)

      shiftX = Math.cos(deg) * lineLength / 2  - 5
      shiftY = lineLength * (1 - Math.sin(deg)) / 2

      line = document.createElement(`div`)
      line.classList.add(`line`)
      line.setAttribute(`id`,`line${targetNumber}`)

      line.style.height = lineLength - 1 + `px`;
      line.style.top = target.getBoundingClientRect().top - shiftY + target.clientHeight / 2 + `px`
      line.style.left = target.getBoundingClientRect().left + shiftX + target.clientWidth / 2 + `px`
      line.style.transform = `rotate(${90 + degRad}deg)`
      

      target.append(line);

      elemBewloFinder()  

  
              
    } else if (widthGrow > 0 && heightGrow < 0) {

      document.querySelector(`#line${targetNumber}`).remove()

      lineLength = widthGrow / Math.cos(deg)

      shiftX = Math.cos(deg) * lineLength / 2 - 5
      shiftY = lineLength * (1 - Math.sin(deg)) / 2

      line = document.createElement(`div`)
      line.classList.add(`line`)
      line.setAttribute(`id`,`line${targetNumber}`)

      line.style.height = lineLength + `px`;
      line.style.top = target.getBoundingClientRect().top - shiftY + target.clientHeight / 2 + 1 + `px`
      line.style.left = target.getBoundingClientRect().left + shiftX + target.clientWidth / 2 - 1 + `px`
      line.style.transform = `rotate(${90 + degRad}deg)`
      

      target.append(line);

      elemBewloFinder()

    } else if (widthGrow < 0 && heightGrow < 0) {

      document.querySelector(`#line${targetNumber}`).remove()



      lineLength = (-widthGrow)/ Math.cos(deg)
      
      shiftX = Math.cos(deg) * lineLength / 2 + 5
      shiftY = (lineLength * (1 - Math.sin(-deg)) / 2)

      
      line = document.createElement(`div`)
      line.classList.add(`line`)
      line.setAttribute(`id`,`line${targetNumber}`)
      line.style.margin = `1px 0 0 1px`
      line.style.height = lineLength + `px` ;
      line.style.top = target.getBoundingClientRect().top - shiftY + target.clientHeight  / 2  + `px`
      line.style.left = target.getBoundingClientRect().left - shiftX + target.clientWidth / 2 + `px`
      line.style.transform = `rotate(${-90 + degRad}deg)`

      target.append(line);

      elemBewloFinder()
    } else if(widthGrow < 0 && heightGrow > 0) {

      document.querySelector(`#line${targetNumber}`).remove()

      lineLength = (-widthGrow)/ Math.cos(deg)

      shiftX = Math.cos(deg) * lineLength / 2 + 5
      shiftY = (lineLength * (1 - Math.sin(-deg)) / 2)

      line = document.createElement(`div`)
      line.classList.add(`line`)
      line.setAttribute(`id`,`line${targetNumber}`)
      line.style.margin = `0 1px 0 1px`
      line.style.height = lineLength + `px` ;
      line.style.top = target.getBoundingClientRect().top - shiftY + target.clientHeight / 2 + `px`
      line.style.left = target.getBoundingClientRect().left - shiftX + target.clientWidth / 2 +`px`
      line.style.transform = `rotate(${-90 + degRad}deg)`

      target.append(line);
      
      
      elemBewloFinder()
  }

  function elemBewloFinder() {
      line.hidden = true;
      elemBelow = document.elementFromPoint(event.pageX, event.pageY)
      if (elemBelow.classList.contains(`dot`) && elemBelow.getAttribute(`id`) != `dot${targetNumber}` && !elemBelow.classList.contains(`slectedDot`)) {

        line.hidden = false;
        connectedLine()
        document.removeEventListener(`click`, drawLine);
        choseDote()
        return
        }
      line.hidden = false;
    }

    function connectedLine() {
    
      line.hidden = true;
      let diffrense = Math.abs(Math.abs(Number(targetNumber)) - Math.abs(Number(elemBelow.getAttribute(`id`).slice(-1))))

      if(diffrense == 1) {
        if (elemBelow.getBoundingClientRect().left < target.getBoundingClientRect().left) {
          swap()
        }
        if (target.getBoundingClientRect().top == elemBelow.getBoundingClientRect().top) {
        let connectedLine = document.createElement(`div`)
        connectedLine.classList.add(`connectedLine`)
        const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
        connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 - 5 + `px` 
        connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 + `px`
        connectedLine.style.height = 10 + `px`;
        connectedLine.style.width = lenghtBetweenDots + `px`;
        target.append(connectedLine);
        }
        if(target.getBoundingClientRect().top != elemBelow.getBoundingClientRect().top) { 
          let connectedLine = document.createElement(`div`)
          connectedLine.classList.add(`connectedLine`)
          const targetCoords = target.getBoundingClientRect()
          const elemBelowCoords = elemBelow.getBoundingClientRect() 
          const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
          const angleDeg = angle * 57.3
          const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
          const calculatedLength = lenghtBetweenDots / Math.cos(angle)
          const shiftY = (calculatedLength * Math.sin(angle)) / 2
          const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
          const microShiftY = 10 * Math.sin(angle) / 2
          const microShiftX = 10 * Math.cos(angle) / 2

          connectedLine.style.height = 10 + `px`;
          connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
          connectedLine.style.transform = `rotate(${angleDeg}deg)`
          connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY + microShiftY - 3+ `px` // -5 
          connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX + 1 + `px`

          target.append(connectedLine)
        }
      }
      if(diffrense == 2) {
        if (elemBelow.getBoundingClientRect().left < target.getBoundingClientRect().left) {
          swap()
        } 
        if (target.getBoundingClientRect().top == elemBelow.getBoundingClientRect().top) {

          let connectedLine = document.createElement(`div`)
          connectedLine.classList.add(`connectedLine`)
          const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
          connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 - 5 + `px` 
          connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 + `px`
          connectedLine.style.height = 10 + `px`;
          connectedLine.style.width = lenghtBetweenDots + `px`;
          target.append(connectedLine);

        }
        if(Math.abs(Math.round(target.getBoundingClientRect().top - elemBelow.getBoundingClientRect().top) == 200)) { 
          let connectedLine = document.createElement(`div`)
          connectedLine.classList.add(`connectedLine`)
          const targetCoords = target.getBoundingClientRect()
          const elemBelowCoords = elemBelow.getBoundingClientRect() 
          const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
          const angleDeg = angle * 57.3
          const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
          const calculatedLength = lenghtBetweenDots / Math.cos(angle)
          const shiftY = (calculatedLength * Math.sin(angle)) / 2
          const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
          const microShiftY = 10 * Math.sin(angle) / 2
          const microShiftX = 10 * Math.cos(angle) / 2

          connectedLine.style.height = 10 + `px`;
          connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
          connectedLine.style.transform = `rotate(${angleDeg}deg)`
          connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY + microShiftY + `px` // -5 
          connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX - 1 + `px`

          target.append(connectedLine);
        } 
        

      }
      if(diffrense == 3) {

        if (elemBelow.getBoundingClientRect().top < target.getBoundingClientRect().top) {
          swap()
        }

        let connectedLine = document.createElement(`div`)
        const lenghtBetweenDots = elemBelow.getBoundingClientRect().top - target.getBoundingClientRect().top 
        connectedLine.classList.add(`connectedLine`)
        connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2  + `px` 
        connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - 5 + `px`
        connectedLine.style.height = lenghtBetweenDots + `px`;
        connectedLine.style.width =  10 + `px`;

        target.append(connectedLine);
      }
      if(diffrense == 6) {
        if (elemBelow.getBoundingClientRect().top < target.getBoundingClientRect().top) {
          swap()
        }

        let connectedLine = document.createElement(`div`)
        const lenghtBetweenDots = elemBelow.getBoundingClientRect().top - target.getBoundingClientRect().top 
        connectedLine.classList.add(`connectedLine`)
        connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2  + `px` 
        connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - 5 + `px`
        connectedLine.style.height = lenghtBetweenDots + `px`;
        connectedLine.style.width =  10 + `px`;

        target.append(connectedLine);
      }
      if(diffrense == 4) {
        if (elemBelow.getBoundingClientRect().top < target.getBoundingClientRect().top) {
          swap()
        }
        if (target.getAttribute(`id`) == `dot3` || target.getAttribute(`id`) == `dot7`) {
          swap()  
          let connectedLine = document.createElement(`div`)
          connectedLine.classList.add(`connectedLine`)
          const targetCoords = target.getBoundingClientRect()
          const elemBelowCoords = elemBelow.getBoundingClientRect() 
          const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
          const angleDeg = angle * 57.3
          const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
          const calculatedLength = lenghtBetweenDots / Math.cos(angle)
          const shiftY = (calculatedLength * Math.sin(angle)) / 2
          const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
          const microShiftY = 10 * Math.sin(angle) / 2
          const microShiftX = 10 * Math.cos(angle) / 2
  
          connectedLine.style.height = 10 + `px`;
          connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
          connectedLine.style.transform = `rotate(${angleDeg}deg)`
          connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY + microShiftY - 1 + `px` // -5 
          connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX + 1 + `px`
  
          target.append(connectedLine);
        } else {
          let connectedLine = document.createElement(`div`)
          connectedLine.classList.add(`connectedLine`)
          const targetCoords = target.getBoundingClientRect()
          const elemBelowCoords = elemBelow.getBoundingClientRect() 
          const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
          const angleDeg = angle * 57.3
          const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
          const calculatedLength = lenghtBetweenDots / Math.cos(angle)
          const shiftY = (calculatedLength * Math.sin(angle)) / 2
          const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
          const microShiftY = 10 * Math.sin(angle) / 2
          const microShiftX = 10 * Math.cos(angle) / 2
  
          connectedLine.style.height = 10 + `px`;
          connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
          connectedLine.style.transform = `rotate(${angleDeg}deg)`
          connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY - microShiftY + `px` // -5 
          connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX + 1 + `px`
  
          target.append(connectedLine);
          
  
        }
      }
      if(diffrense == 8) {
        if (elemBelow.getBoundingClientRect().top < target.getBoundingClientRect().top) {
          swap()
        }

        let connectedLine = document.createElement(`div`)
        connectedLine.classList.add(`connectedLine`)
        const targetCoords = target.getBoundingClientRect()
        const elemBelowCoords = elemBelow.getBoundingClientRect() 
        const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
        const angleDeg = angle * 57.3
        const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
        const calculatedLength = lenghtBetweenDots / Math.cos(angle)
        const shiftY = (calculatedLength * Math.sin(angle)) / 2
        const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
        const microShiftY = 10 * Math.sin(angle) / 2
        const microShiftX = 10 * Math.cos(angle) / 2

        connectedLine.style.height = 10 + `px`;
        connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
        connectedLine.style.transform = `rotate(${angleDeg}deg)`
        connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY - microShiftY + `px` // -5 
        connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX + 1 + `px`

        target.append(connectedLine);
      }
      if(diffrense == 5) {
        
        if (elemBelow.getBoundingClientRect().top < target.getBoundingClientRect().top) {
          swap()
        }
        if (Math.abs(Math.round(target.getBoundingClientRect().top - elemBelow.getBoundingClientRect().top)) == 200) {
        let connectedLine = document.createElement(`div`)
        connectedLine.classList.add(`connectedLine`)
        const targetCoords = target.getBoundingClientRect()
        const elemBelowCoords = elemBelow.getBoundingClientRect() 
        const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
        const angleDeg = angle * 57.3
        const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
        const calculatedLength = lenghtBetweenDots / Math.cos(angle)
        const shiftY = (calculatedLength * Math.sin(angle)) / 2
        const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
        const microShiftY = 10 * Math.sin(angle) / 2
        const microShiftX = 10 * Math.cos(angle) / 2

        connectedLine.style.height = 10 + `px`;
        connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
        connectedLine.style.transform = `rotate(${angleDeg}deg)`
        connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY - microShiftY - 2 + `px` // -5 
        connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX + 1 + `px`

        target.append(connectedLine)
        }
        if (Math.abs(Math.round(target.getBoundingClientRect().top - elemBelow.getBoundingClientRect().top)) == 400) {
        swap()

        let connectedLine = document.createElement(`div`)
        connectedLine.classList.add(`connectedLine`)  
        const targetCoords = target.getBoundingClientRect()
        const elemBelowCoords = elemBelow.getBoundingClientRect() 
        const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
        const angleDeg = angle * 57.3
        const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
        const calculatedLength = lenghtBetweenDots / Math.cos(angle)
        const shiftY = (calculatedLength * Math.sin(angle)) / 2
        const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
        const microShiftY = 10 * Math.sin(angle) / 2
        const microShiftX = 10 * Math.cos(angle) / 2

        connectedLine.style.height = 10 + `px`;
        connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
        connectedLine.style.transform = `rotate(${angleDeg}deg)`
        connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY +  microShiftY - 1 + `px` // -5 
        connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX + 1 + `px`

        target.append(connectedLine);
        }
      }
      if(diffrense == 7) {
        if (elemBelow.getBoundingClientRect().top < target.getBoundingClientRect().top) {
          swap()
        }

        let connectedLine = document.createElement(`div`)
        connectedLine.classList.add(`connectedLine`)
        const targetCoords = target.getBoundingClientRect()
        const elemBelowCoords = elemBelow.getBoundingClientRect() 
        const angle = Math.atan((elemBelowCoords.top - targetCoords.top)/(elemBelowCoords.left - targetCoords.left))
        const angleDeg = angle * 57.3
        const lenghtBetweenDots = elemBelow.getBoundingClientRect().left - target.getBoundingClientRect().left 
        const calculatedLength = lenghtBetweenDots / Math.cos(angle)
        const shiftY = (calculatedLength * Math.sin(angle)) / 2
        const shiftX = (calculatedLength * (1 - Math.cos(angle))) / 2
        const microShiftY = 10 * Math.sin(angle) / 2
        const microShiftX = 10 * Math.cos(angle) / 2

        connectedLine.style.height = 10 + `px`;
        connectedLine.style.width =  lenghtBetweenDots / Math.cos(angle) + `px`;
        connectedLine.style.transform = `rotate(${angleDeg}deg)`
        connectedLine.style.top = target.getBoundingClientRect().top + target.clientHeight / 2 + shiftY - microShiftY - 2 + `px` // -5 
        connectedLine.style.left = target.getBoundingClientRect().left + target.clientWidth / 2 - shiftX - 1 + `px`

        target.append(connectedLine);
      }
    }
    function swap() {
      let swap;
      swap = elemBelow;
      elemBelow = target;
      target = swap;
    }
  }

  function showTip(tip) {
    if (showTrigger) {
      return;
    }
    showTrigger = true;
    let start = Date.now();
    temporaryTip.innerHTML = tip
    temporaryTip.style.opacity = 1;
    let containerCoord = document.querySelector(`#container`).getBoundingClientRect()
    temporaryTip.style.top = containerCoord.top + 30 + `px`;
  
    function startAnimation() {
      let timer = setInterval(function() {
      
        let timePassed = start - Date.now();
    
        if (timePassed <= -2000) {
          temporaryTip.style.opacity = 0;
          showTrigger = false;
          clearInterval(timer)
          return
        }
        temporaryTip.style.top = parseInt(temporaryTip.style.top) - 1 + `px`
        temporaryTip.style.opacity -= 0.02
      }, 20)
    }
    setTimeout(startAnimation, 400)
  }

  function tryPin() {

    let oldPin = JSON.parse(localStorage.getItem(`pinCode`))

    let equalParameter = 0;
    if (oldPin.length == pinCode.length) {
      for(let i = 0; i < oldPin.length; i++) {
        if(pinCode[i] == oldPin[i]) {
          equalParameter += 1;
        }
      }
    }
    if(equalParameter == oldPin.length) {
      showTip(`Access allowed!`)
      pinCode = [];
    } else {
      showTip(`Access denied : wrong pin code!`)
      pinCode = [];
    }

  }

pinResetButton.addEventListener(`click`, resetPinCode);

function resetPinCode() {
  
  event.stopPropagation()
  showTrigger = false;
  showTip(`Pin code reset`)
  localStorage.removeItem(`pinCode`)
  pinCode = [];
  
}
  

