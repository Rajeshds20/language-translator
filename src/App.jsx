import React, { useEffect, useState } from 'react'
import './App.css'
import InputArea from './components/InputArea'
import Copy from './assets/Copy.jpg';
import Audio from './assets/Audio.png'
import Swap from './assets/Swap.png'

function App() {

  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('tanslate-langs')) {
      setLanguages(JSON.parse(localStorage.getItem('tanslate-langs')));
    }
    else {
      fetch('https://libretranslate.com/languages')
        .then(response => response.json())
        .then(data => {
          setLanguages(data);
          localStorage.setItem('tanslate-langs', JSON.stringify(data));
        })
        .catch(err => {
          console.error(err);
          alert('Please Check your internet connection');
        });
    }
  }, []);

  const translateText = () => {
    const text = fromText.trim();
    if (!text) {
      alert('Please enter some text to translate');
      return;
    }
    setToText('Translating...');
    if (!navigator.onLine) return alert('Please check your internet connection');
    fetch(`https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`)
      .then(response => response.json())
      .then(data => {
        setToText(data.responseData.translatedText);
      })
      .catch(err => {
        console.error(err);
        alert('Please Check your internet connection');
      });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    console.log('Copied', text);
  }

  const playSound = (text) => {
    let sound = new SpeechSynthesisUtterance();
    sound.lang = toLang;
    sound.text = text;
    window.speechSynthesis.speak(sound);
  }

  const swapLangs = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
    const temp2 = fromText;
    setFromText(toText);
    setToText(temp2);
  }

  return (
    <div className='app'>
      <div className='main'>
        <div className='inputs'>
          <div className='input-box'>
            <InputArea text={fromText} onChange={(e) => { setFromText(e.target.value) }} translateText={translateText} />
            <div className='lang-options'>
              <img title='Play' alt='play' src={Audio} onClick={() => { playSound(fromText) }} className='icon' />
              <img title='Copy' alt='copy' src={Copy} onClick={() => { copyText(fromText); }} className='icon' />
              <select title='Select language' className='select-lang' value={fromLang} onChange={(e) => { setFromLang(e.target.value) }}>
                {
                  languages.map((language) => {
                    return <option key={language.code} value={language.code}>{language.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='input-box'>
            <InputArea text={toText} readOnly={true} />
            <div className='lang-options'>
              <select title='Select language' className='select-lang' value={toLang} onChange={(e) => { setToLang(e.target.value) }}>
                {
                  languages.map((language) => {
                    return <option key={language.code} value={language.code}>{language.name}</option>
                  })
                }
              </select>
              <img title='Copy' alt='copy' src={Copy} onClick={() => { copyText(toText); }} className='icon' />
              <img title='Play' alt='play' src={Audio} onClick={() => { playSound(toText) }} className='icon' />
            </div>
          </div>
          <img title='Swap' alt='swap' src={Swap} className='swap-icon'
            onClick={swapLangs} />
        </div>
        <div className='translate'>
          <button title='Translate' className='translate-btn' onClick={translateText} >Translate</button>
          <div className='char-count-bar'>Character Count: {fromText.length}</div>
        </div>
      </div>
      <div className='footer'>
        <h4>Made with ❣️ by Rajesh</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '-25px' }}>
            <h5> Wanted to contribute ?</h5>
            <span><a href='https://github.com/rajeshds20/language-translator' target='_blank' rel='noreferrer'>
              <img style={{ width: '35px', marginTop: '10px' }} alt='github' src='https://img.icons8.com/fluent/48/000000/github.png' />
            </a>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '-25px' }}>
            <h5>Connect with me:</h5>
            <a href='https://www.linkedin.com/in/devangamsajjarajesh/' target='_blank' rel='noreferrer'>
              <img alt='linkedin' style={{ width: '35px', marginTop: '10px' }} src='https://img.icons8.com/color/48/000000/linkedin.png' />
            </a>
            <a href='https://twitter.com/rajeshds55' target='_blank' rel='noreferrer'>
              <img alt='twitter' style={{ width: '35px', marginTop: '10px' }} src='https://img.icons8.com/color/48/000000/twitter.png' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
