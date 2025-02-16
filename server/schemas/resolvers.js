const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          
  
          const userData = await User.findOne({_id: context.user._id})
          .select('-__v -password')
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
    }},

//     user: async (parent,{username}) => User.findOne({username: username}),
//     users: async () => User.find(),
// return userData;
//     }
//     throw new AuthenticationError('You are not logged in!');
//     }},

    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        saveBook: async (parent,{input}, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: input } },
                { new: true, runValidators: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You are not logged in!');
          },
          removeBooks: async (parent,{bookId}, context) =>{
              if (context.user){
                  const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: []} },
                    { new: true, runValidators: true },
                  );
                  return updatedUser;
              }
              throw new AuthenticationError('Please log in!');
            }
    }
}
    
    module.exports=resolvers;