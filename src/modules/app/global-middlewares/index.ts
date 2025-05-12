import { useCors } from 'modules/app/global-middlewares/useCors';
import { useExceptionFilters } from 'modules/app/global-middlewares/useExceptionFilters';
import { useLogging } from 'modules/app/global-middlewares/useLogging';
import { useMaxEventListeners } from 'modules/app/global-middlewares/useMaxEventListeners';
import { useSerialization } from 'modules/app/global-middlewares/useSerialization';
import { useSwagger } from 'modules/app/global-middlewares/useSwagger';
import { useValidation } from 'modules/app/global-middlewares/useValidation';
export {
  useCors,
  useExceptionFilters,
  useLogging,
  useMaxEventListeners,
  useSerialization,
  useSwagger,
  useValidation,
};
