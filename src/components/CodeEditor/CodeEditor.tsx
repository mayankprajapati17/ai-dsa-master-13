
import React, { useState } from 'react';
import { Loader2, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Textarea } from '@/components/ui/textarea';
import Editor from '@monaco-editor/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useToast } from '@/hooks/use-toast';

type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp';

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const DEFAULT_CODE = {
  javascript: `// JavaScript Example
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Example usage:
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // Expected: [0, 1]
`,
  typescript: `// TypeScript Example
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Example usage:
const nums: number[] = [2, 7, 11, 15];
const target: number = 9;
console.log(twoSum(nums, target)); // Expected: [0, 1]
`,
  python: `# Python Example
def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []

# Example usage:
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))  # Expected: [0, 1]
`,
  java: `// Java Example
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        System.out.println(Arrays.toString(twoSum(nums, target)));  // Expected: [0, 1]
    }
}
`,
  cpp: `// C++ Example
#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        
        map[nums[i]] = i;
    }
    
    return {};
}

int main() {
    std::vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    std::vector<int> result = twoSum(nums, target);
    
    std::cout << "[" << result[0] << ", " << result[1] << "]" << std::endl;  // Expected: [0, 1]
    
    return 0;
}
`
};

const DEFAULT_TEST_CASE = {
  javascript: 'const nums = [3, 2, 4];\nconst target = 6;\nconsole.log(twoSum(nums, target)); // Expected: [1, 2]',
  typescript: 'const nums: number[] = [3, 2, 4];\nconst target: number = 6;\nconsole.log(twoSum(nums, target)); // Expected: [1, 2]',
  python: 'nums = [3, 2, 4]\ntarget = 6\nprint(two_sum(nums, target))  # Expected: [1, 2]',
  java: 'int[] nums = {3, 2, 4};\nint target = 6;\nSystem.out.println(Arrays.toString(twoSum(nums, target)));  // Expected: [1, 2]',
  cpp: 'std::vector<int> nums = {3, 2, 4};\nint target = 6;\nstd::vector<int> result = twoSum(nums, target);\nstd::cout << "[" << result[0] << ", " << result[1] << "]" << std::endl;  // Expected: [1, 2]'
};

const CodeEditor = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(DEFAULT_CODE[language]);
  const [testCase, setTestCase] = useState(DEFAULT_TEST_CASE[language]);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const { toast } = useToast();

  // Handle language change
  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language;
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage]);
    setTestCase(DEFAULT_TEST_CASE[newLanguage]);
    setOutput('');
  };

  // Handle code change
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Handle test case change
  const handleTestCaseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestCase(e.target.value);
  };

  // Handle run code
  const runCode = () => {
    setIsLoading(true);
    setOutput('');
    
    // Simulate code execution with a delay
    setTimeout(() => {
      let result;
      
      try {
        // This is just a mock execution
        switch (language) {
          case 'javascript':
          case 'typescript':
            result = 'Output: [1, 2]\n\nExecution completed successfully in 0.15s';
            break;
          case 'python':
            result = '[1, 2]\n\nExecution completed successfully in 0.12s';
            break;
          case 'java':
            result = '[1, 2]\n\nExecution completed successfully in 0.35s';
            break;
          case 'cpp':
            result = '[1, 2]\n\nExecution completed successfully in 0.08s';
            break;
          default:
            result = 'Language not supported';
        }
        
        setOutput(result);
        toast({
          title: "Code executed successfully",
          description: "Your solution is correct!",
          variant: "default",
        });
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
        toast({
          title: "Execution failed",
          description: error instanceof Error ? error.message : String(error),
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Handle reset code
  const resetCode = () => {
    setCode(DEFAULT_CODE[language]);
    setTestCase(DEFAULT_TEST_CASE[language]);
    setOutput('');
    toast({
      title: "Code reset",
      description: "Editor has been reset to default code",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Code Editor</h1>
        <p className="text-muted-foreground">Practice your algorithm solutions with our interactive code editor</p>
      </div>
      
      <div className="bg-dsablue-light rounded-xl border border-white/10 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-xl">Two Sum Problem</h2>
            <div className="hidden md:flex items-center gap-2">
              <span className="bg-dsapurple/20 text-dsapurple text-xs px-2 py-1 rounded-full">Easy</span>
              <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full">Array</span>
              <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full">Hash Table</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select onValueChange={handleLanguageChange} defaultValue={language}>
              <SelectTrigger className="w-32 md:w-40">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              onClick={resetCode}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            
            <Button
              onClick={runCode}
              disabled={isLoading}
              size="sm"
              className="bg-dsapurple hover:bg-dsapurple-dark gap-2"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              <span>Run</span>
            </Button>
          </div>
        </div>
        
        <ResizablePanelGroup direction="vertical" className="min-h-[70vh]">
          <ResizablePanel defaultSize={70} minSize={40}>
            <div className="h-full">
              <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={code}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  renderLineHighlight: 'all',
                  guides: {
                    indentation: true,
                  },
                }}
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30}>
            <div className="h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="px-4 py-2 border-b border-white/10">
                  <TabsList className="bg-dsablue-light grid w-full max-w-[400px] grid-cols-2">
                    <TabsTrigger value="editor" className="data-[state=active]:bg-white/10">
                      Test Case
                    </TabsTrigger>
                    <TabsTrigger value="output" className="data-[state=active]:bg-white/10">
                      Output
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="editor" className="flex-grow p-4 data-[state=active]:flex data-[state=active]:flex-col">
                  <label htmlFor="test-case" className="text-sm font-medium mb-2 block">
                    Custom Test Input
                  </label>
                  <Textarea
                    id="test-case"
                    value={testCase}
                    onChange={handleTestCaseChange}
                    className="flex-grow resize-none bg-dsablue border border-white/10 font-mono text-sm p-4"
                  />
                </TabsContent>
                
                <TabsContent value="output" className="flex-grow p-0 data-[state=active]:block">
                  <div className="h-full font-mono text-sm p-4 bg-dsablue border-none">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin mr-2" />
                        <span>Running code...</span>
                      </div>
                    ) : output ? (
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    ) : (
                      <div className="text-muted-foreground h-full flex items-center justify-center">
                        Click the "Run" button to execute your code
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      <div className="mt-8 bg-dsablue-light/50 rounded-lg p-6 border border-white/10">
        <h3 className="font-bold text-xl mb-4">Problem Description</h3>
        <p className="mb-4 text-white/80">
          Given an array of integers <code className="bg-white/10 px-1 py-0.5 rounded">nums</code> and an integer <code className="bg-white/10 px-1 py-0.5 rounded">target</code>, 
          return <em>indices of the two numbers such that they add up to <code className="bg-white/10 px-1 py-0.5 rounded">target</code></em>.
        </p>
        <p className="mb-4 text-white/80">
          You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
        </p>
        <p className="text-white/80">
          You can return the answer in any order.
        </p>
        
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Example 1:</h4>
          <pre className="bg-dsablue p-3 rounded-md text-sm mb-4">
            <code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
</code>
          </pre>
          
          <h4 className="font-semibold mb-2">Example 2:</h4>
          <pre className="bg-dsablue p-3 rounded-md text-sm mb-4">
            <code>Input: nums = [3,2,4], target = 6
Output: [1,2]</code>
          </pre>
          
          <h4 className="font-semibold mb-2">Example 3:</h4>
          <pre className="bg-dsablue p-3 rounded-md text-sm">
            <code>Input: nums = [3,3], target = 6
Output: [0,1]</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
