import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import SplitFlapGrid from '../SplitFlapGrid/SplitFlapGrid';
import Admin from '../Admin/Admin';
import { useDispatch } from 'react-redux';
import firebase, { DB } from '../../utils/firebase';
import { setMessageQueue } from '../../features/messagesSlice';

const SplitFlap: React.FC = () => {
    const dispatch = useDispatch();
    const messagesDb = firebase.database().ref(DB.MESSAGES);
    
    useEffect(() => {
        messagesDb.on('value', (snap: any) => {
            if(snap.val()){
                let queue: {}[] = [];
                Object.entries(snap.val()).forEach(([key, value]:any) => {
                    queue.push({ 
                        id: key,
                        ...value
                    })
                });
                dispatch(setMessageQueue(queue));
            } else {
                dispatch(setMessageQueue([]));
            }
        })
    }, []);

    return isMobile ? (
        <Admin />
    ) : (
        <SplitFlapGrid />
    )
};

export default SplitFlap;