import React from 'react';
import styled from 'styled-components';
import SplitFlapItem from "../SplitFlapItem/SplitFlapItem";

const StyledGrid = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const StyledGridRow = styled.div`
  width: 100%;
  height: calc(100vh / 9);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const SplitFlapGrid: React.FC = ({ children }) => {
    const rowArray = new Array(23).fill(0);
    const colArray = new Array(9).fill(0);
    let array = 'splitflaps'.split("");
    const getLetter = () => {
        let num = Math.floor(Math.random() * array.length);
        return array[num];
    }
    const renderGrid = () => {
        return (
            <StyledGrid>
                { colArray.map((row, index) => renderRow(index))}
            </StyledGrid>
        )
    }
    const renderRow = (rowIndex: number) => {
        return (
            <StyledGridRow key={ rowIndex }>
                { rowArray.map((item, index) => {
                    return <SplitFlapItem key={`${rowIndex}${index}`} item={ getLetter() } updateItem={getLetter} />
                })}
            </StyledGridRow>
        )
    }
    return <StyledGrid>{renderGrid()}</StyledGrid>;
};

export default SplitFlapGrid;