import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {


  constructor() { }



  channels = [
    { name: 'Entwicklerteam' },
    { name: 'Frontend' },
    { name: 'Backend' },
    { name: 'DevOps' },
    { name: 'Design-Team' },
    { name: 'Office-team' },
    { name: 'Support' },
  ]



}
