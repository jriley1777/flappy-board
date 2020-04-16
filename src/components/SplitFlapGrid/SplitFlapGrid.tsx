import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import SplitFlapItem from "../SplitFlapItem/SplitFlapItem";
import {
  flipTo,
  buildMessageLetterArray,
  getNextLetter,
  NUM_ROWS,
  NUM_COLS,
} from "../../utils/flap";
import { setNextMessage, setMessageQueue } from '../../features/messagesSlice';
import * as Selectors from '../../selectors/index';
import { useInterval } from '../../hooks/index';

const StyledGrid = styled.div`
  display: none;
  @media (min-width: 768px) {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const StyledGridRow = styled.div`
  width: 100%;
  height: calc(100vh / 9);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const SplitFlapGrid: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const rowArray = new Array(NUM_COLS).fill(0);
    const colArray = new Array(NUM_ROWS).fill(0);
    const dispatch = useDispatch();
    const nextMessage = useSelector(Selectors.getNextMessage);
    const messageQueue = useSelector(Selectors.getMessageQueue);
    const [currentState, setCurrentState] = useState(buildMessageLetterArray(" "))
    let interval: any = useRef();

    //initial intro message;
    useEffect(() => {
      let initialMessage = `-- split flaps --                                  by joe riley`;
      let nextMessage = buildMessageLetterArray(initialMessage);
      dispatch(setNextMessage(nextMessage));
      setLoading(false);
    }, []);

    useInterval(() => {
      if (messageQueue.length > 0 && !loading) {
        let queue = [...messageQueue];
        let newMessageText = queue.pop();
        let nextMessage = buildMessageLetterArray(newMessageText!);
        dispatch(setNextMessage(nextMessage));
        dispatch(setMessageQueue(queue))
      }
    }, 5000);

    //update for new message;
    useEffect(() => {
      interval.current = setInterval(() => {
        setCurrentState((state) => flipTo(state, nextMessage));
      }, 20);

      return () => {
        clearInterval(interval.current);
      };
    }, [nextMessage]);

    const renderGrid = () => {
        return (
            <StyledGrid>
                { colArray.map((_, index) => renderRow(index))}
            </StyledGrid>
        )
    }
    useEffect(() => {
      if ((currentState.join("") ===  nextMessage.join("")) && interval.current) {
        clearInterval(interval.current)
      }
    })
    const renderRow = (rowIndex: number) => {
      return (
        <StyledGridRow key={ rowIndex }>
          { rowArray.map((_, index) => {
            let curItem = currentState[rowIndex * rowArray.length + index];
            let finalItem = nextMessage[rowIndex * rowArray.length + index];
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