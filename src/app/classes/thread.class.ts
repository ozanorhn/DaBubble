export class Thread {
    id?: string;
    message: string;
    sender: string;
    timestamp: number;
    messages: string;
    createdBy: string
    reactions: [{
        id: number;
        user: string;
    }];;
    thread: string

    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.message = obj ? obj.message : '';
        this.sender = obj ? obj.sender : '';
        this.timestamp = obj ? obj.timestamp : 0;
        this.messages = obj ? obj.message : '';
        this.createdBy = obj ? obj.createdBy : '';
        this.reactions =  obj ? obj.reactions : [];
        this.thread =  obj ? obj.thread : [];
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.message,
            description: this.sender,
            timestamp: this.timestamp,
            message: this.messages,
            createdBy: this.createdBy,
            reactions: this.reactions,
            thread: this.thread
        }
    }

}



"threadId": {
        "channelId": "channelId",
        "parentMessageId": "messageId",
        "messages": {
          "threadMessageId": {
            "content": "Thread Antwort",
            "sender": "userId",
            "timestamp": "timestamp"
          }
        }
      },
