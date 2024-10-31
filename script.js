function createNode(data = null, leftChild = null, rightChild = null) {
  return { data, leftChild, rightChild };
}

function createTree(arr = []) {
  const root = buildTree(arr);
  return { root };
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
