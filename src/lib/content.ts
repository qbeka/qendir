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
  // PYTHON DSA (EXPANDED)
  // =========================================
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
    title: "Trees & Graphs",
    description: "Hierarchical data structures. Most 'Hard' interview problems involve Graphs or Trees.",
    sections: [
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
        title: "BFS vs DFS (Crucial)",
        content: "- **BFS**: Uses a **Queue**. Finds the *shortest path* in unweighted graphs. Explores neighbors first.\n- **DFS**: Uses a **Stack** (or Recursion). Good for exhaustive search (mazes, puzzles) or checking connectivity.",
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
                queue.append(neighbor)`
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
        title: "Merge Sort (Divide & Conquer)",
        content: "Recursively split the list in half until you have single items. Then 'merge' them back together in sorted order. Guaranteed O(N log N) time, but uses O(N) extra memory.",
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
        codeNote: "Review Recursion: We pass 'path' down every call to build the error trace.",
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
        codeNote: "Stack (LIFO): Last-In, First-Out. Using a stack allows us to isolate transaction layers.",
        relatedTopicLink: "py-dsa-linear",
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
        codeNote: "Stack Operation: Pop is O(1). Merge is O(N*K) where N is stack depth.",
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
        codeNote: "Bisect is Python's Binary Search. bisect_left finds the first insertion point. Crucial for Range Queries.",
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
        codeNote: "String Splitting: Using maxsplit=1 is a pro move to avoid splitting the body if it contains the delimiter.",
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
        content: "1. \`set_cell(id, formula)\`: e.g., \`set('A1', 'B1+C1')\`\\n2. \`get_cell(id)\`: Returns evaluated value.\\n3. If B1 changes, A1 must update automatically."
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
        codeNote: "Base62 Encoding: Maps an integer ID to a short string. Essential for URL shorteners to keep URLs short.",
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
        codeNote: "Modulo Arithmetic: `(ptr + 1) % N` creates the circular behavior without `if ptr == N` checks.",
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
        codeNote: "Trie Traversal: Searching a prefix is O(L) where L is prefix length. DFS is O(V) where V is number of descendants.",
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
  }
];
