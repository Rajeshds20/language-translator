import React from 'react';

function InputArea(props) {
    return (
        <div className='input-text'>
            {/* Multiline text input  */}
            <input type='text' style={{ width: '300px', height: '300px', fontSize: '20px' }} readOnly={props.readOnly} className='input-area' placeholder='Type your text here' onChange={props.onChange} value={props.text} />
        </div>
    )
}

export default InputArea
