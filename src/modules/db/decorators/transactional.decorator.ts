import { TransactionalService } from 'modules/db/services/transactional.service';

export function Transactional() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const transactionalService: TransactionalService =
        this.transactionalService;

      if (!transactionalService) {
        throw new Error(
          'TransactionalService not found. Make sure it is injected into the service.',
        );
      }
      return transactionalService.runInTransaction((queryRunner) => {
        return originalMethod.apply(this, args);
      });
    };

    return descriptor;
  };
}
