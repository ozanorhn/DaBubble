import { inject, Injectable, OnDestroy, OnInit } from '@angular/core';

import { Channel } from '../../classes/channel.class';
import { Firestore, collection, addDoc, updateDoc } from '@angular/fire/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { signal } from '@angular/core';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService implements OnInit, OnDestroy {


  // constructor(private firestore: Firestore) {
  //   console.log('Channel Array', this.channels);
  // }


  // channels = [
  //   new Channel({
  //     name: 'Entwicklerteam',
  //     description: 'Dieser Channel ist für alles rund um #dfsdf vorgesehen. Hier kannst du zusammen mit deinem Team Meetings abhalten, Dokumente teilen und Entscheidungen treffen.',
  //     createdBy: 'Noah Braun'
  //   }),
  //   new Channel({ name: 'Frontend' }),
  //   new Channel({ name: 'Backend' }),
  //   new Channel({ name: 'DevOps' }),
  //   new Channel({ name: 'Design-Team' }),
  //   new Channel({ name: 'Office-team' }),
  //   new Channel({ name: 'Support' }),
  // ]

  channels: Channel[] = [];

  private unsubscribe!: () => void;

  channelsCollection;

  // currentId: string = '';

  currentId = signal<string>('');


  currentChannel: Channel | undefined;
  editName = '';

  constructor(public firestore: Firestore) {
    this.channelsCollection = collection(this.firestore, 'channels');

    this.unsubscribe = onSnapshot(this.channelsCollection, (snapshot) => {
      this.channels = snapshot.docs.map((doc) => {
        const data = doc.data() as Channel;
        data.id = doc.id;
        return data;
      })
      console.log('Aktuelle Channels', this.channels);

    })
  }

  async addChannel(channel: Channel) {
    console.log('current channel is', channel);
    try {
      const docRef = await addDoc(this.channelsCollection, channel.toJSON())
      console.log('Channel added with ID', docRef.id);
    } catch (error) {
      console.error('Error adding channel', error);
    }
  }

  async edit() {
    if (this.currentChannel) {
      await updateDoc(doc(this.channelsCollection, this.currentId()), this.currentChannel.toJSON());
    }
  }


  ngOnInit(): void {


    // const chennelRef = doc(db, "cities", "DC");

    // // Set the "capital" field of the city 'DC'
    // await updateDoc(washingtonRef, {
    //   capital: true
    // });

  }


  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  // Ohne Signals 
  // openChannel(id: string | undefined) {
  //   if (id) {
  //     console.log(id);
  //     this.currentId = id;
  //     this.getCurrentChannel(id);
  //   }
  // }

// Mit Signals testen
    openChannel(id: string | undefined) {
    if (id) {
      console.log(id);
      this.currentId.set(id) ;
      this.getCurrentChannel(id);
    //  this.messageService.getMessages(id)
    }
  }

  getCurrentChannel(id: string) {
    this.channels.filter((x) => {
      if (x.id === id) {
        this.currentChannel = x;
        console.log('Channel Obj ', this.currentChannel);
      }
    })
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






  // public chatType: '' | 'channel' | 'thread' | 'dm' | 'search' = 'channel';
  public channelName: string = 'Entwicklerteam';
  public threadHeadMessage: {
    user: {
      avatar: number;
      name: string;
    };
    time: string; //number
    content: string;
    emojis: {
      id: number;
      users: string[];
    }[];
    answers?: {
      user: {
        avatar: number;
        name: string;
      };
      time: string; //number
      content: string;
      emojis: {
        id: number;
        users: string[];
      }[];
    }[];
  }[] = [
      {
        user: {
          avatar: 2,
          name: 'Frederik Beck'
        },
        time: '16:33 Uhr',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
        emojis: [
          {
            id: 11,
            users: ['jfjkzkhdghkhgf']
          }
        ],
        answers: [
          {
            user: {
              avatar: 5,
              name: 'Noah Braun'
            },
            time: '17:45 Uhr',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
            emojis: [
              {
                id: 1,
                users: ['uxfghjulzfülktdd']
              }
            ]
          },
          {
            user: {
              avatar: 5,
              name: 'Noah Braun'
            },
            time: '0:12 Uhr',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
            emojis: [
              {
                id: 5,
                users: ['uxfghjulzfülktdd']
              }
            ]
          }
        ]
      }];
  public messages: {
    user: {
      avatar: number;
      name: string;
    };
    time: string; //number
    content: string;
    emojis: {
      id: number;
      users: string[];
    }[];
    answers?: {
      user: {
        avatar: number;
        name: string;
      };
      time: string; //number
      content: string;
      emojis: {
        id: number;
        users: string[];
      }[];
    }[];
  }[] = [
      {
        user: {
          avatar: 2,
          name: 'Frederik Beck'
        },
        time: '16:33 Uhr',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
        emojis: [
          {
            id: 11,
            users: ['jfjkzkhdghkhgf']
          }
        ],
        answers: [
          {
            user: {
              avatar: 5,
              name: 'Noah Braun'
            },
            time: '17:45 Uhr',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
            emojis: [
              {
                id: 1,
                users: ['uxfghjulzfülktdd']
              }
            ]
          },
          {
            user: {
              avatar: 5,
              name: 'Noah Braun'
            },
            time: '0:12 Uhr',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
            emojis: [
              {
                id: 5,
                users: ['uxfghjulzfülktdd']
              }
            ]
          }
        ]
      },
      {
        user: {
          avatar: 1,
          name: 'Sandra Bock'
        },
        time: '14:09 Uhr',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
        emojis: [
          {
            id: 21,
            users: ['rsrtsthmjjtrjurs', 'uxfghjulzfülktdd']
          },
          {
            id: 7,
            users: ['rsrtsthmjjtrjurs']
          }
        ],
        answers: [
          {
            user: {
              avatar: 5,
              name: 'Noah Braun'
            },
            time: '0:12 Uhr',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
            emojis: [
              {
                id: 5,
                users: ['uxfghjulzfülktdd']
              }
            ]
          }
        ]
      },
      {
        user: {
          avatar: 2,
          name: 'Frederik Beck'
        },
        time: '16:33 Uhr',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
        emojis: [
          {
            id: 11,
            users: ['jfjkzkhdghkhgf']
          }
        ],
        answers: [
          {
            user: {
              avatar: 5,
              name: 'Noah Braun'
            },
            time: '17:45 Uhr',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
            emojis: [
              {
                id: 1,
                users: ['uxfghjulzfülktdd']
              }
            ]
          }
        ]
      },
      {
        user: {
          avatar: 1,
          name: 'Sandra Bock'
        },
        time: '14:09 Uhr',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
        emojis: [
          {
            id: 21,
            users: ['rsrtsthmjjtrjurs', 'uxfghjulzfülktdd']
          },
          {
            id: 7,
            users: ['rsrtsthmjjtrjurs']
          }
        ],
        answers: [
          {
            user: {
              avatar: 5,
              name: 'Noah Braun'
            },
            time: '0:12 Uhr',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit odio efficitur lectus vestibulum, quis accumsan ante vulputate. Quisque tristique iaculis erat, eu faucibus lacus iaculis ac.',
            emojis: [
              {
                id: 5,
                users: ['uxfghjulzfülktdd']
              }
            ]
          }
        ]
      }
    ];


  // openThread(message: any) {
  //   this.messages = message['answers'];
  //   this.threadHeadMessage = message;
  //   this.chatType = 'thread';
  // }

  //   addChannel() {

  //   }
}





