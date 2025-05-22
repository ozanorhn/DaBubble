import { computed, inject, Injectable, signal } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ChannelsService } from '../../services/channels/channels.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  isChatInputActive = signal(false);//

  users = inject(UsersService);
  channels = inject(ChannelsService);

  searchValue = signal('');

  searchMembers = signal('');

  channelArray = this.channels.channels;
  // userArray = this.users.users;


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
    console.log('Filter Array ', this.users.users.filter(user =>
      user.name.toLowerCase().includes(searchMembers)));


    return this.users.users.filter(user =>
      user.name.toLowerCase().includes(searchMembers)
    )
  }
  

}
