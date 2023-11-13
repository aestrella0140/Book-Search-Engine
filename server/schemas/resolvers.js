const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // users: async () => {
        //     return User.find();
        // },

        // user: async (parent, { userId }) => {
        //     return User.findOne({ _id: userId});
        // },

        // adding context to query, we can retrieve logged in user with without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id});
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        savedBooks: async (parent, { userId, book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { savedBooks: book },
                    },
                    {
                        new: true,
                        runValidators: true,
                    } 
                );
            }

            throw AuthenticationError;
        },

        // removeUser: async (parent, args, context) => {
        //     if (context.user) {
        //         return User.findOneAndDelete({ _id: context.user._id });
        //     }
        //     throw AuthenticationError;
        // },

        removeBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: book } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;