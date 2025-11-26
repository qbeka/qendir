export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index
}

export interface Section {
  title?: string;
  content: string;
  code?: string;
  codeTitle?: string;
  tip?: string;
  codeNote?: string;
  relatedTopicLink?: string;
}

export interface DocItem {
  id: string;
  category: string;
  title: string;
  description: string;
  sections: Section[];
  quiz?: QuizQuestion[];
}

export const content: DocItem[] = [
  // =========================================
  // PYTHON SYNTAX - BASICS
  // =========================================
  {
    id: "py-intro",
    category: "Python Syntax",
    title: "Get Started & Syntax",
    description: "Python is a readable, high-level language. Unlike C++ or Java, it handles memory management for you and emphasizes code readability.",
    sections: [
      {
        title: "Indentation is Semantics",
        content: "In many languages (JS, C++), indentation is just for style. In Python, **indentation is logic**. It defines the scope of loops, functions, and classes. If you mess up whitespace, your code crashes (`IndentationError`).",
        code: `if 5 > 2:
    print("Inside the if-block") # Indented
print("Outside the if-block")    # Unindented`,
        tip: "Standard convention is 4 spaces. Do not mix tabs and spaces. In interviews, consistency matters more than width."
      },
      {
        title: "Comments & Docstrings",
        content: "Comments (`#`) are ignored by the interpreter. **Docstrings** (`\"\"\"`) are retained at runtime and are used for documentation generation. Use docstrings for functions/classes to explain *what* they do (Input/Output), and comments to explain *why* complex logic exists.",
        code: `def add(a, b):
    """
    Adds two numbers and returns the result.
    Input: int/float
    Output: int/float
    """
    # We don't validate types here for performance reasons
    return a + b`
      },
      {
        title: "The 'Pass' Keyword",
        content: "Python requires blocks (like `if`, `def`, `class`) to not be empty. If you are sketching out code or defining an abstract interface, use `pass` as a placeholder.",
        code: `def implementation_later():
    pass # Prevents SyntaxError`
      }
    ],
    quiz: [
      {
        question: "What happens if you skip indentation in a loop?",
        options: ["It runs globally", "IndentationError", "It warns you", "Nothing"],
        correctAnswer: 1
      },
      {
        question: "What is the difference between # and \"\"\"?",
        options: ["No difference", "# is multi-line", "\"\"\" is for documentation/metadata", "# is faster"],
        correctAnswer: 2
      },
      {
        question: "Why use 'pass'?",
        options: ["To skip a loop", "To avoid syntax errors in empty blocks", "To pass a variable", "To return None"],
        correctAnswer: 1
      },
      {
        question: "Does Python use curly braces {} for code blocks?",
        options: ["Yes", "No, it uses indentation", "Only for classes", "Optional"],
        correctAnswer: 1
      },
      {
        question: "What is the standard indentation width?",
        options: ["2 spaces", "4 spaces", "1 tab", "8 spaces"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-vars-types",
    category: "Python Syntax",
    title: "Variables & Data Types",
    description: "Python is dynamically typed. Variables are references to objects, not boxes holding values.",
    sections: [
      {
        title: "Dynamic Typing",
        content: "You don't declare types (`int x = 5`). You just assign. The *variable* has no type; the *object* it points to has a type. This allows flexibility but can lead to runtime errors if you assume a variable is an int when it's actually a string.",
        code: `x = 5       # x points to an Integer object
x = "Hello" # x now points to a String object (Perfectly legal)`,
        tip: "In interviews, use 'Type Hinting' (e.g., `def func(x: int) -> str:`) to show you care about type safety, even if Python doesn't enforce it."
      },
      {
        title: "Mutability vs Immutability",
        content: "This is CRITICAL. Some types cannot be changed after creation (**Immutable**: `int`, `float`, `str`, `tuple`, `bool`). Others can (**Mutable**: `list`, `dict`, `set`).\n\nIf you pass a Mutable object to a function, that function can modify your original data (Side Effect).",
        code: `def modify_list(l):
    l.append(4) # This changes the original list!

my_list = [1, 2, 3]
modify_list(my_list)
print(my_list) # [1, 2, 3, 4]`
      },
      {
        title: "Casting & Truthiness",
        content: "Every value in Python has a boolean equivalent. Empty collections (`[]`, `{}`, `''`), `0`, and `None` are `False`. Everything else is `True`. This allows concise checks.",
        code: `items = []
if not items:
    print("List is empty") # Prints!

name = "John"
if name:
    print("Name exists")`
      }
    ],
    quiz: [
      {
        question: "Which of these is Immutable?",
        options: ["List", "Dictionary", "String", "Set"],
        correctAnswer: 2
      },
      {
        question: "What is the boolean value of an empty list []?",
        options: ["True", "False", "None", "Error"],
        correctAnswer: 1
      },
      {
        question: "If you pass a list to a function and the function changes it...",
        options: ["The original is unchanged", "The original changes", "Python throws error", "It creates a copy"],
        correctAnswer: 1
      },
      {
        question: "Does Python require type declaration?",
        options: ["Yes", "No", "It's dynamic", "Only for classes", "Only for constants"],
        correctAnswer: 1
      },
      {
        question: "What is type hinting?",
        options: ["Enforces types", "Optimizes speed", "Documentation for developers/tools", "Compiles code"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "py-strings",
    category: "Python Syntax",
    title: "Strings & Formatting",
    description: "Strings in Python are immutable sequences of Unicode characters. They are extremely powerful for parsing tasks.",
    sections: [
      {
        title: "Why Immutability Matters",
        content: "You cannot change a character in place (`s[0] = 'A'` throws error). This implies that every string operation (like `replace` or `upper`) creates a **new** string object. In a loop, this can be O(N^2). Use a list of characters and `join` for efficiency.",
        code: `# ❌ Bad (O(N^2))
s = ""
for x in range(100):
    s += str(x)

# ✅ Good (O(N))
parts = []
for x in range(100):
    parts.append(str(x))
s = "".join(parts)`
      },
      {
        title: "Slicing: The Swiss Army Knife",
        content: "Extract parts of a string easily. Syntax: `[start:stop:step]`. Negative indices count from the end. This avoids verbose substrings logic found in Java/C++.",
        code: `text = "Interview"
print(text[:3])   # "Int" (First 3)
print(text[-1])   # "w" (Last char)
print(text[1:-1]) # "ntervie" (Trim ends)
print(text[::-1]) # "weivretnI" (Reverse!)`
      },
      {
        title: "F-Strings (Interpolation)",
        content: "Introduced in Python 3.6, F-strings are faster and more readable than `.format()` or `%s`. You can run arbitrary expressions inside the curly braces.",
        code: `name = "Alice"
score = 10
print(f"Player {name} scored {score * 2} points.")
# Output: "Player Alice scored 20 points."`
      }
    ],
    quiz: [
      {
        question: "What happens if you do s[0] = 'X'?",
        options: ["It changes the first char", "It creates a new string", "TypeError (Immutable)", "Nothing"],
        correctAnswer: 2
      },
      {
        question: "What is the complexity of string concatenation in a loop?",
        options: ["O(N)", "O(1)", "O(N^2)", "O(log N)"],
        correctAnswer: 2
      },
      {
        question: "What does s[::-1] do?",
        options: ["Returns last char", "Deletes string", "Reverses string", "Nothing"],
        correctAnswer: 2
      },
      {
        question: "Which formatting method is recommended for modern Python?",
        options: ["% operator", ".format()", "f-strings", "concat"],
        correctAnswer: 2
      },
      {
        question: "How do you get the last character efficiently?",
        options: ["s[len(s)-1]", "s[-1]", "s.last()", "s.end()"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-operators",
    category: "Python Syntax",
    title: "Operators & Logic",
    description: "Beyond basic math. Understanding identity, membership, and short-circuit logic.",
    sections: [
      {
        title: "Identity (is) vs Equality (==)",
        content: "`==` checks if values are the same. `is` checks if they are the **same object in memory**. For small integers (-5 to 256) and strings, Python interns them (reuses memory), so `is` might work, but NEVER rely on `is` for value comparison.",
        code: `a = [1, 2]
b = [1, 2]
print(a == b) # True (Values match)
print(a is b) # False (Different memory locations)

x = None
if x is None: # Always use 'is' for None checks
    pass`
      },
      {
        title: "Short-Circuit Evaluation",
        content: "In `A and B`, if A is False, B is never evaluated/run. In `A or B`, if A is True, B is never run. This is useful for safe checks.",
        code: `user = None
# Safe check: user.name is never accessed if user is None
if user and user.name == "Admin":
    print("Welcome")`
      },
      {
        title: "Integer Division",
        content: "The `/` operator always returns a float (`5/2 = 2.5`). The `//` operator creates an integer (floor) (`5//2 = 2`). In algorithm problems (like Binary Search), always use `//` for indices.",
        code: `mid = (left + right) // 2 # Correct
mid = (left + right) / 2  # Error: Index must be int`
      }
    ],
    quiz: [
      {
        question: "When should you use 'is'?",
        options: ["Comparing numbers", "Comparing strings", "Checking None or Object Identity", "Always"],
        correctAnswer: 2
      },
      {
        question: "What is the result of 5 / 2?",
        options: ["2", "2.5", "2.0", "Error"],
        correctAnswer: 1
      },
      {
        question: "What is the result of 5 // 2?",
        options: ["2", "2.5", "3", "Error"],
        correctAnswer: 0
      },
      {
        question: "In 'if A and B', when is B evaluated?",
        options: ["Always", "Only if A is True", "Only if A is False", "Never"],
        correctAnswer: 1
      },
      {
        question: "What is 2 ** 3?",
        options: ["6", "8", "9", "5"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-lists",
    category: "Python Syntax",
    title: "Lists (Arrays)",
    description: "Dynamic arrays. They can grow/shrink and hold mixed types.",
    sections: [
      {
        title: "Under the Hood",
        content: "Python lists are implemented as dynamic arrays. \n- **Access**: O(1) \n- **Append**: O(1) (amortized) \n- **Insert/Delete (at start/middle)**: O(N) because all subsequent elements must shift.\n\nUse `collections.deque` if you need to add/remove from the front often (Queue).",
        code: `nums = [1, 2, 3]
nums.pop(0) # O(N) - Avoid in large loops!
nums.append(4) # O(1) - Fast`
      },
      {
        title: "List Comprehensions",
        content: "The 'Pythonic' way to create lists. It's more readable and often faster than a `for` loop because the loop happens in C, not Python.",
        code: `nums = [1, 2, 3, 4]
# Syntax: [expression for item in list if condition]
squares = [x*x for x in nums if x % 2 == 0]
# Result: [4, 16]`
      },
      {
        title: "Sorting",
        content: "`.sort()` sorts in-place (modifies original). `sorted()` returns a new list. Both use Timsort (O(N log N)).",
        code: `data = [3, 1, 2]
data.sort() # data is now [1, 2, 3]

data = [3, 1, 2]
new_data = sorted(data) # data is unchanged`
      }
    ],
    quiz: [
      {
        question: "What is the time complexity of inserting at index 0?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
        correctAnswer: 2
      },
      {
        question: "Which creates a new sorted list?",
        options: ["list.sort()", "sorted(list)", "order(list)", "list.order()"],
        correctAnswer: 1
      },
      {
        question: "Why use List Comprehensions?",
        options: ["Uses less memory", "More readable and often faster", "Supports complex logic", "Required by Python 3"],
        correctAnswer: 1
      },
      {
        question: "Can lists contain different types?",
        options: ["Yes", "No", "Only primitive types", "Only objects"],
        correctAnswer: 0
      },
      {
        question: "What is the underlying data structure of a Python list?",
        options: ["Linked List", "Dynamic Array", "Hash Map", "Tree"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-dicts",
    category: "Python Syntax",
    title: "Dictionaries (Hash Maps)",
    description: "The most important data structure for interviews. O(1) average time complexity for lookups, inserts, and deletes.",
    sections: [
      {
        title: "Why Use Dicts?",
        content: "Use them whenever you need to map `Key -> Value` or check for existence efficiently. \n- **Keys**: Must be immutable (string, int, tuple). \n- **Values**: Can be anything.",
        code: `cache = {}
cache["user_1"] = "Alice"
if "user_1" in cache: # O(1) Lookup
    print("Found")`
      },
      {
        title: "Iterating Effectively",
        content: "You can loop over keys, values, or both. Unpacking items is very common.",
        code: `d = {"a": 1, "b": 2}

# Best way to get both
for k, v in d.items():
    print(f"{k}: {v}")`
      },
      {
        title: "DefaultDict",
        content: "From `collections`. It prevents KeyErrors automatically. Useful for counting or grouping items.",
        code: `from collections import defaultdict
counts = defaultdict(int) # Default value 0
names = ["a", "b", "a"]
for n in names:
    counts[n] += 1 # No need to check if key exists first!
# Result: {'a': 2, 'b': 1}`
      }
    ],
    quiz: [
      {
        question: "What is the average complexity of a dict lookup?",
        options: ["O(N)", "O(log N)", "O(1)", "O(N^2)"],
        correctAnswer: 2
      },
      {
        question: "Can a list be a dictionary key?",
        options: ["Yes", "No (Mutable)", "Only if empty", "Yes, in Python 3"],
        correctAnswer: 1
      },
      {
        question: "What does d.items() return?",
        options: ["Keys only", "Values only", "Key-Value tuples", "List of keys"],
        correctAnswer: 2
      },
      {
        question: "What is the advantage of defaultdict?",
        options: ["Faster lookups", "Auto-initializes missing keys", "Ordered keys", "Less memory"],
        correctAnswer: 1
      },
      {
        question: "How do you safely get a value that might be missing?",
        options: ["d[key]", "d.fetch(key)", "d.get(key)", "d.find(key)"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "py-control-flow",
    category: "Python Syntax",
    title: "Control Flow",
    description: "Managing the execution path of your code.",
    sections: [
      {
        title: "Enumerate: The Pro Loop",
        content: "Don't use `range(len(arr))` to get indices. Use `enumerate()`. It gives you both the index and the value cleanly.",
        code: `# ❌ Old School (Java style)
for i in range(len(fruits)):
    print(i, fruits[i])

# ✅ Pythonic
for i, fruit in enumerate(fruits):
    print(i, fruit)`
      },
      {
        title: "Zip: Parallel Looping",
        content: "Loop over two lists at the same time. It stops at the shortest list.",
        code: `names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} is {age}")`
      },
      {
        title: "Break vs Continue",
        content: "- **Break**: Exits the loop entirely.\n- **Continue**: Skips the rest of the current iteration and goes to the next one.",
        code: `for i in range(5):
    if i == 2: continue # Skips 2
    if i == 4: break    # Stops before printing 4
    print(i)
# Output: 0, 1, 3`
      }
    ],
    quiz: [
      {
        question: "What does enumerate() yield?",
        options: ["Values only", "Indices only", "Index and Value", "Nothing"],
        correctAnswer: 2
      },
      {
        question: "What does zip() do?",
        options: ["Compresses files", "Combines lists element-wise", "Sorts lists", "Merges dictionaries"],
        correctAnswer: 1
      },
      {
        question: "Which keyword skips the current iteration?",
        options: ["skip", "break", "continue", "pass"],
        correctAnswer: 2
      },
      {
        question: "Which keyword exits the loop completely?",
        options: ["exit", "break", "stop", "return"],
        correctAnswer: 1
      },
      {
        question: "Is 'else' allowed in for loops?",
        options: ["Yes", "No", "Only in while loops", "Syntax Error"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: "py-functions",
    category: "Python Syntax",
    title: "Functions & Scope",
    description: "Reusable blocks of code and variable visibility.",
    sections: [
      {
        title: "*Args and **Kwargs",
        content: "These allow functions to accept flexible arguments.\n- `*args`: Collects extra positional args into a Tuple.\n- `**kwargs`: Collects extra keyword args into a Dict.",
        code: `def log(message, *args, **kwargs):
    print(message)
    print(f"Extra Details: {args}")
    print(f"Config: {kwargs}")

log("Error", 1, 2, user="admin")
# Args: (1, 2)
# Kwargs: {'user': 'admin'}`
      },
      {
        title: "Scope (LEGB Rule)",
        content: "Python looks for variables in this order: **L**ocal, **E**nclosing, **G**lobal, **B**uilt-in. \n\n**Crucial**: You cannot modify a global variable inside a function unless you use the `global` keyword. However, you can *read* them fine.",
        code: `count = 0
def increment():
    global count # Required to modify
    count += 1`
      },
      {
        title: "Lambda Functions",
        content: "Anonymous one-liners. Useful for sorting keys or map/filter.",
        code: `data = [(1, 'b'), (2, 'a')]
# Sort by second element
data.sort(key=lambda x: x[1])`
      }
    ],
    quiz: [
      {
        question: "What datatype does *args become?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        correctAnswer: 1
      },
      {
        question: "What datatype does **kwargs become?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        correctAnswer: 2
      },
      {
        question: "To modify a global variable, you must use...",
        options: ["static", "extern", "global", "super"],
        correctAnswer: 2
      },
      {
        question: "What is a lambda?",
        options: ["A standard library", "A large function", "An anonymous single-expression function", "A class"],
        correctAnswer: 2
      },
      {
        question: "What follows the LEGB rule?",
        options: ["Variable Scope", "Class Inheritance", "Import order", "Loop execution"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: "py-classes",
    category: "Python Syntax",
    title: "Classes & OOP",
    description: "Blueprints for creating objects. Understanding `self` is key.",
    sections: [
      {
        title: "The `self` Parameter",
        content: "In Python, methods are just functions attached to a class. When you call `obj.method()`, Python automatically passes `obj` as the first argument. We conventionally name this `self`. It's how the instance accesses its own data.",
        code: `class Dog:
    def __init__(self, name):
        self.name = name # Stores 'name' in the instance
        
    def bark(self):
        # We need 'self' to find out OUR name
        print(self.name + " says Woof!")`
      },
      {
        title: "Constructor (__init__)",
        content: "This special method runs automatically when you create a new object. It's used to set up initial state.",
        code: `d = Dog("Buddy") # Calls __init__('Buddy')`
      },
      {
        title: "Inheritance & Super",
        content: "Child classes inherit methods from Parents. Use `super()` to call Parent methods (like the constructor) to ensure the parent is set up correctly before you add your own logic.",
        code: `class Poodle(Dog):
    def __init__(self, name, curliness):
        super().__init__(name) # Let Dog handle the name
        self.curls = curliness`
      }
    ],
    quiz: [
      {
        question: "Is 'self' a reserved keyword?",
        options: ["Yes", "No, just a convention", "Only in Python 3", "Only in init"],
        correctAnswer: 1
      },
      {
        question: "What method is the constructor?",
        options: ["__construct__", "__init__", "init", "create"],
        correctAnswer: 1
      },
      {
        question: "How do you access the parent class?",
        options: ["parent()", "base()", "super()", "top()"],
        correctAnswer: 2
      },
      {
        question: "Can a class inherit from multiple parents?",
        options: ["Yes (Multiple Inheritance)", "No", "Only interfaces", "Only in C++"],
        correctAnswer: 0
      },
      {
        question: "Attributes defined inside __init__ using self are...",
        options: ["Class variables", "Instance variables", "Global variables", "Temporary"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-tuples-sets",
    category: "Python Syntax",
    title: "Tuples & Sets",
    description: "Specialized collections for specific needs.",
    sections: [
      {
        title: "Tuples: The Immutable List",
        content: "Defined with `()`. Once created, cannot be changed. Use them for:\n1. **Return values**: Returning multiple items from a function.\n2. **Dict Keys**: Lists can't be keys, Tuples can.\n3. **Safety**: Data that shouldn't change (coordinates, config).",
        code: `point = (10, 20)
# point[0] = 5 # Error!

# Unpacking
x, y = point`
      },
      {
        title: "Sets: The Unique Container",
        content: "Defined with `{}`. Unordered, Unique elements. \nUse for:\n1. **Deduping**: `list(set(my_list))` removes duplicates.\n2. **Fast Lookups**: `x in my_set` is O(1).\n3. **Math**: Union, Intersection.",
        code: `seen = set()
seen.add("visited")
if "visited" in seen:
    print("Already here")`
      }
    ],
    quiz: [
      {
        question: "Can a tuple be modified?",
        options: ["Yes", "No", "Only append", "Only delete"],
        correctAnswer: 1
      },
      {
        question: "Can a list be a dictionary key?",
        options: ["Yes", "No", "If empty", "If sorted"],
        correctAnswer: 1
      },
      {
        question: "Can a tuple be a dictionary key?",
        options: ["Yes", "No", "If empty", "Never"],
        correctAnswer: 0
      },
      {
        question: "What is the complexity of 'x in set'?",
        options: ["O(N)", "O(log N)", "O(1)", "O(N^2)"],
        correctAnswer: 2
      },
      {
        question: "How do you remove duplicates from a list?",
        options: ["list.unique()", "set(list)", "unique(list)", "list.dedup()"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-file-handling",
    category: "Python Syntax",
    title: "File Handling",
    description: "Reading, writing, and deleting files.",
    sections: [
      {
        title: "Open & Read",
        content: "Use `open(filename, mode)`. Modes: 'r' (read), 'a' (append), 'w' (write), 'x' (create).",
        code: `f = open("demofile.txt", "r")
print(f.read())
f.close()`
      },
      {
        title: "With Statement (Context Manager)",
        content: "Best practice. It automatically closes the file even if errors occur. This prevents memory leaks and file locks.",
        code: `with open("demofile.txt", "r") as f:
    for line in f:
        print(line.strip())`
      },
      {
        title: "JSON Serialization",
        content: "Writing dicts to files is common. Use `json.dump` (write to file) and `json.load` (read from file).",
        code: `import json
data = {"name": "A"}
with open("data.json", "w") as f:
    json.dump(data, f)`
      }
    ],
    quiz: [
      {
        question: "Which function opens a file?",
        options: ["read()", "open()", "file()", "get()"],
        correctAnswer: 1
      },
      {
        question: "What does mode 'w' do?",
        options: ["Read", "Write (Overwrite)", "Append", "Create"],
        correctAnswer: 1
      },
      {
        question: "What does mode 'a' do?",
        options: ["Read", "Write", "Append", "Create"],
        correctAnswer: 2
      },
      {
        question: "Why use 'with open(...)'?",
        options: ["Faster", "Auto-closes file", "Less memory", "Required"],
        correctAnswer: 1
      },
      {
        question: "Which module reads JSON from a file?",
        options: ["json.parse", "json.read", "json.load", "json.get"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "py-modules-misc",
    category: "Python Syntax",
    title: "Modules, JSON, RegEx",
    description: "Essential built-in libraries.",
    sections: [
      {
        title: "Modules",
        content: "Import libraries.",
        code: `import mymodule
import mymodule as mx
from mymodule import person1`
      },
      {
        title: "JSON",
        content: "Parse and stringify JSON.",
        code: `import json

# JSON string to Dict
x =  '{ "name":"John", "age":30, "city":"New York"}'
y = json.loads(x)

# Dict to JSON string
z = json.dumps(y, indent=4)`
      },
      {
        title: "RegEx",
        content: "Search strings.",
        code: `import re
txt = "The rain in Spain"
x = re.search("^The.*Spain$", txt)
y = re.findall("ai", txt)`
      }
    ],
    quiz: [
      {
        question: "How do you import a module?",
        options: ["include", "import", "require", "using"],
        correctAnswer: 1
      },
      {
        question: "How do you give a module an alias?",
        options: ["alias", "as", "like", "name"],
        correctAnswer: 1
      },
      {
        question: "Which function converts JSON to Dict?",
        options: ["json.parse()", "json.loads()", "json.toDict()", "json.read()"],
        correctAnswer: 1
      },
      {
        question: "Which function converts Dict to JSON?",
        options: ["json.stringify()", "json.dumps()", "json.write()", "json.convert()"],
        correctAnswer: 1
      },
      {
        question: "Which module handles Regular Expressions?",
        options: ["regex", "reg", "re", "rx"],
        correctAnswer: 2
      }
    ]
  },
  
  // =========================================
  // PYTHON SYNTAX - ADVANCED
  // =========================================
  {
    id: "py-decorators",
    category: "Python Syntax",
    title: "Decorators (@)",
    description: "Functions that modify other functions. The '@' syntax is syntactic sugar for wrapping.",
    sections: [
      {
        title: "What is a Decorator?",
        content: "A decorator is a function that takes another function as input, adds some functionality, and returns a new function. The `@decorator` syntax is just shorthand for `func = decorator(func)`.",
        code: `def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before the function call")
        result = func(*args, **kwargs)
        print("After the function call")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}")

say_hello("Alice")
# Output:
# Before the function call
# Hello, Alice
# After the function call`
      },
      {
        title: "Common Use Cases",
        content: "- **@staticmethod**: Method that doesn't need `self`. Called on the class, not instance.\n- **@classmethod**: Method that gets the class (`cls`) instead of instance (`self`).\n- **@property**: Turn a method into a read-only attribute.\n- **Custom**: Logging, Timing, Authentication, Caching.",
        code: `class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def area(self):
        return 3.14 * self._radius ** 2

    @staticmethod
    def is_valid_radius(r):
        return r > 0

    @classmethod
    def from_diameter(cls, d):
        return cls(d / 2)

c = Circle(5)
print(c.area)  # 78.5 (No parentheses!)
print(Circle.is_valid_radius(10))  # True
c2 = Circle.from_diameter(10)  # Creates Circle with radius 5`
      },
      {
        title: "Decorator with Arguments",
        content: "To pass arguments to a decorator, you need an extra layer of nesting.",
        code: `def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def greet():
    print("Hello!")

greet()  # Prints "Hello!" 3 times`
      }
    ],
    quiz: [
      {
        question: "What does @staticmethod do?",
        options: ["Makes method faster", "Method doesn't need self", "Method is private", "Method is async"],
        correctAnswer: 1
      },
      {
        question: "What does @property do?",
        options: ["Makes attribute private", "Turns method into attribute", "Validates input", "Caches result"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-generators",
    category: "Python Syntax",
    title: "Generators & Iterators",
    description: "Memory-efficient way to work with large sequences. Uses 'yield' instead of 'return'.",
    sections: [
      {
        title: "The Problem with Lists",
        content: "If you have 1 billion numbers, creating a list `[0, 1, 2, ..., 999999999]` uses ~8GB of RAM. A Generator creates values *on-demand*, using almost no memory.",
        code: `# ❌ Uses 8GB of RAM
big_list = [x for x in range(1_000_000_000)]

# ✅ Uses almost no RAM
big_gen = (x for x in range(1_000_000_000))`
      },
      {
        title: "The 'yield' Keyword",
        content: "`yield` pauses the function and returns a value. When you call `next()`, it resumes from where it left off. The function's state (local variables) is preserved.",
        code: `def count_up_to(n):
    i = 1
    while i <= n:
        yield i  # Pause and return i
        i += 1

gen = count_up_to(3)
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
# next(gen) would raise StopIteration

# Or just use a for loop
for num in count_up_to(5):
    print(num)`
      },
      {
        title: "Generator Expressions",
        content: "Like list comprehensions, but with `()` instead of `[]`. They are lazy-evaluated.",
        code: `# List Comprehension (eager, creates list in memory)
squares_list = [x*x for x in range(10)]

# Generator Expression (lazy, creates values on demand)
squares_gen = (x*x for x in range(10))

# Common pattern: sum/max/min with generators
total = sum(x*x for x in range(1000000))  # Memory efficient!`
      }
    ],
    quiz: [
      {
        question: "What keyword creates a generator function?",
        options: ["return", "yield", "generate", "async"],
        correctAnswer: 1
      },
      {
        question: "Why use generators over lists?",
        options: ["Faster", "Memory efficient", "Thread safe", "Type safe"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-context-managers",
    category: "Python Syntax",
    title: "Context Managers (with)",
    description: "Automatic setup and teardown. Guarantees cleanup even if errors occur.",
    sections: [
      {
        title: "The 'with' Statement",
        content: "You've seen `with open('file.txt') as f:`. This guarantees the file is closed even if an exception is raised. It's implemented using `__enter__` and `__exit__` methods.",
        code: `# Without context manager (risky!)
f = open('file.txt')
try:
    data = f.read()
finally:
    f.close()  # Must remember this!

# With context manager (safe!)
with open('file.txt') as f:
    data = f.read()
# File is ALWAYS closed here, even if read() throws an error`
      },
      {
        title: "Creating Your Own",
        content: "Use the `contextlib` module for a simple approach, or implement `__enter__` and `__exit__` for a class-based approach.",
        code: `from contextlib import contextmanager
import time

@contextmanager
def timer():
    start = time.time()
    yield  # Code inside 'with' block runs here
    end = time.time()
    print(f"Elapsed: {end - start:.2f}s")

with timer():
    # Do some work
    sum(range(1000000))
# Output: "Elapsed: 0.03s"`
      },
      {
        title: "Common Use Cases",
        content: "- File handling (`open`)\n- Database connections\n- Locks (`threading.Lock`)\n- Temporary changes (e.g., change directory, then go back)\n- Timing code execution"
      }
    ],
    quiz: [
      {
        question: "What methods define a context manager class?",
        options: ["__start__ and __stop__", "__enter__ and __exit__", "__open__ and __close__", "__begin__ and __end__"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-exceptions",
    category: "Python Syntax",
    title: "Exception Handling",
    description: "Graceful error handling with try/except/finally/else.",
    sections: [
      {
        title: "The Full Syntax",
        content: "- `try`: Code that might fail.\n- `except`: Handle specific errors.\n- `else`: Runs ONLY if no exception occurred.\n- `finally`: ALWAYS runs (cleanup).",
        code: `try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Some other error: {e}")
else:
    print("Success!")  # Only runs if no exception
finally:
    print("Cleanup")  # ALWAYS runs`
      },
      {
        title: "Raising Exceptions",
        content: "Use `raise` to throw your own errors. You can create custom exception classes.",
        code: `def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return True

# Custom Exception
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.message = f"Cannot withdraw {amount}, balance is {balance}"
        super().__init__(self.message)

raise InsufficientFundsError(100, 200)`
      },
      {
        title: "Best Practices",
        content: "1. **Be Specific**: Catch `ValueError`, not `Exception`.\n2. **Don't Silence Errors**: Never use bare `except: pass`.\n3. **Use `else`**: Separates 'try' code from 'success' code.\n4. **Use `finally` for Cleanup**: Close files, release locks."
      }
    ],
    quiz: [
      {
        question: "When does the 'else' block run?",
        options: ["Always", "If exception occurs", "If NO exception occurs", "Never"],
        correctAnswer: 2
      },
      {
        question: "When does the 'finally' block run?",
        options: ["Only on success", "Only on error", "Always", "Never"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "py-type-hints",
    category: "Python Syntax",
    title: "Type Hints & Annotations",
    description: "Optional static typing for Python. Helps IDEs and linters catch bugs.",
    sections: [
      {
        title: "Basic Syntax",
        content: "Type hints are NOT enforced at runtime. They are documentation for developers and tools like `mypy`.",
        code: `def greet(name: str) -> str:
    return f"Hello, {name}"

age: int = 25
names: list[str] = ["Alice", "Bob"]
scores: dict[str, int] = {"Alice": 100, "Bob": 90}`
      },
      {
        title: "Optional & Union",
        content: "Use `Optional` for values that can be `None`. Use `Union` for multiple types.",
        code: `from typing import Optional, Union

def find_user(id: int) -> Optional[str]:
    # Returns str or None
    if id == 1:
        return "Alice"
    return None

def process(data: Union[str, int]) -> str:
    # Accepts str or int
    return str(data)

# Python 3.10+ shorthand
def process_new(data: str | int) -> str:
    return str(data)`
      },
      {
        title: "Common Types",
        content: "- `list[int]`: List of integers\n- `dict[str, int]`: Dict with string keys, int values\n- `tuple[int, str]`: Tuple with specific types\n- `Callable[[int, int], int]`: Function that takes 2 ints, returns int\n- `Any`: Anything (avoid if possible)",
        code: `from typing import Callable, Any

def apply_func(func: Callable[[int], int], value: int) -> int:
    return func(value)

result = apply_func(lambda x: x * 2, 5)  # 10`
      }
    ],
    quiz: [
      {
        question: "Are type hints enforced at runtime?",
        options: ["Yes", "No", "Only in Python 3.10+", "Only with mypy"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-comprehensions",
    category: "Python Syntax",
    title: "Comprehensions (List, Dict, Set)",
    description: "Concise syntax for creating collections. Faster and more readable than loops.",
    sections: [
      {
        title: "List Comprehension",
        content: "Syntax: `[expression for item in iterable if condition]`",
        code: `# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested loops (flattening)
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6]`
      },
      {
        title: "Dict Comprehension",
        content: "Syntax: `{key: value for item in iterable if condition}`",
        code: `# Basic
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Swap keys and values
original = {"a": 1, "b": 2}
swapped = {v: k for k, v in original.items()}
# {1: "a", 2: "b"}

# Filter a dict
scores = {"Alice": 85, "Bob": 60, "Charlie": 92}
passed = {k: v for k, v in scores.items() if v >= 70}`
      },
      {
        title: "Set Comprehension",
        content: "Syntax: `{expression for item in iterable if condition}`",
        code: `# Remove duplicates and transform
words = ["hello", "world", "hello", "python"]
unique_lengths = {len(w) for w in words}
# {5, 6}`
      }
    ],
    quiz: [
      {
        question: "What is the output of [x*2 for x in [1,2,3]]?",
        options: ["[1,2,3]", "[2,4,6]", "[1,4,9]", "Error"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "py-collections",
    category: "Python Syntax",
    title: "Collections Module",
    description: "Specialized container types beyond list, dict, set.",
    sections: [
      {
        title: "Counter",
        content: "Count occurrences of elements. Extremely useful for frequency problems.",
        code: `from collections import Counter

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = Counter(words)
# Counter({'apple': 3, 'banana': 2, 'cherry': 1})

print(count.most_common(2))  # [('apple', 3), ('banana', 2)]
print(count['apple'])  # 3
print(count['grape'])  # 0 (no KeyError!)`
      },
      {
        title: "defaultdict",
        content: "Dict that auto-initializes missing keys. Avoids KeyError.",
        code: `from collections import defaultdict

# Group items by first letter
words = ["apple", "banana", "apricot", "blueberry"]
groups = defaultdict(list)
for word in words:
    groups[word[0]].append(word)
# {'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry']}`
      },
      {
        title: "deque (Double-Ended Queue)",
        content: "O(1) append and pop from BOTH ends. Use for Queues and Sliding Windows.",
        code: `from collections import deque

q = deque([1, 2, 3])
q.append(4)      # [1, 2, 3, 4]
q.appendleft(0)  # [0, 1, 2, 3, 4]
q.pop()          # 4, q is [0, 1, 2, 3]
q.popleft()      # 0, q is [1, 2, 3]

# Fixed-size window
window = deque(maxlen=3)
for i in range(5):
    window.append(i)
    print(list(window))
# [0], [0, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4]`
      },
      {
        title: "namedtuple",
        content: "Tuple with named fields. Lightweight alternative to classes.",
        code: `from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4
print(p[0], p[1])  # 3 4 (still works like tuple)`
      }
    ],
    quiz: [
      {
        question: "What does Counter return for a missing key?",
        options: ["KeyError", "None", "0", "-1"],
        correctAnswer: 2
      },
      {
        question: "What is the time complexity of deque.popleft()?",
        options: ["O(N)", "O(log N)", "O(1)", "O(N^2)"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "py-itertools",
    category: "Python Syntax",
    title: "Itertools Module",
    description: "Powerful iteration tools. Combinations, permutations, grouping, and more.",
    sections: [
      {
        title: "Combinations & Permutations",
        content: "Generate all possible selections or arrangements.",
        code: `from itertools import combinations, permutations, product

# Combinations: Order doesn't matter, no repetition
list(combinations([1, 2, 3], 2))
# [(1, 2), (1, 3), (2, 3)]

# Permutations: Order matters
list(permutations([1, 2, 3], 2))
# [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]

# Cartesian Product (like nested loops)
list(product([1, 2], ['a', 'b']))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]`
      },
      {
        title: "groupby",
        content: "Group consecutive elements. Data MUST be sorted first!",
        code: `from itertools import groupby

data = [('A', 1), ('A', 2), ('B', 3), ('B', 4), ('A', 5)]
# Sort by first element first!
data.sort(key=lambda x: x[0])

for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))
# A [('A', 1), ('A', 2), ('A', 5)]
# B [('B', 3), ('B', 4)]`
      },
      {
        title: "chain & accumulate",
        content: "Combine iterables or compute running totals.",
        code: `from itertools import chain, accumulate

# Chain: Flatten iterables
list(chain([1, 2], [3, 4], [5]))
# [1, 2, 3, 4, 5]

# Accumulate: Running sum (or other operation)
list(accumulate([1, 2, 3, 4]))
# [1, 3, 6, 10]`
      }
    ],
    quiz: [
      {
        question: "What's the difference between combinations and permutations?",
        options: ["No difference", "Combinations care about order", "Permutations care about order", "Permutations allow repetition"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "py-functools",
    category: "Python Syntax",
    title: "Functools Module",
    description: "Higher-order functions and operations on callable objects.",
    sections: [
      {
        title: "lru_cache (Memoization)",
        content: "Cache function results. ESSENTIAL for Dynamic Programming.",
        code: `from functools import lru_cache

@lru_cache(maxsize=None)  # None = unlimited cache
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print(fib(100))  # Instant! Without cache, this would take forever.`
      },
      {
        title: "reduce",
        content: "Apply a function cumulatively to reduce a sequence to a single value.",
        code: `from functools import reduce

# Sum of list (same as sum())
total = reduce(lambda a, b: a + b, [1, 2, 3, 4])
# 10

# Product of list
product = reduce(lambda a, b: a * b, [1, 2, 3, 4])
# 24

# Find max (same as max())
maximum = reduce(lambda a, b: a if a > b else b, [3, 1, 4, 1, 5])
# 5`
      },
      {
        title: "partial",
        content: "Freeze some arguments of a function. Creates a new function with fewer parameters.",
        code: `from functools import partial

def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125`
      }
    ],
    quiz: [
      {
        question: "What does @lru_cache do?",
        options: ["Limits function calls", "Caches return values", "Makes function faster", "All of the above"],
        correctAnswer: 3
      }
    ]
  },

  // =========================================
  // PYTHON DSA (EXPANDED)
  {
    id: "py-dsa-linear",
    category: "Python DSA",
    title: "Linear Data Structures",
    description: "Fundamental structures for storing sequences of data. Understanding where they are efficient (and where they aren't) is step 1 of any algorithm problem.",
    sections: [
      {
        title: "Stacks (LIFO - Last In First Out)",
        content: "Think of a stack of plates. You can only take the top one off. \n- **Usage**: DFS, Backtracking, Undo functionality, Syntax parsing (valid parentheses).\n- **Implementation**: Python Lists are perfect stacks. `append()` adds to the 'top', `pop()` removes from the 'top'.",
        code: `stack = []
stack.append(1) # Push [1]
stack.append(2) # Push [1, 2]
top = stack.pop() # Pop -> 2 (O(1) time)
# stack is now [1]`,
        tip: "If a problem asks for 'Reverse', 'Undo', or 'Matching pairs', think STACK immediately."
      },
      {
        title: "Queues (FIFO - First In First Out)",
        content: "Think of a line at a coffee shop. The first person in line gets served first.\n- **Usage**: BFS (Breadth-First Search), Task scheduling, Print jobs.\n- **Implementation**: Do NOT use a List. Removing from the start `list.pop(0)` is O(N) (slow). Use `collections.deque`. It is a Double-Ended Queue optimized for O(1) appends/pops at both ends.",
        code: `from collections import deque
queue = deque(["a", "b"])
queue.append("c")    # Enqueue: ["a", "b", "c"]
first = queue.popleft() # Dequeue: "a" (O(1) time)
# queue is now ["b", "c"]`,
        tip: "Never write `queue = []` and `queue.pop(0)` in an interview. It shows you don't know how Python arrays work in memory. Always import `deque`."
      },
      {
        title: "Linked Lists",
        content: "A sequence of nodes where each node points to the next. Python doesn't have a built-in Linked List type, so you build it with a Class. \n- **Pros**: Insertion/Deletion is O(1) if you have the pointer. \n- **Cons**: Access is O(N) (must traverse).",
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Usage
head = ListNode(1)
head.next = ListNode(2)`
      }
    ]
  },
  {
    id: "py-dsa-trees",
    category: "Python DSA",
    title: "Trees & Graphs (Expanded)",
    description: "Hierarchical data structures. Most 'Hard' interview problems involve Graphs or Trees.",
    sections: [
      {
        title: "Tries (Prefix Trees)",
        content: "A Tree optimized for string searches. Each node is a character. Paths from root are words. \n- **Usage**: Autocomplete, Spell Check, URL Router.\n- **Complexity**: O(L) to search a word of length L (faster than Hash Map if many words share prefixes).",
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.is_end = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children: return False
            node = node.children[char]
        return node.is_end`
      },
      {
        title: "Binary Trees",
        content: "Each node has at most 2 children (Left, Right). \n- **Traversal**: visiting every node. \n  - **DFS (Depth First)**: Go deep. (Pre-order, In-order, Post-order).\n  - **BFS (Breadth First)**: Go level by level.",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if not root: return
    inorder(root.left)
    print(root.val) # Visit
    inorder(root.right)`
      },
      {
        title: "Graphs (Adjacency List)",
        content: "A set of nodes (vertices) connected by edges. The best way to represent a graph in Python is a **Dictionary of Lists**. \n- `key`: The node.\n- `value`: List of neighbors.",
        code: `graph = {
    'A': ['B', 'C'], # A connects to B and C
    'B': ['D'],      # B connects to D
    'C': [],         # C is a dead end
    'D': ['A']       # D goes back to A (Cycle!)
}`,
        tip: "When initializing a graph from a list of edges (like `[[0,1], [1,2]]`), use `defaultdict(list)` to avoid checking if keys exist."
      },
      {
        title: "BFS vs DFS (Deep Dive)",
        content: "Understanding when to use which is critical.\n\n**BFS (Breadth-First Search)**\n- **Data Structure**: Queue (FIFO).\n- **Use Case**: Finding the *shortest path* in unweighted graphs. Level-order traversal.\n- **Visual**: Ripples in a pond spreading out.\n\n**DFS (Depth-First Search)**\n- **Data Structure**: Stack (LIFO) or Recursion.\n- **Use Case**: Exhaustive search (mazes, puzzles), Topological Sort, Cycle Detection, Connectivity check.\n- **Visual**: Walking a maze, hitting a wall, backtracking.",
        code: `# BFS Skeleton
def bfs(start_node):
    queue = deque([start_node])
    visited = {start_node}
    
    while queue:
        curr = queue.popleft()
        print(curr)
        
        for neighbor in graph[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS Skeleton (Recursive)
def dfs(node, visited):
    if node in visited: return
    visited.add(node)
    print(node)
    
    for neighbor in graph[node]:
        dfs(neighbor, visited)`
      }
    ]
  },
  {
    id: "py-dsa-sorting",
    category: "Python DSA",
    title: "Sorting Algorithms",
    description: "Knowing how sorting works helps you understand complexity (O(N log N)).",
    sections: [
      {
        title: "Quick Sort (Partitioning)",
        content: "Picks a 'pivot' element and partitions the array so smaller elements are on left, larger on right. Then recurses.\n- **Avg Time**: O(N log N)\n- **Worst Case**: O(N^2) (if already sorted)\n- **Space**: O(log N) (stack)\n- **Usage**: Default in many languages (C++, V8 JS) because it's cache-friendly and in-place.",
        code: `def quick_sort(arr):
    if len(arr) <= 1: return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`
      },
      {
        title: "Merge Sort (Divide & Conquer)",
        content: "Recursively split the list in half until single items. Then merge sorted halves.\n- **Time**: O(N log N) always.\n- **Space**: O(N) (not in-place).\n- **Usage**: Stable sort (preserves order of duplicates). Good for Linked Lists.",
        code: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    
    # 1. Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # 2. Conquer (Merge)
    return merge(left, right)

def merge(left, right):
    sorted_arr = []
    i = j = 0
    # Compare and pick smaller
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            sorted_arr.append(left[i])
            i += 1
        else:
            sorted_arr.append(right[j])
            j += 1
    # Add leftovers
    sorted_arr.extend(left[i:])
    sorted_arr.extend(right[j:])
    return sorted_arr`
      }
    ]
  },

  {
    id: "py-dsa-two-pointers",
    category: "Python DSA",
    title: "Two Pointers Technique",
    description: "Use two indices to traverse data. Reduces O(N²) to O(N) for many problems.",
    sections: [
      {
        title: "When to Use",
        content: "- **Sorted Arrays**: Finding pairs that sum to a target.\n- **Linked Lists**: Finding middle, detecting cycles.\n- **Strings**: Palindrome checks, reversing.\n- **Removing Duplicates**: In-place array modification.",
        tip: "If the problem involves a sorted array and pairs/triplets, think Two Pointers."
      },
      {
        title: "Pattern 1: Opposite Ends",
        content: "Start one pointer at the beginning, one at the end. Move them towards each other.",
        code: `def two_sum_sorted(nums, target):
    """Find two numbers that sum to target in a SORTED array."""
    left, right = 0, len(nums) - 1
    
    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1   # Need bigger sum
        else:
            right -= 1  # Need smaller sum
    
    return []  # No solution

# Example: nums = [1, 2, 7, 11, 15], target = 9
# Returns [1, 2] (indices of 2 and 7)`
      },
      {
        title: "Pattern 2: Same Direction (Fast/Slow)",
        content: "Both pointers start at the beginning. One moves faster than the other.",
        code: `def remove_duplicates(nums):
    """Remove duplicates in-place from sorted array. Return new length."""
    if not nums:
        return 0
    
    slow = 0  # Points to last unique element
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1

# Example: nums = [1, 1, 2, 2, 3]
# After: nums = [1, 2, 3, ...], returns 3`
      },
      {
        title: "Pattern 3: Cycle Detection (Floyd's)",
        content: "Fast pointer moves 2 steps, slow moves 1. If there's a cycle, they will meet.",
        code: `def has_cycle(head):
    """Detect cycle in linked list."""
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False`
      }
    ]
  },
  {
    id: "py-dsa-sliding-window",
    category: "Python DSA",
    title: "Sliding Window Technique",
    description: "Maintain a 'window' of elements as you traverse. Essential for substring/subarray problems.",
    sections: [
      {
        title: "When to Use",
        content: "- Find longest/shortest substring with some property.\n- Find max/min sum of subarray of size K.\n- Anagram detection.\n- Keywords: 'contiguous', 'substring', 'subarray', 'window'.",
        tip: "If you see 'contiguous subarray' or 'substring', think Sliding Window."
      },
      {
        title: "Fixed-Size Window",
        content: "Window size is constant. Slide by adding one element and removing one.",
        code: `def max_sum_subarray(nums, k):
    """Find max sum of any subarray of size k."""
    if len(nums) < k:
        return 0
    
    # Calculate sum of first window
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # Add new, remove old
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example: nums = [1, 4, 2, 10, 2, 3, 1, 0, 20], k = 4
# Returns 24 (subarray [2, 10, 2, 10] wait no... [0, 20]? Let me recalc)
# Actually: [10, 2, 3, 1] = 16, [3, 1, 0, 20] = 24. Returns 24.`
      },
      {
        title: "Variable-Size Window",
        content: "Window size changes based on conditions. Use two pointers (left, right).",
        code: `def longest_substring_k_distinct(s, k):
    """Find longest substring with at most k distinct characters."""
    from collections import defaultdict
    
    char_count = defaultdict(int)
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        char_count[s[right]] += 1
        
        # Shrink window if too many distinct chars
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1
        
        max_len = max(max_len, right - left + 1)
    
    return max_len

# Example: s = "eceba", k = 2
# Returns 3 ("ece")`
      },
      {
        title: "Classic Problem: Longest Substring Without Repeating",
        content: "This is a LeetCode classic. Use a Set to track characters in the window.",
        code: `def length_of_longest_substring(s):
    """Find length of longest substring without repeating characters."""
    seen = set()
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        
        seen.add(s[right])
        max_len = max(max_len, right - left + 1)
    
    return max_len

# Example: s = "abcabcbb"
# Returns 3 ("abc")`
      }
    ]
  },
  {
    id: "py-dsa-heap",
    category: "Python DSA",
    title: "Heaps & Priority Queues",
    description: "Efficiently get min/max element. O(log N) insert, O(1) peek, O(log N) pop.",
    sections: [
      {
        title: "What is a Heap?",
        content: "A binary tree where parent is always smaller (min-heap) or larger (max-heap) than children. Python's `heapq` is a MIN-heap by default.",
        code: `import heapq

# Create a heap from a list
nums = [5, 3, 8, 1, 2]
heapq.heapify(nums)  # In-place, O(N)
# nums is now a valid heap

# Push
heapq.heappush(nums, 0)

# Pop (removes and returns smallest)
smallest = heapq.heappop(nums)  # 0

# Peek (get smallest without removing)
smallest = nums[0]`
      },
      {
        title: "Max-Heap Trick",
        content: "Python only has min-heap. To simulate max-heap, negate the values.",
        code: `import heapq

nums = [1, 3, 5, 7, 9]

# Max-heap: negate values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)

# Get max
largest = -heapq.heappop(max_heap)  # 9`
      },
      {
        title: "Top K Elements Pattern",
        content: "Find the K largest/smallest elements. Use a heap of size K.",
        code: `import heapq

def find_k_largest(nums, k):
    """Find k largest elements."""
    # Use min-heap of size k
    # The smallest element in the heap is the kth largest overall
    heap = nums[:k]
    heapq.heapify(heap)
    
    for num in nums[k:]:
        if num > heap[0]:  # Bigger than smallest in heap
            heapq.heapreplace(heap, num)  # Pop and push in one operation
    
    return heap

# Or use the built-in:
largest = heapq.nlargest(3, [1, 5, 2, 8, 3])  # [8, 5, 3]
smallest = heapq.nsmallest(3, [1, 5, 2, 8, 3])  # [1, 2, 3]`
      },
      {
        title: "Heap with Custom Objects",
        content: "Use tuples where the first element is the priority.",
        code: `import heapq

# Priority Queue with (priority, data)
tasks = []
heapq.heappush(tasks, (2, "Low priority"))
heapq.heappush(tasks, (1, "High priority"))
heapq.heappush(tasks, (3, "Lowest priority"))

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"{priority}: {task}")
# 1: High priority
# 2: Low priority
# 3: Lowest priority`
      }
    ]
  },
  {
    id: "py-dsa-union-find",
    category: "Python DSA",
    title: "Union-Find (Disjoint Set)",
    description: "Track connected components. Near O(1) for union and find operations.",
    sections: [
      {
        title: "When to Use",
        content: "- Finding connected components in a graph.\n- Detecting cycles in an undirected graph.\n- Kruskal's Minimum Spanning Tree.\n- Keywords: 'connected', 'groups', 'merge', 'same component'.",
        tip: "If you need to repeatedly check if two nodes are connected, use Union-Find."
      },
      {
        title: "The Data Structure",
        content: "Each element has a 'parent'. Initially, each element is its own parent. When we union two sets, we make one the parent of the other.",
        code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Each node is its own parent
        self.rank = [0] * n  # For optimization
    
    def find(self, x):
        """Find the root of x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        """Merge the sets containing x and y."""
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False  # Already in same set
        
        # Union by rank (attach smaller tree under larger)
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True
    
    def connected(self, x, y):
        """Check if x and y are in the same set."""
        return self.find(x) == self.find(y)`
      },
      {
        title: "Example: Number of Connected Components",
        content: "Given n nodes and a list of edges, count connected components.",
        code: `def count_components(n, edges):
    uf = UnionFind(n)
    components = n
    
    for a, b in edges:
        if uf.union(a, b):
            components -= 1  # Merged two components
    
    return components

# Example: n=5, edges=[[0,1], [1,2], [3,4]]
# Returns 2 (components: {0,1,2} and {3,4})`
      }
    ]
  },
  {
    id: "py-dsa-dp",
    category: "Python DSA",
    title: "Dynamic Programming (DP)",
    description: "Break problems into overlapping subproblems. The most feared interview topic.",
    sections: [
      {
        title: "When to Use DP",
        content: "1. **Optimal Substructure**: Optimal solution uses optimal solutions to subproblems.\n2. **Overlapping Subproblems**: Same subproblems are solved multiple times.\n\nKeywords: 'minimum', 'maximum', 'count ways', 'can you reach', 'longest', 'shortest'.",
        tip: "If you can solve it with recursion but it's slow, it might be DP."
      },
      {
        title: "Top-Down (Memoization)",
        content: "Write recursive solution, then cache results. Easier to write.",
        code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

# Without cache: O(2^N)
# With cache: O(N)`
      },
      {
        title: "Bottom-Up (Tabulation)",
        content: "Build solution from smallest subproblems up. Often more efficient.",
        code: `def fib(n):
    if n < 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Space-optimized (only need last 2 values)
def fib_optimized(n):
    if n < 2:
        return n
    
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    
    return curr`
      },
      {
        title: "Classic Problem: Climbing Stairs",
        content: "You can climb 1 or 2 steps. How many ways to reach step N?",
        code: `def climb_stairs(n):
    """This is literally Fibonacci!"""
    if n <= 2:
        return n
    
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    
    return curr

# climb_stairs(5) = 8 ways`
      },
      {
        title: "Classic Problem: Coin Change",
        content: "Minimum coins to make amount. Classic unbounded knapsack.",
        code: `def coin_change(coins, amount):
    """Find minimum coins to make amount."""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 0 coins to make amount 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# coins = [1, 2, 5], amount = 11
# Returns 3 (5 + 5 + 1)`
      },
      {
        title: "Classic Problem: Longest Common Subsequence",
        content: "Find longest subsequence common to two strings.",
        code: `def lcs(text1, text2):
    """Find length of longest common subsequence."""
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# lcs("abcde", "ace") = 3 ("ace")`
      }
    ]
  },
  {
    id: "py-dsa-binary-search",
    category: "Python DSA",
    title: "Binary Search Patterns",
    description: "O(log N) search in sorted data. Many variations beyond basic search.",
    sections: [
      {
        title: "Basic Binary Search",
        content: "Find exact element in sorted array.",
        code: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found`
      },
      {
        title: "Find First/Last Occurrence",
        content: "When there are duplicates, find the leftmost or rightmost occurrence.",
        code: `def find_first(nums, target):
    """Find first occurrence of target."""
    left, right = 0, len(nums) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            result = mid
            right = mid - 1  # Keep searching left
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

def find_last(nums, target):
    """Find last occurrence of target."""
    left, right = 0, len(nums) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            result = mid
            left = mid + 1  # Keep searching right
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result`
      },
      {
        title: "Python's bisect Module",
        content: "Built-in binary search. Use it!",
        code: `import bisect

nums = [1, 2, 4, 4, 4, 6, 7]

# bisect_left: First position where element could be inserted
bisect.bisect_left(nums, 4)   # 2 (first 4)
bisect.bisect_left(nums, 5)   # 5 (between 4 and 6)

# bisect_right: Last position where element could be inserted
bisect.bisect_right(nums, 4)  # 5 (after last 4)

# insort: Insert while maintaining sorted order
bisect.insort(nums, 5)  # nums is now [1, 2, 4, 4, 4, 5, 6, 7]`
      },
      {
        title: "Binary Search on Answer",
        content: "When the answer itself is in a range, binary search for it.",
        code: `def min_eating_speed(piles, h):
    """Koko eating bananas. Find minimum speed to eat all in h hours."""
    def can_finish(speed):
        hours = sum((pile + speed - 1) // speed for pile in piles)
        return hours <= h
    
    left, right = 1, max(piles)
    
    while left < right:
        mid = (left + right) // 2
        if can_finish(mid):
            right = mid  # Try slower
        else:
            left = mid + 1  # Need faster
    
    return left

# piles = [3, 6, 7, 11], h = 8
# Returns 4`
      }
    ]
  },
  {
    id: "py-dsa-backtracking",
    category: "Python DSA",
    title: "Backtracking",
    description: "Explore all possibilities by building candidates incrementally and abandoning bad paths.",
    sections: [
      {
        title: "When to Use",
        content: "- Generate all permutations/combinations.\n- Solve puzzles (Sudoku, N-Queens).\n- Find all paths in a graph.\n- Keywords: 'all possible', 'generate all', 'find all'.",
        tip: "Backtracking = DFS + Pruning. If current path can't lead to solution, abandon it early."
      },
      {
        title: "Template",
        content: "The general pattern for backtracking problems.",
        code: `def backtrack(candidate, state, result):
    if is_solution(candidate):
        result.append(candidate.copy())
        return
    
    for choice in get_choices(state):
        if is_valid(choice):
            make_choice(candidate, choice)
            backtrack(candidate, state, result)
            undo_choice(candidate, choice)  # Backtrack!`
      },
      {
        title: "Example: Generate All Subsets",
        content: "Given [1, 2, 3], generate all subsets (power set).",
        code: `def subsets(nums):
    result = []
    
    def backtrack(start, path):
        result.append(path[:])  # Add current subset
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()  # Backtrack
    
    backtrack(0, [])
    return result

# subsets([1, 2, 3])
# [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`
      },
      {
        title: "Example: Generate All Permutations",
        content: "Given [1, 2, 3], generate all orderings.",
        code: `def permutations(nums):
    result = []
    
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        
        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(path, remaining[:i] + remaining[i+1:])
            path.pop()  # Backtrack
    
    backtrack([], nums)
    return result

# permutations([1, 2, 3])
# [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`
      }
    ]
  },

  // =========================================
  // PYTHON MYSQL (EXPANDED)
  // =========================================
  {
    id: "py-mysql",
    category: "Python MySQL",
    title: "MySQL Connector",
    description: "Interacting with relational databases. In interviews, you need to know how to write SAFE queries (anti-SQL injection).",
    sections: [
      {
        title: "The Cursor Object",
        content: "A 'Cursor' is a control structure that enables traversal over the records in a database. Think of it as your 'pointer' or 'handle' to the query results. You create a connection -> get a cursor -> execute query -> fetch results.",
        code: `import mysql.connector

# 1. Connect
db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="password",
  database="test_db"
)

# 2. Get Cursor
cursor = db.cursor(dictionary=True) # dictionary=True returns rows as dicts, not tuples!`
      },
      {
        title: "Selecting Data",
        content: "Use `.execute()` to run SQL. Use `.fetchall()` or `.fetchone()` to retrieve data.\n- `fetchall()`: Gets ALL rows (careful with memory!)\n- `fetchone()`: Gets next row only.",
        code: `cursor.execute("SELECT * FROM users WHERE age > 18")
users = cursor.fetchall()

for user in users:
    print(user['name']) # Easy access if dictionary=True`
      },
      {
        title: "Inserting & SQL Injection",
        content: "**NEVER** use f-strings or string concatenation to build SQL queries with user input. It enables SQL Injection attacks. Always use the placeholder syntax (`%s`). The library handles escaping for you.",
        code: `# ❌ DANGEROUS
name = "Robert'); DROP TABLE users; --"
query = f"INSERT INTO users (name) VALUES ('{name}')" 

# ✅ SAFE
sql = "INSERT INTO users (name, email) VALUES (%s, %s)"
val = ("Robert", "rob@test.com")
cursor.execute(sql, val)

# IMPORTANT: Commit changes!
db.commit() # Transactions are not saved otherwise`,
        tip: "If you forget `db.commit()` after an INSERT/UPDATE/DELETE, your changes will be lost when the script ends. This is a common beginner mistake."
      }
    ]
  },

  // =========================================
  // DESIGN PATTERNS (EXPANDED)
  // =========================================
  {
    id: "pattern-singleton",
    category: "Design Patterns",
    title: "Singleton Pattern",
    description: "Ensures a class has only one instance and provides a global point of access to it. Common for Database Connections or Configuration Managers.",
    sections: [
      {
        title: "The Concept",
        content: "Normal classes create a new object every time you call `MyClass()`. A Singleton checks if an instance already exists. If yes, return it. If no, create it."
      },
      {
        title: "Pythonic Implementation (__new__)",
        content: "`__new__` is the actual allocator that runs *before* `__init__`. We hijack it to control instance creation.",
        code: `class DatabaseConnection:
    _instance = None # Class-level variable to hold the single instance

    def __new__(cls):
        if cls._instance is None:
            print("Creating new connection...")
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            # Initialize connection here
        return cls._instance

# Usage
db1 = DatabaseConnection() # Prints "Creating..."
db2 = DatabaseConnection() # Does NOT print
print(db1 is db2) # True (Same object)`
      }
    ]
  },
  {
    id: "pattern-factory",
    category: "Design Patterns",
    title: "Factory Pattern",
    description: "Creating objects without specifying the exact class of object that will be created. Decouples the usage logic from the creation logic.",
    sections: [
      {
        title: "The Problem",
        content: "Imagine code like `if type == 'pdf': return PDFParser() elif type == 'xml': return XMLParser()`. If you add 10 new formats, your main code gets messy. A Factory handles this logic centrally."
      },
      {
        title: "The Solution",
        content: "We create a separate `PetFactory` class with a static method. The client code just calls `PetFactory.get_pet('dog')` and gets a Dog object. It doesn't need to know *how* to create a Dog or even that the class is named `Dog`.",
        code: `class Dog:
    def speak(self): return "Woof"
class Cat:
    def speak(self): return "Meow"

class PetFactory:
    @staticmethod
    def get_pet(pet_type):
        if pet_type == "dog":
            return Dog()
        elif pet_type == "cat":
            return Cat()
        raise ValueError("Unknown pet")

# Usage - Main code doesn't know about Dog/Cat classes
pet = PetFactory.get_pet("dog")
print(pet.speak())`
      }
    ]
  },
  {
    id: "pattern-observer",
    category: "Design Patterns",
    title: "Observer Pattern",
    description: "Defines a subscription mechanism to notify multiple objects about any events that happen to the object they're observing. Used in Event Listeners, React State, Pub/Sub systems.",
    sections: [
      {
        title: "Key Components",
        content: "1. **Subject (Publisher)**: Maintains list of observers. Has `notify()` method.\n2. **Observer (Subscriber)**: Has an `update()` method that gets called."
      },
      {
        title: "Implementation",
        content: "The Subject manages a list of subscribers and notifies them in a loop.",
        code: `class YouTubeChannel:
    def __init__(self):
        self.subscribers = [] # List of functions/objects

    def subscribe(self, user):
        self.subscribers.append(user)

    def upload_video(self, title):
        print(f"Uploading {title}...")
        for sub in self.subscribers:
            sub.notify(title)

class User:
    def __init__(self, name):
        self.name = name
    
    def notify(self, video):
        print(f"{self.name}: New video '{video}' is out!")

# Usage
channel = YouTubeChannel()
bob = User("Bob")
channel.subscribe(bob)

channel.upload_video("Python Tutorial") 
# Output: "Bob: New video 'Python Tutorial' is out!"`
      }
    ]
  },
  {
    id: "pattern-strategy",
    category: "Design Patterns",
    title: "Strategy Pattern",
    description: "Enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.",
    sections: [
      {
        title: "The Problem",
        content: "You have a `Navigator` class. It needs to calculate routes. You have `Walking`, `Driving`, `PublicTransport` algorithms. Instead of massive `if/else` blocks inside Navigator, you pass the Algorithm *into* the Navigator."
      },
      {
        title: "Implementation",
        content: "We define an abstract base class for the strategy, concrete implementations, and a context class that uses them.",
        code: `from abc import ABC, abstractmethod

# 1. The Interface
class RouteStrategy(ABC):
    @abstractmethod
    def build_route(self, a, b): pass

# 2. Concrete Strategies
class RoadStrategy(RouteStrategy):
    def build_route(self, a, b): return "Road Route Calculated"

class WalkingStrategy(RouteStrategy):
    def build_route(self, a, b): return "Walking Path Calculated"

# 3. Context (The Navigator)
class Navigator:
    def __init__(self, strategy):
        self.strategy = strategy # Store the strategy

    def set_strategy(self, strategy):
        self.strategy = strategy

    def get_directions(self, a, b):
        return self.strategy.build_route(a, b)

# Usage
nav = Navigator(RoadStrategy())
print(nav.get_directions("Home", "Work")) # "Road Route..."

nav.set_strategy(WalkingStrategy()) # Switch at runtime!
print(nav.get_directions("Home", "Work")) # "Walking Path..."`
      }
    ]
  },
  {
    id: "pattern-builder",
    category: "Design Patterns",
    title: "Builder Pattern",
    description: "Separates the construction of a complex object from its representation. Allows you to construct complex objects step-by-step.",
    sections: [
      {
        title: "Why?",
        content: "If a class has a constructor with 10 arguments (`Car(4, 'red', True, False, 'leather', ...)`) it's hard to read and use. A Builder lets you write readable code like `CarBuilder().wheels(4).color('red').build()`."
      },
      {
        title: "Implementation (Method Chaining)",
        content: "Each method returns `self`, allowing you to chain calls.",
        code: `class PizzaBuilder:
    def __init__(self):
        self.pizza = {"toppings": [], "size": "medium"}

    def set_size(self, size):
        self.pizza["size"] = size
        return self # Return self for chaining

    def add_cheese(self):
        self.pizza["toppings"].append("cheese")
        return self

    def add_pepperoni(self):
        self.pizza["toppings"].append("pepperoni")
        return self

    def build(self):
        return self.pizza

# Usage - Clean and Readable!
my_lunch = (PizzaBuilder()
            .set_size("large")
            .add_cheese()
            .add_pepperoni()
            .build())`
      }
    ]
  },

  {
    id: "pattern-decorator",
    category: "Design Patterns",
    title: "Decorator Pattern",
    description: "Add behavior to objects dynamically without modifying their class. Like wrapping a gift.",
    sections: [
      {
        title: "The Problem",
        content: "You have a `Coffee` class. You want to add milk, sugar, whipped cream. Creating `CoffeeWithMilk`, `CoffeeWithMilkAndSugar`, etc. leads to class explosion."
      },
      {
        title: "The Solution",
        content: "Wrap the object with 'decorator' objects that add behavior. Each decorator has the same interface as the original.",
        code: `from abc import ABC, abstractmethod

# 1. Component Interface
class Coffee(ABC):
    @abstractmethod
    def cost(self): pass
    @abstractmethod
    def description(self): pass

# 2. Concrete Component
class SimpleCoffee(Coffee):
    def cost(self): return 2.0
    def description(self): return "Coffee"

# 3. Decorator Base
class CoffeeDecorator(Coffee):
    def __init__(self, coffee):
        self._coffee = coffee
    def cost(self): return self._coffee.cost()
    def description(self): return self._coffee.description()

# 4. Concrete Decorators
class Milk(CoffeeDecorator):
    def cost(self): return self._coffee.cost() + 0.5
    def description(self): return self._coffee.description() + ", Milk"

class Sugar(CoffeeDecorator):
    def cost(self): return self._coffee.cost() + 0.2
    def description(self): return self._coffee.description() + ", Sugar"

# Usage: Stack decorators!
coffee = SimpleCoffee()
coffee = Milk(coffee)
coffee = Sugar(coffee)
print(coffee.description())  # "Coffee, Milk, Sugar"
print(coffee.cost())         # 2.7`
      }
    ]
  },
  {
    id: "pattern-adapter",
    category: "Design Patterns",
    title: "Adapter Pattern",
    description: "Make incompatible interfaces work together. Like a power adapter for travel.",
    sections: [
      {
        title: "The Problem",
        content: "You have a `JSONParser` that your code uses. But you get a new `XMLParser` library with a different interface. You don't want to change all your code."
      },
      {
        title: "The Solution",
        content: "Create an Adapter class that wraps the new interface and exposes the old one.",
        code: `# Old interface your code expects
class JSONParser:
    def parse_json(self, data):
        return {"parsed": data}

# New library with different interface
class XMLParser:
    def parse_xml(self, xml_string):
        return {"xml_parsed": xml_string}

# Adapter: Makes XMLParser look like JSONParser
class XMLToJSONAdapter:
    def __init__(self, xml_parser):
        self.xml_parser = xml_parser
    
    def parse_json(self, data):
        # Convert the call to the new interface
        return self.xml_parser.parse_xml(data)

# Usage: Your code doesn't change!
def process_data(parser, data):
    return parser.parse_json(data)

json_parser = JSONParser()
xml_parser = XMLToJSONAdapter(XMLParser())

process_data(json_parser, "some data")  # Works
process_data(xml_parser, "some data")   # Also works!`
      }
    ]
  },
  {
    id: "pattern-command",
    category: "Design Patterns",
    title: "Command Pattern",
    description: "Encapsulate a request as an object. Enables undo/redo, queuing, and logging.",
    sections: [
      {
        title: "The Problem",
        content: "You're building a text editor. You need Undo/Redo. How do you track what operations were performed?"
      },
      {
        title: "The Solution",
        content: "Each action becomes a Command object with `execute()` and `undo()` methods. Store commands in a history stack.",
        code: `from abc import ABC, abstractmethod

# 1. Command Interface
class Command(ABC):
    @abstractmethod
    def execute(self): pass
    @abstractmethod
    def undo(self): pass

# 2. Receiver (the thing being acted upon)
class TextEditor:
    def __init__(self):
        self.text = ""
    
    def insert(self, text):
        self.text += text
    
    def delete(self, length):
        deleted = self.text[-length:]
        self.text = self.text[:-length]
        return deleted

# 3. Concrete Commands
class InsertCommand(Command):
    def __init__(self, editor, text):
        self.editor = editor
        self.text = text
    
    def execute(self):
        self.editor.insert(self.text)
    
    def undo(self):
        self.editor.delete(len(self.text))

# 4. Invoker (manages command history)
class CommandManager:
    def __init__(self):
        self.history = []
    
    def execute(self, command):
        command.execute()
        self.history.append(command)
    
    def undo(self):
        if self.history:
            command = self.history.pop()
            command.undo()

# Usage
editor = TextEditor()
manager = CommandManager()

manager.execute(InsertCommand(editor, "Hello"))
manager.execute(InsertCommand(editor, " World"))
print(editor.text)  # "Hello World"

manager.undo()
print(editor.text)  # "Hello"`
      }
    ]
  },
  {
    id: "pattern-state",
    category: "Design Patterns",
    title: "State Machine Pattern",
    description: "Object behavior changes based on its internal state. Like a traffic light.",
    sections: [
      {
        title: "The Problem",
        content: "You have an object (like an Order) that behaves differently in different states (Pending, Shipped, Delivered). Using `if/else` everywhere is messy."
      },
      {
        title: "The Solution",
        content: "Create a State class for each state. The object delegates behavior to its current state object.",
        code: `from abc import ABC, abstractmethod

# 1. State Interface
class OrderState(ABC):
    @abstractmethod
    def next(self, order): pass
    @abstractmethod
    def status(self): pass

# 2. Concrete States
class PendingState(OrderState):
    def next(self, order):
        order.state = ShippedState()
    def status(self):
        return "Order is pending"

class ShippedState(OrderState):
    def next(self, order):
        order.state = DeliveredState()
    def status(self):
        return "Order has been shipped"

class DeliveredState(OrderState):
    def next(self, order):
        print("Order already delivered!")
    def status(self):
        return "Order delivered"

# 3. Context (the object with state)
class Order:
    def __init__(self):
        self.state = PendingState()
    
    def next_state(self):
        self.state.next(self)
    
    def get_status(self):
        return self.state.status()

# Usage
order = Order()
print(order.get_status())  # "Order is pending"
order.next_state()
print(order.get_status())  # "Order has been shipped"
order.next_state()
print(order.get_status())  # "Order delivered"`
      }
    ]
  },
  {
    id: "pattern-iterator",
    category: "Design Patterns",
    title: "Iterator Pattern",
    description: "Traverse a collection without exposing its internal structure. Python's for-loop is built on this.",
    sections: [
      {
        title: "Python's Iterator Protocol",
        content: "Any object with `__iter__()` and `__next__()` methods is an iterator. `for` loops use this automatically.",
        code: `class Countdown:
    def __init__(self, start):
        self.current = start
    
    def __iter__(self):
        return self  # Returns the iterator object
    
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# Usage
for num in Countdown(5):
    print(num)  # 5, 4, 3, 2, 1`
      },
      {
        title: "Custom Collection Iterator",
        content: "Iterate over a custom data structure.",
        code: `class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right
    
    def __iter__(self):
        # In-order traversal
        if self.left:
            yield from self.left
        yield self.value
        if self.right:
            yield from self.right

# Usage
tree = BinaryTree(2, BinaryTree(1), BinaryTree(3))
for val in tree:
    print(val)  # 1, 2, 3`
      }
    ]
  },

  // =========================================
  // SOLVED PROBLEMS - STORY MODE
  // =========================================
  {
    id: "prob-json-schema",
    category: "Solved Problems",
    title: "JSON Schema Validator (Story Mode)",
    description: "A complete breakdown of the Slash Coding Challenge. From reading the prompt to handling edge cases.",
    sections: [
      {
        title: "Chapter 1: The Prompt & Initial Panic",
        content: "You are given a JSON Schema (rules) and a JSON Data object. You need to return True/False + Errors. \n\nThe Prompt asks for: \n1. Basic types (String, Number, Boolean)\n2. Complex types (Objects, Arrays)\n3. **OneOf** (Match exactly one)\n4. **Merge** (Combine schemas)\n\n*Deep Breath*. This is a **Tree Traversal** problem. The Schema is a tree. The Data is a tree. We need to walk them together.",
        code: `def validate(schema, data, path="root"):
    # Returns {"valid": Bool, "error": String}
    pass`
      },
      {
        title: "Chapter 2: The Base Cases (Primitives)",
        content: "Start simple. If the schema says 'string', is the data a string? If not, fail immediately. We pass a `path` argument (e.g., `root.users[0].name`) so error messages are helpful.",
        code: `    # Inside validate()...
    stype = schema.get('type')

    if stype == 'string':
        if not isinstance(data, str):
            return {"valid": False, "error": f"Expected string at {path}"}
        # Check Enums (Optional list of allowed values)
        if 'enum' in schema and data not in schema['enum']:
            return {"valid": False, "error": f"Value not in enum at {path}"}
        return {"valid": True}`
      },
      {
        title: "Chapter 3: Objects (The Recursive Leap)",
        content: "This is where it gets tricky. \n\n**Rule 1 (Required Fields)**: We must iterate through the *schema's* properties to check if required fields are missing in data.\n**Rule 2 (Recursion)**: If a field exists, we call `validate()` on it recursively.\n**Rule 3 (Strictness)**: The prompt says 'If an object contains additional properties... fail'. We use Set subtraction for this.",
        code: `    if stype == 'object':
        if not isinstance(data, dict): return fail("Expected object")

        # 1. Check Defined Properties & Required
        for prop_name, prop_schema in schema.get('properties', {}).items():
            if prop_name not in data:
                if prop_name in schema.get('required', []):
                    return fail(f"Missing required field {prop_name}")
                continue # Optional field missing? OK.
            
            # RECURSE!
            res = validate(prop_schema, data[prop_name], f"{path}.{prop_name}")
            if not res['valid']: return res # Bubble up error

        # 2. Strictness Check
        allowed_keys = set(schema.get('properties', {}).keys())
        actual_keys = set(data.keys())
        if not actual_keys.issubset(allowed_keys):
            return fail(f"Unknown keys: {actual_keys - allowed_keys}")
            
        return {"valid": True}`
      },
      {
        title: "Chapter 4: The 'Merge' Twist",
        content: "Part 2 asks for a `merge` type. It lists multiple schemas. The data must be valid against ALL of them. \n\n*Key Insight*: We don't need to merge the schemas into one giant object. We just need to run the validator against Schema A, then Schema B, then Schema C. If ANY fail, the merge fails. It's an **AND** operation.",
        code: `    if stype == 'merge':
        for sub_schema in schema['schemas']:
            res = validate(sub_schema, data, path)
            if not res['valid']:
                return res # Failed one of the merge requirements
        return {"valid": True}`
      },
      {
        title: "Chapter 5: OneOf & Ambiguity",
        content: "OneOf requires the data to match **exactly one** option. If it matches zero, fail. If it matches two, fail (ambiguous). \n\nWe loop through options, count successes, and return result.",
        code: `    if stype == 'oneOf':
        matches = 0
        for sub_schema in schema['oneOf']:
            # We ignore errors here, just counting successes
            if validate(sub_schema, data, path)['valid']:
                matches += 1
        
        if matches == 1: return {"valid": True}
        return fail(f"OneOf matched {matches} times (expected 1)")`
      },
      {
        title: "Final Code Assembly",
        content: "Combining all pieces into a robust solution.",
        codeNote: "Review Recursion: We pass 'path' down every call to build the error trace. Time Complexity: O(N) where N is total nodes in data/schema.",
        relatedTopicLink: "pattern-validator",
        code: `def validate(schema, data, path="root"):
    def fail(msg): return {"valid": False, "error": msg, "path": path}
    
    stype = schema.get('type')

    # Primitives
    if stype == 'string':
        if not isinstance(data, str): return fail("Not a string")
        if 'enum' in schema and data not in schema['enum']: return fail("Invalid enum")
        return {"valid": True}
    
    if stype == 'number':
        if not isinstance(data, (int, float)): return fail("Not a number")
        return {"valid": True}

    # Complex
    if stype == 'object':
        if not isinstance(data, dict): return fail("Not an object")
        
        for k, sub in schema.get('properties', {}).items():
            if k not in data:
                if k in schema.get('required', []): return fail(f"Missing {k}")
                continue
            res = validate(sub, data[k], f"{path}.{k}")
            if not res['valid']: return res
            
        if not set(data.keys()).issubset(schema.get('properties', {}).keys()):
            return fail("Extra keys")
        return {"valid": True}

    if stype == 'merge':
        for sub in schema['schemas']:
            res = validate(sub, data, path)
            if not res['valid']: return res
        return {"valid": True}

    if stype == 'oneOf':
        matches = 0
        for sub in schema['oneOf']:
            if validate(sub, data, path)['valid']: matches += 1
        if matches == 1: return {"valid": True}
        return fail(f"OneOf matched {matches}")

    return {"valid": True}`
      }
    ]
  },
  {
    id: "prob-kv-store",
    category: "Solved Problems",
    title: "Transactional KV Store (Story Mode)",
    description: "Building a database that supports `begin`, `commit`, and `rollback`. A classic test of state management.",
    sections: [
      {
        title: "The Challenge",
        content: "You need a Key-Value store (like a dict). But, you need Transactions.\n- `begin()`: Starts a new transaction.\n- `set(k, v)`: Changes apply to current transaction.\n- `get(k)`: Returns latest value (from current tx or committed).\n- `rollback()`: Reverts the current transaction.\n- `commit()`: Saves everything permanently."
      },
      {
        title: "The Wrong Approach",
        content: "Many people try to keep one main dictionary and a 'rollback log' of what changed. This gets really hard with nested transactions (Tx 1 starts, Tx 2 starts, Tx 2 rolls back...). \n\n**The Better Approach**: A Stack of Dictionaries."
      },
      {
        title: "The Stack Solution",
        content: "- Global `store` dictionary for committed data.\n- `stack` list for temporary transactions.\n\nWhen `begin()` is called, we push a new empty `{}` to the stack. \nWhen `set(k,v)` is called, we write to the TOP of the stack (`stack[-1]`).",
        code: `class KVStore:
    def __init__(self):
        self.store = {} # Permanent
        self.stack = [] # Temp transactions`
      },
      {
        title: "Reading Data (The Stack Walk)",
        content: "When `get(k)` is called, where is the data? It might be in the latest transaction. If not, maybe the one before that. If not, the global store.\n\nWe look from Top -> Bottom.",
        code: `    def get(self, key):
        # 1. Check active transactions (Newest first)
        for layer in reversed(self.stack):
            if key in layer:
                return layer[key]
        # 2. Check permanent store
        return self.store.get(key)`
      },
      {
        title: "Handling Deletes (The Tombstone)",
        content: "What if I delete a key in a transaction? `del stack[-1][key]` just removes it from the *current* layer, revealing the old value underneath! \n\nWe need to **mask** it. We set a special 'Tombstone' value.",
        code: `    def delete(self, key):
        if self.stack:
            self.stack[-1][key] = "__DELETED__" # Soft delete
        elif key in self.store:
            del self.store[key] # Hard delete if no tx`
      },
      {
        title: "Commit & Rollback",
        content: "Rollback is easy: Just pop the stack! \nCommit is harder: We must merge all stack layers into the permanent store.",
        codeNote: "Stack Operation: Pop is O(1). Merge is O(N*K) where N is stack depth. Get is O(N) where N is stack depth.",
        relatedTopicLink: "py-dsa-linear",
        code: `    def rollback(self):
        if self.stack:
            self.stack.pop() # Undo all changes in this layer
  
    def commit(self):
        # Merge everything down
        for layer in self.stack:
            for k, v in layer.items():
                if v == "__DELETED__":
                    if k in self.store: del self.store[k]
                else:
                    self.store[k] = v
        self.stack = [] # Clear stack`
      }
    ]
  },
  {
    id: "prob-log-query",
    category: "Solved Problems",
    title: "Log Query System (Story Mode)",
    description: "Ingesting and searching massive amounts of log data efficiently. A test of data structure choice.",
    sections: [
      {
        title: "The Challenge",
        content: "Design a system to:\n1. `ingest(log_string)`: Parse and store logs. Format: `[TIMESTAMP] [SEVERITY] Message`\n2. `search(severity, start_time, end_time)`: Return all logs matching the criteria."
      },
      {
        title: "Parsing Logic",
        content: "First, we need to extract data from the raw string. String manipulation is key here. We can use `split()` or Regex. `split` is faster and safer for interviews if format is fixed.",
        code: `def parse(log):
    # Log: "[2023-01-01 10:00:00] [ERROR] Database connection failed"
    parts = log.split("] [")
    timestamp = parts[0][1:] # Remove leading [
    severity = parts[1]
    message = parts[2]
    return timestamp, severity, message`
      },
      {
        title: "Data Storage Strategy",
        content: "We need to search by Severity AND Time. \n\n**Naive**: A list of objects. Search is O(N).\n**Better**: A Dictionary mapping `Severity -> List of Logs`. Search is O(M) where M is logs of that severity.\n**Best**: `Severity -> Sorted List of (Timestamp, Log)`. Why Sorted? So we can use Binary Search for the time range!"
      },
      {
        title: "Implementation",
        content: "We use `bisect` to find the start and end indices in O(log N).",
        codeNote: "Bisect is Python's Binary Search. bisect_left finds the first insertion point. Time: O(log N) search, O(1) append (amortized).",
        relatedTopicLink: "py-dsa-sorting",
        code: `from collections import defaultdict
import bisect

class LogSystem:
    def __init__(self):
        # { "ERROR": [ (time, log_obj), ... ] }
        self.store = defaultdict(list)

    def ingest(self, log_str):
        ts, sev, msg = self._parse(log_str)
        # Append tuple (timestamp, full_log)
        # Assuming logs come in chronological order. 
        # If not, we'd need to sort or use insort.
        self.store[sev].append((ts, log_str))

    def search(self, severity, start_ts, end_ts):
        logs = self.store[severity]
        if not logs: return []
        
        # Binary Search for indices
        # We only compare the first element of the tuple (timestamp)
        # "start_ts" acts as a comparable string
        start_idx = bisect.bisect_left(logs, (start_ts, ""))
        end_idx = bisect.bisect_right(logs, (end_ts, "~")) # ~ is ASCII high char
        
        return [x[1] for x in logs[start_idx:end_idx]]`
      }
    ]
  },
  {
    id: "prob-http-parser",
    category: "Solved Problems",
    title: "HTTP Request Parser",
    description: "Parse a raw HTTP request string into a structured object. Tests string manipulation and robustness.",
    sections: [
      {
        title: "The Challenge",
        content: "Raw Input:\n`POST /api/user HTTP/1.1\\r\\nHost: google.com\\r\\nContent-Type: json\\r\\n\\r\\n{\"id\":1}`\n\nOutput: Dictionary with method, url, headers, and body."
      },
      {
        title: "Strategy: The Double Newline",
        content: "HTTP splits Headers and Body with a double CRLF (`\\r\\n\\r\\n`). \n1. Split entire string by `\\r\\n\\r\\n` -> `[HeadersSection, Body]`.\n2. Split HeadersSection by `\\r\\n` lines.\n3. First line is Request Line (`METHOD URL PROTOCOL`).\n4. Rest are Headers (`Key: Value`)."
      },
      {
        title: "Implementation",
        content: "We use `split` with a limit to separate headers from body, then parse line by line.",
        codeNote: "String Splitting: Using maxsplit=1 is a pro move to avoid splitting the body if it contains the delimiter. Time: O(N) where N is string length.",
        relatedTopicLink: "py-strings",
        code: `def parse_http(raw_req):
    if not raw_req: return None
    
    # 1. Separate Header and Body
    parts = raw_req.split("\\r\\n\\r\\n", 1)
    header_part = parts[0]
    body = parts[1] if len(parts) > 1 else ""
    
    # 2. Parse Lines
    lines = header_part.split("\\r\\n")
    request_line = lines[0].split(" ")
    
    request = {
        "method": request_line[0],
        "url": request_line[1],
        "headers": {},
        "body": body
    }
    
    # 3. Parse Headers
    for line in lines[1:]:
        if ": " in line:
            key, val = line.split(": ", 1)
            request["headers"][key] = val
            
    return request`
      }
    ]
  },
  {
    id: "prob-spreadsheet",
    category: "Solved Problems",
    title: "Spreadsheet Engine (Dependency Graph)",
    description: "Building a system where cell A1 = B1 + C1. Updates must propagate.",
    sections: [
      {
        title: "The Challenge",
        content: "1. `set_cell(id, formula)`: e.g., `set('A1', 'B1+C1')`\n2. `get_cell(id)`: Returns evaluated value.\n3. If B1 changes, A1 must update automatically."
      },
      {
        title: "Data Structure: The Directed Graph",
        content: "This is a Graph problem. \n- Nodes are Cells.\n- Edges are Dependencies (`B1 -> A1` means B1 influences A1).\n- We need **Topological Sort** to determine update order."
      },
      {
        title: "Implementation Strategy",
        content: "We maintain two graphs:\n1. `upstream`: Who do I depend on? (For calculating my value)\n2. `downstream`: Who depends on me? (For triggering updates)\n\nWhen `set_cell(A, B+C)`:\n- Add edges `B->A` and `C->A` in `downstream`.\n- To evaluate, we recursively evaluate upstream, or use Memoization."
      },
      {
        title: "Simplified Implementation (Recursive Eval)",
        content: "For an interview, start with recursive evaluation with loop detection.",
        codeNote: "Recursion with Memoization: Avoids re-calculating the same cell. Time: O(V+E) where V is cells, E is dependencies.",
        relatedTopicLink: "py-dsa-trees",
        code: `class Spreadsheet:
    def __init__(self):
        self.cells = {} # { "A1": 10, "B1": "A1+5" }
        self.cache = {} # Memoization for this evaluate call

    def set_cell(self, cell_id, value):
        self.cells[cell_id] = value

    def get_cell(self, cell_id):
        self.cache = {} # Reset cache per call (or manage invalidation)
        return self._eval(cell_id, set())

    def _eval(self, cell_id, visiting):
        if cell_id in visiting:
            raise ValueError("Cycle Detected!")
        
        if cell_id not in self.cells:
            return 0
            
        val = self.cells[cell_id]
        if isinstance(val, int): return val
        
        # It's a formula string "A1+5"
        visiting.add(cell_id)
        
        # Naive parsing: assume "A1+B1" form
        parts = val.split("+")
        result = 0
        for p in parts:
            if p.isdigit(): result += int(p)
            else: result += self._eval(p, visiting)
            
        visiting.remove(cell_id)
        return result`
      }
    ]
  },
  {
    id: "prob-url-shortener",
    category: "Solved Problems",
    title: "URL Shortener (System Design)",
    description: "Convert Long URLs to Short Codes (bit.ly) and back. A classic System Design + Algo question.",
    sections: [
      {
        title: "The Challenge",
        content: "Design a class with:\n1. `shorten(long_url) -> short_url`\n2. `redirect(short_url) -> long_url`\n\nThe short code should be alphanumeric and as short as possible (e.g., 6 chars)."
      },
      {
        title: "The Math: Base62 Encoding",
        content: "We need to map a unique Integer ID (database ID) to a short string. \n- Characters: `a-z`, `A-Z`, `0-9` = 62 chars.\n- This is Base62 conversion (like Binary is Base2, Hex is Base16).\n- Algorithm: `while num > 0: remainder = num % 62; char = map[remainder]; num //= 62`."
      },
      {
        title: "Implementation",
        content: "We maintain an ID counter and a map. We encode the ID to Base62 for the short code.",
        codeNote: "Base62 Encoding: Maps an integer ID to a short string. Time: O(log62 N). Space: O(1) for algo, O(N) for storage.",
        relatedTopicLink: "py-strings",
        code: `class URLShortener:
    def __init__(self):
        self.id_counter = 1
        self.url_map = {} # { id: long_url }
        self.chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    def shorten(self, long_url):
        # 1. Get unique ID
        curr_id = self.id_counter
        self.id_counter += 1
        self.url_map[curr_id] = long_url
        
        # 2. Base62 Encode
        short_code = []
        while curr_id > 0:
            curr_id, rem = divmod(curr_id, 62)
            short_code.append(self.chars[rem])
        
        return "http://sho.rt/" + "".join(reversed(short_code))

    def redirect(self, short_url):
        # 1. Extract code
        code = short_url.split("/")[-1]
        
        # 2. Base62 Decode
        curr_id = 0
        for char in code:
            curr_id = curr_id * 62 + self.chars.index(char)
            
        return self.url_map.get(curr_id)`
      }
    ]
  },
  {
    id: "prob-circular-buffer",
    category: "Solved Problems",
    title: "Circular Buffer (Ring Buffer)",
    description: "A fixed-size buffer that overwrites old data when full. Crucial for streaming data.",
    sections: [
      {
        title: "The Challenge",
        content: "Implement a Buffer of size N with:\n1. `write(val)`: Adds data. If full, overwrite oldest.\n2. `read()`: Read oldest unread data."
      },
      {
        title: "The Pointer Strategy",
        content: "We need a fixed array `[None] * N` and two pointers:\n- `head`: Where to write next.\n- `tail`: Where to read next.\n- `count`: How many items are currently stored.\n\nUsing modulo `% N` wraps the pointers around the end."
      },
      {
        title: "Implementation",
        content: "We overwrite `buffer[head]` and move head. If buffer was full, we also move tail to 'forget' the oldest value.",
        codeNote: "Modulo Arithmetic: `(ptr + 1) % N` creates the circular behavior. Time: O(1) for both read/write. Space: O(N).",
        relatedTopicLink: "py-operators",
        code: `class RingBuffer:
    def __init__(self, capacity):
        self.cap = capacity
        self.buffer = [None] * capacity
        self.head = 0 # Write pointer
        self.tail = 0 # Read pointer
        self.size = 0

    def write(self, val):
        self.buffer[self.head] = val
        self.head = (self.head + 1) % self.cap
        if self.size < self.cap:
            self.size += 1
        else:
            # We overwrote the oldest data, so tail must move too
            self.tail = (self.tail + 1) % self.cap

    def read(self):
        if self.size == 0: return None
        val = self.buffer[self.tail]
        self.tail = (self.tail + 1) % self.cap
        self.size -= 1
        return val`
      }
    ]
  },
  {
    id: "prob-implement-trie",
    category: "Solved Problems",
    title: "Implement Trie (Prefix Tree)",
    description: "A specialized tree for storing strings. The foundation of Autocomplete.",
    sections: [
      {
        title: "The Task",
        content: "Implement a Trie with `insert`, `search`, and `startsWith` methods."
      },
      {
        title: "Why It's Practical",
        content: "Standard way to implement 'Autocomplete' or 'Spell Check'. Used in Google Search bar, DNA sequencing, and IP Routing."
      },
      {
        title: "Implementation",
        content: "The implementation uses a recursive or iterative approach to insert and search.",
        codeNote: "Trie Node: A dict of children + a boolean flag. Time: O(L) for insert/search where L is word length. Space: O(Total Characters).",
        relatedTopicLink: "py-dsa-trees",
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix):
        return self._find(prefix) is not None

    def _find(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children: return None
            node = node.children[char]
        return node`
      }
    ]
  },
  {
    id: "prob-autocomplete",
    category: "Solved Problems",
    title: "AutoComplete System (Trie)",
    description: "Suggest completions for a prefix. 'Goog' -> ['Google', 'Google Maps'].",
    sections: [
      {
        title: "The Challenge",
        content: "1. `insert(word)`: Add a word to the dictionary.\n2. `search(prefix)`: Return all words starting with prefix."
      },
      {
        title: "Data Structure: Trie (Prefix Tree)",
        content: "A Trie is a tree where each node is a character. Paths from root form words. \n- Optimized for prefix lookups.\n- We flag nodes that mark the `end_of_word`."
      },
      {
        title: "Implementation",
        content: "We walk down the Trie using the prefix. If we find the node, we run DFS from there to find all children marked `is_end`.",
        codeNote: "Trie Traversal: Searching a prefix is O(L) where L is prefix length. DFS is O(V) where V is number of descendants. Space: O(Total Chars).",
        relatedTopicLink: "py-dsa-trees",
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class AutoComplete:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, prefix):
        # 1. Find the node for the prefix
        node = self.root
        for char in prefix:
            if char not in node.children:
                return [] # Prefix not found
            node = node.children[char]
        
        # 2. Collect all words from this node downwards
        results = []
        self._dfs(node, prefix, results)
        return results

    def _dfs(self, node, current_word, results):
        if node.is_end:
            results.append(current_word)
        
        for char, child_node in node.children.items():
            self._dfs(child_node, current_word + char, results)`
      }
    ]
  },
  {
    id: "prob-boolean-logic",
    category: "Solved Problems",
    title: "Boolean Logic Engine",
    description: "Evaluating complex nested logical rules against a dataset. A recursive descent problem.",
    sections: [
      {
        title: "The Challenge",
        content: "You have a set of rules defined in JSON/Dict format and a data object. Evaluate if the data satisfies the rules.\n\n**Rule Format:**\n- `{ 'op': 'AND', 'rules': [...] }`\n- `{ 'op': 'OR', 'rules': [...] }`\n- `{ 'op': 'NOT', 'rule': {...} }`\n- `{ 'op': 'EQ', 'key': 'age', 'value': 18 }`\n\n**Goal:** `evaluate(rule, data) -> bool`"
      },
      {
        title: "Mental Model: The Syntax Tree",
        content: "Logic expressions form a tree. `AND` and `OR` are nodes with children. `EQ` and `GT` are leaf nodes. \n- `AND` means *ALL* children must be True.\n- `OR` means *ANY* child must be True.\n- `NOT` means the child must be False.\n\nThis screams **Recursion**."
      },
      {
        title: "Implementation: Recursive Dispatch",
        content: "We create a dispatcher function that checks the `op` field and routes to the correct logic or recursively calls itself.",
        codeNote: "Recursion Pattern: Base cases are the comparisons (EQ, GT). Recursive steps are the logic gates (AND, OR). Time: O(N) where N is number of rules.",
        relatedTopicLink: "pattern-validator",
        code: `def evaluate(rule, data):
    op = rule.get('op')

    # Base Cases (Leaf Nodes)
    if op == 'EQ':
        return data.get(rule['key']) == rule['value']
    if op == 'GT':
        return data.get(rule['key']) > rule['value']
    
    # Recursive Cases (Logic Gates)
    if op == 'AND':
        # Return True only if ALL sub-rules are True
        return all(evaluate(sub, data) for sub in rule['rules'])
    
    if op == 'OR':
        # Return True if AT LEAST ONE sub-rule is True
        return any(evaluate(sub, data) for sub in rule['rules'])
    
    if op == 'NOT':
        # Invert the result of the child rule
        return not evaluate(rule['rule'], data)
        
    return False`
      }
    ]
  },
  {
    id: "prob-reactive-sheet",
    category: "Solved Problems",
    title: "Reactive Spreadsheet (Mini-Excel)",
    description: "A spreadsheet engine that handles formula parsing, dependency tracking, and automatic updates.",
    sections: [
      {
        title: "The Challenge",
        content: "Implement a class `Sheet` with:\n1. `set_cell(id, content)`: Content can be a value (`10`) or formula (`=A1+B1`).\n2. `get_cell(id)`: Returns the evaluated value.\n\n**Constraint:** If A1 depends on B1, and B1 updates, A1 must update. Detect Circular Dependencies (`A1=B1`, `B1=A1`)."
      },
      {
        title: "Data Structure: Dependency Graph",
        content: "We need two graphs:\n1. **Graph (Dependencies)**: `A -> [B, C]` means A depends on B and C. Used for Topological Sort (Order of evaluation).\n2. **Reverse Graph (Dependents)**: `B -> [A]` means B affects A. Used to trigger updates.\n\nWe also need a `Cells` dict to store raw formulas and values."
      },
      {
        title: "Cycle Detection (DFS)",
        content: "Before setting a formula `A = B + C`, we must check if setting A to depend on B creates a cycle. We do a temporary DFS starting from B to see if we reach A.",
        codeNote: "Cycle Detection: DFS to detect back edges. Time: O(V+E) where V is cells, E is dependencies.",
        relatedTopicLink: "py-dsa-trees",
        code: `def has_cycle(graph, start, target):
    # DFS to see if 'start' eventually points to 'target'
    stack = [start]
    visited = set()
    while stack:
        node = stack.pop()
        if node == target: return True
        if node in visited: continue
        visited.add(node)
        for neighbor in graph.get(node, []):
            stack.append(neighbor)
    return False`
      },
      {
        title: "Implementation",
        content: "The `set_cell` method orchestrates the logic: Parse -> Check Cycle -> Update Graph -> Evaluate.",
        codeNote: "Topological Update: When a cell changes, we only re-evaluate its dependents. Using a recursive 'get' with memoization is a lazy way to do this. Time: O(V+E).",
        relatedTopicLink: "prob-spreadsheet",
        code: `class Sheet:
    def __init__(self):
        self.cells = {}   # id -> raw_content
        self.values = {}  # id -> evaluated_value
        self.graph = {}   # id -> [dependencies] (Who I need)
        
    def set_cell(self, cell_id, content):
        # 1. Parse Dependencies (Simplified for demo)
        # Assume content "=A1+B1" -> deps=["A1", "B1"]
        deps = []
        if isinstance(content, str) and content.startswith("="):
            deps = [part for part in content[1:].split("+") if part.isalpha()]
            
        # 2. Check Cycles
        for dep in deps:
            if has_cycle(self.graph, dep, cell_id):
                raise ValueError("Cycle detected!")
                
        # 3. Update State
        self.cells[cell_id] = content
        self.graph[cell_id] = deps
        
        # 4. Re-evaluate (eager propagation)
        # In a real system, we might use Topological Sort here.
        # For simplicity, we clear cache or re-calc.
        self.evaluate(cell_id)

    def evaluate(self, cell_id):
        # Recursive evaluation logic
        content = self.cells.get(cell_id)
        if not isinstance(content, str) or not content.startswith("="):
            return content
            
        # Calculate formula
        # This needs to be robust (handle ints, etc)
        total = 0
        for dep in self.graph[cell_id]:
            total += self.evaluate(dep)
        return total`
      }
    ]
  },
  {
    id: "prob-wildcard-pubsub",
    category: "Solved Problems",
    title: "Wildcard Pub/Sub",
    description: "A messaging system where subscribers can use wildcards (`*`) to match multiple topics.",
    sections: [
      {
        title: "The Challenge",
        content: "1. `subscribe(pattern)`: Pattern can be `sports.tennis` or `sports.*` or `*.tennis`.\n2. `publish(topic)`: `publish('sports.tennis')` should notify both `sports.tennis` AND `sports.*` subscribers.\n\n*Standard Hash Maps don't work here because of the wildcard.*"
      },
      {
        title: "Solution: The Trie (Prefix Tree)",
        content: "We build a Trie where each level is a topic part. \n- Root -> 'sports' -> 'tennis'.\n- Wildcards (`*`) are treated as special nodes that match *anything* at that level.\n\nWhen publishing `a.b`, we traverse the Trie. At node `a`, we go to child `b` AND child `*`."
      },
      {
        title: "Implementation",
        content: "A recursive `match` function is key. It branches out to multiple paths in the Trie.",
        codeNote: "Trie Branching: Recursive match handles wildcards by exploring multiple paths. Time: O(K^L) worst case with wildcards, usually O(L) where L is topic length.",
        relatedTopicLink: "prob-autocomplete",
        code: `class Node:
    def __init__(self):
        self.children = {}
        self.subs = [] # Subscribers at this node

class PubSub:
    def __init__(self):
        self.root = Node()

    def subscribe(self, pattern, callback):
        node = self.root
        for part in pattern.split('.'):
            if part not in node.children:
                node.children[part] = Node()
            node = node.children[part]
        node.subs.append(callback)

    def publish(self, topic, message):
        # Start recursive matching
        self._match(self.root, topic.split('.'), 0, message)

    def _match(self, node, parts, index, msg):
        # Base Case: End of topic
        if index == len(parts):
            for sub in node.subs: sub(msg)
            return

        current_part = parts[index]

        # 1. Exact Match
        if current_part in node.children:
            self._match(node.children[current_part], parts, index+1, msg)

        # 2. Wildcard Match (*)
        if '*' in node.children:
            self._match(node.children['*'], parts, index+1, msg)`
      }
    ]
  },
  {
    id: "prob-task-scheduler",
    category: "Solved Problems",
    title: "Task Scheduler (Dependencies & Retries)",
    description: "Executing a graph of tasks with retries on failure. Combines Graph Traversal with State Management.",
    sections: [
      {
        title: "The Challenge",
        content: "You have a list of tasks. Some depend on others (`A -> B`). \n- Tasks must run in order (Topological).\n- If a task fails, retry it up to 3 times.\n- If it fails 3 times, mark as FAILED and stop dependent tasks."
      },
      {
        title: "Strategy: Kahn's Algorithm (BFS)",
        content: "1. Calculate `indegree` (number of parents) for each task.\n2. Add tasks with `indegree == 0` to a **Queue** (Ready to run).\n3. Loop while Queue is not empty:\n    - Run task.\n    - If Success: Decrement neighbors' indegree. Add to Queue if 0.\n    - If Fail: Decrement retries. Add back to Queue if > 0."
      },
      {
        title: "Implementation",
        content: "We simulate the execution loop. In a real system, this would be async.",
        codeNote: "Indegree Tracking: Kahn's Algorithm for Topological Sort. Time: O(V+E). Space: O(V+E) for graph.",
        relatedTopicLink: "py-dsa-trees",
        code: `from collections import deque, defaultdict

def run_tasks(tasks, dependencies):
    # 1. Build Graph & Indegree
    graph = defaultdict(list)
    indegree = {t: 0 for t in tasks}
    retries = {t: 3 for t in tasks}
    
    for parent, child in dependencies:
        graph[parent].append(child)
        indegree[child] += 1
        
    # 2. Initialize Queue (Ready tasks)
    queue = deque([t for t in tasks if indegree[t] == 0])
    results = []

    while queue:
        task = queue.popleft()
        
        # Simulate execution (random fail for demo)
        success = execute(task) 
        
        if success:
            results.append(task)
            # Unlock neighbors
            for neighbor in graph[task]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
        else:
            # Handle Failure
            if retries[task] > 0:
                print(f"Retrying {task}...")
                retries[task] -= 1
                queue.append(task) # Re-queue immediately
            else:
                print(f"Task {task} Failed permanently.")
                # We do NOT add neighbors, so they never run.
                
    return results

def execute(task):
    return True # Mock`
      }
    ]
  },

  // =========================================
  // ADDITIONAL PRACTICAL PROBLEMS (THE GAUNTLET)
  // =========================================
  {
    id: "prob-lru-cache",
    category: "Solved Problems",
    title: "LRU Cache (Least Recently Used)",
    description: "Design a cache that removes the 'Least Recently Used' item when full. The #1 Interview Question.",
    sections: [
      {
        title: "The Task",
        content: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\n**Why it's #1**: It forces you to use two data structures together: a Hash Map (for fast access) and a Doubly Linked List (to track order)."
      },
      {
        title: "Real World Application",
        content: "Used in Redis, Web Browser History (Back button), and CPU Caches."
      },
      {
        title: "Implementation Strategy",
        content: "We maintain a Doubly Linked List. \n- **Head**: Most Recently Used (MRU).\n- **Tail**: Least Recently Used (LRU).\n- `get(key)`: Move node to Head.\n- `put(key)`: Create/Update node, move to Head. If full, remove Tail.",
        codeNote: "OrderedDict: Python's 'collections.OrderedDict' actually implements this exact logic internally. Time: O(1) for all ops. Space: O(N).",
        relatedTopicLink: "py-dsa-linear",
        code: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {} # map key -> node
        # Dummy head/tail to avoid null checks
        self.head, self.tail = Node(), Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev

    def _add(self, node):
        # Add to head (MRU)
        nxt = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = nxt
        nxt.prev = node

    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node) # Move to front
            return node.val
        return -1

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        
        if len(self.cache) > self.cap:
            # Remove LRU (from tail)
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`
      }
    ]
  },
  {
    id: "prob-hit-counter",
    category: "Solved Problems",
    title: "Design Hit Counter",
    description: "Count hits in the last 5 minutes. Tests Time Window logic and Cleanup.",
    sections: [
      {
        title: "The Task",
        content: "1. `hit(timestamp)`: Record a hit.\n2. `getHits(timestamp)`: Return hits in range `[timestamp - 300s, timestamp]`.\n\n**Constraint:** Many hits might arrive at the same second."
      },
      {
        title: "Real World Application",
        content: "Used in Rate Limiters, API Analytics, and DDoS protection systems."
      },
      {
        title: "Implementation (Queue)",
        content: "This is sufficient for most interviews. `deque` allows O(1) pops from the left.",
        codeNote: "Memory Cleanup: The while loop acts as garbage collection. Time: O(1) amortized. Space: O(N) where N is hits in last 5 mins.",
        relatedTopicLink: "py-dsa-linear",
        code: `from collections import deque

class HitCounter:
    def __init__(self):
        self.q = deque()

    def hit(self, timestamp):
        self.q.append(timestamp)

    def getHits(self, timestamp):
        # Remove hits older than 5 mins (300s)
        while self.q and timestamp - self.q[0] >= 300:
            self.q.popleft()
        return len(self.q)`
      }
    ]
  },
  {
    id: "prob-calculator",
    category: "Solved Problems",
    title: "Basic Calculator II",
    description: "Evaluate a string expression '3+2*2'. Tests Stack usage and Operator Precedence.",
    sections: [
      {
        title: "The Task",
        content: "Evaluate strings like `3+2*2`. \n- `*` and `/` have higher priority than `+` and `-`.\n- No parentheses in this version."
      },
      {
        title: "Real World Application",
        content: "Used in Excel formula evaluation and Compiler design (Abstract Syntax Trees)."
      },
      {
        title: "Implementation",
        content: "Pay attention to how we construct multi-digit numbers.",
        codeNote: "Deferred Execution: Storing '+' and '-' to execute later via sum() is a key stack pattern. Time: O(N). Space: O(N).",
        relatedTopicLink: "py-dsa-linear",
        code: `def calculate(s):
    if not s: return 0
    stack, num, sign = [], 0, "+"
    
    for i in range(len(s)):
        if s[i].isdigit():
            num = num * 10 + int(s[i])
            
        if s[i] in "+-*/" or i == len(s) - 1:
            if sign == "+":
                stack.append(num)
            elif sign == "-":
                stack.append(-num)
            elif sign == "*":
                stack.append(stack.pop() * num)
            elif sign == "/":
                top = stack.pop()
                stack.append(int(top / num))
            
            sign = s[i]
            num = 0
            
    return sum(stack)`
      }
    ]
  },
  {
    id: "prob-simplify-path",
    category: "Solved Problems",
    title: "Simplify Path",
    description: "Canonicalize a Unix path like '/a/./b/../../c/'. Tests Stack logic.",
    sections: [
      {
        title: "The Task",
        content: "Convert absolute path to canonical path.\n- `.`: Current directory (No-op).\n- `..`: Parent directory (Go up).\n- `//`: Treat as single slash."
      },
      {
        title: "Real World Application",
        content: "Used in Navigation breadcrumbs and File System navigation."
      },
      {
        title: "Implementation",
        content: "1. Split by `/`.\n2. Iterate tokens.\n3. If `..`, pop stack (if not empty).\n4. If `.` or empty, skip.\n5. Else, push.",
        codeNote: "String Splitting: Handling empty tokens from split is crucial. Time: O(N). Space: O(N).",
        relatedTopicLink: "py-strings",
        code: `def simplifyPath(path):
    stack = []
    
    for part in path.split("/"):
        if part == "..":
            if stack: stack.pop()
        elif part == "." or not part:
            continue
        else:
            stack.append(part)
            
    return "/" + "/".join(stack)`
      }
    ]
  },
  {
    id: "prob-mini-parser",
    category: "Solved Problems",
    title: "Mini Parser (Nested Integers)",
    description: "Deserialize a string '[123,[456,[789]]]' into a nested object list.",
    sections: [
      {
        title: "The Task",
        content: "Deserialize a string into a nested integer structure."
      },
      {
        title: "Real World Application",
        content: "This IS your JSON question. Used in JSON.parse(), XML parsers."
      },
      {
        title: "Implementation (Stack)",
        content: "We keep a stack of *NestedIntegers* (lists).",
        codeNote: "Stack for Nesting: stack[-1] is always the 'current container'. Time: O(N). Space: O(N).",
        relatedTopicLink: "py-dsa-linear",
        code: `def deserialize(s):
    if s[0] != '[': return int(s)
    
    stack = []
    curr_num = ""
    
    for char in s:
        if char == '[':
            stack.append([]) # Start new list
        elif char == ']':
            if curr_num:
                stack[-1].append(int(curr_num))
                curr_num = ""
            if len(stack) > 1:
                completed = stack.pop()
                stack[-1].append(completed)
        elif char == ',':
            if curr_num:
                stack[-1].append(int(curr_num))
                curr_num = ""
        else:
            curr_num += char
            
    return stack[0]`
      }
    ]
  },
  {
    id: "prob-random-set",
    category: "Solved Problems",
    title: "Insert Delete GetRandom O(1)",
    description: "Build a set where you can insert, remove, and get a random element all in constant time.",
    sections: [
      {
        title: "The Task",
        content: "Build a set where you can insert, remove, and get a random element all in constant time."
      },
      {
        title: "Real World Application",
        content: "Load Balancers (picking a random server), Game Logic (random loot drops)."
      },
      {
        title: "Implementation",
        content: "1. **List**: Gives O(1) `random.choice`.\n2. **Map**: Gives O(1) `lookup`.\nTo delete O(1), swap target with last element, then pop.",
        codeNote: "Swap-and-Pop: The only way to delete from an array in O(1) is from the end. Time: O(1) all ops. Space: O(N).",
        relatedTopicLink: "py-lists",
        code: `import random
class RandomizedSet:
    def __init__(self):
        self.vals = []
        self.pos = {}

    def insert(self, val):
        if val in self.pos: return False
        self.vals.append(val)
        self.pos[val] = len(self.vals) - 1
        return True

    def remove(self, val):
        if val not in self.pos: return False
        idx = self.pos[val]
        last = self.vals[-1]
        self.vals[idx] = last
        self.pos[last] = idx
        self.vals.pop()
        del self.pos[val]
        return True

    def getRandom(self):
        return random.choice(self.vals)`
      }
    ]
  },
  {
    id: "prob-time-kv",
    category: "Solved Problems",
    title: "Time Based Key-Value Store",
    description: "Store multiple values for the same key at different timestamps.",
    sections: [
      {
        title: "The Task",
        content: "set(key, value, timestamp) and get(key, timestamp)."
      },
      {
        title: "Real World Application",
        content: "Database Version Control (MVCC), Git."
      },
      {
        title: "Implementation",
        content: "Store values as a list of tuples `(timestamp, value)`. Use Binary Search.",
        codeNote: "Binary Search (bisect): Necessary for O(log N) lookup in time series data. Space: O(N).",
        relatedTopicLink: "py-dsa-sorting",
        code: `from collections import defaultdict
import bisect

class TimeMap:
    def __init__(self):
        self.store = defaultdict(list)

    def set(self, key, value, timestamp):
        self.store[key].append((timestamp, value))

    def get(self, key, timestamp):
        values = self.store.get(key, [])
        if not values: return ""
        i = bisect.bisect_right(values, (timestamp, chr(127)))
        if i == 0: return ""
        return values[i-1][1]`
      }
    ]
  },
  {
    id: "prob-course-schedule",
    category: "Solved Problems",
    title: "Course Schedule (Cycle Detection)",
    description: "Can you finish all courses given these prerequisites?",
    sections: [
      {
        title: "The Task",
        content: "Detect if a graph has a cycle."
      },
      {
        title: "Real World Application",
        content: "Package Managers (npm/pip), Build Systems (Makefiles), Deadlock detection."
      },
      {
        title: "Implementation",
        content: "We use 3 states: Unvisited, Visiting, Visited.",
        codeNote: "3-Color DFS: Standard algorithm for detecting cycles in directed graphs. Time: O(V+E). Space: O(V).",
        relatedTopicLink: "py-dsa-trees",
        code: `def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    for c, p in prerequisites: graph[c].append(p)
    
    state = [0] * numCourses
    def has_cycle(node):
        if state[node] == 1: return True
        if state[node] == 2: return False
        state[node] = 1
        for n in graph[node]:
            if has_cycle(n): return True
        state[node] = 2
        return False
        
    for i in range(numCourses):
        if has_cycle(i): return False
    return True`
      }
    ]
  },
  {
    id: "prob-merge-intervals",
    category: "Solved Problems",
    title: "Merge Intervals",
    description: "Given [1,3], [2,6], [8,10], return [1,6], [8,10].",
    sections: [
      {
        title: "The Task",
        content: "Merge overlapping intervals."
      },
      {
        title: "Real World Application",
        content: "Calendar apps (finding free time), Memory management chunks."
      },
      {
        title: "Implementation",
        content: "Sort by START time. Iterate and merge.",
        codeNote: "Sorting is Key: Enables O(N) one-pass merging. Total Time: O(N log N). Space: O(N).",
        relatedTopicLink: "py-dsa-sorting",
        code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for i in intervals:
        if not merged or i[0] > merged[-1][1]:
            merged.append(i)
        else:
            merged[-1][1] = max(merged[-1][1], i[1])
    return merged`
      }
    ]
  },
  {
    id: "prob-bst-ops",
    category: "Solved Problems",
    title: "BST Construction & Inversion",
    description: "How to build a Binary Search Tree from a list and how to Invert it (The Google Joke Question).",
    sections: [
      {
        title: "1. Create BST from Sorted Array",
        content: "Given `[-10, -3, 0, 5, 9]`, create a height-balanced BST.\n- **Strategy**: Pick the middle element as Root. Recursively build Left subtree from left half, Right subtree from right half.",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sortedArrayToBST(nums):
    if not nums: return None
    
    mid = len(nums) // 2
    root = TreeNode(nums[mid])
    
    root.left = sortedArrayToBST(nums[:mid])
    root.right = sortedArrayToBST(nums[mid+1:])
    
    return root`
      },
      {
        title: "2. Invert Binary Tree",
        content: "Swap every left child with its right child.\n- **Strategy**: Recursive DFS. `root.left, root.right = invert(root.right), invert(root.left)`.",
        codeNote: "Homebrew Creator Max Howell was famously rejected by Google for not knowing this on a whiteboard. Time: O(N). Space: O(H) where H is height.",
        relatedTopicLink: "py-dsa-trees",
        code: `def invertTree(root):
    if not root: return None
    
    # Swap children
    root.left, root.right = root.right, root.left
    
    # Recurse
    invertTree(root.left)
    invertTree(root.right)
    
    return root`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - TWO POINTERS
  // =========================================
  {
    id: "prob-two-sum",
    category: "Solved Problems",
    title: "Two Sum (Hash Map)",
    description: "The most famous LeetCode problem. Find two numbers that add up to target.",
    sections: [
      {
        title: "The Task",
        content: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\n**Constraint**: Each input has exactly one solution."
      },
      {
        title: "Brute Force (O(N²))",
        content: "Check every pair. This is too slow for interviews.",
        code: `def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`
      },
      {
        title: "Optimal Solution (O(N))",
        content: "Use a Hash Map. For each number, check if its complement (target - num) exists.",
        codeNote: "Hash Map Lookup: O(1). We trade space for time. Time: O(N). Space: O(N).",
        relatedTopicLink: "py-dicts",
        code: `def two_sum(nums, target):
    seen = {}  # value -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

# Example: nums = [2, 7, 11, 15], target = 9
# Returns [0, 1] (2 + 7 = 9)`
      }
    ]
  },
  {
    id: "prob-three-sum",
    category: "Solved Problems",
    title: "Three Sum",
    description: "Find all unique triplets that sum to zero. Combines sorting with two pointers.",
    sections: [
      {
        title: "The Task",
        content: "Given an array, find all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`."
      },
      {
        title: "Strategy",
        content: "1. **Sort** the array.\n2. **Fix** one number (i).\n3. Use **Two Pointers** to find pairs that sum to `-nums[i]`.\n4. **Skip duplicates** to avoid duplicate triplets."
      },
      {
        title: "Implementation",
        content: "The key insight is that after sorting, we can use two pointers efficiently.",
        codeNote: "Sorting enables Two Pointers. Skipping duplicates is crucial. Time: O(N²). Space: O(1) excluding output.",
        relatedTopicLink: "py-dsa-two-pointers",
        code: `def three_sum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates for i
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        target = -nums[i]
        
        while left < right:
            curr_sum = nums[left] + nums[right]
            
            if curr_sum == target:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates for left and right
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif curr_sum < target:
                left += 1
            else:
                right -= 1
    
    return result

# Example: nums = [-1, 0, 1, 2, -1, -4]
# Returns [[-1, -1, 2], [-1, 0, 1]]`
      }
    ]
  },
  {
    id: "prob-container-water",
    category: "Solved Problems",
    title: "Container With Most Water",
    description: "Find two lines that together with x-axis form a container with most water.",
    sections: [
      {
        title: "The Task",
        content: "Given n non-negative integers representing heights, find two lines that form a container with the most water.\n\n**Area** = min(height[left], height[right]) × (right - left)"
      },
      {
        title: "Strategy",
        content: "Start with widest container (left=0, right=n-1). Move the pointer with the shorter line inward, because moving the taller one can only decrease area."
      },
      {
        title: "Implementation",
        content: "Greedy two-pointer approach.",
        codeNote: "Greedy Choice: Moving the shorter line might find a taller one. Moving the taller line can only decrease area. Time: O(N). Space: O(1).",
        relatedTopicLink: "py-dsa-two-pointers",
        code: `def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # Move the shorter line
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water

# Example: height = [1,8,6,2,5,4,8,3,7]
# Returns 49`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - SLIDING WINDOW
  // =========================================
  {
    id: "prob-min-window-substring",
    category: "Solved Problems",
    title: "Minimum Window Substring",
    description: "Find the smallest substring containing all characters of another string. A HARD classic.",
    sections: [
      {
        title: "The Task",
        content: "Given strings `s` and `t`, find the minimum window in `s` which contains all characters of `t`.\n\n**Example**: s = 'ADOBECODEBANC', t = 'ABC' → 'BANC'"
      },
      {
        title: "Strategy",
        content: "1. Use two pointers (left, right) for the window.\n2. Expand right until window contains all chars of t.\n3. Contract left to minimize window while still valid.\n4. Track the minimum valid window."
      },
      {
        title: "Implementation",
        content: "Use Counter to track character frequencies.",
        codeNote: "Sliding Window with Counter: Track 'required' chars and 'formed' chars. Time: O(S + T). Space: O(S + T).",
        relatedTopicLink: "py-dsa-sliding-window",
        code: `from collections import Counter

def min_window(s, t):
    if not t or not s:
        return ""
    
    t_count = Counter(t)
    required = len(t_count)
    
    left = 0
    formed = 0
    window_counts = {}
    
    min_len = float('inf')
    min_window = (0, 0)
    
    for right in range(len(s)):
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in t_count and window_counts[char] == t_count[char]:
            formed += 1
        
        # Contract window
        while left <= right and formed == required:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_window = (left, right)
            
            char = s[left]
            window_counts[char] -= 1
            if char in t_count and window_counts[char] < t_count[char]:
                formed -= 1
            left += 1
    
    l, r = min_window
    return s[l:r+1] if min_len != float('inf') else ""`
      }
    ]
  },
  {
    id: "prob-max-sliding-window",
    category: "Solved Problems",
    title: "Sliding Window Maximum",
    description: "Find the maximum in each window of size k. Uses a Monotonic Deque.",
    sections: [
      {
        title: "The Task",
        content: "Given an array and window size k, return the max of each window as it slides.\n\n**Example**: nums = [1,3,-1,-3,5,3,6,7], k = 3 → [3,3,5,5,6,7]"
      },
      {
        title: "Strategy",
        content: "Use a **Monotonic Decreasing Deque**. The front of the deque is always the max of the current window. We store indices, not values."
      },
      {
        title: "Implementation",
        content: "Maintain a deque where elements are in decreasing order.",
        codeNote: "Monotonic Deque: Elements are kept in decreasing order. Front is always the max. Time: O(N). Space: O(K).",
        relatedTopicLink: "py-collections",
        code: `from collections import deque

def max_sliding_window(nums, k):
    if not nums:
        return []
    
    dq = deque()  # Store indices
    result = []
    
    for i in range(len(nums)):
        # Remove indices outside the window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements (they can never be max)
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Window is complete
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - HEAP
  // =========================================
  {
    id: "prob-kth-largest",
    category: "Solved Problems",
    title: "Kth Largest Element in Array",
    description: "Find the kth largest element. Can use Heap or QuickSelect.",
    sections: [
      {
        title: "The Task",
        content: "Find the kth largest element in an unsorted array.\n\n**Example**: nums = [3,2,1,5,6,4], k = 2 → 5"
      },
      {
        title: "Solution 1: Min-Heap of Size K",
        content: "Maintain a min-heap of size k. The top is the kth largest.",
        codeNote: "Min-Heap Trick: Keep k largest elements. The smallest of these is the kth largest. Time: O(N log K). Space: O(K).",
        relatedTopicLink: "py-dsa-heap",
        code: `import heapq

def find_kth_largest(nums, k):
    heap = []
    
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    
    return heap[0]

# Or simply:
def find_kth_largest_simple(nums, k):
    return heapq.nlargest(k, nums)[-1]`
      },
      {
        title: "Solution 2: QuickSelect (O(N) average)",
        content: "Partition like QuickSort, but only recurse on one side.",
        code: `import random

def find_kth_largest_quickselect(nums, k):
    k = len(nums) - k  # Convert to kth smallest
    
    def quickselect(left, right):
        pivot_idx = random.randint(left, right)
        nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]
        pivot = nums[right]
        
        store_idx = left
        for i in range(left, right):
            if nums[i] < pivot:
                nums[store_idx], nums[i] = nums[i], nums[store_idx]
                store_idx += 1
        
        nums[store_idx], nums[right] = nums[right], nums[store_idx]
        
        if store_idx == k:
            return nums[k]
        elif store_idx < k:
            return quickselect(store_idx + 1, right)
        else:
            return quickselect(left, store_idx - 1)
    
    return quickselect(0, len(nums) - 1)`
      }
    ]
  },
  {
    id: "prob-merge-k-sorted",
    category: "Solved Problems",
    title: "Merge K Sorted Lists",
    description: "Merge k sorted linked lists into one sorted list. Uses a Min-Heap.",
    sections: [
      {
        title: "The Task",
        content: "You are given an array of k linked-lists, each sorted in ascending order. Merge all into one sorted list."
      },
      {
        title: "Strategy",
        content: "Use a min-heap to always get the smallest element among all list heads. Pop, add to result, push the next element from that list."
      },
      {
        title: "Implementation",
        content: "We need to handle comparison of ListNodes by wrapping in tuples.",
        codeNote: "Heap with Tuples: Use (value, index, node) to avoid comparing nodes directly. Time: O(N log K). Space: O(K).",
        relatedTopicLink: "py-dsa-heap",
        code: `import heapq

def merge_k_lists(lists):
    heap = []
    dummy = ListNode(0)
    curr = dummy
    
    # Initialize heap with first node of each list
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next`
      }
    ]
  },
  {
    id: "prob-top-k-frequent",
    category: "Solved Problems",
    title: "Top K Frequent Elements",
    description: "Find the k most frequent elements. Uses Counter + Heap.",
    sections: [
      {
        title: "The Task",
        content: "Given an integer array and k, return the k most frequent elements.\n\n**Example**: nums = [1,1,1,2,2,3], k = 2 → [1,2]"
      },
      {
        title: "Solution 1: Heap",
        content: "Count frequencies, then use heap to get top k.",
        codeNote: "Counter + Heap: Counter is O(N), heap is O(N log K). Total Time: O(N log K). Space: O(N).",
        relatedTopicLink: "py-collections",
        code: `from collections import Counter
import heapq

def top_k_frequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)

# Or use Counter's built-in:
def top_k_frequent_simple(nums, k):
    return [x[0] for x in Counter(nums).most_common(k)]`
      },
      {
        title: "Solution 2: Bucket Sort (O(N))",
        content: "Create buckets where index = frequency. No heap needed.",
        code: `def top_k_frequent_bucket(nums, k):
    count = Counter(nums)
    
    # Buckets: index = frequency, value = list of nums with that freq
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    
    result = []
    for i in range(len(buckets) - 1, -1, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    
    return result`
      }
    ]
  },
  {
    id: "prob-median-stream",
    category: "Solved Problems",
    title: "Find Median from Data Stream",
    description: "Design a data structure that supports adding numbers and finding median. Uses Two Heaps.",
    sections: [
      {
        title: "The Task",
        content: "Implement `addNum(num)` and `findMedian()`. The median is the middle value in a sorted list."
      },
      {
        title: "Strategy: Two Heaps",
        content: "- **Max-Heap** for the smaller half.\n- **Min-Heap** for the larger half.\n- Keep them balanced (sizes differ by at most 1).\n- Median is the top of one or average of both tops."
      },
      {
        title: "Implementation",
        content: "Python only has min-heap, so negate values for max-heap.",
        codeNote: "Two Heaps: Balancing ensures median is always accessible at heap tops. Time: O(log N) add, O(1) median. Space: O(N).",
        relatedTopicLink: "py-dsa-heap",
        code: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (negated)
        self.large = []  # Min-heap
    
    def addNum(self, num):
        # Add to max-heap first
        heapq.heappush(self.small, -num)
        
        # Balance: move largest from small to large
        heapq.heappush(self.large, -heapq.heappop(self.small))
        
        # Ensure small has equal or one more element
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))
    
    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - DP
  // =========================================
  {
    id: "prob-house-robber",
    category: "Solved Problems",
    title: "House Robber",
    description: "Maximum sum of non-adjacent elements. Classic DP.",
    sections: [
      {
        title: "The Task",
        content: "You are a robber. Each house has money. You can't rob two adjacent houses (alarm triggers). Find max money.\n\n**Example**: nums = [1,2,3,1] → 4 (rob house 0 and 2)"
      },
      {
        title: "Strategy",
        content: "For each house, choose: Rob it (skip previous) or Skip it (take previous max).\n\n`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`"
      },
      {
        title: "Implementation",
        content: "Space-optimized: only need last two values.",
        codeNote: "DP Recurrence: At each step, choose max of (skip current) vs (take current + skip previous). Time: O(N). Space: O(1).",
        relatedTopicLink: "py-dsa-dp",
        code: `def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2, prev1 = 0, 0
    
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    
    return prev1

# Example: nums = [2, 7, 9, 3, 1]
# Returns 12 (rob 2 + 9 + 1)`
      }
    ]
  },
  {
    id: "prob-longest-increasing",
    category: "Solved Problems",
    title: "Longest Increasing Subsequence",
    description: "Find the length of the longest strictly increasing subsequence.",
    sections: [
      {
        title: "The Task",
        content: "Given an array, find the length of the longest strictly increasing subsequence.\n\n**Example**: nums = [10,9,2,5,3,7,101,18] → 4 ([2,3,7,101])"
      },
      {
        title: "Solution 1: DP O(N²)",
        content: "`dp[i]` = length of LIS ending at index i.",
        code: `def length_of_lis_dp(nums):
    if not nums:
        return 0
    
    dp = [1] * len(nums)
    
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)`
      },
      {
        title: "Solution 2: Binary Search O(N log N)",
        content: "Maintain a list of the smallest tail of all increasing subsequences of each length.",
        codeNote: "Patience Sorting: The 'tails' array represents the smallest possible tail for each LIS length. Time: O(N log N). Space: O(N).",
        relatedTopicLink: "py-dsa-binary-search",
        code: `import bisect

def length_of_lis(nums):
    tails = []
    
    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)

# Example: nums = [10,9,2,5,3,7,101,18]
# tails evolves: [10] -> [9] -> [2] -> [2,5] -> [2,3] -> [2,3,7] -> [2,3,7,101] -> [2,3,7,18]
# Returns 4`
      }
    ]
  },
  {
    id: "prob-word-break",
    category: "Solved Problems",
    title: "Word Break",
    description: "Can a string be segmented into dictionary words? DP with string matching.",
    sections: [
      {
        title: "The Task",
        content: "Given a string and a dictionary of words, return true if the string can be segmented into space-separated dictionary words.\n\n**Example**: s = 'leetcode', wordDict = ['leet', 'code'] → true"
      },
      {
        title: "Strategy",
        content: "`dp[i]` = true if s[0:i] can be segmented. For each position, check all possible last words."
      },
      {
        title: "Implementation",
        content: "Convert wordDict to a set for O(1) lookup.",
        codeNote: "DP with Set Lookup: Check all possible last words at each position. Time: O(N² * M) where M is max word length. Space: O(N).",
        relatedTopicLink: "py-dsa-dp",
        code: `def word_break(s, wordDict):
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True  # Empty string is valid
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[len(s)]

# Example: s = "applepenapple", wordDict = ["apple", "pen"]
# Returns True`
      }
    ]
  },
  {
    id: "prob-edit-distance",
    category: "Solved Problems",
    title: "Edit Distance (Levenshtein)",
    description: "Minimum operations to convert one string to another. Classic 2D DP.",
    sections: [
      {
        title: "The Task",
        content: "Given two strings, find the minimum number of operations (insert, delete, replace) to convert word1 to word2.\n\n**Example**: word1 = 'horse', word2 = 'ros' → 3"
      },
      {
        title: "Strategy",
        content: "`dp[i][j]` = min operations to convert word1[0:i] to word2[0:j].\n\n- If chars match: `dp[i][j] = dp[i-1][j-1]`\n- Else: `min(insert, delete, replace) + 1`"
      },
      {
        title: "Implementation",
        content: "Build the DP table bottom-up.",
        codeNote: "2D DP: Each cell considers 3 operations. Time: O(M*N). Space: O(M*N) or O(N) with optimization.",
        relatedTopicLink: "py-dsa-dp",
        code: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all chars
    for j in range(n + 1):
        dp[0][j] = j  # Insert all chars
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )
    
    return dp[m][n]`
      }
    ]
  },
  {
    id: "prob-unique-paths",
    category: "Solved Problems",
    title: "Unique Paths",
    description: "Count paths in a grid from top-left to bottom-right. Classic 2D DP.",
    sections: [
      {
        title: "The Task",
        content: "A robot is at the top-left of an m×n grid. It can only move right or down. How many unique paths to the bottom-right?"
      },
      {
        title: "Strategy",
        content: "`dp[i][j]` = number of paths to reach cell (i, j).\n\n`dp[i][j] = dp[i-1][j] + dp[i][j-1]` (from above + from left)"
      },
      {
        title: "Implementation",
        content: "Space-optimized: only need previous row.",
        codeNote: "Grid DP: Each cell is sum of cell above and cell to the left. Time: O(M*N). Space: O(N).",
        relatedTopicLink: "py-dsa-dp",
        code: `def unique_paths(m, n):
    dp = [1] * n  # First row is all 1s
    
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    
    return dp[n-1]

# Example: m=3, n=7 → 28 paths`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - TREES
  // =========================================
  {
    id: "prob-validate-bst",
    category: "Solved Problems",
    title: "Validate Binary Search Tree",
    description: "Check if a tree is a valid BST. Tricky edge cases.",
    sections: [
      {
        title: "The Task",
        content: "Given a binary tree, determine if it is a valid BST.\n\n**BST Property**: Left subtree contains only nodes less than root. Right subtree contains only nodes greater than root."
      },
      {
        title: "Common Mistake",
        content: "Just checking `node.left.val < node.val < node.right.val` is NOT enough. You must ensure ALL nodes in left subtree are less than root."
      },
      {
        title: "Implementation",
        content: "Pass min/max bounds down the recursion.",
        codeNote: "Range Validation: Pass valid range to each subtree. Time: O(N). Space: O(H) where H is height.",
        relatedTopicLink: "py-dsa-trees",
        code: `def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        
        if not (min_val < node.val < max_val):
            return False
        
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))`
      }
    ]
  },
  {
    id: "prob-lowest-common-ancestor",
    category: "Solved Problems",
    title: "Lowest Common Ancestor",
    description: "Find the lowest common ancestor of two nodes in a binary tree.",
    sections: [
      {
        title: "The Task",
        content: "Given a binary tree and two nodes p and q, find their lowest common ancestor (LCA). The LCA is the lowest node that has both p and q as descendants."
      },
      {
        title: "Strategy",
        content: "Recursively search left and right subtrees. If both return non-null, current node is LCA. If only one returns non-null, that's the LCA."
      },
      {
        title: "Implementation",
        content: "Elegant recursive solution.",
        codeNote: "Recursive LCA: If we find p in left and q in right (or vice versa), current node is LCA. Time: O(N). Space: O(H).",
        relatedTopicLink: "py-dsa-trees",
        code: `def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    
    if left and right:
        return root  # p and q are in different subtrees
    
    return left if left else right`
      }
    ]
  },
  {
    id: "prob-serialize-tree",
    category: "Solved Problems",
    title: "Serialize and Deserialize Binary Tree",
    description: "Convert a tree to a string and back. Tests tree traversal and string parsing.",
    sections: [
      {
        title: "The Task",
        content: "Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree."
      },
      {
        title: "Strategy",
        content: "Use preorder traversal. Mark null nodes with a special character (e.g., 'N'). Use a delimiter between values."
      },
      {
        title: "Implementation",
        content: "Serialize with preorder, deserialize by consuming tokens.",
        codeNote: "Preorder Serialization: Root first, then left, then right. Use 'N' for null. Time: O(N). Space: O(N).",
        relatedTopicLink: "py-dsa-trees",
        code: `class Codec:
    def serialize(self, root):
        def preorder(node):
            if not node:
                return ['N']
            return [str(node.val)] + preorder(node.left) + preorder(node.right)
        
        return ','.join(preorder(root))
    
    def deserialize(self, data):
        tokens = iter(data.split(','))
        
        def build():
            val = next(tokens)
            if val == 'N':
                return None
            node = TreeNode(int(val))
            node.left = build()
            node.right = build()
            return node
        
        return build()

# Example: Tree [1,2,3,null,null,4,5]
# Serializes to "1,2,N,N,3,4,N,N,5,N,N"`
      }
    ]
  },
  {
    id: "prob-max-path-sum",
    category: "Solved Problems",
    title: "Binary Tree Maximum Path Sum",
    description: "Find the maximum path sum in a binary tree. Path can start and end anywhere.",
    sections: [
      {
        title: "The Task",
        content: "A path is any sequence of nodes connected by edges. Find the path with the maximum sum. Path doesn't need to pass through root."
      },
      {
        title: "Strategy",
        content: "At each node, calculate:\n1. Max path going through this node (left + node + right).\n2. Max path starting from this node going up (node + max(left, right)).\n\nReturn #2 to parent, update global max with #1."
      },
      {
        title: "Implementation",
        content: "Use a global variable or nonlocal to track max.",
        codeNote: "DFS with Global Max: Each node returns its best 'one-sided' path. Global max considers 'both-sided' paths. Time: O(N). Space: O(H).",
        relatedTopicLink: "py-dsa-trees",
        code: `def max_path_sum(root):
    max_sum = float('-inf')
    
    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0
        
        # Max sum from left/right subtrees (ignore negative paths)
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        
        # Path through this node
        path_sum = node.val + left + right
        max_sum = max(max_sum, path_sum)
        
        # Return max one-sided path to parent
        return node.val + max(left, right)
    
    dfs(root)
    return max_sum`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - GRAPHS
  // =========================================
  {
    id: "prob-clone-graph",
    category: "Solved Problems",
    title: "Clone Graph",
    description: "Create a deep copy of a graph. Tests DFS/BFS with hash map.",
    sections: [
      {
        title: "The Task",
        content: "Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph."
      },
      {
        title: "Strategy",
        content: "Use a hash map to track `original node -> cloned node`. DFS/BFS through the graph, cloning as you go."
      },
      {
        title: "Implementation",
        content: "DFS with memoization.",
        codeNote: "Hash Map for Cloning: Prevents infinite loops and duplicate clones. Time: O(V+E). Space: O(V).",
        relatedTopicLink: "py-dsa-trees",
        code: `def clone_graph(node):
    if not node:
        return None
    
    cloned = {}  # original -> clone
    
    def dfs(n):
        if n in cloned:
            return cloned[n]
        
        clone = Node(n.val)
        cloned[n] = clone
        
        for neighbor in n.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)`
      }
    ]
  },
  {
    id: "prob-number-islands",
    category: "Solved Problems",
    title: "Number of Islands",
    description: "Count connected components in a 2D grid. Classic BFS/DFS.",
    sections: [
      {
        title: "The Task",
        content: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically."
      },
      {
        title: "Strategy",
        content: "Iterate through grid. When you find a '1', increment count and 'sink' the entire island using DFS/BFS (mark all connected '1's as '0')."
      },
      {
        title: "Implementation",
        content: "DFS to sink islands.",
        codeNote: "Grid DFS: Modify grid in-place to mark visited. Time: O(M*N). Space: O(M*N) for recursion stack.",
        relatedTopicLink: "py-dsa-trees",
        code: `def num_islands(grid):
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        
        grid[r][c] = '0'  # Sink this cell
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count`
      }
    ]
  },
  {
    id: "prob-word-ladder",
    category: "Solved Problems",
    title: "Word Ladder",
    description: "Transform one word to another by changing one letter at a time. BFS for shortest path.",
    sections: [
      {
        title: "The Task",
        content: "Given two words and a dictionary, find the shortest transformation sequence from beginWord to endWord, changing only one letter at a time. Each intermediate word must be in the dictionary."
      },
      {
        title: "Strategy",
        content: "This is a graph problem! Words are nodes, edges connect words that differ by one letter. Use BFS for shortest path."
      },
      {
        title: "Implementation",
        content: "Preprocess dictionary for efficient neighbor lookup.",
        codeNote: "BFS for Shortest Path: Level by level exploration. Preprocessing with wildcards speeds up neighbor finding. Time: O(M² * N). Space: O(M² * N).",
        relatedTopicLink: "py-dsa-trees",
        code: `from collections import defaultdict, deque

def ladder_length(beginWord, endWord, wordList):
    if endWord not in wordList:
        return 0
    
    # Preprocess: Create adjacency list with wildcards
    # "hot" -> {"*ot": ["hot", "dot", ...], "h*t": [...], ...}
    L = len(beginWord)
    all_combo = defaultdict(list)
    
    for word in wordList:
        for i in range(L):
            pattern = word[:i] + '*' + word[i+1:]
            all_combo[pattern].append(word)
    
    # BFS
    queue = deque([(beginWord, 1)])
    visited = {beginWord}
    
    while queue:
        word, level = queue.popleft()
        
        for i in range(L):
            pattern = word[:i] + '*' + word[i+1:]
            
            for neighbor in all_combo[pattern]:
                if neighbor == endWord:
                    return level + 1
                
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, level + 1))
    
    return 0`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - BACKTRACKING
  // =========================================
  {
    id: "prob-generate-parentheses",
    category: "Solved Problems",
    title: "Generate Parentheses",
    description: "Generate all valid combinations of n pairs of parentheses. Classic backtracking.",
    sections: [
      {
        title: "The Task",
        content: "Given n pairs of parentheses, generate all combinations of well-formed parentheses.\n\n**Example**: n = 3 → ['((()))', '(()())', '(())()', '()(())', '()()()']"
      },
      {
        title: "Strategy",
        content: "Backtrack with constraints:\n- Can add '(' if open count < n.\n- Can add ')' if close count < open count."
      },
      {
        title: "Implementation",
        content: "Track open and close counts.",
        codeNote: "Constrained Backtracking: Only add valid characters. Time: O(4^N / sqrt(N)). Space: O(N).",
        relatedTopicLink: "py-dsa-backtracking",
        code: `def generate_parenthesis(n):
    result = []
    
    def backtrack(s, open_count, close_count):
        if len(s) == 2 * n:
            result.append(s)
            return
        
        if open_count < n:
            backtrack(s + '(', open_count + 1, close_count)
        
        if close_count < open_count:
            backtrack(s + ')', open_count, close_count + 1)
    
    backtrack('', 0, 0)
    return result`
      }
    ]
  },
  {
    id: "prob-combination-sum",
    category: "Solved Problems",
    title: "Combination Sum",
    description: "Find all combinations that sum to target. Numbers can be reused.",
    sections: [
      {
        title: "The Task",
        content: "Given an array of distinct integers and a target, return all unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times."
      },
      {
        title: "Strategy",
        content: "Backtrack, but don't move to the next index after choosing a number (allows reuse). Prune when sum exceeds target."
      },
      {
        title: "Implementation",
        content: "Sort for early termination optimization.",
        codeNote: "Backtracking with Reuse: Stay at same index to allow repeated use. Time: O(N^(T/M)) where T is target, M is min candidate. Space: O(T/M).",
        relatedTopicLink: "py-dsa-backtracking",
        code: `def combination_sum(candidates, target):
    result = []
    candidates.sort()  # Optional: helps with pruning
    
    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break  # Prune: too big
            
            path.append(candidates[i])
            backtrack(i, path, remaining - candidates[i])  # i, not i+1 (reuse)
            path.pop()
    
    backtrack(0, [], target)
    return result

# Example: candidates = [2,3,6,7], target = 7
# Returns [[2,2,3], [7]]`
      }
    ]
  },
  {
    id: "prob-n-queens",
    category: "Solved Problems",
    title: "N-Queens",
    description: "Place N queens on an N×N board so no two attack each other. The ultimate backtracking problem.",
    sections: [
      {
        title: "The Task",
        content: "Place n queens on an n×n chessboard such that no two queens attack each other. Return all distinct solutions."
      },
      {
        title: "Strategy",
        content: "Place queens row by row. For each row, try each column. Check if position is safe (no queen in same column, diagonal). Use sets to track attacked columns and diagonals."
      },
      {
        title: "Implementation",
        content: "Diagonal tracking: row-col is constant for one diagonal, row+col for the other.",
        codeNote: "Diagonal Sets: row-col identifies one diagonal direction, row+col identifies the other. Time: O(N!). Space: O(N).",
        relatedTopicLink: "py-dsa-backtracking",
        code: `def solve_n_queens(n):
    result = []
    cols = set()
    diag1 = set()  # row - col
    diag2 = set()  # row + col
    
    def backtrack(row, board):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            
            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            board[row][col] = 'Q'
            
            backtrack(row + 1, board)
            
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)
            board[row][col] = '.'
    
    board = [['.' for _ in range(n)] for _ in range(n)]
    backtrack(0, board)
    return result`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - ARRAYS & STRINGS
  // =========================================
  {
    id: "prob-product-except-self",
    category: "Solved Problems",
    title: "Product of Array Except Self",
    description: "Return array where each element is product of all other elements. No division allowed.",
    sections: [
      {
        title: "The Task",
        content: "Given an array nums, return an array where answer[i] is the product of all elements except nums[i]. You cannot use division."
      },
      {
        title: "Strategy",
        content: "Two passes:\n1. Left pass: Calculate product of all elements to the left.\n2. Right pass: Multiply by product of all elements to the right."
      },
      {
        title: "Implementation",
        content: "Use output array as left products, then multiply with right products.",
        codeNote: "Prefix/Suffix Products: Build left products, then right products in reverse. Time: O(N). Space: O(1) excluding output.",
        relatedTopicLink: "py-lists",
        code: `def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    
    # Left products
    left = 1
    for i in range(n):
        result[i] = left
        left *= nums[i]
    
    # Right products
    right = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right
        right *= nums[i]
    
    return result

# Example: nums = [1,2,3,4]
# Returns [24, 12, 8, 6]`
      }
    ]
  },
  {
    id: "prob-rotate-array",
    category: "Solved Problems",
    title: "Rotate Array",
    description: "Rotate array to the right by k steps. Multiple approaches.",
    sections: [
      {
        title: "The Task",
        content: "Given an array, rotate it to the right by k steps.\n\n**Example**: nums = [1,2,3,4,5,6,7], k = 3 → [5,6,7,1,2,3,4]"
      },
      {
        title: "Solution: Reverse Three Times",
        content: "1. Reverse entire array.\n2. Reverse first k elements.\n3. Reverse remaining elements.",
        codeNote: "Triple Reverse: Elegant O(1) space solution. Time: O(N). Space: O(1).",
        relatedTopicLink: "py-lists",
        code: `def rotate(nums, k):
    k = k % len(nums)  # Handle k > len(nums)
    
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1
    
    reverse(0, len(nums) - 1)  # Reverse all
    reverse(0, k - 1)          # Reverse first k
    reverse(k, len(nums) - 1)  # Reverse rest

# Example: [1,2,3,4,5,6,7], k=3
# After step 1: [7,6,5,4,3,2,1]
# After step 2: [5,6,7,4,3,2,1]
# After step 3: [5,6,7,1,2,3,4]`
      }
    ]
  },
  {
    id: "prob-valid-anagram",
    category: "Solved Problems",
    title: "Valid Anagram",
    description: "Check if two strings are anagrams. Uses Counter or sorting.",
    sections: [
      {
        title: "The Task",
        content: "Given two strings s and t, return true if t is an anagram of s.\n\n**Example**: s = 'anagram', t = 'nagaram' → true"
      },
      {
        title: "Solution 1: Counter",
        content: "Count character frequencies and compare.",
        codeNote: "Counter Comparison: Two strings are anagrams if they have the same character counts. Time: O(N). Space: O(1) for 26 letters.",
        relatedTopicLink: "py-collections",
        code: `from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)

# Or manually:
def is_anagram_manual(s, t):
    if len(s) != len(t):
        return False
    
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    
    for c in t:
        if c not in count:
            return False
        count[c] -= 1
        if count[c] < 0:
            return False
    
    return True`
      },
      {
        title: "Solution 2: Sorting",
        content: "Sort both strings and compare.",
        code: `def is_anagram_sort(s, t):
    return sorted(s) == sorted(t)

# Time: O(N log N), Space: O(N)`
      }
    ]
  },
  {
    id: "prob-group-anagrams",
    category: "Solved Problems",
    title: "Group Anagrams",
    description: "Group strings that are anagrams of each other. Uses hash map with sorted key.",
    sections: [
      {
        title: "The Task",
        content: "Given an array of strings, group anagrams together.\n\n**Example**: ['eat','tea','tan','ate','nat','bat'] → [['eat','tea','ate'], ['tan','nat'], ['bat']]"
      },
      {
        title: "Strategy",
        content: "Anagrams have the same sorted characters. Use sorted string as key in a hash map."
      },
      {
        title: "Implementation",
        content: "defaultdict makes grouping easy.",
        codeNote: "Sorted Key: All anagrams sort to the same string. Time: O(N * K log K) where K is max string length. Space: O(N * K).",
        relatedTopicLink: "py-collections",
        code: `from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    
    for s in strs:
        key = tuple(sorted(s))  # Tuple because lists aren't hashable
        groups[key].append(s)
    
    return list(groups.values())

# Alternative: Use character count as key (O(N * K))
def group_anagrams_count(strs):
    groups = defaultdict(list)
    
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1
        groups[tuple(count)].append(s)
    
    return list(groups.values())`
      }
    ]
  },
  {
    id: "prob-longest-palindrome-substring",
    category: "Solved Problems",
    title: "Longest Palindromic Substring",
    description: "Find the longest palindrome in a string. Expand around center approach.",
    sections: [
      {
        title: "The Task",
        content: "Given a string, return the longest palindromic substring.\n\n**Example**: s = 'babad' → 'bab' or 'aba'"
      },
      {
        title: "Strategy",
        content: "For each position, expand around it as the center. Check both odd-length (single center) and even-length (double center) palindromes."
      },
      {
        title: "Implementation",
        content: "Helper function to expand and find palindrome length.",
        codeNote: "Expand Around Center: O(N) centers, O(N) expansion each. Time: O(N²). Space: O(1).",
        relatedTopicLink: "py-strings",
        code: `def longest_palindrome(s):
    if not s:
        return ""
    
    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]
    
    result = ""
    for i in range(len(s)):
        # Odd length
        odd = expand(i, i)
        if len(odd) > len(result):
            result = odd
        
        # Even length
        even = expand(i, i + 1)
        if len(even) > len(result):
            result = even
    
    return result`
      }
    ]
  },
  
  // =========================================
  // MORE SOLVED PROBLEMS - INTERVALS
  // =========================================
  {
    id: "prob-insert-interval",
    category: "Solved Problems",
    title: "Insert Interval",
    description: "Insert a new interval into a sorted list of non-overlapping intervals.",
    sections: [
      {
        title: "The Task",
        content: "Given a sorted list of non-overlapping intervals and a new interval, insert the new interval and merge if necessary."
      },
      {
        title: "Strategy",
        content: "Three phases:\n1. Add all intervals that end before new interval starts.\n2. Merge all overlapping intervals.\n3. Add all remaining intervals."
      },
      {
        title: "Implementation",
        content: "Track the merged interval as you go.",
        codeNote: "Three-Phase Processing: Before, During (merge), After. Time: O(N). Space: O(N).",
        relatedTopicLink: "prob-merge-intervals",
        code: `def insert(intervals, newInterval):
    result = []
    i = 0
    n = len(intervals)
    
    # 1. Add all intervals before newInterval
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1
    
    # 2. Merge overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)
    
    # 3. Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1
    
    return result`
      }
    ]
  },
  {
    id: "prob-meeting-rooms",
    category: "Solved Problems",
    title: "Meeting Rooms II",
    description: "Find minimum number of meeting rooms required. Uses heap or sweep line.",
    sections: [
      {
        title: "The Task",
        content: "Given an array of meeting time intervals, find the minimum number of conference rooms required."
      },
      {
        title: "Strategy",
        content: "Sort by start time. Use a min-heap to track end times of ongoing meetings. If a new meeting starts after the earliest ending meeting, reuse that room."
      },
      {
        title: "Implementation",
        content: "Heap stores end times of current meetings.",
        codeNote: "Min-Heap for End Times: If new meeting starts after heap top, pop and push. Else just push. Time: O(N log N). Space: O(N).",
        relatedTopicLink: "py-dsa-heap",
        code: `import heapq

def min_meeting_rooms(intervals):
    if not intervals:
        return 0
    
    intervals.sort(key=lambda x: x[0])  # Sort by start time
    heap = []  # Min-heap of end times
    
    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heappop(heap)  # Reuse room
        heapq.heappush(heap, end)
    
    return len(heap)

# Example: [[0,30],[5,10],[15,20]]
# Returns 2`
      }
    ]
  }
];
