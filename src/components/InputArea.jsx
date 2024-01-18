import React from 'react';

function InputArea(props) {
    const handleKeyDown = (e) => {
        if (props.readOnly) return;
        if (e.key === 'Enter' && e.ctrlKey) props.translateText();
    }
    return (
        <div className='input-text'>
            <textarea onKeyDown={handleKeyDown} type='text'
                className='input-area'
                title={props.readOnly ? 'Translated Text' : 'Original Text'}
                readOnly={props.readOnly} placeholder={props.readOnly ? 'Translated text here' : 'Enter your text here'}
                onChange={props.onChange} value={props.text} />
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
