import { Timestamp } from "@angular/fire/firestore";


export class DirectMessage {
    id?: string;
    // threadId: string;
    participants: {
        user1: string;
        user2: string;
    };
    content: [{
        threadId: string;
        message: string;
        sender: string,
        timestamp: Timestamp;
        reactions: [{
            id: number;
            users: string[];
        }] | [];
    }];


    constructor(obj?: any) {
        this.id = obj?.id || '';
        // this.threadId = obj?.threadId || '';
        this.participants = obj ? obj.participants : [];
        this.content = obj ? obj.content : []
    }


    public toJSON() {
        return {
            id: this.id,
            // threadId: this.threadId,
            participants: this.participants,
            content: this.content
        }
    }
}