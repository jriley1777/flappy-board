import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';

const StyledDiv = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;

    & > canvas {
      max-height: 100px !important;
      max-width: 100px !important;
    }
`;

interface QRProps {
    url: string
}

const AudioQRCode: React.FC<QRProps> = ({ url }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, url)
    }, [url])
    return (
      <a href={url} target="_">
        <StyledDiv>
            <canvas ref={canvasRef} />
        </StyledDiv>
      </a>
    );
};

export default AudioQRCode;