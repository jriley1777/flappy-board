import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import SplitFlapItem from "../SplitFlapItem/SplitFlapItem";
import { flipTo, changeMessage, setNextLetters, getNextLetter, NUM_ROWS, NUM_COLS, ARRAY_LENGTH } from '../../utils/flap';

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
    const rowArray = new Array(NUM_COLS).fill(0);
    const colArray = new Array(NUM_ROWS).fill(0);
    const [letterArray, setLetterArray]: any = useState(new Array(ARRAY_LENGTH).fill(' '));
    const [nextLetterArray, setNextLetterArray]: any = useState(new Array(ARRAY_LENGTH).fill(' ')); 
    
    let interval: any = useRef();
    let initialText = `-- split flaps --                                  by joe riley`.toUpperCase();

    useEffect(() => {
      let nextArray = setNextLetters(initialText);
      setNextLetterArray(nextArray);
    }, [initialText]);

    useEffect(() => {
      interval.current = setInterval(() => {
        setLetterArray((letterArray: any) =>
          flipTo(letterArray, nextLetterArray)
        );
      }, 20);

      return () => {
        clearInterval(interval.current);
      };
    }, [nextLetterArray]);


    useEffect(() => {
      setInterval(() => {
        let nextArray: any = changeMessage();
        setNextLetterArray(nextArray);
      }, 5000);
    }, []);

    const renderGrid = () => {
        return (
            <StyledGrid>
                { colArray.map((row, index) => renderRow(index))}
            </StyledGrid>
        )
    }
    useEffect(() => {
      if (letterArray.join("") === nextLetterArray.join("") && interval.current) {
        clearInterval(interval.current)
      }
    })
    const renderRow = (rowIndex: number) => {
      return (
        <StyledGridRow key={ rowIndex }>
          { rowArray.map((item, index) => {
            let curItem = letterArray[rowIndex * rowArray.length + index];
            let finalItem = nextLetterArray[rowIndex * rowArray.length + index];
            let nextMove = curItem !== finalItem ? getNextLetter(curItem) : curItem;
            return (
              <SplitFlapItem
                key={`${rowIndex}${index}`}
                item={curItem}
                nextItem={nextMove}
                final={nextMove === finalItem}
              />
            );
          })}
        </StyledGridRow>
      )
    }
    return (
        <StyledGrid>
            {renderGrid()}
        </StyledGrid>
    );
};

export default SplitFlapGrid;