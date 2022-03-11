import React, { useState, useEffect } from 'react';
import { ethers, utils } from "ethers";
import abi from "./contracts/Ouija.json";


function App() {
  
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("-");
  const [currentAnswer, setCurrentAnswer] = useState("-");
  const [lastQuestion, setLastQuestion] = useState("-");
  const [lastAnswer, setLastAnswer] = useState("-");
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');

  const contractAddress = '0x4c7022a3E42EAe63f407b9e31378caC414D3DE5b';
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0];
        setIsWalletConnected(true);
        console.log("Account Connected: ", account);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentQuestion = async () => {
    try {
      if (window.ethereum) {

        //read data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const OuijaContract = new ethers.Contract(contractAddress, contractABI, signer);

        let currentQuestion = await OuijaContract.getCurrentQuestion();
        setCurrentQuestion(currentQuestion.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentAnswer = async () => {
    try {
      if (window.ethereum) {

        //read data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const OuijaContract = new ethers.Contract(contractAddress, contractABI, signer);

        let currentAnswer = await OuijaContract.currentAnswer();
        
        setCurrentAnswer(currentAnswer);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getLastAnswer = async () => {
    try {
      if (window.ethereum) {

        //read data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const OuijaContract = new ethers.Contract(contractAddress, contractABI, signer);

        let lastAnswer = await OuijaContract.lastAnswer();
        setLastAnswer(lastAnswer.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getLastQuestion = async () => {
    try {
      if (window.ethereum) {

        //read data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const OuijaContract = new ethers.Contract(contractAddress, contractABI, signer);

        let lastQuestion = await OuijaContract.lastQuestion();
        setLastQuestion(lastQuestion.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addLetter = async (letter) => {
    console.log(letter);
    try {
      if (window.ethereum) {
        //write data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ouijaContract = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await ouijaContract.addLetter(letter);
        console.log("adding letter");
        await txn.wait();
        console.log("done", txn.hash);

        getCurrentAnswer();

      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const askQuestion = async (question) => {
    console.log("asked question")
    try {
      if (window.ethereum) {
        //write data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ouijaContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(question)
        const txn = await ouijaContract.askQuestion(question.input);
        console.log("posting question");
        await txn.wait();
        console.log("done", txn.hash);

        getCurrentQuestion();

      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const validateAnswer = async () => {
    console.log('goodbye')
    try {
      if (window.ethereum) {
        //write data
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ouijaContract = new ethers.Contract(contractAddress, contractABI, signer);
        const txn = await ouijaContract.validateAnswer();
        console.log("validating answer");
        await txn.wait();
        console.log("done", txn.hash);

        getCurrentAnswer();
        getCurrentQuestion();
        getLastAnswer();
        getLastQuestion();

      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    getCurrentAnswer();
    getCurrentQuestion();
    getLastAnswer();
    getLastQuestion();
  }, [isWalletConnected])


  return (
    <React.Fragment>
    <div className="block">
      <div className="box my-4">
      <p>Question asked : <strong>{currentQuestion}</strong></p> 
          <p>Spirit answer: <strong>{currentAnswer}</strong></p>
      </div>

    </div>
    <div className="block"></div>
    <div className="box">
    <div class="columns">
        <div></div>
        <button className="button" onClick={() => {addLetter("a")}} > A </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('b')}} > B </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('c')}} > C </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('d')}} > D </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('e')}} > E </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('f')}} > F </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('g')}} > G </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('h')}} > H </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('i')}} > I </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('j')}} > J </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('k')}} > K </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('l')}} > L </button>
        <div class="column"></div>
        <button className="button" onClick={() => {addLetter('m')}} > M </button>
    </div>
    <div className="block"></div>
    <div class="columns">
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('n')}} > N </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('o')}} > O </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('p')}} > P </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('q')}} > Q </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('r')}} > R </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('s')}} > S </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('t')}} > T </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('u')}} > U </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('v')}} > V </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('w')}} > W </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('x')}} > X </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('y')}} > Y </button>
          <div class="column"></div>
          <button className="button" onClick={() => {addLetter('z')}} > Z </button>
          <div class="column"></div>
    </div>
    <div className="columns">
      <div className="column"></div>
      <div className="column has-text-centered">
          <button className="button mx-4" onClick={() => {addLetter('yes')}} > YES </button>
          <button className="button" onClick={() => {addLetter('_')}} > _______ </button>
          <button className="button mx-4" onClick={() => {addLetter('no')}} > NO </button>
      </div>
      <div className="column"></div>
    </div>

    <div></div>
    <div className="columns">
      <div className="column"></div>
      <div className="column has-text-centered">
          <button className="button" onClick={() => validateAnswer()} > Goodbye </button>
      </div>
      <div className="column"></div>
    </div>
    </div>
    
    <div>
    </div>
    <div className="box">
    <div class="field has-addons">
      <div class="control">
        <input class="input" type="text" value={input} onInput={e => setInput(e.target.value)} placeholder="Where is my cat"/>
      </div>
      <div class="control">
        <button className="button is-primary" onClick={() => askQuestion({input})} > ask Question</button>
      </div>
      </div>
    </div>

    <div className="box">
      <p>Last question answer</p>
      <p> <strong>{lastQuestion}</strong> : {lastAnswer}</p>
    </div>

    </React.Fragment>
  );

}

export default App;
