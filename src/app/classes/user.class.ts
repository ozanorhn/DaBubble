export class User {
    id?: string;
    name: string;
    email: string;
    avatar: string;
    online: boolean;
    createdAt: number;


    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.avatar = obj ? obj.avatar : '';
        this.online = obj ? obj.online : false;
        this.createdAt = obj ? obj.createdAt : null;

    }


    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            online: this.online,
            createdAt: this.createdAt
        }
    }

}