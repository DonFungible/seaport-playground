import { ethers } from 'ethers';
import React, { useState, Dispatch, SetStateAction } from 'react';

const connectMetamask = async (
    setConnectedAddress: Dispatch<SetStateAction<string>>
) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    // Logic if user switches wallet
    // const accounts = await provider.send('eth_requestAccounts', []);
    // const account = accounts[0];
    try {
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        setConnectedAddress(signerAddress);
    } catch (e) {
        console.warn(e);
    }
};

export default function ConnectWalletButton() {
    const [connectedAddress, setConnectedAddress] = useState<string>('');

    return (
        <div>
            {connectedAddress ? (
                'Wallet connected: ' + connectedAddress
            ) : (
                <button onClick={() => connectMetamask(setConnectedAddress)}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
}
