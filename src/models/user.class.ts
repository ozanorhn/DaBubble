export class User {
    id?: string; 
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    bio: string; // Optional: kurze Beschreibung
    status?: 'online'| 'offline'|'away'; 
    createdAt?: number;
    updatedAt?: number;
    isAdmin?: boolean; 
    password?: string; 


    constructor(obj?: any){
      this.id = obj?.id || ''; 
      this.firstName = obj ? obj.firstName : '';
      this.lastName = obj ? obj.lastName : '';
      this.email = obj ? obj.email : '';
      this.profilePicture = obj ? obj.profilePicture : '';
      this.birthDate = obj ? obj.birthDate : '';
      this.street = obj ? obj.street : '';
      this.zipCode = obj ? obj.zipCode : '';
      this.city = obj ? obj.city : '';
      this.bio = obj ? obj.bio : '';
      this.status = obj ? obj.status : '';
      this.createdAt = obj ? obj.createdAt : '';
      this.updatedAt = obj ? obj.updatedAt : '';
      this.isAdmin = obj ? obj.isAdmin : '';
      this.password = obj?.password || '';
     
    }
  
    toJSON() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        profilePicture: this.profilePicture,
        birthDate: this.birthDate,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city,
        bio: this.bio,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt:this.updatedAt,
        isAdmin: this.isAdmin,
      };
    }
  }
  