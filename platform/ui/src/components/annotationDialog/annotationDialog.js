import React, { PureComponent } from 'react';
import { OHIF } from '@ohif/core';
import { SelectTree } from '../..';

const nodeData = [
  {
    key: '1.0',
    label: 'Bone points',
    value: 'Bone points',
    icon: '',
    selected: false,
    items: [
      {
        key: '1.2',
        label: 'Coccyg',
        value: 'Coccyg',
        icon: '',
        selected: false,
      },
      {
        key: '1.3',
        label: 'Ischial spine left',
        value: 'Ischial spine left',
        icon: '',
        selected: false,
      },
      {
        key: '1.4',
        label: 'Ischial spine right',
        value: 'Ischial spine right',
        icon: '',
        selected: false,
      },
      {
        key: '1.5',
        label: 'Symphysis',
        value: 'Symphysis',
        icon: '',
        selected: false,
      },
    ],
  },
  {
    key: '2.0',
    label: 'Organ points',
    value: 'Organ points',
    icon: '',
    selected: false,
    items: [
      {
        key: '2.1',
        label: 'Anorectum',
        value: 'Anorectum',
        icon: '',
        selected: false,
      },
      {
        key: '2.2',
        label: 'Bladder',
        value: 'Bladder',
        icon: '',
        selected: false,
      },
      {
        key: '2.3',
        label: 'Cervix',
        value: 'Cervix',
        icon: '',
        selected: false,
      },
    ],
  },
  {
    key: '3.0',
    label: 'Muscle points',
    icon: '',
    selected: false,
    items: [
      {
        key: '3.1',
        label: 'Iliococcygeus',
        value: 'Iliococcygeus',
        icon: '',
        selected: false,
        items: [
          {
            key: '3.1.1',
            label: 'Origin',
            value: 'Iliococcygeus Origin',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.1.1.1',
                label: 'Right',
                value: 'Iliococcygeus Origin Right',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.1.1.1.1',
                    label: '1',
                    value: 'Iliococcygeus Origin Right 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.1.2',
                    label: '2',
                    value: 'Iliococcygeus Origin Right 2',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.1.3',
                    label: '3',
                    value: 'Iliococcygeus Origin Right 3',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.1.4',
                    label: '4',
                    value: 'Iliococcygeus Origin Right 4',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.1.5',
                    label: 'x',
                    value: 'Iliococcygeus Origin Right X',
                    icon: '',
                    selected: false,
                  },
                ],
              },
              {
                key: '3.1.1.2',
                label: 'Left',
                value: 'Iliococcygeus Origin Left',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.1.1.2.1',
                    label: '1',
                    value: 'Iliococcygeus Origin Left 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.2.2',
                    label: '2',
                    value: 'Iliococcygeus Origin Left 2',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.2.3',
                    label: '3',
                    value: 'Iliococcygeus Origin Left 3',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.2.4',
                    label: '4',
                    value: 'Iliococcygeus Origin Left 4',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.1.1.2.5',
                    label: 'x',
                    value: 'Iliococcygeus Origin Left X',
                    icon: '',
                    selected: false,
                  },
                ],
              },
            ],
          },
          {
            key: '3.1.2',
            label: 'Insertion',
            value: 'Iliococcygeus Insertion',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.1.2.1',
                label: '1',
                value: 'Iliococcygeus Insertion 1',
                icon: '',
                selected: false,
              },
              {
                key: '3.1.2.2',
                label: '2',
                value: 'Iliococcygeus Insertion 2',
                icon: '',
                selected: false,
              },
            ],
          },
        ],
      },
      {
        key: '3.2',
        label: 'Puboanalis',
        value: 'Puboanalis',
        icon: '',
        selected: false,
        items: [
          {
            key: '3.2.1',
            label: 'Insertion',
            value: 'Puboanalis Insertion',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.2.1.1',
                label: 'Right',
                value: 'Puboanalis Insertion Right',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.2.1.1.1',
                    label: '1',
                    value: 'Puboanalis Insertion Right 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.2.1.1.2',
                    label: '2',
                    value: 'Puboanalis Insertion Right 2',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.2.1.1.3',
                    label: '3',
                    value: 'Puboanalis Insertion Right 3',
                    icon: '',
                    selected: false,
                  },
                ],
              },
              {
                key: '3.2.1.2',
                label: 'Left',
                value: 'Puboanalis Insertion Left',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.2.1.2.1',
                    label: '1',
                    value: 'Puboanalis Insertion Left 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.2.1.2.2',
                    label: '2',
                    value: 'Puboanalis Insertion Left 2',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.2.1.2.3',
                    label: '3',
                    value: 'Puboanalis Insertion Left 3',
                    icon: '',
                    selected: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '3.3',
        label: 'Puboperinealis',
        value: 'Puboperinealis',
        icon: '',
        selected: false,
        items: [
          {
            key: '3.3.1',
            label: 'Insertion',
            value: 'Puboperinealis Insertion',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.3.1.1',
                label: 'Right',
                value: 'Puboperinealis Insertion Right',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.3.1.1.1',
                    label: '1',
                    value: 'Puboperinealis Insertion Right 1',
                    icon: '',
                    selected: false,
                  },
                ],
              },
              {
                key: '3.3.1.2',
                label: 'Left',
                value: 'Puboperinealis Insertion Left',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.3.1.2.1',
                    label: '1',
                    value: 'Puboperinealis Insertion Left 1',
                    icon: '',
                    selected: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '3.4',
        label: 'Pubovaginalis',
        value: 'Pubovaginalis',
        icon: '',
        selected: false,
        items: [
          {
            key: '3.4.1',
            label: 'Insertion',
            value: 'Pubovaginalis Insertion',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.4.1.1',
                label: 'Right',
                value: 'Pubovaginalis Insertion Right',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.4.1.1.1',
                    label: '1',
                    value: 'Pubovaginalis Insertion Right 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.4.1.1.2',
                    label: '2',
                    value: 'Pubovaginalis Insertion Right 2',
                    icon: '',
                    selected: false,
                  },
                ],
              },
              {
                key: '3.4.1.2',
                label: 'Left',
                value: 'Pubovaginalis Insertion Left',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.4.1.2.1',
                    label: '1',
                    value: 'Pubovaginalis Insertion Left 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.4.1.2.2',
                    label: '2',
                    value: 'Pubovaginalis Insertion Left 2',
                    icon: '',
                    selected: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '3.5',
        label: 'Pubovisceralis',
        value: 'Pubovisceralis',
        icon: '',
        selected: false,
        items: [
          {
            key: '3.5.1',
            label: 'Origin',
            value: 'Pubovisceralis Origin',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.5.1.1',
                label: 'Right',
                value: 'Pubovisceralis Origin Right',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.5.1.1.1',
                    label: '1',
                    value: 'Pubovisceralis Origin Right 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.1.2',
                    label: '2',
                    value: 'Pubovisceralis Origin Right 2',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.1.3',
                    label: '3',
                    value: 'Pubovisceralis Origin Right 3',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.1.4',
                    label: '4',
                    value: 'Pubovisceralis Origin Right 4',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.1.5',
                    label: 'x',
                    value: 'Pubovisceralis Origin Right X',
                    icon: '',
                    selected: false,
                  },
                ],
              },
              {
                key: '3.5.1.2',
                label: 'Left',
                value: 'Pubovisceralis Origin Left',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.5.1.2.1',
                    label: '1',
                    value: 'Pubovisceralis Origin Left 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.2.2',
                    label: '2',
                    value: 'Pubovisceralis Origin Left 2',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.2.3',
                    label: '3',
                    value: 'Pubovisceralis Origin Left 3',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.2.4',
                    label: '4',
                    value: 'Pubovisceralis Origin Left 4',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.5.1.2.5',
                    label: 'x',
                    value: 'Pubovisceralis Origin Left X',
                    icon: '',
                    selected: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '3.7',
        label: 'Puborectalis',
        value: 'Puborectalis',
        icon: '',
        selected: false,
        items: [
          {
            key: '3.7.1',
            label: 'Origin',
            value: 'Puborectalis Origin',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.7.1.1',
                label: 'Right',
                value: 'Puborectalis Origin Right',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.7.1.1.1',
                    label: '1',
                    value: 'Puborectalis Origin Right 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.7.1.1.2',
                    label: '2',
                    value: 'Puborectalis Origin Right 2',
                    icon: '',
                    selected: false,
                  },
                ],
              },
              {
                key: '3.7.1.2',
                label: 'Left',
                value: 'Puborectalis Origin Left',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.7.1.2.1',
                    label: '1',
                    value: 'Puborectalis Origin Left 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.7.1.2.2',
                    label: '2',
                    value: 'Puborectalis Origin Left 2',
                    icon: '',
                    selected: false,
                  },
                ],
              },
            ],
          },
          {
            key: '3.7.2',
            label: 'Insertion',
            value: 'Puborectalis Insertion',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.7.2.1',
                label: '1',
                value: 'Puborectalis Insertion 1',
                icon: '',
                selected: false,
              },
            ],
          },
        ],
      },
      {
        key: '3.8',
        label: 'Coccygeus',
        value: 'Coccygeus',
        icon: '',
        selected: false,
        items: [
          {
            key: '3.8.1',
            label: 'Insertion',
            value: 'Coccygeus Insertion',
            icon: '',
            selected: false,
            items: [
              {
                key: '3.8.1.1',
                label: 'Right',
                value: 'Coccygeus Insertion Right',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.8.1.1.1',
                    label: '1',
                    value: 'Coccygeus Insertion Right 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.8.1.1.2',
                    label: '2',
                    value: 'Coccygeus Insertion Right 2',
                    icon: '',
                    selected: false,
                  },
                ],
              },
              {
                key: '3.8.1.2',
                label: 'Left',
                value: 'Coccygeus Insertion Left',
                icon: '',
                selected: false,
                items: [
                  {
                    key: '3.8.1.2.1',
                    label: '1',
                    value: 'Coccygeus Insertion Left 1',
                    icon: '',
                    selected: false,
                  },
                  {
                    key: '3.8.1.2.2',
                    label: '2',
                    value: 'Coccygeus Insertion Left 2',
                    icon: '',
                    selected: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

class AnnotationDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: nodeData,
    };
  }

  onSelected = (event, itemSelected) => {
    if (itemSelected.items) {
      OHIF.log.info('children left');
    } else {
      OHIF.log.info('No children left');
    }
  };

  render() {
    OHIF.log.info('nodeData', nodeData);
    return (
      <SelectTree
        items={nodeData}
        searchEnabled={false}
        onSelected={this.onSelected}
        selectTreeFirstTitle={'Annotation Points'}
        selectTreeSecondTitle={'Second Level Points'}
      />
    );
  }
}

export { AnnotationDialog };
