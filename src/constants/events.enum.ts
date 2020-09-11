enum Events {
  CREATE_USER = 'user:createUser',
  CREATE_ORDER = 'user:createOrder',
  BILLING_SUCCESS = 'billing:success',
  BILLING_FAILED = 'billing:failed',
  REPLENISH_BALANCE = 'user:replenishBalance',
}

export default Events;
