import Immutable from "immutable";
import libsodium from "libsodium-wrappers";
import { AccountId } from "./AccountId";

export class AccountSecret {
  private privateKey: Uint8Array;
  private precalculatedHashCode: number;
  private constructor(privateKey: Uint8Array) {
    if (privateKey.length !== libsodium.crypto_box_SECRETKEYBYTES) throw new Error();
    this.privateKey = privateKey;
    this.precalculatedHashCode = Immutable.hash(this.toHex());
  }
  static create() {
    const { publicKey, privateKey } = libsodium.crypto_box_keypair();
    return [AccountId.fromUint8Array(publicKey), AccountSecret.fromUint8Array(privateKey)] as const;
  }
  toUint8Array() {
    return this.privateKey;
  }
  static fromUint8Array(uint8Array: Uint8Array) {
    return new AccountSecret(uint8Array);
  }
  toBase64(): string {
    return libsodium.to_base64(this.privateKey);
  }
  static fromBase64(Base64: string) {
    return new AccountSecret(libsodium.from_base64(Base64));
  }
  toHex(): string {
    return libsodium.to_hex(this.privateKey);
  }
  static fromHex(hex: string) {
    return new AccountSecret(libsodium.from_hex(hex));
  }
  equals(other: AccountSecret) {
    return libsodium.compare(this.privateKey, other.privateKey) === 0;
  }
  hashCode(): number {
    return this.precalculatedHashCode;
  }
}
