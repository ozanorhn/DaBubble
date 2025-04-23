export class Channel {
    id?: string;
    name: string;
    description: string;
    members?: string;
    messages?: string;
    createdBy: string

    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.name = obj.name || '';
        this.description = obj.description || '';
        this.members = obj?.members || '';
        this.messages = obj?.message || '';
        this.createdBy = obj.createdBy || '';
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            members: this.members,
            message: this.messages,
            createdBy: this.createdBy
        }
    }

}