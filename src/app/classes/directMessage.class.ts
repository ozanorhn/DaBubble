

export class DirectMessage {
    id?: string;
    participants: [{
        user1: string;
        user2: string;
    }];
    content: [];



    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.participants = obj ? obj.participants : [];
        this.content = obj ? obj.content : []
    }

    public toJSON() {
        return {
            id: this.id,
            participants: this.participants,
            content: this.content
        }
    }

}