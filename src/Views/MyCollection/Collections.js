import { Button, Form, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { createCollection, getERC721Info } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import ConnectWallet from 'Components/ConnectWallet';

import './index.css';

export default function Collections({ isCreateNew, setIsCreateNew }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nftInfo, setNftInfo] = useState(null);
  const { walletAddress, userCollections, web3 } = useSelector((state) => state);

  useEffect(() => {
    const getUserCollection = async () => {
      setNftInfo(await dispatch(getERC721Info()));
    };
    if (web3 && userCollections.length > 0) getUserCollection();
  }, [userCollections, web3, dispatch]);

  const [form] = Form.useForm();

  const onSubmit = useCallback(
    (values) => {
      dispatch(createCollection(values));
    },
    [dispatch]
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='choose'>
        {!!userCollections && userCollections[0] && nftInfo ? (
          <div
            className={`${isCreateNew ? 'active' : ''} box`}
            onClick={() => setIsCreateNew(true)}
          >
            <strong>{nftInfo.name}</strong>
            <p>{nftInfo.symbol}</p>
          </div>
        ) : (
          <div className={`${isCreateNew ? 'active' : ''} box`} onClick={showModal}>
            <strong>Create</strong>
            <p>ERC-721</p>
          </div>
        )}

        <div
          className={`${!isCreateNew ? 'active' : ''} box`}
          onClick={() => setIsCreateNew(false)}
        >
          <strong>Mochi</strong>
          <p>MOC</p>
        </div>
      </div>

      <Modal
        title='Collection'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={
          walletAddress
            ? [
                <Button key='cancel' shape='round' size='large' onClick={() => handleCancel()}>
                  Cancel
                </Button>,
                <Button
                  key='sell'
                  type='primary'
                  shape='round'
                  size='large'
                  onClick={() => handleOk()}
                >
                  Submit
                </Button>,
              ]
            : []
        }
      >
        {walletAddress ? (
          <Form onFinish={onSubmit} form={form} layout='vertical'>
            <Form.Item
              label='Display name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Enter token name',
                },
              ]}
            >
              <Input className='input-name-nft' placeholder='Enter token name' size='large' />
            </Form.Item>
            <Form.Item
              label='Symbol'
              name='symbol'
              rules={[
                {
                  required: true,
                  message: 'Enter token symbol',
                },
              ]}
            >
              <Input className='input-name-nft' placeholder='Enter token symbol' size='large' />
            </Form.Item>
          </Form>
        ) : (
          <div className='center'>
            <div onClick={() => handleCancel()}>
              <ConnectWallet />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
