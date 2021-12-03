import libsodium from "libsodium-wrappers";

export class FileId {
  private constructor(private hash: Uint8Array) {
    if (hash.length !== libsodium.crypto_generichash_BYTES) throw new Error();
  }
  toUint8Array() {
    return this.hash;
  }
  static fromUint8Array(uint8Array: Uint8Array) {
    return new FileId(uint8Array);
  }
  toBase64(): string {
    return libsodium.to_base64(this.hash);
  }
  static fromBase64(Base64: string) {
    return new FileId(libsodium.from_base64(Base64));
  }
  toHex(): string {
    return libsodium.to_hex(this.hash);
  }
  static fromHex(hex: string) {
    return new FileId(libsodium.from_hex(hex));
  }
  equals(other: FileId) {
    return libsodium.compare(this.hash, other.hash) === 0;
  }
}
