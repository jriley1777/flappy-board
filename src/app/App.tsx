import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import * as Constants from '../constants/index';


const StyledApp = styled.div`
  background: #1d1d1d;
  color: #ded;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function App() {

  const renderRoutes = () => {
    return Constants.ROUTES.map(route => (
        <Route 
          path={route.path} 
          exact={route.exact} 
          component={route.component} />
      )
    )
  };

  return (
    <StyledApp>
      <Switch>
        { renderRoutes() }
      </Switch>
    </StyledApp>
  );
}

export default App;
