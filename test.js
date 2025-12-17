import { Tree } from "./index.js";

const arr = [];
let m = Math.floor(Math.random() * 20);
for (let n = 0; n < m; n++) {
  arr.push(Math.floor(Math.random() * 100));
}
const tree = new Tree(arr)
console.log(tree.isBalanced());
tree.levelOrderForEach((n) => {let arr = []})
tree.preOrderForEach()
tree.postOrderForEach()
tree.inOrderForEach()
