import './App.css';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from './abi.json';
function App() {
;
    const [isWalletInstalled, setIsWalletInstalled] = useState(false);
    // state for keeping track of current connected account.
    const [account, setAccount] = useState(null);
    const [price,setPrice] = useState(0);
    useEffect(() => {
        if (window.ethereum) {
            setIsWalletInstalled(true);
        }
    }, []);
    
    async function connectWallet() {
        window.ethereum
            .request({
                method: "eth_requestAccounts",
            })
            .then((accounts) => {
                setAccount(accounts[0]);
            })
            .catch((error) => {
                alert("Something went wrong");
            });
        }

    async function getPrice(){
        console.log("in Price");
        const contractAddress = 0xc7c8ed42E4371962664d753E085389562026628f;
        const contractABI = abi.abi;
        const {polygon} = window;
console.log(window);
      if (polygon) {
        const provider = new ethers.providers.Web3Provider(polygon, "This is a Signing Method");
        const signer = provider.getSigner();
        const price = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const rep = await price.getLatestPrice();
        console.log("Price = "+rep);

        await rep.wait();
        setPrice = rep;
    }
}

        if (account === null) {
            return (
                <div className="App">
                    { 
                        isWalletInstalled ? (
                            <button onClick={connectWallet}>Connect Wallet</button>
                        ) : (
                            <p>Install Metamask wallet</p>
                        )
                    }
                </div>
             );
         }
             return (
                 <div className="App"> 
                    <img src="https://media.tenor.com/Fipe91QSAegAAAAd/dedikodu-gossip.gif"></img>
                     <p>Connected as: {account}</p>
                     <button type='Button' onClick={getPrice}>Get matic Price </button>
                    <h2>Price = {price}</h2>
                 </div>
             ); 
         }
export default App;