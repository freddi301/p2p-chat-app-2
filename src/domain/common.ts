export type CommonsImplementation<AccountId, Timestamp> = {
  Timestamp: { greaterThan(x: Timestamp, y: Timestamp): boolean };
};
