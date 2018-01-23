import formatErrors from '../../formatErrors'

export default {
  User: {
    logs: (parent, args, { models }) =>
      models.User.findById(parent.id)
        .populate('logs')
        .then(user => user.logs),
  },
  Query: {
    users: (parent, args, { models }) => models.User.find({}),
    user: (parent, { id }, { models }) => models.User.findById(id),
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User(args).save()

        return {
          ok: true,
          user,
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        }
      }
    },
  },
}
