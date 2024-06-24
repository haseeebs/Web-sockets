import type { RedisClientType } from "redis";
import { createClient } from "redis";

export class RedisSubscriptionManager {
    private static instance: RedisSubscriptionManager;
    private subscriber: RedisClientType;
    public publisher: RedisClientType;
    private subscriptions: Map<string, string[]>;
    private reverseSubscriptions: Map<string, { [userId: string]: { userId: string; ws: any; } }>;

    private constructor() {
        this.subscriber = createClient();
        this.publisher = createClient();
        //TODO: add reconnection and buffering logic here?
        this.publisher.connect();
        this.subscriber.connect();
        this.subscriptions = new Map<string, string[]>();
        this.reverseSubscriptions = new Map<string, { [userId: string]: { userId: string; ws: any; } }>();
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new RedisSubscriptionManager();
        }

        return this.instance
    };

    subscribe(userId: string, room: string, ws: any) {
        this.subscriptions.set(userId, [
            ...(this.subscriptions.get(userId) || []),
            room
        ]);

        this.reverseSubscriptions.set(room, {
            ...(this.reverseSubscriptions.get(room) || {}),
            [ userId ]: { userId, ws }  
        })
    
        if(Object.keys(this.reverseSubscriptions.get(room) || {} )?.length === 1) {
            console.log(`Subscribing message from ${room}`);
            // This is first subscriber to this room
            this.subscriber.subscribe(room, (payload) => {
                try {
                    const subscribers = this.reverseSubscriptions.get(room) || {};
                    
                    Object.values(subscribers).forEach( (value) => {
                        value.ws.send(payload)
                    })
                } catch (error) {
                    console.error(`"erroneous payload found?" - ${error}`)
                }
            })
        }

        
    }

    unsubscribe(userId: string, room:string) {
        this.subscriptions.set(
            userId, 
            this.subscriptions.get(userId)?.filter( previousRooms => previousRooms !== room) || []
        );

        if (this.subscriptions.get(userId)?.length === 0) {
            this.subscriptions.delete(userId);
        }

        delete this.reverseSubscriptions.get(room)?.[userId];

        if (
            !this.reverseSubscriptions.get(room) || 
            Object.keys(this.reverseSubscriptions.get(room) || {}).length === 0
        ) {
            console.log(`Unsubscribing from ${room}`);
            
            this.subscriber.unsubscribe(room);

            this.reverseSubscriptions.delete(room);
        }
    }

    addChatMessage(room: string, message: string) {
        this.publish(room, {
            type: 'message',
            payload: {
                message
            }
        })
    }

    publish(room: string, message: any) {
        console.log(`Publishing message to ${room}`);
        this.publisher.publish(room, JSON.stringify(message));
    };
}