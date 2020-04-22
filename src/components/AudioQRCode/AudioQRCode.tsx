import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';

const StyledDiv = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    // height: 80px !important;
    // width: 80px !important;
`;

interface QRProps {
    text: string
}

const AudioQRCode: React.FC<QRProps> = ({ text }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, text)
    }, [text])
    return (
      <StyledDiv>
        <canvas ref={canvasRef} />
      </StyledDiv>
    );
};

export default AudioQRCode;