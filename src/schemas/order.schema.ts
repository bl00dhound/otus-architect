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
  },
  additionalProperties: false,
  require: ['user_id', 'amount', 'status'],
});
