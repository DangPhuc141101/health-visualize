import React from 'react'

const Detail = (props) => {
    const position = props.position;
    const texts = props.texts;
   
    return (
        <div style={{position: 'absolute', top: position.y, left: position.x}}>
            {texts.length > 0 ? texts.map(text => (<p>{text}</p>)) : null}
        </div>
    );
}

export default Detail;