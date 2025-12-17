import { Tree } from "./index.js";

const arr = [];
let m = Math.floor(Math.random() * 20);
for (let n = 0; n < m; n++) {
  arr.push(Math.floor(Math.random() * 100));
}
const tree = new Tree(arr);
console.log("is balanced: " + tree.isBalanced());

let result = [];
// level
tree.levelOrderForEach((n) => result.push(n));
console.log("level order:" + result.join(" -> "));
result = [];
//pre
tree.preOrderForEach((n) => result.push(n));
console.log("pre order:" + result.join(" -> "));
result = [];
// post
tree.postOrderForEach((n) => result.push(n));
console.log("post order:" + result.join(" -> "));
result = [];
// in
tree.inOrderForEach((n) => result.push(n));
console.log("in order:" + result.join(" -> "));
result = [];
// make this tree inBalanced
console.log("--insert number to make inBalanced--");
tree.insert(100);
tree.insert(120);
tree.insert(110);
tree.inOrderForEach((n) => result.push(n));
console.log("in order:" + result.join(" -> "));
console.log("is balanced: " + tree.isBalanced());
result = []
// rebalance 
console.log("--rebalance the tree--");
tree.rebalance()
console.log("is balanced: " + tree.isBalanced());


