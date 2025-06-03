import { computed, ElementRef, inject, Injectable, signal } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ChannelsService } from '../../services/channels/channels.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { User } from '../../classes/user.class';

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






  // filteredMessageResults = computed(() => {
  //   const searchTerm = this.searchNewTag().toLowerCase();
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

  filteredMessageResults = computed(() => {
    const tag = this.searchNewTag().toLowerCase();
    if (!tag) return [];

    if (tag.startsWith('@')) {
      return this.filterMessageUsers(tag);
    } else if (tag.startsWith('#')) {
      return this.filterMessageChannels(tag);
    }
    return [];
  });


  filterMessageUsers(searchTerm: string) {
    const userSearch = searchTerm.substring(1);
    return this.users.users.filter(user =>
      user.name.toLowerCase().includes(userSearch)
    )
  }


  filterMessageChannels(searchTerm: string) {
    const channelSearch = searchTerm.substring(1);
    return this.channels.channels.filter(channel =>
      channel.name.toLowerCase().includes(channelSearch)
    )
  }


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




 searchNewMessageValue = signal('');


  filteredNewMessageResults = computed(() => {
    const searchTerm = this.searchNewMessageValue().toLowerCase();
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



  







}
