import React from "react";
import "./MiniPalette.css"; // Import your custom CSS file

function MiniPalette(props) {
    
    const { classes, paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(color => (
        <div className="MiniPalette-miniColor"
        style={{ backgroundColor: color.color }}
        key={color.name}></div>
    ))
  return (
    <div className="MiniPalette-root" onClick={props.handleClick}>
        <div className="MiniPalette-colors">
            {miniColorBoxes}
        </div>
        <h5 className="MiniPalette-title">
            {paletteName} <span className="MiniPalette-emoji">{emoji}</span>
        </h5>
    </div>
  );
}

export default MiniPalette;