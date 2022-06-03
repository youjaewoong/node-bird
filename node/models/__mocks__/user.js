const bcrypt = require('bcrypt');

module.exports = {
  findOne: async ({ where: { email, id } }) => {
    if (email === 'easy-to-do@gmail.com' || id === 1) {
      return {
        id: 1,
        email: 'easy-to-do@gmail.com',
        password: await bcrypt.hash('nodejsbook', 12),
        Followers: [],
        Followings: [],
        addFollowing() {},
      };
    }
    return null;
  },
  create: async () => {},
};
