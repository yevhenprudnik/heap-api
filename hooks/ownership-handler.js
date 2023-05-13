import { ApiError } from '../exceptions.js';

export class OwnershipHandler {
  constructor(service) {
    this.service = new service();
  }

  useOwnership = async (request, reply) => {
    const { id } = request.params;

    if (
      typeof request?.user?.id === 'undefined' ||
      request?.user?.id === null
    ) {
      throw ApiError.Forbidden('No authorization provided.');
    }

    if (typeof id === 'undefined' || id === null) {
      throw ApiError.Forbidden('Invalid input format.');
    }

    const entity = await this.service.getOne({
      id,
      authorId: request.user.id,
    });

    if (typeof entity === 'undefined' || entity === null) {
      throw ApiError.Forbidden(
        'You do not have access to perform this action.'
      );
    }
  };
}
