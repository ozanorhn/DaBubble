export class Channel {
    id?: string;
    name: string;
    members: string;
    message: string;

    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.name = obj ? obj.name : '';
        this.members = obj ? obj.members : '';
        this.message = obj ? obj.message : '';
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            members: this.members,
            message: this.message,
        }
    }

}