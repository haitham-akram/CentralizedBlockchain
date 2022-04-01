const {
  Blockchain,
  Block,
  Header,
  Transactions,
  MerkleTree,
} = require("./blockchain");
let blockchain = new Blockchain();
var fs = require("fs");
//check for the file if its empty if its not then it will take the Previous blockchain and continue minning block in it
fs.readFile("blockchain.json", function (err, data) {
  if (err) {
    return console.error(err);
  }
  if (Object.entries(data).length !== 0) {
    data = JSON.parse(data);
    blockchain.copy(data);
    //create new treansaction , header and block
    let treansaction1 = new Transactions();
    treansaction1.add_transaction("Haitham->Ahmad->60");
    treansaction1.add_transaction("Ahmad->Abood->60");
    treansaction1.add_transaction("Ahmad->Ali->60");
    let merkleTree = new MerkleTree();
    let root = merkleTree.createTree(treansaction1.transactions);
    let header1 = new Header(1, 3, Date.now(), root);
    blockchain.setBlock(
      new Block(
        header1,
        treansaction1.transactions,
        treansaction1.calculateCount()
      )
    );
    //saving all changings basically rewite the file
    fs.writeFile(
      "blockchain.json",
      JSON.stringify(blockchain.chain, null, 4),
      function (err) {
        if (err) {
          return console.error(err);
        }
        // If no error the remaining code executes
        console.log(" Finished writing ");
      }
    );
  } else {
    console.log("creating blockchain for first time.");
    //create new treansaction , header and block
    let treansaction1 = new Transactions();
    treansaction1.add_transaction("Ahmad->Haitham->60");
    treansaction1.add_transaction("Ahmad->Abood->60");
    treansaction1.add_transaction("Ahmad->Ali->60");
    let merkleTree = new MerkleTree();
    let root = merkleTree.createTree(treansaction1.transactions);
    let header1 = new Header(1, 3, Date.now(), root);
    blockchain.setBlock(
      new Block(
        header1,
        treansaction1.transactions,
        treansaction1.calculateCount()
      )
    );
    //saving all changings basically rewite the file
    fs.writeFile(
      "blockchain.json",
      JSON.stringify(blockchain.chain, null, 4),
      function (err) {
        if (err) {
          return console.error(err);
        }
        // If no error the remaining code executes
        console.log(" Finished writing ");
      }
    );
  }
  blockchain.blocksExplorer();
});
