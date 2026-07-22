// // src/utils/avatarUtils.js

// const diceBear = (style, seed) =>
//   `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

// export const CartoonAvatars = {
//   female: [
//     {
//       id: 'f1',
//       name: 'Sophia',
//       url: diceBear('lorelei', 'Sophia'),
//     },
//     {
//       id: 'f2',
//       name: 'Maya',
//       url: diceBear('lorelei', 'Maya'),
//     },
//     {
//       id: 'f3',
//       name: 'Aria',
//       url: diceBear('lorelei', 'Aria'),
//     },
//     {
//       id: 'f4',
//       name: 'Zoe',
//       url: diceBear('lorelei', 'Zoe'),
//     },
//     {
//       id: 'f5',
//       name: 'Emma',
//       url: diceBear('lorelei', 'Emma'),
//     },
//   ],

//   male: [
//     {
//       id: 'm1',
//       name: 'Aarav',
//       url: diceBear('adventurer', 'Aarav'),
//     },
//     {
//       id: 'm2',
//       name: 'Rohan',
//       url: diceBear('adventurer', 'Rohan'),
//     },
//     {
//       id: 'm3',
//       name: 'Alex',
//       url: diceBear('adventurer', 'Alex'),
//     },
//     {
//       id: 'm4',
//       name: 'Ethan',
//       url: diceBear('adventurer', 'Ethan'),
//     },
//     {
//       id: 'm5',
//       name: 'Marcus',
//       url: diceBear('adventurer', 'Marcus'),
//     },
//   ],
// };

// export const getDefaultAvatarByGender = (gender = 'female') => {
//   return gender === 'male'
//     ? CartoonAvatars.male[0].url
//     : CartoonAvatars.female[0].url;
// };

import female1 from '../assets/avatars/female-1.png';
import female2 from '../assets/avatars/female-2.png';
import female3 from '../assets/avatars/female-3.png';
import female4 from '../assets/avatars/female-4.png';
import female5 from '../assets/avatars/female-5.png';

import male1 from '../assets/avatars/male-1.png';
import male2 from '../assets/avatars/male-2.png';
import male3 from '../assets/avatars/male-3.png';
import male4 from '../assets/avatars/male-4.png';
import male5 from '../assets/avatars/male-5.png';

export const CartoonAvatars = {
  female: [
    { id: 'f1', name: 'Female 1', url: female1 },
    { id: 'f2', name: 'Female 2', url: female2 },
    { id: 'f3', name: 'Female 3', url: female3 },
    { id: 'f4', name: 'Female 4', url: female4 },
    { id: 'f5', name: 'Female 5', url: female5 },
  ],

  male: [
    { id: 'm1', name: 'Male 1', url: male1 },
    { id: 'm2', name: 'Male 2', url: male2 },
    { id: 'm3', name: 'Male 3', url: male3 },
    { id: 'm4', name: 'Male 4', url: male4 },
    { id: 'm5', name: 'Male 5', url: male5 },
  ],
};

export const getDefaultAvatarByGender = (gender = 'female') => {
  return gender === 'male'
    ? CartoonAvatars.male[0].url
    : CartoonAvatars.female[0].url;
};