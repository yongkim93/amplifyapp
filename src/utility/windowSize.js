import React from 'react'

const windowSize = (props) =>{
    const el = document.getElementById("vertical_grid");
    //console.log(window.screen.width, window.screen.height);
    console.log(el.clientWidth, el.clientHeight);
}

export default windowSize;