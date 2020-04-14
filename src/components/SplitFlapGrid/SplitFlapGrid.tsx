import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import SplitFlapItem from "../SplitFlapItem/SplitFlapItem";
import { flipTo, charArray } from '../utils/flap';

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
    const [letterArray, setLetterArray]: any = useState(new Array(23 * 9).fill(' '));
    const [nextLetterArray, setNextLetterArray] = useState(new Array(23 * 9).fill(' ')); 
    let interval: any = useRef();
    let text = `-- split flaps --                                  by joe riley`.toUpperCase();
    const getLetter = () => {
        let array = charArray;
        let num = Math.floor(Math.random() * array.length);
        return array[num];
    }
    const genRandomArray = () => {
      let x = letterArray.map(() => getLetter());
      setLetterArray(x);
    }
    const setLetters = () => {
        let array = text.split("");
        let i = array.length;
        let cen = Math.floor(letterArray.length/2) - Math.floor(i/2);
        let update = [
          ...new Array(cen).fill(" "),
          ...array,
          ...new Array(letterArray.length - (cen + array.length)).fill(" "),
        ];
        setNextLetterArray(update);
    }
    useEffect(() => {
      genRandomArray();
      setLetters();
    }, []);

    useEffect(() => {
      interval.current = setInterval(() => {
        setLetterArray((letterArray: any) =>
          flipTo(letterArray, nextLetterArray)
        );
      }, 50);

      return () => {
        clearInterval(interval.current);
      };
    }, [nextLetterArray]);

    const renderGrid = () => {
        return (
            <StyledGrid>
                { colArray.map((row, index) => renderRow(index))}
            </StyledGrid>
        )
    }
    if(letterArray.join("") === nextLetterArray.join("") && interval.current){
      clearInterval(interval.current)
    } 
    const renderRow = (rowIndex: number) => {
        return (
            <StyledGridRow key={ rowIndex }>
                { rowArray.map((item, index) => {
                    return (
                      <SplitFlapItem
                        key={`${rowIndex}${index}`}
                        item={letterArray[rowIndex * rowArray.length + index]}
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