import { useEffect, useState } from 'react';
import { EventType, useEventGateway } from './eventGateway';

export const KeyHole = () => {
    const { eventHandler } = useEventGateway();
    const [isLock, setIsLock] = useState(false);

    const handleClick = () => {
        eventHandler.publish(EventType.ENGINE_STATE, { payload: !isLock ? `lock` : `unlock` });
        setIsLock(!isLock);
    };

    return <button onClick={handleClick}>{isLock ? `鎖定` : `非鎖定`}</button>;
};

export const Engine = ({ name, displayState }: { name: string; displayState: string }) => {
    const { eventHandler } = useEventGateway();
    const [message, setMessage] = useState(displayState);

    useEffect(() => {
        eventHandler.subscribe(EventType.ENGINE_STATE, (event) =>
            setMessage(event.payload === `lock` ? `啟動` : `關閉`)
        );
    }, []);

    return <div>{`${name}: ${message}`}</div>;
};
