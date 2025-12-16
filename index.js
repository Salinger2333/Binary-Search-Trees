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
    if (node === null) {
      return new Node(value);
    }
    if (value > node.data) {
      node.right = this.insert(value, node.right);
    } else {
      node.left = this.insert(value, node.left);
    }
    return node;
    // if (value > node.data) {
    //   this.node.right === null
    //     ? (this.node.right = new Node(value))
    //     : this.insert(value, node.right);
    // }
    // if (value < node.data) {
    //   this.node.left === null
    //     ? (this.node.left = new Node(value))
    //     : this.insert(value, node.left);
    // }
  }
  #getSuccessor(cur) {
    cur = cur.right;
    while (cur !== null && cur.left !== null) {
      cur = cur.left;
    }
    return cur;
  }
  // 3 solutions: non childNode, 1 childNode, 2 childNode
  deleteItem(value, node = this.root) {
    if (node === null) return null;
    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else {
      // 0/1 child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const succ = this.#getSuccessor(node);
      node.data = succ.data;
      node.right = this.deleteItem(succ.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (node === null) return console.log("not exsit");
    if (value === node.data) {
      return prettyPrint(node);
    } else if (value > node.data) {
      this.find(value, node.right);
    } else if (value < node.data) {
      this.find(value, node.left);
    }
  }
  levelOrderForEach(cb) {
    if (typeof cb !== "function") throw new Error("NO CALLBACK FUNCTION");
    if (this.root === null) return;
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
      let cur = queue.shift();
      cb(cur.data);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
  }
  preOrderForEach(cb, node = this.root) {
    if (typeof cb !== "function") throw new Error("NO CALLBACK FUNCTION");
    if (node === null) return;
    cb(node.data);
    this.preOrderForEach(cb, node.left);
    this.preOrderForEach(cb, node.right);
  }
  inOrderForEach(cb, node = this.root) {
    if (typeof cb !== "function") throw new Error("NO CALLBACK FUNCTION");
    if (node === null) return;

    this.inOrderForEach(cb, node.left);
    cb(node.data);
    this.inOrderForEach(cb, node.right);
  }
  postOrderForEach(cb, node = this.root) {
    if (typeof cb !== "function") throw new Error("NO CALLBACK FUNCTION");
    if (node === null) return;

    this.postOrderForEach(cb, node.left);
    this.postOrderForEach(cb, node.right);
    cb(node.data);
  }
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
// tree.insert(0);
// prettyPrint(tree.root);
// tree.insert(6);
// prettyPrint(tree.root);
// tree.deleteItem(6);
// prettyPrint(tree.root);
// tree.deleteItem(4);
// prettyPrint(tree.root);
// tree.find(0);
tree.levelOrderForEach((x) => console.log(x));
tree.inOrderForEach((x) => console.log(x))
