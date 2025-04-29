
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with error handling
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'dummy-key');

const RESPONSE_TEMPLATE = `
Please analyze and execute the following code. Provide your response in this format:

1. **If the user asks for a topic** (without providing code):
   - **Theoretical Explanation**: Provide an in-depth explanation of the topic.
   - **Java Code Example**: Include a relevant code snippet in Java to demonstrate the concept.
   - **Use Cases**: Explain practical applications of the topic.

   **Example Format:**
   \`\`\`java
   // Java code demonstrating the concept
   public class Example {
       public static void main(String[] args) {
           System.out.println("Hello, Java!");
       }
   }
   \`\`\`

2. **If the user provides code**:
   1. **Code Analysis**
      - Brief explanation of what the code does.
      - Key components and their purpose.
      - Logic flow explanation.

   2. **Expected Output**
      - Show the expected program output.
      - Explain any conditions or variations.

   3. **Code Quality & Improvements**
      - Potential issues or edge cases.
      - Suggested improvements.
      - Best practices.

   4. **Performance Analysis**
      - Time complexity.
      - Space complexity.
      - Performance considerations.
Please format code examples using markdown code blocks with proper syntax highlighting.
`;

export async function getGeminiResponse(prompt: string): Promise<string> {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.warn('Gemini API key is not configured. Using mock responses.');
    return generateMockResponse(prompt);
  }

  try {
    // Use the correct model name: 'gemini-pro'
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Sanitize and format the prompt
    const sanitizedPrompt = prompt.trim().replace(/\u0000/g, '');
    const enhancedPrompt = `${RESPONSE_TEMPLATE}\n\n${sanitizedPrompt}`;
    
    // Add timeout and safety checks
    const result = await Promise.race([
      model.generateContent(enhancedPrompt),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout after 30 seconds')), 30000)
      )
    ]) as any;

    if (!result) {
      throw new Error('No response received from Gemini API');
    }

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response received from Gemini API');
    }

    return text;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Handle specific error cases
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your environment configuration.');
    }
    if (error.message?.includes('timeout')) {
      throw new Error('The request took too long to complete. Please try again.');
    }
    if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    if (error.message?.includes('blocked')) {
      throw new Error('The request was blocked. Please check your input.');
    }
    
    // Generic error with more context
    throw new Error(`Failed to get AI response: ${error.message || 'Unknown error occurred'}`);
  }
}

// Mock function to generate responses based on input when API key is not available
function generateMockResponse(input: string): string {
  if (input.toLowerCase().includes('recursion')) {
    return "# Recursion Explained\n\n**Theoretical Explanation**:\nRecursion is a programming technique where a function calls itself to solve a smaller version of the same problem. It consists of a base case (termination condition) and a recursive case.\n\n**Java Code Example**:\n```java\npublic class Factorial {\n  public static int factorial(int n) {\n    // Base case\n    if (n == 0 || n == 1) {\n      return 1;\n    }\n    // Recursive case\n    return n * factorial(n - 1);\n  }\n\n  public static void main(String[] args) {\n    System.out.println(\"Factorial of 5 is: \" + factorial(5));\n  }\n}\n```\n\n**Use Cases**:\n1. Tree and graph traversals\n2. Divide and conquer algorithms\n3. Dynamic programming problems\n4. Backtracking algorithms\n5. Mathematical computations like factorial and Fibonacci";
  } else if (input.toLowerCase().includes('graph')) {
    return "# Graph Algorithms\n\n**Theoretical Explanation**:\nGraphs are non-linear data structures consisting of nodes (or vertices) and edges connecting these nodes. They are used to represent networks, relationships, and complex systems.\n\n**Java Code Example**:\n```java\nimport java.util.*;\n\npublic class Graph {\n  private int V; // Number of vertices\n  private LinkedList<Integer>[] adjList; // Adjacency list\n\n  // Constructor\n  public Graph(int v) {\n    V = v;\n    adjList = new LinkedList[v];\n    for (int i = 0; i < v; i++) {\n      adjList[i] = new LinkedList<>();\n    }\n  }\n\n  // Add an edge to the graph\n  public void addEdge(int src, int dest) {\n    adjList[src].add(dest);\n  }\n\n  // BFS traversal from a given source\n  public void BFS(int s) {\n    // Mark all vertices as not visited\n    boolean[] visited = new boolean[V];\n\n    // Create a queue for BFS\n    LinkedList<Integer> queue = new LinkedList<>();\n    \n    // Mark the current node as visited and enqueue it\n    visited[s] = true;\n    queue.add(s);\n\n    while (!queue.isEmpty()) {\n      // Dequeue a vertex from queue and print it\n      s = queue.poll();\n      System.out.print(s + \" \");\n\n      // Get all adjacent vertices of the dequeued vertex\n      // If an adjacent has not been visited, mark it visited and enqueue it\n      for (int n : adjList[s]) {\n        if (!visited[n]) {\n          visited[n] = true;\n          queue.add(n);\n        }\n      }\n    }\n  }\n\n  public static void main(String[] args) {\n    Graph g = new Graph(4);\n    g.addEdge(0, 1);\n    g.addEdge(0, 2);\n    g.addEdge(1, 2);\n    g.addEdge(2, 0);\n    g.addEdge(2, 3);\n    g.addEdge(3, 3);\n\n    System.out.println(\"BFS traversal starting from vertex 2:\");\n    g.BFS(2);\n  }\n}\n```\n\n**Use Cases**:\n1. Social network analysis\n2. Route optimization\n3. Web page ranking (PageRank)\n4. Recommendation systems\n5. Network flow problems";
  } else if (input.toLowerCase().includes('bug') || input.toLowerCase().includes('debug')) {
    return "# Code Analysis\n\n**1. Code Analysis**\n\nThe provided code has a bug in the loop condition:\n\n```java\nfor(int i=0; i<=arr.length; i++) { \n    sum += arr[i]; \n}\n```\n\nThis code attempts to sum all elements in an array, but has an off-by-one error in the loop condition.\n\n**Key components:**\n- Loop iterating through array indexes\n- Sum accumulation variable\n- Array access inside the loop\n\n**Logic flow:** The loop should iterate through each index of the array and add each element to the sum variable.\n\n**2. Expected Output**\n\nThe code will throw an `ArrayIndexOutOfBoundsException` when `i` equals `arr.length` because array indices range from 0 to length-1.\n\n**3. Code Quality & Improvements**\n\n**Fixed code:**\n```java\nfor(int i=0; i < arr.length; i++) { \n    sum += arr[i]; \n}\n```\n\nAlternatively, using enhanced for loop:\n```java\nfor(int element : arr) {\n    sum += element;\n}\n```\n\n**Best practices:**\n- Always use `<` instead of `<=` when iterating through arrays\n- Consider using enhanced for loops for readability\n- Add bounds checking when accessing array elements\n\n**4. Performance Analysis**\n\n**Time complexity:** O(n) - where n is the length of the array\n**Space complexity:** O(1) - constant space\n\n**Performance considerations:**\nThis is an optimal implementation for summing array elements, as each element must be accessed exactly once.";
  } else if (input.toLowerCase().includes('time complexity') || input.toLowerCase().includes('big o')) {
    return "# Time Complexity and Big O Notation\n\n**Theoretical Explanation**:\nTime complexity is a way to describe how the runtime of an algorithm grows with the size of the input. Big O notation specifically characterizes the upper bound of the growth rate, focusing on the dominant factors as the input size increases.\n\n**Java Code Example with Different Time Complexities**:\n```java\npublic class TimeComplexityExamples {\n  // O(1) - Constant Time\n  public static int getFirstElement(int[] array) {\n    return array[0]; // Always takes the same amount of time regardless of array size\n  }\n\n  // O(log n) - Logarithmic Time\n  public static int binarySearch(int[] sortedArray, int target) {\n    int left = 0;\n    int right = sortedArray.length - 1;\n    \n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      \n      if (sortedArray[mid] == target) {\n        return mid;\n      } else if (sortedArray[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    \n    return -1; // Target not found\n  }\n\n  // O(n) - Linear Time\n  public static int findMaximum(int[] array) {\n    int max = Integer.MIN_VALUE;\n    for (int num : array) {\n      if (num > max) {\n        max = num;\n      }\n    }\n    return max;\n  }\n\n  // O(n log n) - Linearithmic Time\n  public static void mergeSort(int[] array, int left, int right) {\n    if (left < right) {\n      int mid = left + (right - left) / 2;\n      mergeSort(array, left, mid);\n      mergeSort(array, mid + 1, right);\n      merge(array, left, mid, right);\n    }\n  }\n\n  private static void merge(int[] array, int left, int mid, int right) {\n    // Merge implementation omitted for brevity\n  }\n\n  // O(n²) - Quadratic Time\n  public static void bubbleSort(int[] array) {\n    int n = array.length;\n    for (int i = 0; i < n; i++) {\n      for (int j = 0; j < n - i - 1; j++) {\n        if (array[j] > array[j + 1]) {\n          // Swap array[j] and array[j + 1]\n          int temp = array[j];\n          array[j] = array[j + 1];\n          array[j + 1] = temp;\n        }\n      }\n    }\n  }\n\n  public static void main(String[] args) {\n    int[] array = {3, 1, 4, 1, 5, 9, 2, 6};\n    System.out.println(\"First element: \" + getFirstElement(array));\n    System.out.println(\"Max value: \" + findMaximum(array));\n    bubbleSort(array);\n  }\n}\n```\n\n**Use Cases**:\n1. **Algorithm comparison**: Big O notation helps developers compare and choose the most efficient algorithm for a specific problem.\n2. **Performance prediction**: It allows estimation of how an algorithm will scale with increasing data size.\n3. **Optimization targets**: Identifying the time complexity helps focus optimization efforts on the most critical parts of the code.\n4. **System design decisions**: Understanding complexity helps in making architectural decisions about data structures and algorithms in large systems.\n5. **Interview assessment**: Time complexity analysis is a standard way to evaluate coding solutions in technical interviews.";
  } else if (input.toLowerCase().includes('sort') || input.toLowerCase().includes('sorting')) {
    return "# Sorting Algorithms\n\n**Theoretical Explanation**:\nSorting algorithms are methods used to arrange elements in a specific order (usually ascending or descending). Different sorting algorithms have different time and space complexity characteristics, making them suitable for different scenarios.\n\n**Java Code Example**:\n```java\nimport java.util.Arrays;\n\npublic class SortingAlgorithms {\n\n  // Bubble Sort - O(n²)\n  public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n      for (int j = 0; j < n - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n          // Swap arr[j] and arr[j+1]\n          int temp = arr[j];\n          arr[j] = arr[j + 1];\n          arr[j + 1] = temp;\n        }\n      }\n    }\n  }\n\n  // Selection Sort - O(n²)\n  public static void selectionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n      int minIdx = i;\n      for (int j = i + 1; j < n; j++) {\n        if (arr[j] < arr[minIdx]) {\n          minIdx = j;\n        }\n      }\n      // Swap arr[i] and arr[minIdx]\n      int temp = arr[minIdx];\n      arr[minIdx] = arr[i];\n      arr[i] = temp;\n    }\n  }\n\n  // Merge Sort - O(n log n)\n  public static void mergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n      int m = l + (r - l) / 2;\n      mergeSort(arr, l, m);\n      mergeSort(arr, m + 1, r);\n      merge(arr, l, m, r);\n    }\n  }\n\n  private static void merge(int[] arr, int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n\n    int[] L = new int[n1];\n    int[] R = new int[n2];\n\n    for (int i = 0; i < n1; ++i) {\n      L[i] = arr[l + i];\n    }\n    for (int j = 0; j < n2; ++j) {\n      R[j] = arr[m + 1 + j];\n    }\n\n    int i = 0, j = 0;\n    int k = l;\n    while (i < n1 && j < n2) {\n      if (L[i] <= R[j]) {\n        arr[k] = L[i];\n        i++;\n      } else {\n        arr[k] = R[j];\n        j++;\n      }\n      k++;\n    }\n\n    while (i < n1) {\n      arr[k] = L[i];\n      i++;\n      k++;\n    }\n\n    while (j < n2) {\n      arr[k] = R[j];\n      j++;\n      k++;\n    }\n  }\n\n  // Quick Sort - O(n log n) average case, O(n²) worst case\n  public static void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n      int pi = partition(arr, low, high);\n      quickSort(arr, low, pi - 1);\n      quickSort(arr, pi + 1, high);\n    }\n  }\n\n  private static int partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j < high; j++) {\n      if (arr[j] <= pivot) {\n        i++;\n        // Swap arr[i] and arr[j]\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n      }\n    }\n    // Swap arr[i+1] and arr[high] (pivot)\n    int temp = arr[i + 1];\n    arr[i + 1] = arr[high];\n    arr[high] = temp;\n    return i + 1;\n  }\n\n  public static void main(String[] args) {\n    // Test each sorting algorithm\n    int[] arr1 = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(arr1);\n    System.out.println(\"Bubble Sort: \" + Arrays.toString(arr1));\n\n    int[] arr2 = {64, 34, 25, 12, 22, 11, 90};\n    selectionSort(arr2);\n    System.out.println(\"Selection Sort: \" + Arrays.toString(arr2));\n\n    int[] arr3 = {64, 34, 25, 12, 22, 11, 90};\n    mergeSort(arr3, 0, arr3.length - 1);\n    System.out.println(\"Merge Sort: \" + Arrays.toString(arr3));\n\n    int[] arr4 = {64, 34, 25, 12, 22, 11, 90};\n    quickSort(arr4, 0, arr4.length - 1);\n    System.out.println(\"Quick Sort: \" + Arrays.toString(arr4));\n  }\n}\n```\n\n**Use Cases**:\n1. **Bubble Sort**: Educational purposes and small data sets\n2. **Selection Sort**: Small arrays with minimal memory usage requirements\n3. **Insertion Sort**: Nearly sorted arrays or online sorting (sorting as data arrives)\n4. **Merge Sort**: External sorting, stable sorting requirements, linked list sorting\n5. **Quick Sort**: General-purpose sorting in many language standard libraries\n6. **Heap Sort**: Priority queues and when stable sorting is not required\n7. **Counting/Radix Sort**: Integer sorting with limited range\n8. **Tim Sort**: Java's Arrays.sort() and Python's sorted() - hybrid algorithm for real-world data";
  } else {
    return "I'm your DSA Master AI assistant. I can help you learn data structures and algorithms by:\n\n**Theoretical Explanation**:\nData Structures and Algorithms (DSA) form the foundation of computer science and software engineering. Data structures organize and store data efficiently, while algorithms provide step-by-step procedures to solve specific problems. Mastering DSA is essential for writing efficient code and solving complex computational problems.\n\n**Java Code Example**:\n```java\npublic class DSAExample {\n    // Example of a simple data structure: Node for a linked list\n    static class Node {\n        int data;\n        Node next;\n        \n        public Node(int data) {\n            this.data = data;\n            this.next = null;\n        }\n    }\n    \n    // Example of a simple algorithm: Linear search\n    public static int linearSearch(int[] array, int target) {\n        for (int i = 0; i < array.length; i++) {\n            if (array[i] == target) {\n                return i; // Return index if found\n            }\n        }\n        return -1; // Return -1 if not found\n    }\n    \n    public static void main(String[] args) {\n        // Using the data structure\n        Node head = new Node(1);\n        head.next = new Node(2);\n        head.next.next = new Node(3);\n        \n        // Using the algorithm\n        int[] numbers = {10, 20, 30, 40, 50};\n        int result = linearSearch(numbers, 30);\n        System.out.println(\"Element found at index: \" + result);\n    }\n}\n```\n\n**Use Cases**:\n1. **Problem Solving**: DSA helps break down complex problems into manageable parts.\n2. **Software Development**: Efficient algorithms and data structures are crucial for building responsive applications.\n3. **Database Systems**: Optimized data structures power database operations like indexing and querying.\n4. **Artificial Intelligence**: Many AI algorithms rely on graph structures and search algorithms.\n5. **Operating Systems**: Memory management, process scheduling, and file systems all depend on efficient DSA implementations.";
  }
}
