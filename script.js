function createNode(data = null, leftChild = null, rightChild = null) {
  return { data, leftChild, rightChild };
}

function createTree(arr = []) {
  const root = buildTree(arr);

  function insert(value, node) {
    if (node === null) return createNode(value);

    if (value < node.data) {
      node.leftChild = insert(value, node.leftChild);
    } else if (value > node.data) {
      node.rightChild = insert(value, node.rightChild);
    }

    return node;
  }

  function deleteItem(value, node) {
    if (!node) {
      return null;
    }

    function findMin(node) {
      while (node.leftChild !== null) {
        node = node.leftChild;
      }
      return node;
    }

    if (value < node.data) {
      node.leftChild = deleteItem(value, node.leftChild);
    } else if (value > node.data) {
      node.rightChild = deleteItem(value, node.rightChild);
    } else {
      if (!node.leftChild && !node.rightChild) {
        return null;
      } else if (!node.leftChild) {
        return node.rightChild;
      } else if (!node.rightChild) {
        return node.leftChild;
      } else {
        let successor = findMin(node.rightChild);
        node.data = successor.data;
        node.rightChild = deleteItem(successor.data, node.rightChild);
      }
    }
    return node;
  }

  function find(value, node = root) {
    if (!node) {
      return null;
    }

    if (value === node.data) {
      return node;
    }

    const leftResult = find(value, node.leftChild);
    if (leftResult) return leftResult;

    return find(value, node.rightChild);
  }

  function levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback function required");
    }

    if (!root) {
      return;
    }

    let queue = [];

    queue.push(root);

    while (queue.length != 0) {
      let node = queue.shift();

      callback(node);

      if (node.leftChild) {
        queue.push(node.leftChild);
      }

      if (node.rightChild) {
        queue.push(node.rightChild);
      }
    }
  }

  function inOrder(node = root, callback) {
    if (!callback) throw new Error("Callback function required");
    if (!node) return;

    inOrder(node.leftChild, callback);
    callback(node);
    inOrder(node.rightChild, callback);
  }

  function preOrder(node = root, callback) {
    if (!callback) throw new Error("Callback function required");
    if (!node) return;

    callback(node);
    preOrder(node.leftChild, callback);
    preOrder(node.rightChild, callback);
  }

  function postOrder(node = root, callback) {
    if (!callback) throw new Error("Callback function required");
    if (!node) return;

    postOrder(node.leftChild, callback);
    postOrder(node.rightChild, callback);
    callback(node);
  }

  function height(node) {
    if (!node) return -1;

    let leftHeight = height(node.leftChild);
    let rightHeight = height(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(node) {
    if (!root || !node) return -1;

    let found = find(node.data, root);
    if (!found) return -1;

    let currentDepth = 0;
    let currentNode = root;

    while (currentNode !== null) {
      if (currentNode === targetNode) {
        return currentDepth;
      }

      if (targetNode.data < currentNode.data) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }

      currentDepth++;
    }

    return -1;
  }

  function isBalanced(node = root) {
    if (!node) return true;

    const leftHeight = height(node.leftChild);
    const rightHeight = height(node.rightChild);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return isBalanced(node.leftChild) && isBalanced(node.rightChild);
  }

  function rebalance() {
    if (!root) {
      throw new Error("Tree is empty. Cannot rebalance.");
    }

    function inOrderTraversal(node, values) {
      if (!node) return;
      inOrderTraversal(node.leftChild, values);
      values.push(node.data);
      inOrderTraversal(node.rightChild, values);
    }

    const sortedValues = [];
    inOrderTraversal(root, sortedValues);

    root = buildTree(sortedValues);
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function buildTree(arr) {
  const sortedArray = Array.from(new Set(arr)).sort((a, b) => a - b);

  function recursiveBuild(start, end) {
    if (start > end) {
      return null;
    }

    const mid = (start + end) / 2;
    const root = createNode(sortedArray[mid]);

    root.leftChild = recursiveBuild(start, mid);
    root.rightChild = recursiveBuild(mid + 1, end);

    return root;
  }

  return recursiveBuild(0, sortedArray.length - 1);
}
