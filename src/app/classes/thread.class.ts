import { Timestamp } from "@angular/fire/firestore";

export class Thread {
  threadId: string;
  messageId: string;
  content: [{
    message: string;
    sender: string;
    reactions: [{
      emoji: string;
      users: string[];
    }];
    timestamp: Timestamp;
  }];


  constructor(obj?: any) {
    this.threadId = obj?.threadId || '';
    this.messageId = obj?.messageId || '';
    this.content = obj?.content || [];
  }
  

  public toJSON() {
    return {
      threadId: this.threadId,
      messageId: this.messageId,
      content: this.content
    }
  }
}