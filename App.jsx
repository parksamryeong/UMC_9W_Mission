import { useSelector, useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { selectCartItems, increaseQuantity, decreaseQuantity, clearCart, selectTotalCost } from './redux/cartSlice';
import { openModal, closeModal } from './redux/modalSlice';
import Modal from './components/Modal';
import './App.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: skyblue;
  }
`;

const AppContainer = styled.div`
  align-items: center;
  background-color: skyblue;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  padding-left: 200px;
  padding-right: 200px;
  align-items: center;
  text-align: left;
  background-color: cornflowerblue;
`;

const UmcPlayList = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const H2str = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 20px;
  font-weight: bold;
  width: 900px;
`;

const CartIconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CartItemCount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 14px;
`;

const AlbumCount = styled.div`
  display: flex;
  gap: 100px;
`;

const AlbumList = styled.div`
  padding: 20px;
  justify-content: center;
  text-align: center;
  max-width: 300px;
  padding-left: 200px;
  padding-right: 200px;
`;

const AlbumContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
  padding-top: 30px;
`;

const CartImg = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover; 
`;

const AlbumInfo = styled.div`
  margin-left: 20px;
  text-align: left;
  width: 500px;
  font-size: 15px;
`;

const AlbumTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const BtnBox = styled.div`
  padding: 50px;
`;

const TotalCost = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
  border-top: 2px solid black;
`;

const TotalCostText = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const ClearBtn = styled.div`
  width: 900px;
`;

const EmptyCartText = styled.p`
  padding: 100px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const App = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCost = useSelector(selectTotalCost);
  const totalItems = cartItems.reduce((total, item) => total + item.amount, 0);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.modal.isOpen);

  const handleClearCart = () => {
    dispatch(openModal());
  };

  const handleModalClose = (confirmed) => {
    if (confirmed) {
      dispatch(clearCart());
    }
    dispatch(closeModal());
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <Navbar>
        <UmcPlayList>UMC PlayList</UmcPlayList>
        <CartIconContainer>
          <div>🛒</div>
          {totalItems > 0 && <CartItemCount>{totalItems}</CartItemCount>}
        </CartIconContainer>
      </Navbar>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} />

      {cartItems.length > 0 ? (
        <AlbumList>
          <H2str>당신이 선택한 음반</H2str>
          {cartItems.map(item => (
            <AlbumContainer key={item.id}>
              <CartImg src={item.img} alt={item.title} />
              <AlbumCount>
                <AlbumInfo>
                  <AlbumTitle>
                    <h3>{item.title}</h3>
                    <h3>|</h3>
                    <h3>{item.singer}</h3>
                  </AlbumTitle>
                  <p>₩{item.price}</p>
                </AlbumInfo>
                <BtnBox>
                  <button onClick={() => dispatch(increaseQuantity({ id: item.id }))}>▲</button>
                  <p>{item.amount}</p>
                  <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>▼</button>
                </BtnBox>
              </AlbumCount>
            </AlbumContainer>
          ))}
          <TotalCost>
            <TotalCostText>총가격</TotalCostText>
            <TotalCostText>{totalCost.toLocaleString()}원</TotalCostText>
          </TotalCost>
          <ClearBtn>
            <button onClick={handleClearCart}>장바구니 초기화</button>
          </ClearBtn>
        </AlbumList>
      ) : (
        <EmptyCartText>고객님이 좋아하는 음반을 담아보세요~!</EmptyCartText>
      )}
    </AppContainer>
  );
};

export default App;
