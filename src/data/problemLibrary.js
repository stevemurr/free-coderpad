export const sampleProblems = [
  {
    id: 1,
    title: "Valid Palindrome II",
    difficulty: "Medium",
    company: [""],
    tags: ["String", "Two Pointers", "Greedy"],
    description: `Given a string s, return true if the s can be palindrome after deleting at most one character from it.

Example 1:
Input: s = "aba"
Output: true

Example 2:
Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.

Example 3:
Input: s = "abc"
Output: false`,
    code: `def valid_palindrome_ii(s):
    """
    :type s: str
    :rtype: bool
    """
    # Your code here


# Test cases
print(valid_palindrome_ii("aba"))     # Should return True
print(valid_palindrome_ii("abca"))    # Should return True
print(valid_palindrome_ii("abc"))     # Should return False
print(valid_palindrome_ii("deeee"))   # Should return True
print(valid_palindrome_ii("abccdba")) # Should return False`,
  },
  {
    id: 2,
    title: "Decode String",
    difficulty: "Medium",
    company: [""],
    tags: ["String", "Stack", "Recursion"],
    description: `Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

Example 1:
Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Example 2:
Input: s = "3[a2[c]]"
Output: "accaccacc"

Example 3:
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"`,
    code: `def decode_string(s):
    """
    :type s: str
    :rtype: str
    """
    # Your code here


# Test cases
print(decode_string("3[a]2[bc]"))      # Should return "aaabcbc"
print(decode_string("3[a2[c]]"))       # Should return "accaccacc"
print(decode_string("2[abc]3[cd]ef"))  # Should return "abcabccdcdcdef"
print(decode_string("abc3[cd]xyz"))    # Should return "abccdcdcdxyz"`,
  },
  {
    id: 3,
    title: "LRU Cache",
    difficulty: "Medium",
    company: ["Meta"],
    tags: ["Hash Table", "Linked List", "Design"],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

Example:
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4`,
    code: `class LRUCache:
    def __init__(self, capacity):
        """
        :type capacity: int
        """
        # Your code here

    def get(self, key):
        """
        :type key: int
        :rtype: int
        """
        # Your code here

    def put(self, key, value):
        """
        :type key: int
        :type value: int
        :rtype: None
        """
        # Your code here


# Test case
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))       # Should return 1
cache.put(3, 3)
print(cache.get(2))       # Should return -1
cache.put(4, 4)
print(cache.get(1))       # Should return -1
print(cache.get(3))       # Should return 3
print(cache.get(4))       # Should return 4`,
  },
  {
    id: 4,
    title: "Minimum Remove to Make Valid Parentheses",
    priority: "High",
    difficulty: "Medium",
    company: [""],
    tags: ["String", "Stack"],
    description: `Given a string s of '(' , ')' and lowercase English characters.

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:
- It is the empty string, contains only lowercase characters, or
- It can be written as AB (A concatenated with B), where A and B are valid strings, or
- It can be written as (A), where A is a valid string.

Example 1:
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

Example 2:
Input: s = "a)b(c)d"
Output: "ab(c)d"

Example 3:
Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.`,
    code: `def min_remove_to_make_valid(s):
    """
    :type s: str
    :rtype: str
    """
    # Your code here


# Test cases
print(min_remove_to_make_valid("lee(t(c)o)de)"))  # Should return "lee(t(c)o)de" or equivalent
print(min_remove_to_make_valid("a)b(c)d"))       # Should return "ab(c)d"
print(min_remove_to_make_valid("))(("))          # Should return ""
print(min_remove_to_make_valid("(a(b(c)d)"))     # Should return "a(b(c)d)" or equivalent`,
  },
  {
    id: 5,
    title: "Merge Intervals",
    difficulty: "Medium",
    company: [""],
    tags: ["Array", "Sorting"],
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.`,
    code: `def merge(intervals):
    """
    :type intervals: List[List[int]]
    :rtype: List[List[int]]
    """
    # Your code here


# Test cases
print(merge([[1,3],[2,6],[8,10],[15,18]]))  # Should return [[1,6],[8,10],[15,18]]
print(merge([[1,4],[4,5]]))                # Should return [[1,5]]
print(merge([[1,4],[0,4]]))                # Should return [[0,4]]
print(merge([[1,4],[2,3]]))                # Should return [[1,4]]`,
  },
  {
    id: 7,
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    company: ["Meta"],
    tags: ["Array", "Hash Table", "Prefix Sum"],
    description: `Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,1,1], k = 2
Output: 2

Example 2:
Input: nums = [1,2,3], k = 3
Output: 2`,
    code: `def subarray_sum(nums, k):
    """
    :type nums: List[int]
    :type k: int
    :rtype: int
    """
    # Your code here


# Test cases
print(subarray_sum([1, 1, 1], 2))     # Should return 2
print(subarray_sum([1, 2, 3], 3))     # Should return 2
print(subarray_sum([1, -1, 0], 0))    # Should return 3
print(subarray_sum([1, 2, 1, 2, 1], 3)) # Should return 4`,
  },
  {
    id: 8,
    title: "Clone Graph",
    difficulty: "Medium",
    company: [""],
    tags: ["Hash Table", "Depth-First Search", "Breadth-First Search", "Graph"],
    description: `Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}

Test case format:

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

Example 1:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).`,
    code: `# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node):
    """
    :type node: Node
    :rtype: Node
    """
    # Your code here


# Create and test graph
def build_graph(adjacency_list):
    if not adjacency_list:
        return None

    # Create all nodes
    nodes = {i+1: Node(i+1) for i in range(len(adjacency_list))}

    # Add neighbors
    for i, neighbors in enumerate(adjacency_list):
        nodes[i+1].neighbors = [nodes[neighbor] for neighbor in neighbors]

    return nodes[1]

def graph_to_adjacency_list(node):
    if not node:
        return []

    visited = {}
    result = []

    def dfs(node):
        if node.val in visited:
            return
        visited[node.val] = True
        while len(result) < node.val:
            result.append([])
        result[node.val - 1] = [neighbor.val for neighbor in node.neighbors]
        for neighbor in node.neighbors:
            dfs(neighbor)

    dfs(node)
    return result

# Test cases
graph1 = build_graph([[2,4],[1,3],[2,4],[1,3]])
cloned1 = clone_graph(graph1)
print(graph_to_adjacency_list(cloned1))  # Should print [[2,4],[1,3],[2,4],[1,3]]

graph2 = build_graph([[2],[1]])
cloned2 = clone_graph(graph2)
print(graph_to_adjacency_list(cloned2))  # Should print [[2],[1]]

graph3 = build_graph([])
cloned3 = clone_graph(graph3)
print(graph_to_adjacency_list(cloned3))  # Should print []`,
  },
  {
    id: 9,
    title: "Kth Largest Element in an Array",
    priority: "High",
    difficulty: "Medium",
    company: ["Meta"],
    tags: [
      "Array",
      "Divide and Conquer",
      "Sorting",
      "Heap (Priority Queue)",
      "Quickselect",
    ],
    description: `Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4`,
    code: `def find_kth_largest(nums, k):
    """
    :type nums: List[int]
    :type k: int
    :rtype: int
    """
    # Your code here


# Test cases
print(find_kth_largest([3, 2, 1, 5, 6, 4], 2))          # Should return 5
print(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)) # Should return 4
print(find_kth_largest([1], 1))                         # Should return 1
print(find_kth_largest([7, 6, 5, 4, 3, 2, 1], 5))       # Should return 3`,
  },
  {
    id: 10,
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    company: [""],
    tags: [
      "String",
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Design",
      "Binary Tree",
    ],
    description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Example 1:
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

Example 2:
Input: root = []
Output: []`,
    code: `# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string.

        :type root: TreeNode
        :rtype: str
        """
        # Your code here

    def deserialize(self, data):
        """Decodes your encoded data to tree.

        :type data: str
        :rtype: TreeNode
        """
        # Your code here


# Helper function to create a tree from a list
def create_tree(values):
    if not values:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while queue and i < len(values):
        node = queue.pop(0)

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        # Right child
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root

# Helper function to convert a tree to a list
def tree_to_list(root):
    if not root:
        return []

    result = []
    queue = [root]

    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)

    # Remove trailing None values
    while result and result[-1] is None:
        result.pop()

    return result

# Test cases
codec = Codec()

# Test case 1
root1 = create_tree([1, 2, 3, None, None, 4, 5])
serialized1 = codec.serialize(root1)
deserialized1 = codec.deserialize(serialized1)
print(tree_to_list(deserialized1))  # Should return [1, 2, 3, None, None, 4, 5]

# Test case 2
root2 = create_tree([])
serialized2 = codec.serialize(root2)
deserialized2 = codec.deserialize(serialized2)
print(tree_to_list(deserialized2))  # Should return []`,
  },
  {
    id: 11,
    title: "Word Break",
    difficulty: "Medium",
    company: [""],
    tags: [
      "Hash Table",
      "String",
      "Dynamic Programming",
      "Trie",
      "Memoization",
    ],
    description: `Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false`,
    code: `def word_break(s, word_dict):
    """
    :type s: str
    :type word_dict: List[str]
    :rtype: bool
    """
    # Your code here


# Test cases
print(word_break("leetcode", ["leet", "code"]))                        # Should return True
print(word_break("applepenapple", ["apple", "pen"]))                   # Should return True
print(word_break("catsandog", ["cats", "dog", "sand", "and", "cat"]))  # Should return False
print(word_break("abcd", ["a", "abc", "b", "cd"]))                     # Should return True`,
  },
  {
    id: 12,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    company: [""],
    tags: ["Dynamic Programming", "Tree", "Depth-First Search", "Binary Tree"],
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

Example 1:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.`,
    code: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_path_sum(root):
    """
    :type root: TreeNode
    :rtype: int
    """
    # Your code here


# Helper function to create a tree from a list
def create_tree(values):
    if not values:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while queue and i < len(values):
        node = queue.pop(0)

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        # Right child
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root

# Test cases
print(max_path_sum(create_tree([1, 2, 3])))                      # Should return 6
print(max_path_sum(create_tree([-10, 9, 20, None, None, 15, 7]))) # Should return 42
print(max_path_sum(create_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1]))) # Should return 48
print(max_path_sum(create_tree([-3])))                            # Should return -3`,
  },
  {
    id: 13,
    title: "Verifying an Alien Dictionary",
    difficulty: "Medium",
    company: [""],
    tags: ["Array", "Hash Table", "String"],
    description: `In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographically in this alien language.

Example 1:
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.

Example 2:
Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.

Example 3:
Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character.`,
    code: `def is_alien_sorted(words, order):
    """
    :type words: List[str]
    :type order: str
    :rtype: bool
    """
    # Your code here


# Test cases
print(is_alien_sorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"))  # Should return True
print(is_alien_sorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz"))  # Should return False
print(is_alien_sorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz"))  # Should return False
print(is_alien_sorted(["app", "apple"], "abcdefghijklmnopqrstuvwxyz"))  # Should return True`,
  },
  {
    id: 14,
    title: "Meeting Rooms II",
    difficulty: "Medium",
    tags: ["Array", "Sorting", "Heap (Priority Queue)", "Greedy"],
    description: `Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

Example 1:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Example 2:
Input: intervals = [[7,10],[2,4]]
Output: 1`,
    code: `def min_meeting_rooms(intervals):
    """
    :type intervals: List[List[int]]
    :rtype: int
    """
    # Your code here


# Test cases
print(min_meeting_rooms([[0, 30], [5, 10], [15, 20]]))  # Should return 2
print(min_meeting_rooms([[7, 10], [2, 4]]))  # Should return 1
print(min_meeting_rooms([[1, 5], [8, 9], [8, 10]]))  # Should return 2
print(min_meeting_rooms([[1, 5], [5, 10]]))  # Should return 1`,
  },
  {
    id: 15,
    title: "Basic Calculator II",
    difficulty: "Medium",
    company: ["Meta"],
    tags: ["String", "Stack", "Math"],
    description: `Given a string s which represents an expression, evaluate this expression and return its value.

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1].

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

Example 1:
Input: s = "3+2*2"
Output: 7

Example 2:
Input: s = " 3/2 "
Output: 1

Example 3:
Input: s = " 3+5 / 2 "
Output: 5`,
    code: `def calculate(s):
    """
    :type s: str
    :rtype: int
    """
    # Your code here


# Test cases
print(calculate("3+2*2"))       # Should return 7
print(calculate(" 3/2 "))       # Should return 1
print(calculate(" 3+5 / 2 "))   # Should return 5
print(calculate("14-3/2"))      # Should return 13
print(calculate("1+2*5/3+6/4")) # Should return 4`,
  },
  {
    id: 16,
    title: "Two Sum",
    difficulty: "Easy",
    company: [""],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]`,
    code: `def two_sum(nums, target):
    # Your code here
    pass

# Test cases
print(two_sum([2, 7, 11, 15], 9))  # Should return [0, 1]
print(two_sum([3, 2, 4], 6))       # Should return [1, 2]
print(two_sum([3, 3], 6))          # Should return [0, 1]`,
  },
  {
    id: 17,
    title: "Palindrome Number",
    difficulty: "Easy",
    company: [""],
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.
An integer is a palindrome when it reads the same forward and backward.

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.`,
    code: `def is_palindrome(x):
    # Your code here
    pass

# Test cases
print(is_palindrome(121))    # Should return True
print(is_palindrome(-121))   # Should return False
print(is_palindrome(10))     # Should return False`,
  },
  {
    id: 18,
    title: "Valid Parentheses",
    difficulty: "Easy",
    company: [""],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false`,
    code: `def is_valid(s):
    # Your code here
    pass

# Test cases
print(is_valid("()"))        # Should return True
print(is_valid("()[]{}"))    # Should return True
print(is_valid("(]"))        # Should return False
print(is_valid("([)]"))      # Should return False
print(is_valid("{[]}"))      # Should return True`,
  },
  {
    id: 19,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    company: [""],
    description: `You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]`,
    code: `# Definition for singly-linked list node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    # Your code here
    pass

# Helper function to create a linked list from a list
def create_linked_list(lst):
    dummy = ListNode(0)
    curr = dummy
    for val in lst:
        curr.next = ListNode(val)
        curr = curr.next
    return dummy.next

# Helper function to convert linked list to list for printing
def linked_list_to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

# Test cases
list1 = create_linked_list([1, 2, 4])
list2 = create_linked_list([1, 3, 4])
merged = merge_two_lists(list1, list2)
print(linked_list_to_list(merged))  # Should print [1, 1, 2, 3, 4, 4]

list3 = create_linked_list([])
list4 = create_linked_list([0])
merged2 = merge_two_lists(list3, list4)
print(linked_list_to_list(merged2))  # Should print [0]`,
  },
  {
    id: 20,
    title: "Fibonacci Number",
    difficulty: "Easy",
    company: [""],
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,
F(0) = 0, F(1) = 1
F(n) = F(n-1) + F(n-2), for n > 1.
Given n, calculate F(n).

Example 1:
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

Example 2:
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

Example 3:
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.`,
    code: `def fibonacci(n):
    # Your code here
    pass

# Test cases
print(fibonacci(2))  # Should return 1
print(fibonacci(3))  # Should return 2
print(fibonacci(4))  # Should return 3
print(fibonacci(10)) # Should return 55`,
  },
  {
    id: 21,
    title: "Valid Word Abbreviation",
    priority: "High",
    difficulty: "Easy",
    company: [""],
    tags: ["String", "Two Pointers"],
    description: `A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings with their lengths. The lengths should not have leading zeros.

For example, a string such as "substitution" could be abbreviated as (but not limited to):
- "s10n" ("s ubstitutio n")
- "sub4u4" ("sub stit u tion")
- "12" ("substitution")
- "su3i1u2on" ("su bst i t u ti on")
- "substitution" (no substrings replaced)

The following are not valid abbreviations:
- "s55n" ("s ubsti tutio n", the replaced substrings are adjacent)
- "s010n" (has leading zeros)
- "s0ubstitution" (replaces an empty substring)

Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.

Example 1:
Input: word = "internationalization", abbr = "i12iz4n"
Output: true
Explanation: The word "internationalization" can be abbreviated as "i12iz4n" ("i nternational iz atio n").

Example 2:
Input: word = "apple", abbr = "a2e"
Output: false
Explanation: The word "apple" cannot be abbreviated as "a2e".`,
    code: `def valid_word_abbreviation(word, abbr):
    """
    :type word: str
    :type abbr: str
    :rtype: bool
    """
    # Your code here


# Test cases
print(valid_word_abbreviation("internationalization", "i12iz4n"))  # Should return True
print(valid_word_abbreviation("apple", "a2e"))                      # Should return False
print(valid_word_abbreviation("substitution", "s10n"))              # Should return True
print(valid_word_abbreviation("substitution", "sub4u4"))            # Should return True
print(valid_word_abbreviation("substitution", "12"))                # Should return True
print(valid_word_abbreviation("substitution", "su3i1u2on"))         # Should return True
print(valid_word_abbreviation("substitution", "substitution"))      # Should return True
print(valid_word_abbreviation("substitution", "s55n"))              # Should return False
print(valid_word_abbreviation("substitution", "s010n"))             # Should return False
print(valid_word_abbreviation("substitution", "s0ubstitution"))     # Should return False`,
  },
  {
    id: 22,
    title: "Buildings With an Ocean View",
    difficulty: "Medium",
    company: [""],
    tags: ["Array", "Stack", "Monotonic Stack"],
    description: `There are n buildings in a line. You are given an integer array heights of size n that represents the heights of the buildings in the line.

The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without being blocked by another building. Formally, a building has an ocean view if all the buildings to its right have a smaller height.

Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order.

Example 1:
Input: heights = [4,2,3,1]
Output: [0,2,3]
Explanation: Building 1 (0-indexed) does not have an ocean view because building 2 is taller.

Example 2:
Input: heights = [4,3,2,1]
Output: [0,1,2,3]
Explanation: All buildings have an ocean view.

Example 3:
Input: heights = [1,3,2,4]
Output: [3]
Explanation: Only building 3 has an ocean view.`,
    code: `def find_buildings(heights):
    """
    :type heights: List[int]
    :rtype: List[int]
    """
    # Your code here


# Test cases
print(find_buildings([4, 2, 3, 1]))  # Should return [0, 2, 3]
print(find_buildings([4, 3, 2, 1]))  # Should return [0, 1, 2, 3]
print(find_buildings([1, 3, 2, 4]))  # Should return [3]
print(find_buildings([2, 2, 2, 2]))  # Should return [3]`,
  },
  {
    id: 23,
    title: "Binary Tree Vertical Order Traversal",
    difficulty: "Medium",
    company: [""],
    tags: [
      "Hash Table",
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree",
    ],
    description: `Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).

If two nodes are in the same row and column, the order should be from left to right.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation:
Column -1: Only node 9 is in this column.
Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.
Column 1: Only node 20 is in this column.
Column 2: Only node 7 is in this column.

Example 2:
Input: root = [3,9,8,4,0,1,7]
Output: [[4],[9],[3,0,1],[8],[7]]
Explanation:
Column -2: Only node 4 is in this column.
Column -1: Only node 9 is in this column.
Column 0: Nodes 3, 0, and 1 are in this column.
Column 1: Only node 8 is in this column.
Column 2: Only node 7 is in this column.

Example 3:
Input: root = [3,9,8,4,0,1,7,null,null,null,2,5]
Output: [[4],[9,5],[3,0,1],[8,2],[7]]
Explanation:
Column -2: Only node 4 is in this column.
Column -1: Nodes 9 and 5 are in this column in that order from top to bottom.
Column 0: Nodes 3, 0, and 1 are in this column.
Column 1: Nodes 8 and 2 are in this column in that order from top to bottom.
Column 2: Only node 7 is in this column.`,
    code: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def vertical_order(root):
    """
    :type root: TreeNode
    :rtype: List[List[int]]
    """
    # Your code here


# Helper function to create a tree from a list
def create_tree(values):
    if not values:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while queue and i < len(values):
        node = queue.pop(0)

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        # Right child
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root

# Test cases
print(vertical_order(create_tree([3, 9, 20, None, None, 15, 7])))  # Should return [[9],[3,15],[20],[7]]
print(vertical_order(create_tree([3, 9, 8, 4, 0, 1, 7])))          # Should return [[4],[9],[3,0,1],[8],[7]]
print(vertical_order(create_tree([3, 9, 8, 4, 0, 1, 7, None, None, None, 2, 5])))  # Should return [[4],[9,5],[3,0,1],[8,2],[7]]
print(vertical_order(create_tree([])))                             # Should return []`,
  },
  {
    id: 24,
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    company: [""],
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    description: `Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

Example 1:
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]

Example 2:
Input: root = [1,null,3]
Output: [1,3]

Example 3:
Input: root = []
Output: []`,
    code: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def right_side_view(root):
    """
    :type root: TreeNode
    :rtype: List[int]
    """
    # Your code here


# Helper function to create a tree from a list
def create_tree(values):
    if not values:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while queue and i < len(values):
        node = queue.pop(0)

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        # Right child
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root

# Test cases
print(right_side_view(create_tree([1, 2, 3, None, 5, None, 4])))  # Should return [1, 3, 4]
print(right_side_view(create_tree([1, None, 3])))                 # Should return [1, 3]
print(right_side_view(create_tree([])))                           # Should return []
print(right_side_view(create_tree([1, 2])))                       # Should return [1, 2]`,
  },
  {
    id: 25,
    title: "Lowest Common Ancestor of a Binary Tree III",
    difficulty: "Medium",
    company: ["Meta"],
    tags: ["Tree", "Hash Table", "Binary Tree"],
    description: `Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).

Each node has a reference to its parent node. The definition for Node is below:

class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}

According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.

Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1
Explanation: The LCA of nodes 1 and 2 is 1.`,
    code: `# Definition for a Node.
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None

def lowestCommonAncestor(p, q):
    """
    :type p: Node
    :type q: Node
    :rtype: Node
    """
    # Your code here


# Helper function to create a tree from a list with parent pointers
def create_tree_with_parent(values):
    if not values:
        return None

    # Create all nodes first
    nodes = [Node(val) if val is not None else None for val in values]

    # Connect the nodes
    for i in range(len(nodes)):
        if nodes[i] is None:
            continue

        # Left child
        left_idx = 2 * i + 1
        if left_idx < len(nodes) and nodes[left_idx] is not None:
            nodes[i].left = nodes[left_idx]
            nodes[left_idx].parent = nodes[i]

        # Right child
        right_idx = 2 * i + 2
        if right_idx < len(nodes) and nodes[right_idx] is not None:
            nodes[i].right = nodes[right_idx]
            nodes[right_idx].parent = nodes[i]

    return nodes[0] if nodes else None

# Helper function to find a node with a specific value
def find_node(root, val):
    if not root:
        return None
    if root.val == val:
        return root

    left = find_node(root.left, val)
    if left:
        return left

    return find_node(root.right, val)

# Test cases
tree1 = create_tree_with_parent([3,5,1,6,2,0,8,None,None,7,4])
p1 = find_node(tree1, 5)
q1 = find_node(tree1, 1)
result1 = lowestCommonAncestor(p1, q1)
print(result1.val if result1 else None)  # Should return 3

p2 = find_node(tree1, 5)
q2 = find_node(tree1, 4)
result2 = lowestCommonAncestor(p2, q2)
print(result2.val if result2 else None)  # Should return 5

tree2 = create_tree_with_parent([1,2])
p3 = find_node(tree2, 1)
q3 = find_node(tree2, 2)
result3 = lowestCommonAncestor(p3, q3)
print(result3.val if result3 else None)  # Should return 1`,
  },
  {
    id: 26,
    title: "Merge Sorted Array",
    difficulty: "Easy",
    company: [""],
    tags: ["Array", "Two Pointers", "Sorting"],
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].

Example 3:
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.`,
    code: `def merge(nums1, m, nums2, n):
    """
    :type nums1: List[int]
    :type m: int
    :type nums2: List[int]
    :type n: int
    :rtype: None Do not return anything, modify nums1 in-place instead.
    """
    # Your code here


# Test cases
nums1 = [1, 2, 3, 0, 0, 0]
merge(nums1, 3, [2, 5, 6], 3)
print(nums1)  # Should print [1, 2, 2, 3, 5, 6]

nums2 = [1]
merge(nums2, 1, [], 0)
print(nums2)  # Should print [1]

nums3 = [0]
merge(nums3, 0, [1], 1)
print(nums3)  # Should print [1]`,
  },
  {
    id: 27,
    title: "Basic Calculator II",
    difficulty: "Medium",
    company: [""],
    tags: ["String", "Stack", "Math"],
    description: `Given a string s which represents an expression, evaluate this expression and return its value.

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-231, 231 - 1].

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

Example 1:
Input: s = "3+2*2"
Output: 7

Example 2:
Input: s = " 3/2 "
Output: 1

Example 3:
Input: s = " 3+5 / 2 "
Output: 5`,
    code: `def calculate(s):
    """
    :type s: str
    :rtype: int
    """
    # Your code here


# Test cases
print(calculate("3+2*2"))       # Should return 7
print(calculate(" 3/2 "))       # Should return 1
print(calculate(" 3+5 / 2 "))   # Should return 5
print(calculate("14-3/2"))      # Should return 13`,
  },
  {
    id: 28,
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    company: [""],
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    description: `Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Example 1:
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

Example 2:
Input: root = [1,2]
Output: 1`,
    code: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameter_of_binary_tree(root):
    """
    :type root: TreeNode
    :rtype: int
    """
    # Your code here


# Helper function to create a tree from a list
def create_tree(values):
    if not values:
        return None

    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while queue and i < len(values):
        node = queue.pop(0)

        # Left child
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1

        # Right child
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1

    return root

# Test cases
print(diameter_of_binary_tree(create_tree([1,2,3,4,5])))  # Should return 3
print(diameter_of_binary_tree(create_tree([1,2])))        # Should return 1
print(diameter_of_binary_tree(create_tree([1])))          # Should return 0`,
  },
  {
    id: 29,
    title: "Valid Palindrome",
    difficulty: "Easy",
    company: ["Meta", "Amazon", "Microsoft"],
    tags: ["Two Pointers", "String"],
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Example 3:
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.`,
    code: `def is_palindrome(s):
    """
    :type s: str
    :rtype: bool
    """
    # Your code here


# Test cases
print(is_palindrome("A man, a plan, a canal: Panama"))  # Should return True
print(is_palindrome("race a car"))                      # Should return False
print(is_palindrome(" "))                               # Should return True
print(is_palindrome("0P"))                              # Should return False`,
  },
  {
    id: 30,
    title: "Number of Islands",
    difficulty: "Medium",
    company: ["Meta"],
    tags: [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Union Find",
      "Matrix",
    ],
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3`,
    code: `def num_islands(grid):
    """
    :type grid: List[List[str]]
    :rtype: int
    """
    # Your code here


# Test cases
grid1 = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
print(num_islands(grid1))  # Should return 1

grid2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
print(num_islands(grid2))  # Should return 3`,
  },
  {
    id: 23,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    company: ["Meta"],
    tags: [
      "Linked List",
      "Divide and Conquer",
      "Heap (Priority Queue)",
      "Merge Sort",
    ],
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:
Input: lists = []
Output: []

Example 3:
Input: lists = [[]]
Output: []`,
    code: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists):
    """
    :type lists: List[ListNode]
    :rtype: ListNode
    """
    # Your code here


# Helper function to create a linked list from a list
def create_linked_list(lst):
    dummy = ListNode(0)
    curr = dummy
    for val in lst:
        curr.next = ListNode(val)
        curr = curr.next
    return dummy.next

# Helper function to convert linked list to list for printing
def linked_list_to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

# Test cases
list1 = create_linked_list([1, 4, 5])
list2 = create_linked_list([1, 3, 4])
list3 = create_linked_list([2, 6])
merged = merge_k_lists([list1, list2, list3])
print(linked_list_to_list(merged))  # Should return [1, 1, 2, 3, 4, 4, 5, 6]

print(linked_list_to_list(merge_k_lists([])))  # Should return []
print(linked_list_to_list(merge_k_lists([create_linked_list([])])))  # Should return []`,
  },
  {
    id: 138,
    title: "Copy List with Random Pointer",
    difficulty: "Medium",
    company: ["Meta"],
    tags: ["Hash Table", "Linked List"],
    description: `A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
Your code will only be given the head of the original linked list.

Example 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Example 3:
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]`,
    code: `# Definition for a Node.
class Node:
    def __init__(self, x, next=None, random=None):
        self.val = int(x)
        self.next = next
        self.random = random

def copyRandomList(head):
    """
    :type head: Node
    :rtype: Node
    """
    # Your code here


# Helper function to create a linked list with random pointers
def create_linked_list_with_random(values):
    if not values:
        return None

    # Create nodes first
    nodes = []
    for val, _ in values:
        nodes.append(Node(val))

    # Connect nodes
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i+1]

    # Set random pointers
    for i, (_, random_idx) in enumerate(values):
        if random_idx is not None:
            nodes[i].random = nodes[random_idx]

    return nodes[0]

# Helper function to convert a linked list with random pointers to a list
def linked_list_to_list_with_random(head):
    if not head:
        return []

    # Map nodes to indices
    node_to_idx = {}
    curr = head
    idx = 0
    while curr:
        node_to_idx[curr] = idx
        curr = curr.next
        idx += 1

    # Create result list
    result = []
    curr = head
    while curr:
        random_idx = node_to_idx[curr.random] if curr.random else None
        result.append([curr.val, random_idx])
        curr = curr.next

    return result

# Test cases
head1 = create_linked_list_with_random([[7, None], [13, 0], [11, 4], [10, 2], [1, 0]])
copied1 = copyRandomList(head1)
print(linked_list_to_list_with_random(copied1))  # Should match input

head2 = create_linked_list_with_random([[1, 1], [2, 1]])
copied2 = copyRandomList(head2)
print(linked_list_to_list_with_random(copied2))  # Should match input

head3 = create_linked_list_with_random([])
copied3 = copyRandomList(head3)
print(linked_list_to_list_with_random(copied3))  # Should be []`,
  },
  {
    id: 301,
    title: "Remove Invalid Parentheses",
    difficulty: "Hard",
    company: ["Meta"],
    tags: ["String", "Backtracking", "Breadth-First Search"],
    description: `Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return all the possible results. You may return the answer in any order.

Example 1:
Input: s = "()())()"
Output: ["(())()","()()()"]

Example 2:
Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]

Example 3:
Input: s = ")("
Output: [""]`,
    code: `def remove_invalid_parentheses(s):
    """
    :type s: str
    :rtype: List[str]
    """
    # Your code here


# Test cases
print(remove_invalid_parentheses("()())()"))  # Should return ["(())()","()()()"]
print(remove_invalid_parentheses("(a)())()"))  # Should return ["(a())()","(a)()()"]
print(remove_invalid_parentheses(")("))  # Should return [""]
print(remove_invalid_parentheses("()"))  # Should return ["()"]`,
  },
];
