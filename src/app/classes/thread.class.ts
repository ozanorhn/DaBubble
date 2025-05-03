import { Timestamp } from "@angular/fire/firestore";

export class Thread {
  threadId: string;
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
    this.content = obj?.content || [];
  }

  public toJSON() {
    return {
      threadId: this.threadId,
      content: this.content
    }
  }
}




