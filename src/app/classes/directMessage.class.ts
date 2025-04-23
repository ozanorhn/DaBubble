

export class Message {
    id?: string;
    participants: [{
        user1: string;
        user2: string;
    }];
    // content: string;
 
   

    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.participants = obj ? obj.participants : '';
        // this.sender = obj ? obj.sender : '';
        // this.timestamp = obj ? obj.timestamp : 0;
        // this.messages = obj ? obj.message : '';
        // this.createdBy = obj ? obj.createdBy : '';
        // this.reactions =  obj ? obj.reactions : [];
        // this.thread =  obj ? obj.thread : [];
    }

    public toJSON() {
        return {
            id: this.id,
            participants: this.participants,
            // description: this.sender,
            // timestamp: this.timestamp,
            // message: this.messages,
            // createdBy: this.createdBy,
            // reactions: this.reactions,
            // thread: this.thread
        }
    }

}