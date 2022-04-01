const SHA256 = require("crypto-js/sha256");
class Header {
  constructor(
    version,
    Difficulty,
    timestamp,
    merkle_root = 0,
    previousHash = ""
  ) {
    this.version = version;
    this.Difficulty = Difficulty;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.merkle_root = merkle_root;
    this.nonce = 0;
  }
}
class block {
  constructor(index, Header, data, datacount) {
    this.index = index;
    this.data = data;
    this.hash = this.calculatehash();
    this.Header = Header;
    this.datacount = datacount;
  }
  calculatehash() {
    return SHA256(
      this.index +
        JSON.stringify(this.Header) +
        JSON.stringify(this.data) +
        this.datacount
    ).toString();
  }

  mineblock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.Header.nonce++;
      this.hash = this.calculatehash();
    }
    console.log(" block mined" + this.hash);
  }
}
class blockchain {
  constructor() {
    this.chain = [this.creategenesisblock()];
    this.difficulty = 2;
  }
  creategenesisblock() {
    return new block(0, new Header(1, 3, Date.now, 0), "genesisblock", "1");
  }
  getlatestblock() {
    return this.chain[this.chain.length - 1];
  }
  addblock(newblock) {
    newblock.Header.previoushash = this.getlatestblock().hash;
    newblock.mineblock(this.difficulty);
    newblock.index = this.getlatestblock().index + 1;
    this.chain.push(newblock);
  }
  blocksExplorer() {
    console.log(JSON.stringify(this.chain, null, 4));
  }
}
let savjeecoin = new blockchain();
console.log("mining block...");
savjeecoin.addblock(new block(0, new Header(1, 3, Date.now), { amount: 4 }, 4));
console.log("mining block...");
savjeecoin.addblock(new block(0, new Header(1, 3, Date.now), { amount: 4 }, 4));
savjeecoin.blocksExplorer();
