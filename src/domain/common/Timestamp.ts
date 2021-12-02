export class Timestamp {
  private constructor(private epochMillis: number) {}
  static greaterThan(x: Timestamp, y: Timestamp) {
    return x.epochMillis > y.epochMillis;
  }
  static now() {
    return new Timestamp(Date.now());
  }
  static fromEpochMillis(epochMillis: number) {
    return new Timestamp(epochMillis);
  }
}
