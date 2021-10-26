import styled from 'styled-components';
import Lottie from 'react-lottie-player';

export const LottieNetworkOffline = styled(Lottie)<any>`
  width: 100%;
  max-width: 300px;
  background-color: transparent;
  padding: 20px;
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

export const Title = styled.h1`
  font-size: 20px;
  width: 100%;
  color: #fafafa;
  text-align: center;
`;

export const SubTitle = styled.h1`
  padding: 5px 0;
  font-size: 12px;
  color: #fafafa;
`;

export const Group = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;
