import libsodium from "libsodium-wrappers";

export class AccountId {
  private constructor(private publicKey: Uint8Array) {
    if (publicKey.length !== libsodium.crypto_box_PUBLICKEYBYTES) throw new Error();
  }
  toUint8Array() {
    return this.publicKey;
  }
  static fromUint8Array(uint8Array: Uint8Array) {
    return new AccountId(uint8Array);
  }
  toBase64(): string {
    return libsodium.to_base64(this.publicKey);
  }
  static fromBase64(Base64: string) {
    return new AccountId(libsodium.from_base64(Base64));
  }
  toHex(): string {
    return libsodium.to_hex(this.publicKey);
  }
  static fromHex(hex: string) {
    return new AccountId(libsodium.from_hex(hex));
  }
  equals(other: AccountId) {
    return libsodium.compare(this.publicKey, other.publicKey) === 0;
  }
}
