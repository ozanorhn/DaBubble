export class User {
    id?: string;
    name: string;
    email: string;
    avatar: string;
    online: boolean;


    constructor(obj?: any) {
        this.id = obj?.id || '';
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.avatar = obj ? obj.avatar : '';
        this.online = obj ? obj.online : false;

    }


    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            online: this.online
        }
    }

}