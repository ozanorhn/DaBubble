import { Timestamp } from "@angular/fire/firestore";

export class Message {
        id?: string;
        message: string;
        sender: string;
        timestamp: Timestamp;
        reactions: [{
            id: number;
            users: string[];
        }] | [];
        threadId: string;
        channelId: string;
    
        constructor(obj?: any) {
            this.id = obj?.id || '';
            this.message = obj ? obj.message : '';
            this.sender = obj ? obj.sender : '';
            this.timestamp = obj ? obj.timestamp : 0;
            this.reactions =  obj ? obj.reactions : [];
            this.threadId =  obj ? obj.threadId : '';
            this.channelId =  obj ? obj.channelId : [];
        }
    
        public toJSON() {
            return {
                id: this.id,
                message: this.message,
                sender: this.sender,
                timestamp: this.timestamp,
                reactions: this.reactions,
                threadId: this.threadId,
                channelId: this.channelId
            }
        }


    
    }


