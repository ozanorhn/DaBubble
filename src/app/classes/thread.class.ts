
/* export class Thread {
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

export class Thread {
  threadId: string;
  threadMessageId: string;
  content: [];


  constructor(obj?: any) {
      this.threadId = obj?.threadId || '';
      this.threadMessageId = obj?.threadMessageId || '';
      this.content = obj?.content || [];
  }

  public toJSON() {
      return {
          threadId: this.threadId,
          threadMessageId: this.threadMessageId,
          content: this.content
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
 */

