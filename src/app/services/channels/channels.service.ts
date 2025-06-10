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
export class ChannelsService implements OnInit, OnDestroy {
  channels: Channel[] = [];
  selectedChannelIndex = signal<number>(0);
  channelsCollection;
  choiceMembers = signal(false);
  isLoadingChannels = true;
  private channelsSnapshotUnsubscribe!: () => void;
  channelTemplate = new Channel();


  /**
   * Creates an instance of ChannelsService
   * @param {Firestore} firestore - Angular Firestore service
   * @param {UsersService} userService - Service for user-related operations
   */
  constructor(
    public firestore: Firestore,
    public userService: UsersService
  ) {
    this.channelsCollection = collection(this.firestore, 'channels');
  }


  ngOnInit(): void {
    this.resetCreateChannel(); // Initialisierung hier
  }


  resetCreateChannel() {
    this.channelTemplate = new Channel({
      createdBy: this.userService.currentUser.id,
      members: [this.userService.currentUser.id] // Immer den aktuellen User als Mitglied hinzufügen
    });
  }


  isCurrentUserMember(channel: Channel): boolean {
    return channel.members.includes(this.userService.currentUser.id);
  }


  /**
   * Initializes the Firestore listener for channels collection
   * Updates local channels array when changes occur
   */
  public setupChannelsListener() {
    this.channelsSnapshotUnsubscribe = onSnapshot(this.channelsCollection, (snapshot) => {
      this.channels = snapshot.docs.map((doc) => {
        const data = doc.data() as Channel;
        data.id = doc.id;
        return data;
      })
      this.isLoadingChannels = false;
    })
  }


  /**
   * Angular lifecycle hook - cleans up resources
   */
  ngOnDestroy(): void {
    if (this.channelsSnapshotUnsubscribe) {
      this.channelsSnapshotUnsubscribe();
    }
  }


  async createNewChannel() {
    if (!this.channelTemplate.members.includes(this.userService.currentUser.id)) {
      this.channelTemplate.members.push(this.userService.currentUser.id);
    }
    if (!this.choiceMembers()) {
      const allUserIds = this.userService.users.map(user => user.id);
      this.channelTemplate.members = [...new Set([...allUserIds, this.userService.currentUser.id])];
    }
    try {
      await addDoc(this.channelsCollection, this.channelTemplate.toJSON());
    } catch (error) {
      console.error('Fehler beim Erstellen des Channels:', error);
    }
  }


  /**
   * Prepares channel data for editing and updates Firestore
   */
  async updateSelectedChannel() {
    const index = this.selectedChannelIndex();
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
      alert('Channel nicht gefunden oder hat keine ID.');
      return;
    }

    try {
      await updateDoc(
        doc(this.channelsCollection, channel.id),
        channelData
      );
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Channels', error);
      alert('Channel konnte nicht aktualisiert werden.');
    }
  }


  openChannel(obj: Channel) {
    let channelIndex = this.channels.findIndex(channel => channel.id == obj.id)
    if (obj && channelIndex != -1) {
      this.selectedChannelIndex.set(channelIndex);
    }
  }


  /**
   * Gets the members of the current channel
   * @returns {User[]} Array of User objects who are members of the current channel
   */
  getChannelMembers(): User[] {
    return this.userService.users.filter(user => this.channels[this.selectedChannelIndex()].members.includes(user.id));
  }


  /**
  * Toggles a user's selection for channel membership
  * @param {User} user - The user to add/remove from selection
  */
  toggleUserSelection(user: User) {
    if (this.isUserSelected(user)) {
      this.channelTemplate.members = this.channelTemplate.members.filter(id => id !== user.id);
    } else {
      this.channelTemplate.members.push(user.id);
    }
  }


  /**
   * Checks if a user is already selected for channel membership
   * @param {User} user - The user to check
   * @returns {boolean} True if user is already selected, false otherwise
   */
  isUserSelected(user: User): boolean {
    return this.channelTemplate.members.includes(user.id);
  }


  public async waitUntilChannelsLoaded(): Promise<void> {
    return new Promise(resolve => {
      const check = () => {
        if (!this.isLoadingChannels && this.channels.length > 0) {
          resolve();
        } else {
          setTimeout(check, 100); // prüfe alle 100ms, bis geladen
        }
      };
      check();
    });
  }
}