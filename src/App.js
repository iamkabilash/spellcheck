import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
const apikey = "TCiBXy9WXghcneVB";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [text, setText] = useState([]);
  const [response, setResponse] = useState("");

  const getUserInput = (e) =>{
    e.preventDefault();
    setUserInput(e.target.value);
    // getResponseFromAPI();
  }
  const resetInput = (e) =>{
    e.preventDefault();
  }
  const correctEverything = (e) =>{
    e.preventDefault();
    getResponseFromAPI();
  }
  const getResponseFromAPI = async () =>{
    await axios.get(`https://api.textgears.com/spelling?key=${apikey}&text=${userInput.replaceAll(' ', '+')}&language=en-GB`)
      .then((resp) => setResponse(resp.data.response.errors));
      // console.log(response);
      toObjects();
      updateObjects();
      // setUserInput("");
  }
  const toObjects = () =>{
    setText([]);
    let toArray = [];
    toArray = userInput.split(" ");
    toArray.map((item) => {
      setText(text => [...text, 
        {
          word : item,
          correctSpelling: true,
          betterSpelling: []
        }
      ]);
    });
    // console.log(text);
  }
  const updateObjects = () =>{
    // if response[i].bad === word in text.word
    //   then text.correctSpelling = false,
    //         text.betterSpelling = response[i].(...better)
    for (let i=0; i<response.length; i++){
      text.map((item) => {
        if (Object.values(item).indexOf(response[i].bad) > -1 ){
          item.correctSpelling = false;
          item.betterSpelling = response[i].better;
        }
      })
    }
    console.log(text);
  }

  return (
    <div>
      <h2>Spell check</h2>
      <div>
          {/* <textarea value={text.map((item)=><p className='under'>{item.name}</p>)} placeholder="Enter text" cols="30" rows="10" 
          onChange={getUserInput}></textarea> */}
        <textarea value={userInput} placeholder="Enter text" cols="30" rows="10" 
        onChange={getUserInput}></textarea>
        <button type="reset" onClick={resetInput}>Reset</button>
        <button type="submit" onClick={correctEverything}>Correct spelling</button>
      </div>
    </div>
  );
}

export default App;
