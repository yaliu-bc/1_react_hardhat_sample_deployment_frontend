import './App.css';
import {useState} from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

//the contract address
//on localhost: 0x5fbdb2315678afecb367f032d93f642f64180aa3
//on 
const mycontractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

function App() {
  const [greetingSet, setGreetingVal] = useState('');
  const [greetingGet, getGreetingVal] = useState('');

  //request to connect to a metamask wallet
  async function requestAccount(){
    //request metamask accounts
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  //get greeting
  async function getGreeting(){
    //check if metamask is installed
    if(typeof window.ethereum !== 'undefined' ) {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(mycontractAddress, Greeter.abi, provider);

      try{
        //get data from the contract
        const data = await contract.greet();
        //log the returned data
        console.log('data: ', data);
        //Save to display as well
        getGreetingVal(data);
      }catch(err){
        console.log('Error: ', err);
      }
    }

  }

  //set greeting
  async function setGreeting() {
    if(!greetingSet) return;

    if(typeof window.ethereum !== 'undefined') {
      //connect the account
      await requestAccount();

      //call the contract to proceed a transaction
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mycontractAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greetingSet);
      
      //wait for the transaction to finish
      await transaction.wait();

      //refresh UI
      getGreeting();
      setGreetingVal('');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p Try React Dapp to interact with the smart contract />
          
        <button onClick={getGreeting}>Click to Get Current Greeting String</button>
        {greetingGet} 
        <p/>
        
        <p>
          Set a new string here: 
        <input
          onChange={e=>setGreetingVal(e.target.value)}
          placeholder='Your new string'
          value={greetingSet}
          />
          </p>
          <button onClick={setGreeting}>Confirm</button>
      </header>
    </div>
  );
}

export default App;
