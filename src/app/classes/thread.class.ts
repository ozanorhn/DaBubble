
export class Thread {
  threadId: string;
  content: [];


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




