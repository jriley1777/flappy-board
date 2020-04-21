import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useHistory } from 'react-router-dom';
import * as Constants from '../../constants/index';

const StyledFab = styled(Fab)`
  height: 1rem;
  position: absolute !important;
  top: 20px;
  right: 20px;
  z-index: 3 !important;
  background: rgba(255, 255, 255, 0.1) !important;

  &:hover {
    background: rgba(255, 255, 255, 0.5) !important;
    & > * {
      color: black;
    }
  }
`;

const StyledIcon = styled(SupervisorAccountIcon)`
  color: white;
`;

const AdminFab = () => {
    const history = useHistory();
    return (
        <StyledFab 
            variant="extended"
            onClick={() => history.push(Constants.URLS.ADMIN)}
            >
            <StyledIcon />
        </StyledFab>
    );
};

export default React.memo(AdminFab);