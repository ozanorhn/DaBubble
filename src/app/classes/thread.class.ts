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



