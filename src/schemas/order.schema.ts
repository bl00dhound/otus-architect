import ajv from '../providers/validation';
import { OrderStatus } from '../constants';

export default ajv.compile({
  properties: {
    user_id: {
      type: 'integer',
    },
    amount: {
      type: 'number',
      minimum: 1,
    },
    status: {
      enum: Object.values(OrderStatus),
    },
    request_id: {
      type: 'string',
      pattern: '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}',
      maxLength: 36,
      minLength: 36,
    },
  },
  additionalProperties: false,
  require: ['user_id', 'amount', 'status', 'request_id'],
});
