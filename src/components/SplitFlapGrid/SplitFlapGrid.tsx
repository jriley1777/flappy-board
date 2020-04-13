import React, {useEffect, useState} from 'react';
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
    const [letterArray, setLetterArray] = useState(new Array(23 * 9).fill('')) 
    let text = `-- split flaps --                                  by joe riley`;
    const getLetter = () => {
        let array = 'abcdefghijklmnopqrstuvwxyz0123456789'.split("");
        let num = Math.floor(Math.random() * array.length);
        return array[num];
    }
    const setLetters = () => {
        let array = text.split("");
        let i = array.length;
        let cen = Math.floor(letterArray.length/2) - Math.floor(i/2);
        console.log(i, cen)
        let update = [
          ...letterArray.slice(0, cen),
          ...array,
          ...letterArray.slice(cen + array.length),
        ];
        setLetterArray(update);
    }
    useEffect(() => {
        setLetters();
    },[]);
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
                    return (
                      <SplitFlapItem
                        key={`${rowIndex}${index}`}
                        item={letterArray[rowIndex * rowArray.length + index]}
                        onMouseEnter={ () => {
                            setLetterArray([
                              ...letterArray.slice(
                                0,
                                rowIndex * rowArray.length + index
                              ),
                              getLetter(),
                              ...letterArray.slice(
                                rowIndex * rowArray.length + index + 1
                              ),
                            ]);
                            }
                        }
                      />
                    );
                })}
            </StyledGridRow>
        )
    }
    return (
        <StyledGrid>
            {console.log(letterArray)}
            {renderGrid()}
        </StyledGrid>
    );
};

export default SplitFlapGrid;