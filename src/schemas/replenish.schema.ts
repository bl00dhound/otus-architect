import ajv from '../providers/validation';

export default ajv.compile({
  properties: {
    user_id: {
      type: 'integer',
    },
    amount: {
      type: 'integer',
      minimum: 1,
    },
  },
  additionalProperties: false,
  require: ['user_id', 'amount'],
});
