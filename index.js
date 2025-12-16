class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
  insert(value, node = this.root) {
    if (value > node.data) {
      this.node.right === null
        ? (this.node.right = new Node(value))
        : this.insert(value, node.right);
    }
    if (value < node.data) {
      this.node.left === null
        ? (this.node.left = new Node(value))
        : this.insert(value, node.left);
    }
  }
  deleteItem(value) {}
}
// 数组去重
function deduplication(array) {
  let newArray = [];
  for (const el of array) {
    if (!newArray.includes(el)) newArray.push(el);
  }
  array = newArray.sort((a, b) => a - b);
  return array;
}

// return the level-0 root node.
//[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
function buildTreeRecur(array, start = 0, end = array.length - 1) {
  if (start > end) return null;
  const mid = start + Math.floor((end - start) / 2);
  const node = new Node(array[mid]);

  node.left = buildTreeRecur(array, start, mid - 1);
  node.right = buildTreeRecur(array, mid + 1, end);
  return node;
}
function buildTree(array) {
  array = deduplication(array).sort((a, b) => a - b);
  return buildTreeRecur(array);
}
// 打印二叉树
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
