import { withTranslation } from '../../utils/LanguageProvider';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

let addJsTree, editJsTree;
let selectedLeafNode;

// is there a default point selected?

const nodeData = [
  {
    id: '1.0',
    text: 'Bone points',
    value: 'Bone points',
    icon: '',
    state: {
      opened: false,
      disabled: false,
      selected: false,
    },
    children: [
      {
        id: '1.1',
        text: 'Anorectum',
        value: 'Anorectum',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: false,
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '1.2',
        text: 'Coccyg',
        value: 'Coccyg',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: false,
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '1.3',
        text: 'Ischial spine left',
        value: 'Ischial spine left',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: false,
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '1.4',
        text: 'Ischial spine right',
        value: 'Ischial spine right',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: false,
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '1.5',
        text: 'Symphysis',
        value: 'Symphysis',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: false,
        liAttributes: null,
        aAttributes: null,
      },
    ],
    liAttributes: null,
    aAttributes: null,
  },
  {
    id: '2.0',
    text: 'Organ points',
    value: 'Organ points',
    icon: '',
    state: {
      opened: false,
      disabled: false,
      selected: false,
    },
    children: [
      {
        id: '2.1',
        text: 'Bladder',
        value: 'Bladder',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: false,
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '2.2',
        text: 'Cervix',
        value: 'Cervix',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: false,
        liAttributes: null,
        aAttributes: null,
      },
    ],
    liAttributes: null,
    aAttributes: null,
  },
  {
    id: '3.0',
    text: 'Muscle points',
    icon: '',
    state: {
      opened: false,
      disabled: false,
      selected: false,
    },
    children: [
      {
        id: '3.1',
        text: 'Iliococcygeus',
        value: 'Iliococcygeus',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: [
          {
            id: '3.1.1',
            text: 'Origin',
            value: 'Iliococcygeus Origin',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.1.1.1',
                text: 'Right',
                value: 'Iliococcygeus Origin Right',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.1.1.1.1',
                    text: '1',
                    value: 'Iliococcygeus Origin Right 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.1.2',
                    text: '2',
                    value: 'Iliococcygeus Origin Right 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.1.3',
                    text: '3',
                    value: 'Iliococcygeus Origin Right 3',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.1.4',
                    text: '4',
                    value: 'Iliococcygeus Origin Right 4',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.1.5',
                    text: 'x',
                    value: 'Iliococcygeus Origin Right X',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.1.1.2',
                text: 'Left',
                value: 'Iliococcygeus Origin Left',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.1.1.2.1',
                    text: '1',
                    value: 'Iliococcygeus Origin Left 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.2.2',
                    text: '2',
                    value: 'Iliococcygeus Origin Left 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.2.3',
                    text: '3',
                    value: 'Iliococcygeus Origin Left 3',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.2.4',
                    text: '4',
                    value: 'Iliococcygeus Origin Left 4',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.1.1.2.5',
                    text: 'x',
                    value: 'Iliococcygeus Origin Left X',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
          {
            id: '3.1.2',
            text: 'Insertion',
            value: 'Iliococcygeus Insertion',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.1.2.1',
                text: '1',
                value: 'Iliococcygeus Insertion 1',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: false,
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.1.2.2',
                text: '2',
                value: 'Iliococcygeus Insertion 2',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: false,
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
        ],
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '3.2',
        text: 'Puboanalis',
        value: 'Puboanalis',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: [
          {
            id: '3.2.1',
            text: 'Insertion',
            value: 'Puboanalis Insertion',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.2.1.1',
                text: 'Right',
                value: 'Puboanalis Insertion Right',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.2.1.1.1',
                    text: '1',
                    value: 'Puboanalis Insertion Right 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.2.1.1.2',
                    text: '2',
                    value: 'Puboanalis Insertion Right 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.2.1.1.3',
                    text: '3',
                    value: 'Puboanalis Insertion Right 3',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.2.1.2',
                text: 'Left',
                value: 'Puboanalis Insertion Left',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.2.1.2.1',
                    text: '1',
                    value: 'Puboanalis Insertion Left 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.2.1.2.2',
                    text: '2',
                    value: 'Puboanalis Insertion Left 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.2.1.2.3',
                    text: '3',
                    value: 'Puboanalis Insertion Left 3',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
        ],
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '3.3',
        text: 'Puboperinealis',
        value: 'Puboperinealis',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: [
          {
            id: '3.3.1',
            text: 'Insertion',
            value: 'Puboperinealis Insertion',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.3.1.1',
                text: 'Right',
                value: 'Puboperinealis Insertion Right',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.3.1.1.1',
                    text: '1',
                    value: 'Puboperinealis Insertion Right 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.3.1.2',
                text: 'Left',
                value: 'Puboperinealis Insertion Left',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.3.1.2.1',
                    text: '1',
                    value: 'Puboperinealis Insertion Left 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
        ],
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '3.4',
        text: 'Pubovaginalis',
        value: 'Pubovaginalis',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: [
          {
            id: '3.4.1',
            text: 'Insertion',
            value: 'Pubovaginalis Insertion',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.4.1.1',
                text: 'Right',
                value: 'Pubovaginalis Insertion Right',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.4.1.1.1',
                    text: '1',
                    value: 'Pubovaginalis Insertion Right 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.4.1.1.2',
                    text: '2',
                    value: 'Pubovaginalis Insertion Right 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.4.1.2',
                text: 'Left',
                value: 'Pubovaginalis Insertion Left',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.4.1.2.1',
                    text: '1',
                    value: 'Pubovaginalis Insertion Left 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.4.1.2.2',
                    text: '2',
                    value: 'Pubovaginalis Insertion Left 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
        ],
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '3.5',
        text: 'Pubovisceralis',
        value: 'Pubovisceralis',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: [
          {
            id: '3.5.1',
            text: 'Origin',
            value: 'Pubovisceralis Origin',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.5.1.1',
                text: 'Right',
                value: 'Pubovisceralis Origin Right',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.5.1.1.1',
                    text: '1',
                    value: 'Pubovisceralis Origin Right 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.1.2',
                    text: '2',
                    value: 'Pubovisceralis Origin Right 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.1.3',
                    text: '3',
                    value: 'Pubovisceralis Origin Right 3',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.1.4',
                    text: '4',
                    value: 'Pubovisceralis Origin Right 4',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.1.5',
                    text: 'x',
                    value: 'Pubovisceralis Origin Right X',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.5.1.2',
                text: 'Left',
                value: 'Pubovisceralis Origin Left',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.5.1.2.1',
                    text: '1',
                    value: 'Pubovisceralis Origin Left 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.2.2',
                    text: '2',
                    value: 'Pubovisceralis Origin Left 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.2.3',
                    text: '3',
                    value: 'Pubovisceralis Origin Left 3',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.2.4',
                    text: '4',
                    value: 'Pubovisceralis Origin Left 4',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.5.1.2.5',
                    text: 'x',
                    value: 'Pubovisceralis Origin Left X',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
        ],
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '3.7',
        text: 'Puborectalis',
        value: 'Puborectalis',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: [
          {
            id: '3.7.1',
            text: 'Origin',
            value: 'Puborectalis Origin',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.7.1.1',
                text: 'Right',
                value: 'Puborectalis Origin Right',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.7.1.1.1',
                    text: '1',
                    value: 'Puborectalis Origin Right 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.7.1.1.2',
                    text: '2',
                    value: 'Puborectalis Origin Right 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.7.1.2',
                text: 'Left',
                value: 'Puborectalis Origin Left',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.7.1.2.1',
                    text: '1',
                    value: 'Puborectalis Origin Left 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.7.1.2.2',
                    text: '2',
                    value: 'Puborectalis Origin Left 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
          {
            id: '3.7.2',
            text: 'Insertion',
            value: 'Puborectalis Insertion',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.7.2.1',
                text: '1',
                value: 'Puborectalis Insertion 1',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: false,
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
        ],
        liAttributes: null,
        aAttributes: null,
      },
      {
        id: '3.8',
        text: 'Coccygeus',
        value: 'Coccygeus',
        icon: '',
        state: {
          opened: false,
          disabled: false,
          selected: false,
        },
        children: [
          {
            id: '3.8.1',
            text: 'Insertion',
            value: 'Coccygeus Insertion',
            icon: '',
            state: {
              opened: false,
              disabled: false,
              selected: false,
            },
            children: [
              {
                id: '3.8.1.1',
                text: 'Right',
                value: 'Coccygeus Insertion Right',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.8.1.1.1',
                    text: '1',
                    value: 'Coccygeus Insertion Right 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.8.1.1.2',
                    text: '2',
                    value: 'Coccygeus Insertion Right 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
              {
                id: '3.8.1.2',
                text: 'Left',
                value: 'Coccygeus Insertion Left',
                icon: '',
                state: {
                  opened: false,
                  disabled: false,
                  selected: false,
                },
                children: [
                  {
                    id: '3.8.1.2.1',
                    text: '1',
                    value: 'Coccygeus Insertion Left 1',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                  {
                    id: '3.8.1.2.2',
                    text: '2',
                    value: 'Coccygeus Insertion Left 2',
                    icon: '',
                    state: {
                      opened: false,
                      disabled: false,
                      selected: false,
                    },
                    children: false,
                    liAttributes: null,
                    aAttributes: null,
                  },
                ],
                liAttributes: null,
                aAttributes: null,
              },
            ],
            liAttributes: null,
            aAttributes: null,
          },
        ],
        liAttributes: null,
        aAttributes: null,
      },
    ],
    liAttributes: null,
    aAttributes: null,
  },
];
/*
Template.annotationDialogs.events({
  init_edit_tree: function(event, template) {
    init_edit_tree();
  },
  init_add_tree: function(event, template) {
    init_add_tree();
  },
});

Template.annotationDialogs.onRendered(() => {
  const instance = Template.instance();
  const dialogIds = ['annotationDialog', 'relabelAnnotationDialog'];

  dialogIds.forEach(id => {
    const dialog = instance.$('#' + id);
    dialog.draggable();
    dialogPolyfill.registerDialog(dialog.get(0));
  });

  $('#pointSelectContainer').on('mousedown', event => {
    event.stopPropagation();
  });
});
*/
function init_add_tree() {
  const elementSelector = '#addjstree';
  if (addJsTree) {
    $(elementSelector)
      .jstree(true)
      .destroy();
  }

  addJsTree = $(elementSelector).jstree({
    core: {
      data: nodeData,
    },
  });

  initTreeEvents(elementSelector, '#addHiddenTextInput');
}

function init_edit_tree() {
  const elementSelector = '#editjstree';
  if (editJsTree) {
    $(elementSelector)
      .jstree(true)
      .destroy();
  }

  editJsTree = $(elementSelector).jstree({
    core: {
      data: nodeData,
    },
  });

  initTreeEvents(elementSelector, '#editHiddenTextInput');
}

function initTreeEvents(elementSelector, inputSelector) {
  $(elementSelector).off('ready.jstree');
  $(elementSelector).on('ready.jstree', function(e, data) {
    const getTextInput = $(inputSelector);
    const val = getTextInput.val();
    const node = findNode(val);
    if (node) {
      $(elementSelector).jstree('activate_node', node.id);
    }
  });

  $(elementSelector).off('activate_node.jstree');
  $(elementSelector).on('activate_node.jstree', function(e, data) {
    e.preventDefault();
    e.stopPropagation();
    const getTextInput = $(inputSelector);

    if (
      data == undefined ||
      data.node == undefined ||
      data.node.id == undefined
    ) {
      return;
    } else if (data.node.children && data.node.children.length) {
      $(elementSelector).jstree('toggle_node', data.node);
      if (selectedLeafNode && getTextInput.val()) {
        $(elementSelector).jstree('activate_node', selectedLeafNode.id);
      }
    } else {
      selectedLeafNode = data.node.original;
      getTextInput.val(selectedLeafNode.value);
    }
  });
}

function findNode(value) {
  for (let i = 0; i < nodeData.length; i++) {
    const node = findNodeDFS(nodeData[i], value);
    if (node) {
      return node;
    }
  }
}

function findNodeDFS(root, value) {
  if (root.value === value) {
    return root;
  }

  for (let i = 0; i < root.children.length; i++) {
    let foundNode = findNodeDFS(root.children[i], value);
    if (foundNode) {
      return foundNode;
    }
  }
}

class AnnotationDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
  };

  //TODO check if required
  static defaultProps = {};

  // similar to Template.annotationDialogs.events
  init_trees() {
    init_edit_tree();
    init_add_tree();
  }

  componentDidMount() {
    $('#pointSelectContainer').on('mousedown', event => {
      event.stopPropagation();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({
        isOpen: this.props.isOpen,
      });
    }
  }

  /*
  componentDidMount() {
    const dialogIds = ['annotationDialog', 'relabelAnnotationDialog'];
    dialogIds.forEach(id => {
      const dialog = instance.$('#' + id);
      dialog.draggable();
      dialogPolyfill.registerDialog(dialog.get(0));
    });
  }*/

  render() {
    return (
      <div className="annotationDialogs">
        <dialog id="annotationDialog" className="annotationDialog noselect">
          <h5>Select the new point</h5>
          <div className="annotationTextInputOptions">
            <div id="addjstree"></div>
            <input type="text" id="addHiddenTextInput" />
          </div>
          <div className="buttons-row">
            <a className="annotationDialogConfirm btn btn-sm btn-primary">OK</a>
          </div>
        </dialog>

        <dialog
          id="relabelAnnotationDialog"
          className="annotationDialog noselect"
          onContextMenu="return false"
        >
          <h5>Edit point</h5>
          <div className="annotationTextInputOptions">
            <div id="editjstree"></div>
            <input type="text" id="editHiddenTextInput" />
          </div>
          <div className="buttons-row">
            <a className="relabelRemove btn btn-sm btn-secondary">
              Remove marker
            </a>
            <a className="relabelConfirm btn btn-sm btn-primary">OK</a>
          </div>
        </dialog>
      </div>
    );
  }
}

const connectedComponent = withTranslation('AnnotationDialog')(
  AnnotationDialog
);
export { connectedComponent as AnnotationDialog };
export default connectedComponent;
