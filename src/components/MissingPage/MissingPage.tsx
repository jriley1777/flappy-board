import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font: Inconsolata;
    text-transform: uppercase;
    letter-spacing: 1rem;
    font-size: 1.25rem;
`;

const MissingPage = () => {
    const history = useHistory();
    const [timeToRedirect, setTimeToRedirect] = useState(10);

    useEffect(() => {
        setTimeout(() => {
            history.push("/")
        }, 10000);
        setInterval(() => {
            setTimeToRedirect(state => state - 1)
        }, 1000)
    }, [])
    
    return (
      <StyledPage>
        <h1>-- SPLIT FLAPS --</h1>
        <h1>Missing Page</h1>
        <h2>Home in {timeToRedirect}</h2>
      </StyledPage>
    );
};

export default MissingPage;