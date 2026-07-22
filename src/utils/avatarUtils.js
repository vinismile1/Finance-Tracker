// src/utils/avatarUtils.js

const diceBear = (style, seed) =>
  `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

export const CartoonAvatars = {
  female: [
    {
      id: 'f1',
      name: 'Sophia',
      url: diceBear('lorelei', 'Sophia'),
    },
    {
      id: 'f2',
      name: 'Maya',
      url: diceBear('lorelei', 'Maya'),
    },
    {
      id: 'f3',
      name: 'Aria',
      url: diceBear('lorelei', 'Aria'),
    },
    {
      id: 'f4',
      name: 'Zoe',
      url: diceBear('lorelei', 'Zoe'),
    },
    {
      id: 'f5',
      name: 'Emma',
      url: diceBear('lorelei', 'Emma'),
    },
  ],

  male: [
    {
      id: 'm1',
      name: 'Aarav',
      url: diceBear('notionists', 'Aarav'),
    },
    {
      id: 'm2',
      name: 'Rohan',
      url: diceBear('notionists', 'Rohan'),
    },
    {
      id: 'm3',
      name: 'Alex',
      url: diceBear('notionists', 'Alex'),
    },
    {
      id: 'm4',
      name: 'Ethan',
      url: diceBear('notionists', 'Ethan'),
    },
    {
      id: 'm5',
      name: 'Marcus',
      url: diceBear('notionists', 'Marcus'),
    },
  ],
};

export const getDefaultAvatarByGender = (gender = 'female') => {
  return gender === 'male'
    ? CartoonAvatars.male[0].url
    : CartoonAvatars.female[0].url;
};