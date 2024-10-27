function createNode(data = null, leftChild = null, rightChild = null) {
  return { data, leftChild, rightChild };
}

function createTree(arr = []) {
  const root = buildTree(arr);
  return { root };
}
