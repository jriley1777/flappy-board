import React from 'react';
import styled from 'styled-components';
import SplitFlap from '../components/SplitFlap/SplitFlap';

const StyledApp = styled.div`
  background: #1d1d1d;
  color: #ded;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;


function App() {
  return (
    <StyledApp>
      <SplitFlap text="splitflaps" />
    </StyledApp>
  );
}

export default App;
