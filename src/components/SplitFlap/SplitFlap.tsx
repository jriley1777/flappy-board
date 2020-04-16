import React, { useEffect } from 'react';
import SplitFlapGrid from '../SplitFlapGrid/SplitFlapGrid';
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
                Object.entries(snap.val()).forEach(([key, value]) => {
                    queue.push({ id: key, message: value.text})
                });
                dispatch(setMessageQueue(queue))
            }
        })
    }, []);

    return (
        <SplitFlapGrid />
    )
};

export default SplitFlap;