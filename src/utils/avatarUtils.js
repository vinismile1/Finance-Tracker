// Cartoon Avatar Presets categorized by gender

export const CartoonAvatars = {
  female: [
    {
      id: 'f1',
      name: 'Graceful Professional',
      url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&top=longHair&hairColor=black&clothingColor=18352c&skinColor=f8d25c',
    },
    {
      id: 'f2',
      name: 'Chic Explorer',
      url: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Sophia&hairColor=2c1b18',
    },
    {
      id: 'f3',
      name: 'Modern Creative',
      url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&hairColor=362c28',
    },
    {
      id: 'f4',
      name: 'Minimalist Minimal',
      url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Aria&head=female1',
    },
    {
      id: 'f5',
      name: 'Tech Enthusiast',
      url: 'https://api.dicebear.com/7.x/micah/svg?seed=Zoe&hairColor=000000',
    }
  ],
  male: [
    {
      id: 'm1',
      name: 'Dapper Executive',
      url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav&top=shortHair&hairColor=black&clothingColor=18352c&facialHairProbability=0',
    },
    {
      id: 'm2',
      name: 'Urban Adventurer',
      url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rohan&hairColor=2c1b18',
    },
    {
      id: 'm3',
      name: 'Casual Analyst',
      url: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Alex',
    },
    {
      id: 'm4',
      name: 'Smart Minimalist',
      url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Ethan&head=shortHair1',
    },
    {
      id: 'm5',
      name: 'Creative Specialist',
      url: 'https://api.dicebear.com/7.x/micah/svg?seed=Marcus&hairColor=2c1b18',
    }
  ]
};

export const getDefaultAvatarByGender = (gender = 'female') => {
  if (gender === 'male') {
    return CartoonAvatars.male[0].url;
  }
  return CartoonAvatars.female[0].url;
};
