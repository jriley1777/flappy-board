import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import SplitFlapItem from "../SplitFlapItem/SplitFlapItem";
import AdminFab from '../AdminFab/AdminFab';
import {
  flipTo,
  buildMessageLetterArray,
  getNextLetter,
  chooseIdleMessage,
  NUM_ROWS,
  NUM_COLS,
} from "../../utils/flap";
import { setNextMessage } from '../../features/messagesSlice';
import * as Selectors from '../../selectors/index';
import AudioQRCode from "../AudioQRCode/AudioQRCode";

const StyledGrid = styled.div`
  display: none;
  font-family: "Playfair Display", serif;
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
  height: calc(100vh / ${NUM_ROWS});
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
    const [currentState, setCurrentState] = useState(buildMessageLetterArray({ text: " " }))
    let textUpdateInterval: any = useRef();

    //initial intro message;
    useEffect(() => {
      let initialMessage = `-- Flappy Board --`;
      let nextMessage = buildMessageLetterArray({ text: initialMessage });
      dispatch(setNextMessage(nextMessage));
      setTimeout(() => {
        setLoading(false);
      }, 10000)
    }, []);

    useEffect(() => {
      if (messageQueue.length > 0 && !loading) {
        let nextInQueue = messageQueue[0];
        let nextMessage = buildMessageLetterArray(nextInQueue);
        dispatch(setNextMessage(nextMessage));
      }
    }, [messageQueue.length, loading])

    //update for new message;
    useEffect(() => {
      textUpdateInterval.current = setInterval(() => {
        setCurrentState((state) => flipTo(state, nextMessage));
      }, 20);

      return () => {
        clearInterval(textUpdateInterval.current);
      };
    }, [nextMessage]);

    const renderGrid = () => {
        return (
            <StyledGrid>
                { colArray.map((_, index) => renderRow(index))}
            </StyledGrid>
        )
    }
    //clear interval on text change
    useEffect(() => {
      if (
        currentState.join("") === nextMessage.join("") &&
        textUpdateInterval.current
      ) {
        clearInterval(textUpdateInterval.current);
      }
    })

    const renderRow = (rowIndex: number) => {
      return (
        <StyledGridRow 
          key={ rowIndex }
          >
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
    const renderQR = () => {
      if (messageQueue.length > 0 && messageQueue[0].url) {
        return <AudioQRCode text={messageQueue[0].url} />;
      }
    }
    return (
      <StyledGrid>
        <AdminFab />
        {renderGrid()}
        {renderQR()}
      </StyledGrid>
    );
};

export default SplitFlapGrid;