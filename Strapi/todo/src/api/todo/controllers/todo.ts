/**
 * todo controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::todo.todo', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);

    const user = ctx.state.user;

    if (user && response.data) {
      await (strapi as any).documents('plugin::users-permissions.user').update({
        documentId: user.documentId,
        data: {
          todos: {
            connect: [response.data.documentId],
          },
        },
      });
    }

    return response;
  },
}));