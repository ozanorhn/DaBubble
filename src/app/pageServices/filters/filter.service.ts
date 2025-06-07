import { computed, ElementRef, inject, Injectable, signal } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ChannelsService } from '../../services/channels/channels.service';
import { User } from '../../classes/user.class';
import { Channel } from '../../classes/channel.class';
import { MessagesService } from '../../services/messages/messages.service';
import { DirectMessagesService } from '../../services/directMessages/direct-messages.service';
import { MainNavService } from '../navigates/main-nav.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  users = inject(UsersService);
  channels = inject(ChannelsService);
  searchValue = signal('');
  searchNewTag = signal('');
  searchMembers = signal('');
  channelArray = this.channels.channels;
  newMessageChannels: Channel[] = [];
  newMessagePersons: User[] = [];
  searchNewMessageValue = signal('');
  textareaRef!: ElementRef<HTMLTextAreaElement>;


  filteredMembers = computed(() => {
    const search = this.searchMembers().toLowerCase();
    return this.filterMembers(search)
  })


  filteredResults = computed(() => {
    const searchTerm = this.searchValue().toLowerCase();
    if (searchTerm.startsWith('@')) {
      return this.filterUsers(searchTerm);
    } else if (searchTerm.startsWith('#')) {
      return this.filterChannels(searchTerm);
    } else if (searchTerm.startsWith('"')) {
      return this.filterMessages(searchTerm.substring(1));
    } else {
      return [...this.filterAll(searchTerm), ...this.filterMessages(searchTerm)];
    }
  });


  filteredMessageResults = computed(() => {
    const tag = this.searchNewTag().toLowerCase();
    if (!tag) return [];

    if (tag.startsWith('@')) {
      return this.filterUsers(tag);
    } else if (tag.startsWith('#')) {
      return this.filterChannels(tag);
    }
    return [];
  });


  filteredNewMessageResults = computed(() => {
    const searchTerm = this.searchNewMessageValue().toLowerCase();
    let results: (User | Channel)[] = this.handleSearchTerm(searchTerm);
    return results.filter(item =>
      !this.newMessagePersons.some(u => u.id === item.id) &&
      !this.newMessageChannels.some(c => c.id === item.id)
    );
  });


  constructor(
    public messageService: MessagesService,
    public dmService: DirectMessagesService,
    public usersService: UsersService,
    private navService: MainNavService
  ) { }


  handleSearchTerm(searchTerm: string) {
    if (searchTerm.startsWith('@')) {
      return this.filterUsers(searchTerm);
    } else if (searchTerm.startsWith('#')) {
      return this.filterChannels(searchTerm);
    } else {
      return this.filterAll(searchTerm);
    }
  }


  filterMessages(searchTerm: string): any[] {
    const channelMessages = this.filterChannelMessages(searchTerm);
    const dmMessages = this.filderDMs(searchTerm);
    if (this.navService.directMessage) {
      return dmMessages
    } else {
      return channelMessages;
    }
  }


  filterChannelMessages(searchTerm: string) {
    return this.messageService.messages().filter(msg =>
      msg.message.toLowerCase().includes(searchTerm)
    ).map(msg => ({
      ...msg,
      type: 'channelMessage',
      channelId: msg.channelId
    }));
  }


  filderDMs(searchTerm: string) {
    return this.dmService.directMessage.content.filter(msg =>
      msg.message.toLowerCase().includes(searchTerm)
    ).map(msg => ({
      ...msg,
      type: 'dmMessage',
      dmId: this.dmService.directMessage.id
    }));
  }


  filterUsers(searchTerm: string) {
    const userSearch = searchTerm.substring(1);
    return this.users.users.filter(user =>
      user.name.toLowerCase().includes(userSearch)
    )
  }


  filterChannels(searchTerm: string) {
    const channelSearch = searchTerm.substring(1);
    return this.channels.channels.filter(channel =>
      channel.name.toLowerCase().includes(channelSearch)
    )
  }


  filterAll(searchTerm: string) {
    const userResults = this.users.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    )
    const channelResults = this.channels.channels.filter(channel =>
      channel.name.toLowerCase().includes(searchTerm)
    )
    return [...userResults, ...channelResults];
  }


  filterMembers(searchMembers: string) {
    return this.users.users.filter(user =>
      user.name.toLowerCase().includes(searchMembers) &&
      user.id !== this.usersService.currentUser.id 
    );
  }


  getActiveTag(text: string): string | null {
    const caretIndex = this.getCaretPosition(); 
    const textBeforeCursor = text.substring(0, caretIndex);
    const match = textBeforeCursor.match(/(?:^|\s)([@#][\w-]*)$/);
    return match ? match[1] : null;
  }


  getCaretPosition(): number {
    if (!this.textareaRef) {
      console.warn('TextareaRef ist noch nicht gesetzt');
      return 0;
    }
    return this.textareaRef.nativeElement.selectionStart;
  }


  setTextareaRef(ref: ElementRef<HTMLTextAreaElement>) {
    this.textareaRef = ref;
  }


  isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item;
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; 
  }


  addToSelection(item: User | Channel) {
    if (this.isUser(item)) {
      if (!this.newMessagePersons.some(u => u.id === item.id)) {
        this.newMessagePersons.push(item);
      }
    } else if (this.isChannel(item)) {
      if (!this.newMessageChannels.some(c => c.id === item.id)) {
        this.newMessageChannels.push(item);
      }
    }
  }


  removeFromSelection(item: User | Channel) {
    if (this.isUser(item)) {
      this.newMessagePersons = this.newMessagePersons.filter(u => u.id !== item.id);
    } else {
      this.newMessageChannels = this.newMessageChannels.filter(c => c.id !== item.id);
    }
  }
}