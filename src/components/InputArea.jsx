import React from 'react';

function InputArea(props) {
    const handleKeyDown = (e) => {
        if (props.readOnly) return;
        if (e.key === 'Enter' && e.ctrlKey) props.translateText();
    }
    return (
        <div className='input-text'>
            <textarea onKeyDown={handleKeyDown} type='text' title={props.readOnly ? 'Translated Text' : 'Original Text'} style={{ width: '300px', height: '300px', fontSize: '20px', fontFamily: 'sans-serif', padding: '10px', resize: 'none' }} readOnly={props.readOnly} className='input-area' placeholder='Type your text here' onChange={props.onChange} value={props.text} />
            {
                !props.readOnly && <div className='input-'>
                    <span className='paste-icon' title='Paste' onClick={() => {
                        navigator.clipboard.readText().then(text => {
                            props.onChange({ target: { value: text } });
                        });
                    }}>📋</span>

                </div>
            }
        </div>
    )
}

export default InputArea
