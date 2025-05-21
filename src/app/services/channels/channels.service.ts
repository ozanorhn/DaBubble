import { effect, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Channel } from '../../classes/channel.class';
import { Firestore, collection, addDoc, updateDoc } from '@angular/fire/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { signal } from '@angular/core';
import { UsersService } from '../users/users.service';
import { User } from '../../classes/user.class';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService implements OnInit, OnDestroy {
  channels: Channel[] = [];
  currentIndex = signal<number>(0);
  channelsCollection;
  choiceMembers = signal(true);
  // choiceMembersArray: string[] = [];
  loading = true;
  private unsubscribe!: () => void;
  currentUser;
  createChannel = new Channel();


  /**
   * Creates an instance of ChannelsService
   * @param {Firestore} firestore - Angular Firestore service
   * @param {UsersService} userService - Service for user-related operations
   */
  constructor(
    public firestore: Firestore,
    public userService: UsersService,
    public localStorageS: LocalStorageService
  ) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
    this.channelsCollection = collection(this.firestore, 'channels');
    this.setupChannelsListener();
  }


  ngOnInit(): void {
    this.createChannel = new Channel(
      {
        createdBy: this.currentUser.id,
        members: [this.currentUser.id] /// Eigener Member noch hinzufügen, soll standart ????
      }
    )
  }


  /**
   * Initializes the Firestore listener for channels collection
   * Updates local channels array when changes occur
   */
  private setupChannelsListener() {
    this.unsubscribe = onSnapshot(this.channelsCollection, (snapshot) => {
      this.channels = snapshot.docs.map((doc) => {
        const data = doc.data() as Channel;
        data.id = doc.id;
        return data;
      })
      this.loading = false;
      console.log('Channels updated:', this.channels); // 👈 Fügen Sie diesen Log hinzu
    })
  }


  /**
   * Angular lifecycle hook - cleans up resources
   */
  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  /**
  * Adds a new channel to Firestore
  * Uses either selected members or all users as channel members
  */
  async addChannel() {
    if (this.choiceMembers()) {
      this.createChannel.members
    } else {
      this.createChannel.members = this.userService.users.map(user => user.id);
    }
    try {
      await addDoc(this.channelsCollection, this.createChannel.toJSON())
    } catch (error) {
      console.error('Error adding channel', error);
    }
  }


  /**
   * Prepares channel data for editing and updates Firestore
   */
  async prepareChannelForEdit() {
    const index = this.currentIndex();
    const channel = this.channels[index];
    const channelData = {
      name: channel.name,
      description: channel.description,
      members: channel.members,
      messagesID: channel.messagesID,
      createdBy: channel.createdBy
    };
    await this.updateChannelInFirestore(channel, channelData);
  }


  /**
   * Updates a channel document in Firestore
   * @param {Channel} channel - The channel to update
   * @param {any} channelData - The new channel data
   */
  async updateChannelInFirestore(channel: Channel, channelData: any) {
    if (!channel || !channel.id) {
      console.error('Channel nicht gefunden oder hat keine ID');
      return;
    }
    await updateDoc(
      doc(this.channelsCollection, channel.id),
      channelData
    );
  }


  /**
  * Sets the current channel
  * @param {Channel} obj - The channel to open
  * @param {number} i - The index of the channel
  */
  openChannel(obj: Channel, i: number) {
    if (obj) {
      this.currentIndex.set(i);
    }
  }


  /**
   * Gets the members of the current channel
   * @returns {User[]} Array of User objects who are members of the current channel
   */
  getChannelMembers(): User[] {
    return this.userService.users.filter(user => this.channels[this.currentIndex()].members.includes(user.id));
  }


  /**
  * Toggles a user's selection for channel membership
  * @param {User} user - The user to add/remove from selection
  */
  toggleUserSelection(user: User) {
    if (this.isUserSelected(user)) {
      this.createChannel.members = this.createChannel.members.filter(id => id !== user.id);
    } else {
      this.createChannel.members.push(user.id);
    }
  }



  /**
   * Checks if a user is already selected for channel membership
   * @param {User} user - The user to check
   * @returns {boolean} True if user is already selected, false otherwise
   */
  isUserSelected(user: User): boolean {
    return this.createChannel.members.includes(user.id);
  }
}