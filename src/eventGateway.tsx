import React, { useContext } from 'react';
import { EventChannel, EventChannelType } from './eventChannel';

export enum EventType {
    ENGINE_STATE = `engineState`
}

type EngineStateType = { [EventType.ENGINE_STATE]: string };
const eventHandler: EventChannelType<EngineStateType> = EventChannel();
export type EventGatewayType = {
    eventHandler: EventChannelType<EngineStateType>;
};
const GatewayContext = React.createContext<EventGatewayType>({ eventHandler });

type Props = {
    children: React.ReactNode;
};
export const EventGateway = ({ children }: Props) => {
    return <GatewayContext.Provider value={{ eventHandler }}>{children}</GatewayContext.Provider>;
};
export const useEventGateway = (): EventGatewayType => useContext(GatewayContext);
