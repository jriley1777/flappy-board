import React from "react";
import styled from 'styled-components';

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: Inconsolata;
  font-size: 4rem;
  padding: 3px;
  box-sizing: border-box;
  background: #0d0d0d;
  color: #fff8db;
`;

const PanelInset = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background: #050505;
  height: 100%;
  width: 100%;
  position: relative;

  &:after {
    height: 50%;
    border: 1px solid black;
  }
`;

const Flap = styled.div`
  background: #090909;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 1px 1px 5px black;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  &.top {
    clip-path: polygon(0 48%, 100% 48%, 100% 0, 0 0);
  }

  &.bottom {
    clip-path: polygon(0 100%, 100% 100%, 100% 52%, 0 52%);
  }
`;

interface SFProps {
  item: string,
  nextItem: string,
  final: boolean,
}

const SplitFlapItem: React.FC<SFProps> = ({ item, nextItem, final=false }) => { 
    return (
      <ItemWrapper>
        <PanelInset>
          <Flap className="top">{ item }</Flap>
          <Flap className="bottom">{ nextItem }</Flap>
        </PanelInset>
      </ItemWrapper>
    );
};

export default SplitFlapItem;