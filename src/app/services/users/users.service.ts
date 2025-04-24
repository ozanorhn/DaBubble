import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { User } from '../../classes/user.class';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy{
  // private auth = inject(Auth);
  usersCollection;
  unsubscribe;
  // user$ = user(auth);
  // userSubscription: Subscription;
  // ...

  // constructor() {
  //   this.userSubscription = this.user$.subscribe((aUser: User | null) => {
  //       //handle user state changes here. Note, that user will be null if there is no currently logged in user.
  //    console.log(aUser);
  //   })
  // }

  // ngOnDestroy() {
  //   // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
  //   this.userSubscription.unsubscribe();
  // }

  users: User[] = [];

  constructor(
    public firestore: Firestore
  ) {
    console.log('User Array', this.users);
    this.usersCollection = collection(this.firestore, 'users');


    this.unsubscribe = onSnapshot(this.usersCollection, (snapshot) => {
          this.users = snapshot.docs.map((doc) => {
            const data = doc.data() as User;
            data.id = doc.id;
            return data;
          })
          console.log('Aktuelle Users', this.users);
    
        }) 
  }


  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }






  // users = [
  //   new User({
  //     id: '',
  //     name: 'Frederik Beck',
  //     email: 'frederick@mail.com',
  //     avatar: '/assets/imgs/avatar1.svg',
  //     online: true
  //   }),
  //   new User({
  //     id: '',
  //     name: 'Sofia Müller',
  //     email: 'sofia@mail.com',
  //     avatar: '/assets/imgs/avatar2.svg',
  //     online: true
  //   }),
  //   new User({
  //     id: '',
  //     name: 'Noah Braun',
  //     email: 'noah@mail.com',
  //     avatar: '/assets/imgs/avatar3.svg',
  //     online: false
  //   }),
  //   new User({
  //     id: '',
  //     name: 'Elise Roth',
  //     email: 'eliese@mail.com',
  //     avatar: '/assets/imgs/avatar4.svg',
  //     online: true
  //   }),
  //   new User({
  //     id: '',
  //     name: 'Elias Neumann',
  //     email: 'elias@mail.com',
  //     avatar: '/assets/imgs/avatar5.svg',
  //     online: false
  //   }),
  //   new User({
  //     id: '',
  //     name: 'Steffen Hoffmann',
  //     email: 'steffen@mail.com',
  //     avatar: '/assets/imgs/avatar6.svg',
  //     online: false
  //   })
  // ]



  getUser() {
    return {
      name: 'Nicolas Developer',
      email: 'nicolas@test.com',
      avatar: '/assets/imgs/avatar6.svg',
      online: false,
      createdAt: new Date()
    }
  }


  async addUser() {
    const user = this.getUser()
    console.log('current user is', user);
    try {
      const docRef = await addDoc(this.usersCollection, user)
      console.log('User added with ID', docRef.id);
    } catch (error) {
      console.error('Error adding user', error);
    }
  }




}
