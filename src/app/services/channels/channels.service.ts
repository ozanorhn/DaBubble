import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Channel } from '../../classes/channel.class';
import { Firestore, collection, addDoc, updateDoc } from '@angular/fire/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService implements OnDestroy {


  channels: Channel[] = [];
  currentIndex = signal<number>(0);
  channelsCollection;

  createChannel = new Channel({ createdBy: 'UserID343783' });

  constructor(public firestore: Firestore) {
    this.channelsCollection = collection(this.firestore, 'channels');
    this.initChannelsListener();
  }


  private unsubscribe!: () => void;


  private initChannelsListener() {
    this.unsubscribe = onSnapshot(this.channelsCollection, (snapshot) => {
      this.channels = snapshot.docs.map((doc) => {
        const data = doc.data() as Channel;
        data.id = doc.id;
        return data;
      })
      console.log('Aktuelle Channels', this.channels);
    })
  }


  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  async addChannel(channelData: Channel) {
    console.log('current channel is', channelData);
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



  channels2 = [
    { name: 'Entwicklerteam', users: [{ avatar: 3 }, { avatar: 6 }, { avatar: 5 }, { avatar: 1 }, { avatar: 3 }, { avatar: 2 }, { avatar: 4 }] },
    { name: 'Frontend' },
    { name: 'Backend' },
    { name: 'DevOps' },
    { name: 'Design-Team' },
    { name: 'Office-team' },
    { name: 'Support' },
  ]


  // // public chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = 'channel';
  // public channelName: string = 'Entwicklerteam';
  // public threadHeadMessage: {
  //   user: {
  //     avatar: number;
  //     name: string;
  //   };
  //   time: string; //number
  //   content: string;
  //   emojis: {
  //     id: number;
  //     users: string[];
  //   }[];
  //   answers?: {
  //     user: {
  //       avatar: number;
  //       name: string;
  //     };
  //     time: string; //number
  //     content: string;
  //     emojis: {
  //       id: number;
  //       users: string[];
  //     }[];
  //   }[];
  // }[] = [
  //     {
  //       user: {
  //         avatar: 2,
  //         name: 'Frederik Beck'
  //       },
  //       time: '16:33 Uhr',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //       emojis: [
  //         {
  //           id: 11,
  //           users: ['jfjkzkhdghkhgf']
  //         }
  //       ],
  //       answers: [
  //         {
  //           user: {
  //             avatar: 5,
  //             name: 'Noah Braun'
  //           },
  //           time: '17:45 Uhr',
  //           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //           emojis: [
  //             {
  //               id: 1,
  //               users: ['uxfghjulzfülktdd']
  //             }
  //           ]
  //         },
  //         {
  //           user: {
  //             avatar: 5,
  //             name: 'Noah Braun'
  //           },
  //           time: '0:12 Uhr',
  //           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //           emojis: [
  //             {
  //               id: 5,
  //               users: ['uxfghjulzfülktdd']
  //             }
  //           ]
  //         }
  //       ]
  //     }];
  // public messages: {
  //   user: {
  //     avatar: number;
  //     name: string;
  //   };
  //   time: string; //number
  //   content: string;
  //   emojis: {
  //     id: number;
  //     users: string[];
  //   }[];
  //   answers?: {
  //     user: {
  //       avatar: number;
  //       name: string;
  //     };
  //     time: string; //number
  //     content: string;
  //     emojis: {
  //       id: number;
  //       users: string[];
  //     }[];
  //   }[];
  // }[] = [
  //     {
  //       user: {
  //         avatar: 2,
  //         name: 'Frederik Beck'
  //       },
  //       time: '16:33 Uhr',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //       emojis: [
  //         {
  //           id: 11,
  //           users: ['jfjkzkhdghkhgf']
  //         }
  //       ],
  //       answers: [
  //         {
  //           user: {
  //             avatar: 5,
  //             name: 'Noah Braun'
  //           },
  //           time: '17:45 Uhr',
  //           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //           emojis: [
  //             {
  //               id: 1,
  //               users: ['uxfghjulzfülktdd']
  //             }
  //           ]
  //         },
  //         {
  //           user: {
  //             avatar: 5,
  //             name: 'Noah Braun'
  //           },
  //           time: '0:12 Uhr',
  //           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //           emojis: [
  //             {
  //               id: 5,
  //               users: ['uxfghjulzfülktdd']
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       user: {
  //         avatar: 1,
  //         name: 'Sandra Bock'
  //       },
  //       time: '14:09 Uhr',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //       emojis: [
  //         {
  //           id: 21,
  //           users: ['rsrtsthmjjtrjurs', 'uxfghjulzfülktdd']
  //         },
  //         {
  //           id: 7,
  //           users: ['rsrtsthmjjtrjurs']
  //         }
  //       ],
  //       answers: [
  //         {
  //           user: {
  //             avatar: 5,
  //             name: 'Noah Braun'
  //           },
  //           time: '0:12 Uhr',
  //           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //           emojis: [
  //             {
  //               id: 5,
  //               users: ['uxfghjulzfülktdd']
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       user: {
  //         avatar: 2,
  //         name: 'Frederik Beck'
  //       },
  //       time: '16:33 Uhr',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //       emojis: [
  //         {
  //           id: 11,
  //           users: ['jfjkzkhdghkhgf']
  //         }
  //       ],
  //       answers: [
  //         {
  //           user: {
  //             avatar: 5,
  //             name: 'Noah Braun'
  //           },
  //           time: '17:45 Uhr',
  //           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //           emojis: [
  //             {
  //               id: 1,
  //               users: ['uxfghjulzfülktdd']
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       user: {
  //         avatar: 1,
  //         name: 'Sandra Bock'
  //       },
  //       time: '14:09 Uhr',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //       emojis: [
  //         {
  //           id: 21,
  //           users: ['rsrtsthmjjtrjurs', 'uxfghjulzfülktdd']
  //         },
  //         {
  //           id: 7,
  //           users: ['rsrtsthmjjtrjurs']
  //         }
  //       ],
  //       answers: [
  //         {
  //           user: {
  //             avatar: 5,
  //             name: 'Noah Braun'
  //           },
  //           time: '0:12 Uhr',
  //           content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
  //           emojis: [
  //             {
  //               id: 5,
  //               users: ['uxfghjulzfülktdd']
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ];



}





