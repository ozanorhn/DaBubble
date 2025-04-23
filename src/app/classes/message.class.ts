export class Message {
        id?: string;
        message: string;
        sender: string;
        timestamp: number;
        createdBy: string;
        reactions: [{
            id: number;
            user: string;
        }];
        threadId: string;
        channelId: string;
    
        constructor(obj?: any) {
            this.id = obj?.id || '';
            this.message = obj ? obj.message : '';
            this.sender = obj ? obj.sender : '';
            // this.timestamp = obj ? obj.timestamp : 0;
            this.timestamp = obj ? obj.timestamp : 0;
            this.createdBy = obj ? obj.createdBy : '';
            this.reactions =  obj ? obj.reactions : [];
            this.threadId =  obj ? obj.thread : [];
            this.channelId =  obj ? obj.channelId : [];
        }
    
        public toJSON() {
            return {
                id: this.id,
                message: this.message,
                sender: this.sender,
                timestamp: this.timestamp,
                createdBy: this.createdBy,
                reactions: this.reactions,
                threadId: this.threadId,
                channelId: this.channelId
            }
        }


    
    }


