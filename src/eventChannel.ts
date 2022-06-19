export type EventType = string | symbol;
export type Handler<T> = (event: T) => void;

export type EventHandlerList<T> = Array<Handler<T>>;
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
    keyof Events,
    EventHandlerList<Events[keyof Events]>
>;

export type EventChannelType<Events extends Record<EventType, unknown>> = {
    registeredEventList: EventHandlerMap<Events>;
    subscribe<Key extends keyof Events>(type: Key, handler: Handler<any>): void;
    unsubScribe<Key extends keyof Events>(type: Key, handler?: Handler<any>): void;
    publish<Key extends keyof Events>(type: Key, event: any): void;
};

export const EventChannel = <Events extends Record<EventType, unknown>>(
    registeredEventList?: EventHandlerMap<Events>
): EventChannelType<Events> => {
    type EventHandlerType = Handler<Events[keyof Events]>;
    registeredEventList = registeredEventList || new Map();

    return {
        registeredEventList,

        subscribe<Key extends keyof Events>(type: Key, handler: EventHandlerType) {
            const handlers: Array<EventHandlerType> | undefined = registeredEventList!.get(type);
            handlers
                ? handlers.push(handler)
                : registeredEventList!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
        },

        unsubScribe<Key extends keyof Events>(type: Key, handler?: EventHandlerType) {
            const handlers: Array<EventHandlerType> | undefined = registeredEventList!.get(type);
            if (handlers) {
                if (handler) {
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                } else {
                    registeredEventList!.set(type, []);
                }
            }
        },

        publish<Key extends keyof Events>(type: Key, event?: Events[Key]) {
            let handlers = registeredEventList!.get(type);
            if (handlers) {
                (handlers as EventHandlerList<Events[keyof Events]>).slice().map((handler) => {
                    handler(event!);
                });
            }
        }
    };
};
