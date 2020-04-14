import React from "react";
import styled from 'styled-components';

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledItem = styled.div`
  width: 100%;
  height: 85%;
  line-height: 100$;
  border: 1px solid #2d2d2d;
  color: #ede8d5;
  background: #1d1d1d;
  text-transform: uppercase;
  font-size: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  mouse-events: none;
  position: relative;
  box-shadow: inset 4px 3px 5px black;
  perspective: 500px;

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
    border-top: 2px solid black;
    box-shadow: 1px 1px 4px black;
    width: 100%;
    transform: translateY(-50%);
  }

  .top {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    height: 100%;
    width: 100%;
    background-color: #1d1d1d;
    box-shadow: inset 4px 3px 5px black;
    overflow: hidden;
    z-index: 0;
    clip-path: polygon(0 0, 100% 0, 100% 49%, 0 49%);
  }

  .bottom {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    height: 100%;
    width: 100%;
    background-color: #1d1d1d;
    box-shadow: inset 4px 3px 5px black;
    overflow: hidden;
    z-index: 0;
    clip-path: polygon(0 51%, 100% 51%, 100% 100%, 0 100%);
  }

`;

interface SFProps {
  item: string,
  nextItem: string,
}

const SplitFlapItem: React.FC<SFProps> = ({ item, nextItem }) => { 
    return (
      <ItemWrapper>
        <StyledItem>
          <div className='top'>{item}</div>
          <div className='bottom'>{item}</div>
        </StyledItem>
      </ItemWrapper>
    );
};

export default SplitFlapItem;