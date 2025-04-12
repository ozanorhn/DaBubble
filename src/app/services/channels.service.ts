import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  public chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = 'dm';
  public channelName: string = 'Entwicklerteam';
  public messages = [
    {

    }
  ];
  constructor() { }
}
