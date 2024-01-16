import React, { useEffect, useState } from 'react'
import './App.css'
import InputArea from './components/InputArea'
import Copy from './assets/Copy.jpg';
import Audio from './assets/Audio.png'

function App() {

  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch('https://libretranslate.com/languages')
      .then(response => response.json())
      .then(data => {
        setLanguages(data);
      })
  }, []);

  return (
    <div className='app'>
      <div className='main'>
        <div className='inputs'>
          <div className='input-box'>
            <InputArea text={fromText} onChange={(e) => {
              setFromText(e.target.value)
            }} />
            <div className='lang-options'>
              <img title='Play' alt='play' src={Audio} className='icon' />
              <img title='Copy' alt='copy' src={Copy} className='icon' />
              <select className='select-lang' value={fromLang} onChange={(e) => {
                setFromLang(e.target.value)
              }}>
                {
                  languages.map((language) => {
                    return <option key={language.code} value={language.code}>{language.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className='input-box'>
            <InputArea text={toText} readOnly={true} onChange={(e) => {
              setToText(e.target.value)
            }} />
            <div className='lang-options'>
              <select className='select-lang' value={toLang} onChange={(e) => {
                setToLang(e.target.value)
              }}>
                {
                  languages.map((language) => {
                    return <option key={language.code} value={language.code}>{language.name}</option>
                  })
                }
              </select>
              <img title='Copy' alt='copy' src={Copy} className='icon' />
              <img title='Play' alt='play' src={Audio} className='icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
