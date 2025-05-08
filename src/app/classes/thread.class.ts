import { Timestamp } from "@angular/fire/firestore";

export class Thread {
  threadId: string;
  messageId: string;
  threadMessage: string;
  content: [{
    message: string;
    sender: string;
    reactions: [{
      id: number;
      users: string[];
    }] | [];
    timestamp: Timestamp;
  }];


  constructor(obj?: any) {
    this.threadId = obj?.threadId || '';
    this.messageId = obj?.messageId || '';
    this.threadMessage = obj?.threadMessage || '';
    this.content = obj?.content || [];
  }

  public toJSON() {
    return {
      threadId: this.threadId,
      messageId: this.messageId,
      threadMessage: this.threadMessage,
      content: this.content
    }
  }
}




