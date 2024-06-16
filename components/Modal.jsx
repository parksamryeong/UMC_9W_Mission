import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const ModalActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: ${({ primary }) => (primary ? 'skyblue' : 'lightgray')};
  color: ${({ primary }) => (primary ? 'white' : 'black')};
  border-radius: 4px;
`;

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onClose(true);
    };

    const handleCancel = () => {
        onClose(false);
    };

    return (
        <ModalBackdrop>
            <ModalContent>
                <p>모든 음원을 삭제하시겠습니까?</p>
                <ModalActions>
                    <Button onClick={handleConfirm} primary>
                        네
                    </Button>
                    <Button onClick={handleCancel}>아니오</Button>
                </ModalActions>
            </ModalContent>
        </ModalBackdrop>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
