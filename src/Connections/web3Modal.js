import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Authereum from 'authereum';
import Fortmatic from 'fortmatic';
import Portis from '@portis/web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { setChainId, setWeb3 } from 'store/actions';
import store from 'store/index';

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: 'PORTIS_ID', // required
    },
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: 'pk_test_F266140F4F5611D1', // required
    },
  },
  authereum: {
    package: Authereum, // required
  },
};

export const connectWeb3Modal = async () => {
  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    // cacheProvider: true, // optional
    providerOptions, // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);

  let chainId = await web3.eth.net.getId();

  console.log(store);
  if (chainId === 1 || chainId === 4 || chainId === 3) {
    store.dispatch(setChainId(chainId));
  } else {
    alert('Please change to Mainnet or Rinkeby or Ropsten testnet');
  }

  store.dispatch(setWeb3(web3));

  // Subscribe to accounts change
  provider.on('accountsChanged', (accounts) => {
    console.log(accounts);
  });

  // Subscribe to chainId change
  provider.on('chainChanged', (chainId) => {
    console.log(chainId);
  });

  // Subscribe to provider connection
  provider.on('connect', (info) => {
    console.log(info);
  });

  // Subscribe to provider disconnection
  provider.on('disconnect', (error) => {
    console.log(error);
  });
};
