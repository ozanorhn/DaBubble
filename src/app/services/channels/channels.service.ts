import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Channel } from '../../classes/channel.class';
import { Firestore, collection, addDoc, updateDoc } from '@angular/fire/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { signal } from '@angular/core';
import { UsersService } from '../users/users.service';
import { User } from '../../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService implements OnDestroy {

  channels: Channel[] = [];
  currentIndex = signal<number>(0);
  channelsCollection;
  choiceMembers = signal(true);
  choiceMembersArray: string[] = [];
  createChannel = new Channel({
    createdBy: 'UserID343783',
    members: []
  });


  private unsubscribe!: () => void;


  constructor(
    public firestore: Firestore,
    public userService: UsersService
  ) {
    this.channelsCollection = collection(this.firestore, 'channels');
    this.initChannelsListener();
  }


  private initChannelsListener() {
    this.unsubscribe = onSnapshot(this.channelsCollection, (snapshot) => {
      this.channels = snapshot.docs.map((doc) => {
        const data = doc.data() as Channel;
        data.id = doc.id;
        return data;
      })
    })
  }


  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  async addChannel() {
    if (this.choiceMembers()) {
      this.createChannel.members = this.choiceMembersArray
      this.choiceMembersArray = [];
    } else {
      this.createChannel.members = this.userService.users.map(user => user.id);
    }
    console.log('current channel is', this.createChannel);

    try {
      const docRef = await addDoc(this.channelsCollection, this.createChannel.toJSON())
      console.log('Channel added with ID', docRef.id);
    } catch (error) {
      console.error('Error adding channel', error);
    }
  }


  async edit() {
    const index = this.currentIndex();
    const channel = this.channels[index];
    const channelData = {
      name: channel.name,
      description: channel.description,
      members: channel.members,
      messagesID: channel.messagesID,
      createdBy: channel.createdBy
    };

    if (!channel || !channel.id) {
      console.error('Channel nicht gefunden oder hat keine ID');
      return;
    }

    await updateDoc(
      doc(this.channelsCollection, channel.id),
      channelData
    );
  }


  openChannel(obj: Channel, i: number) {
    if (obj) {
      console.log(obj);
      this.currentIndex.set(i);
    }
  }


  getChannelMembers(): User[] {
    return this.userService.users.filter(user => this.channels[this.currentIndex()].members.includes(user.id));
  }


  addChoiceMembers(user: User) {
    if (this.checkIfUserExists(user)) {
      this.choiceMembersArray = this.choiceMembersArray.filter(id => id !== user.id);
    } else {
      this.choiceMembersArray.push(user.id);
    }
  }


  checkIfUserExists(user: User): boolean {
    return this.choiceMembersArray.includes(user.id);
  }

  
}