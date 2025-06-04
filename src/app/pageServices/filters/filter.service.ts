import { computed, ElementRef, inject, Injectable, signal } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ChannelsService } from '../../services/channels/channels.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { User } from '../../classes/user.class';
import { Channel } from '../../classes/channel.class';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  currentUser;
  // isChatInputActive = signal(false);
  users = inject(UsersService);
  channels = inject(ChannelsService);
  searchValue = signal('');
  searchNewTag = signal('');
  searchMembers = signal('');
  channelArray = this.channels.channels;
  // currentSearch: 'user' | 'channel' | null = null;


  constructor(private localStorageS: LocalStorageService) {
    this.currentUser = this.localStorageS.loadObject('currentUser') as User;
  }


  filteredResults = computed(() => {
    const searchTerm = this.searchValue().toLowerCase();
    if (searchTerm.startsWith('@')) {
      return this.filterUsers(searchTerm)
    }
    else if (searchTerm.startsWith('#')) {
      return this.filterChannels(searchTerm)
    }
    else {
      return this.filterAll(searchTerm)
    }
  });


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






  filteredMembers = computed(() => {
    const search = this.searchMembers().toLowerCase();
    return this.filterMembers(search)
  })


  filterMembers(searchMembers: string) {
    return this.users.users.filter(user =>
      user.name.toLowerCase().includes(searchMembers) &&
      user.id !== this.currentUser.id // CurrentUser ausschließen
    );
  }


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



  getActiveTag(text: string): string | null {
    const caretIndex = this.getCaretPosition(); // musst du aus dem textarea holen
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

  textareaRef!: ElementRef<HTMLTextAreaElement>;

  setTextareaRef(ref: ElementRef<HTMLTextAreaElement>) {
    this.textareaRef = ref;
  }






  newMessageChannels: Channel[] = [];
  newMessagePersons: User[] = [];

  searchNewMessageValue = signal('');

  // filteredNewMessageResults = computed(() => {
  //   const searchTerm = this.searchNewMessageValue().toLowerCase();
  //   if (searchTerm.startsWith('@')) {
  //     return this.filterUsers(searchTerm)
  //   }
  //   else if (searchTerm.startsWith('#')) {
  //     return this.filterChannels(searchTerm)
  //   }
  //   else {
  //     return this.filterAll(searchTerm)
  //   }
  // });

    isUser(item: any): item is User {
    return 'name' in item && 'avatar' in item; // Anpassen an Ihre User-Properties
  }

  isChannel(item: any): item is Channel {
    return 'name' in item && 'id' in item; // Anpassen an Ihre Channel-Properties
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

filteredNewMessageResults = computed(() => {
  const searchTerm = this.searchNewMessageValue().toLowerCase();
  let results: (User | Channel)[] = [];
  
  if (searchTerm.startsWith('@')) {
    results = this.filterUsers(searchTerm);
  } else if (searchTerm.startsWith('#')) {
    results = this.filterChannels(searchTerm);
  } else {
    results = this.filterAll(searchTerm);
  }

  // Filter out already selected items
  return results.filter(item => 
    !this.newMessagePersons.some(u => u.id === item.id) &&
    !this.newMessageChannels.some(c => c.id === item.id)
  );
});











}
