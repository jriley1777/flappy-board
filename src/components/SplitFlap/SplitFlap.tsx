import React from 'react';
import { isMobile } from 'react-device-detect';
import SplitFlapGrid from '../SplitFlapGrid/SplitFlapGrid';
import Admin from '../Admin/Admin';

const SplitFlap: React.FC = () => {
    return isMobile ? (
        <Admin />
    ) : (
        <SplitFlapGrid />
    )
};

export default SplitFlap;