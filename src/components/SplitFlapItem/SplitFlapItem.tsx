import React, { useState } from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledItem = styled.div`
  width: 100%;
  height: 80%;
  line-height: 100$;
  border: 1px solid #3d3d3d;
  color: #ede8d5;
  text-transform: uppercase;
  font-size: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  mouse-events: none;
  position: relative;
  box-shadow: inset 4px 3px black;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    border-top: 4px solid #1d1d1d;
    width: 100%;
    transform: translateY(-50%);
  }
`;

interface SFProps {
    item: string,
    updateItem: () => string
}

const SplitFlapItem: React.FC<SFProps> = ({ item, updateItem }) => {
    const [display, setDisplay] = useState(item);
    
    return (
        <ItemWrapper>
            <StyledItem
                onMouseEnter={ () => setDisplay(updateItem) }
                >{ display }
            </StyledItem>
        </ItemWrapper>
    )
};

export default SplitFlapItem;