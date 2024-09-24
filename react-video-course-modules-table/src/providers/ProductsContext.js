import React from 'react';

import {
  videoCourse,
  videoModule1,
  videoModule2,
  videoModule3,
  videoModule4,
  videoModule5,
  videoModule6,
  videoModule7,
  videoModule8,
  videoModule9,
  videoModule10,
} from '../data/data.js';

export const ProductsContext = React.createContext([
  {
    _id: 1,
    type: 'video module',
    videoModule: videoModule1,
  },
  {
    _id: 2,
    type: 'video module',
    videoModule: videoModule2,
  },
  {
    _id: 3,
    type: 'video module',
    videoModule: videoModule3,
  },
  {
    _id: 4,
    type: 'video module',
    videoModule: videoModule4,
  },
  {
    _id: 5,
    type: 'video module',
    videoModule: videoModule5,
  },
  {
    _id: 6,
    type: 'video module',
    videoModule: videoModule6,
  },
  {
    _id: 7,
    type: 'video module',
    videoModule: videoModule7,
  },
  {
    _id: 8,
    type: 'video module',
    videoModule: videoModule8,
  },
  {
    _id: 9,
    type: 'video module',
    videoModule: videoModule9,
  },
  {
    _id: 10,
    type: 'video module',
    videoModule: videoModule10,
  },
  {
    _id: 50,
    type: 'video course',
    videoCourse: videoCourse,
  },
]);
