import BackButton from 'Components/BackButton';
import { useHistory } from 'react-router';
import Single from '../../Assets/images/single.png';
import More from '../../Assets/images/more.png';
import './index.css';

export default function Create() {
  const history = useHistory();

  function push(to) {
    history.push(to);
  }

  return (
    <div className='center create-pt'>
      <div className='create-box'>
        <BackButton />
        <h2 className='textmode'>Create collectible</h2>
        <p className='textmode'>
          Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want
          to sell one collectible multiple times
        </p>

        <div className='justifyContentSa'>
          <div className='box input-mode-bc slt center' onClick={() => push('/create/erc721/')}>
            <img
              src={Single}
              alt='single'
            />
            <p>Single</p>
          </div>

          <div className='box input-mode-bc slt center' onClick={() => push('/create/erc1155')}>
            <img
              src={More}
              alt='multiple'
            />
            <p>Multiple</p>
          </div>
        </div>

        <p className='textmode'>
          We do not own your private keys and cannot access your funds without your confirmation
        </p>
      </div>
    </div>
  );
}
