
import { BookOpen, Type, Link, Layers, Repeat, TreePine, Pyramid, Share2, Boxes, Binary, Workflow, Cpu, Braces } from 'lucide-react';
import { TopicSection } from '../types';

export const topics: TopicSection[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Master the fundamental data structure for storing sequential data',
    icon: BookOpen,
    subtopics: {
      easy: [
        {
          title: 'Introduction to Arrays',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/introduction-to-arrays/'
            }
          ]
        },
        {
          title: 'Types of Arrays (1D, 2D, Multi-dimensional)',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/types-of-arrays-in-java/'
            }
          ]
        },
        {
          title: 'Basic Operations',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/array-data-structure/'
            }
          ]
        },
        {
          title: 'Find Maximum and Minimum',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/'
            }
          ]
        },
        {
          title: 'Reverse an Array',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/'
            }
          ]
        },
        {
          title: 'Move Zeros to End',
          difficulty: 'easy',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/move-zeroes/'
            }
          ]
        }
      ],
      medium: [
        {
          title: 'Rotate an Array',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/rotate-array/'
            }
          ]
        },
        {
          title: "Kadane's Algorithm",
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/maximum-subarray/'
            }
          ]
        },
        {
          title: 'Two-Pointer Approach',
          difficulty: 'medium',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/two-pointers-technique/'
            }
          ]
        },
        {
          title: 'Prefix & Suffix Sum',
          difficulty: 'medium',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/'
            }
          ]
        },
        {
          title: 'Subarray with Given Sum',
          difficulty: 'medium',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/find-subarray-with-given-sum/'
            }
          ]
        },
        {
          title: 'Binary Search on Arrays',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/binary-search/'
            }
          ]
        }
      ],
      hard: [
        {
          title: 'Merge Overlapping Intervals',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/merge-intervals/'
            }
          ]
        },
        {
          title: 'Trapping Rainwater Problem',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/trapping-rain-water/'
            }
          ]
        },
        {
          title: 'Maximum Product Subarray',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/maximum-product-subarray/'
            }
          ]
        },
        {
          title: 'Kth Largest Element',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
            }
          ]
        },
        {
          title: 'Dutch National Flag Algorithm',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/sort-colors/'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'Learn string manipulation and pattern matching algorithms',
    icon: Type,
    subtopics: {
      easy: [
        {
          title: 'Introduction to Strings',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/string-data-structure/'
            }
          ]
        },
        {
          title: 'String Operations',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/string-class-in-java/'
            }
          ]
        },
        {
          title: 'Reverse a String',
          difficulty: 'easy',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/reverse-string/'
            }
          ]
        },
        {
          title: 'Check Palindrome',
          difficulty: 'easy',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/valid-palindrome/'
            }
          ]
        },
        {
          title: 'Count Vowels and Consonants',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/count-vowels-consonants-special-characters-digits-string/'
            }
          ]
        }
      ],
      medium: [
        {
          title: 'Anagram Check',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/valid-anagram/'
            }
          ]
        },
        {
          title: 'Remove Duplicates',
          difficulty: 'medium',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/remove-duplicates-from-a-given-string/'
            }
          ]
        },
        {
          title: 'Longest Common Prefix',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/longest-common-prefix/'
            }
          ]
        },
        {
          title: 'Longest Repeating Substring',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/longest-repeating-substring/'
            }
          ]
        },
        {
          title: 'String Compression',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/string-compression/'
            }
          ]
        }
      ],
      hard: [
        {
          title: 'Rabin-Karp Algorithm',
          difficulty: 'hard',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/'
            }
          ]
        },
        {
          title: 'KMP Algorithm',
          difficulty: 'hard',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/'
            }
          ]
        },
        {
          title: 'Longest Palindromic Substring',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/longest-palindromic-substring/'
            }
          ]
        },
        {
          title: 'Edit Distance Problem',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/edit-distance/'
            }
          ]
        },
        {
          title: 'Minimum Window Substring',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/minimum-window-substring/'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Master node-based data structures and their operations',
    icon: Link,
    subtopics: {
      easy: [
        {
          title: 'Introduction to Linked Lists',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/data-structures/linked-list/'
            }
          ]
        },
        {
          title: 'Singly Linked List (Insertion, Deletion, Traversal)',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/singly-linked-list/'
            }
          ]
        },
        {
          title: 'Reverse a Linked List',
          difficulty: 'easy',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/reverse-linked-list/'
            }
          ]
        },
        {
          title: 'Find Middle of Linked List',
          difficulty: 'easy',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/middle-of-the-linked-list/'
            }
          ]
        },
        {
          title: 'Detect and Remove Loop in Linked List',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/'
            }
          ]
        }
      ],
      medium: [
        {
          title: 'Merge Two Sorted Linked Lists',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/merge-two-sorted-lists/'
            }
          ]
        },
        {
          title: 'Intersection of Two Linked Lists',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/intersection-of-two-linked-lists/'
            }
          ]
        },
        {
          title: 'Remove Duplicates from Sorted Linked List',
          difficulty: 'medium',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/remove-duplicates-from-a-sorted-linked-list/'
            }
          ]
        },
        {
          title: 'Find Nth Node from End',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'
            }
          ]
        },
        {
          title: 'Delete Without Head Pointer',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/delete-node-in-a-linked-list/'
            }
          ]
        }
      ],
      hard: [
        {
          title: 'LRU Cache Implementation',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/lru-cache/'
            }
          ]
        },
        {
          title: 'Reverse in Groups of K',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/'
            }
          ]
        },
        {
          title: 'Flattening a Linked List',
          difficulty: 'hard',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/flattening-a-linked-list/'
            }
          ]
        },
        {
          title: 'Copy List with Random Pointers',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/copy-list-with-random-pointer/'
            }
          ]
        },
        {
          title: 'Detect Cycle in a Linked List (Floyd\'s Cycle Detection)',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/linked-list-cycle/'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'stack-queue',
    title: 'Stack & Queue',
    description: 'Master stack and queue operations from basic to advanced levels',
    icon: Layers,
    subtopics: {
      easy: [
        {
          title: 'Introduction to Stack & Queue',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/stack-data-structure/'
            },
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/queue-data-structure/'
            }
          ]
        },
        {
          title: 'Stack Operations (Push, Pop, Peek)',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/'
            }
          ]
        },
        {
          title: 'Queue Operations (Enqueue, Dequeue)',
          difficulty: 'easy',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/'
            }
          ]
        }
      ],
      medium: [
        {
          title: 'Implement Stack using Queue',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/implement-stack-using-queues/'
            }
          ]
        },
        {
          title: 'Implement Queue using Stack',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/implement-queue-using-stacks/'
            }
          ]
        },
        {
          title: 'Next Greater Element',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/next-greater-element-i/'
            }
          ]
        },
        {
          title: 'Valid Parentheses Problem',
          difficulty: 'medium',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/valid-parentheses/'
            }
          ]
        },
        {
          title: 'Circular Queue Implementation',
          difficulty: 'medium',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/circular-queue-set-1-introduction-array-implementation/'
            }
          ]
        }
      ],
      hard: [
        {
          title: 'Largest Rectangle in Histogram',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/'
            }
          ]
        },
        {
          title: 'Sliding Window Maximum',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/sliding-window-maximum/'
            }
          ]
        },
        {
          title: 'LRU Cache Implementation',
          difficulty: 'hard',
          resources: [
            {
              title: 'LeetCode',
              url: 'https://leetcode.com/problems/lru-cache/'
            }
          ]
        },
        {
          title: 'Expression Evaluation using Stack',
          difficulty: 'hard',
          resources: [
            {
              title: 'GeeksforGeeks',
              url: 'https://www.geeksforgeeks.org/expression-evaluation/'
            }
          ]
        }
      ]
    }
  }
];
