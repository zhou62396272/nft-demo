import { Card } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import imgNotFound from 'Assets/notfound.png';

export default function CardNFTHome({ token }) {
  const { web3 } = useSelector((state) => state);
  const [detailNFT, setDetailNFT] = useState(null);

  useEffect(() => {
    let isUnmount = false; 
    async function fetchDetail() {
      if (!!token && !!token.tokenURI && isUnmount) {
        try {
          let req = await axios.get(token.tokenURI);
          setDetailNFT(req.data);
        } catch (error) {
          setDetailNFT({ name: 'Unnamed', description: '', image: imgNotFound });
        }
      } else {
        setDetailNFT({ name: '', description: '', image: imgNotFound });
      }
    }
    fetchDetail();
    return () => isUnmount = true;
  }, [token,token.tokenURI]);

  return !!detailNFT ? (
    <Link to={`/token/${token.addressToken}/${token.index}`}>
      <Card hoverable cover={<img alt={`img-nft-${token.index}`} src={detailNFT.image} />}>
        <div className='ant-card-meta-title'>{detailNFT.name}</div>
        <div className='ant-card-meta-description textmode'>
          {!!token.price ? `${web3.utils.fromWei(token.price, 'ether')} BNB` : <></>}
        </div>
      </Card>
    </Link>
  ) : null;
}
