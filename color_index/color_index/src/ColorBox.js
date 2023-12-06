import React, {useState, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

const ColorBox = ({name, background, moreUrl, showLink}) => {
    const [copied, setCopied] = useState(false);

    const changeCopyState = () => {
        // TODO since this function is so short and only has 1 usage, we could even inline it.
        //     Then the line that uses it would look something like this:
        //     <CopyToClipboard text={background} onCopy={() => setCopied(true)}>
        setCopied(true);
    }

    useEffect(() => {
        // TODO might not work since it changes the very state variable that the useEffect is watching
        //     but the if-clause should counter that
        if (copied) {
            setTimeout(() => setCopied(false), 1500);
        }
    }, [copied]);

    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.7;
    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div className='ColorBox' style={{background}}>
                <div className={`copy-overlay ${copied && 'show'}`} style={{background}}/>
                <div className={`copy-msg ${copied && 'show'}`}>
                    <h1>copied!</h1>
                    <p className={`${isLightColor && 'dark-text'}`}>{props.background}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span className={isDarkColor && "light-text"}>{name} </span>
                    </div>
                    <button className={`copy-button ${isLightColor && 'dark-text'}`}> copy</button>
                </div>
                {showLink && (
                    <Link to={moreUrl} onClick={evt => evt.stopPropagation()}>
                        <span className={`see-more ${isLightColor && 'dark-text'}`}> more </span>
                    </Link>)}
            </div>
        </CopyToClipboard>
    )
}

export default ColorBox;