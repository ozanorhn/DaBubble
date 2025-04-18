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
}





