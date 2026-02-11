const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Subject = require('./models/Subject');

dotenv.config();

const subjects = [
  // Semester 1
  {
    name: 'C/C++ Programming',
    semester: 1,
    timer: 10,
    totalMarks: 10,
    order: 1,
    questions: [
      { questionText: 'Which of the following is not a valid C data type?', options: ['int', 'float', 'string', 'char'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is the output of printf("%d", 5/2)?', options: ['2', '2.5', '2.0', 'Error'], correctAnswer: 0, marks: 1 },
      { questionText: 'Which header file is required for printf()?', options: ['<stdlib.h>', '<stdio.h>', '<string.h>', '<math.h>'], correctAnswer: 1, marks: 1 },
      { questionText: 'What does the break statement do in a loop?', options: ['Continues the next iteration', 'Terminates the loop', 'Returns a value', 'None'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which operator is used to access a structure member?', options: ['->', '.', '::', '&'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the size of int in C (32-bit system)?', options: ['2 bytes', '4 bytes', '8 bytes', '1 byte'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which function is used to allocate memory dynamically?', options: ['alloc()', 'malloc()', 'new()', 'create()'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is a pointer?', options: ['A variable that stores address', 'A function', 'A data type', 'An operator'], correctAnswer: 0, marks: 1 },
      { questionText: 'Which keyword is used to prevent modification of a variable?', options: ['static', 'const', 'volatile', 'extern'], correctAnswer: 1, marks: 1 },
      { questionText: 'What does argc represent in main(int argc, char *argv[])?', options: ['Argument count', 'Argument character', 'Array count', 'Array character'], correctAnswer: 0, marks: 1 }
    ]
  },
  {
    name: 'Discrete Mathematics',
    semester: 1,
    timer: 10,
    totalMarks: 10,
    order: 2,
    questions: [
      { questionText: 'What is the power set of {a, b}?', options: ['{a, b}', '{{}, {a}, {b}, {a,b}}', '{a, b, ab}', '{a, b, {}}'], correctAnswer: 1, marks: 1 },
      { questionText: 'How many edges does a complete graph K5 have?', options: ['5', '10', '15', '20'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which of these is a tautology?', options: ['P ∧ ¬P', 'P ∨ ¬P', 'P → ¬P', 'P ↔ ¬P'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is 10! / 8!?', options: ['45', '90', '72', '80'], correctAnswer: 1, marks: 1 },
      { questionText: 'A relation that is reflexive, symmetric, and transitive is called?', options: ['Partial order', 'Equivalence relation', 'Total order', 'Function'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the contrapositive of "If P then Q"?', options: ['If Q then P', 'If ¬Q then ¬P', 'If ¬P then ¬Q', 'If Q then ¬P'], correctAnswer: 1, marks: 1 },
      { questionText: 'How many subsets does a set with n elements have?', options: ['n', 'n²', '2ⁿ', 'n!'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is the chromatic number of K4?', options: ['2', '3', '4', '5'], correctAnswer: 2, marks: 1 },
      { questionText: 'In Boolean algebra, A + A\' = ?', options: ['0', '1', 'A', 'A\''], correctAnswer: 1, marks: 1 },
      { questionText: 'Euler\'s formula for planar graphs is?', options: ['V - E + F = 2', 'V + E - F = 2', 'V - E - F = 2', 'V + E + F = 2'], correctAnswer: 0, marks: 1 }
    ]
  },
  // Semester 2
  {
    name: 'Object Oriented Programming',
    semester: 2,
    timer: 10,
    totalMarks: 10,
    order: 3,
    questions: [
      { questionText: 'Which OOP concept binds data and functions together?', options: ['Abstraction', 'Encapsulation', 'Polymorphism', 'Inheritance'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is a virtual function?', options: ['Static function', 'Function overridden in derived class', 'Inline function', 'Friend function'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which access specifier makes members accessible only within the class?', options: ['public', 'private', 'protected', 'friend'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the use of a constructor?', options: ['Destroy objects', 'Initialize objects', 'Copy objects', 'Compare objects'], correctAnswer: 1, marks: 1 },
      { questionText: 'Multiple inheritance means?', options: ['One class inherits from multiple classes', 'Multiple classes inherit from one', 'No inheritance', 'Chain of inheritance'], correctAnswer: 0, marks: 1 },
      { questionText: 'Which keyword is used for inheritance in C++?', options: ['extends', 'implements', ':', 'inherits'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is polymorphism?', options: ['One name many forms', 'Many names one form', 'No form', 'Fixed form'], correctAnswer: 0, marks: 1 },
      { questionText: 'Abstract class contains at least one?', options: ['Static function', 'Pure virtual function', 'Inline function', 'Friend function'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which operator cannot be overloaded?', options: ['+', '-', '::', '<<'], correctAnswer: 2, marks: 1 },
      { questionText: 'Destructor is called when?', options: ['Object is created', 'Object goes out of scope', 'Function is called', 'Loop starts'], correctAnswer: 1, marks: 1 }
    ]
  },
  {
    name: 'Data Structures',
    semester: 2,
    timer: 10,
    totalMarks: 10,
    order: 4,
    questions: [
      { questionText: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Array', 'Tree'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the worst case of quicksort?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], correctAnswer: 1, marks: 1 },
      { questionText: 'A binary tree has maximum nodes at level L?', options: ['L', '2L', '2^L', 'L²'], correctAnswer: 2, marks: 1 },
      { questionText: 'Which data structure is used in BFS?', options: ['Stack', 'Queue', 'Heap', 'Array'], correctAnswer: 1, marks: 1 },
      { questionText: 'Hash collision can be resolved by?', options: ['Sorting', 'Chaining', 'Recursion', 'Iteration'], correctAnswer: 1, marks: 1 },
      { questionText: 'Inorder traversal of BST gives?', options: ['Random order', 'Sorted order', 'Reverse order', 'Level order'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswer: 2, marks: 1 },
      { questionText: 'Which is not a linear data structure?', options: ['Array', 'Linked List', 'Tree', 'Queue'], correctAnswer: 2, marks: 1 },
      { questionText: 'Stack uses which principle?', options: ['FIFO', 'LIFO', 'FILO', 'Both B and C'], correctAnswer: 3, marks: 1 }
    ]
  },
  // Semester 3
  {
    name: 'Algorithms',
    semester: 3,
    timer: 10,
    totalMarks: 10,
    order: 5,
    questions: [
      { questionText: 'What is the time complexity of Dijkstra\'s algorithm?', options: ['O(V²)', 'O(V+E)', 'O(E log V)', 'O(V² log V)'], correctAnswer: 0, marks: 1 },
      { questionText: 'Which technique does merge sort use?', options: ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Backtracking'], correctAnswer: 1, marks: 1 },
      { questionText: 'Bellman-Ford can handle?', options: ['Only positive weights', 'Negative weights', 'No weights', 'Only unit weights'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the time complexity of Prim\'s algorithm?', options: ['O(V²)', 'O(E²)', 'O(V+E)', 'O(V log V)'], correctAnswer: 0, marks: 1 },
      { questionText: 'Knapsack problem is solved using?', options: ['Greedy only', 'Dynamic Programming', 'BFS', 'Sorting'], correctAnswer: 1, marks: 1 },
      { questionText: 'What does Big-O notation represent?', options: ['Best case', 'Average case', 'Upper bound', 'Lower bound'], correctAnswer: 2, marks: 1 },
      { questionText: 'NP-complete problems are?', options: ['Easy to solve', 'Hard to solve, easy to verify', 'Impossible', 'Already solved'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which sorting algorithm is stable?', options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'], correctAnswer: 2, marks: 1 },
      { questionText: 'Huffman coding is used for?', options: ['Sorting', 'Searching', 'Compression', 'Encryption'], correctAnswer: 2, marks: 1 },
      { questionText: 'Topological sort is possible for?', options: ['Undirected graph', 'DAG', 'Cyclic graph', 'Complete graph'], correctAnswer: 1, marks: 1 }
    ]
  },
  {
    name: 'Database Management Systems',
    semester: 3,
    timer: 10,
    totalMarks: 10,
    order: 6,
    questions: [
      { questionText: 'Which normal form removes transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: 2, marks: 1 },
      { questionText: 'ACID stands for?', options: ['Atomic, Consistent, Independent, Durable', 'Atomicity, Consistency, Isolation, Durability', 'Automatic, Consistent, Isolated, Durable', 'None'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which SQL command is used to remove a table?', options: ['DELETE', 'REMOVE', 'DROP', 'TRUNCATE'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is a primary key?', options: ['Any column', 'Unique identifier for a row', 'Foreign reference', 'Index'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which join returns all rows from both tables?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correctAnswer: 3, marks: 1 },
      { questionText: 'What is a view in SQL?', options: ['A table', 'A virtual table', 'A database', 'A schema'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which is a NoSQL database?', options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'], correctAnswer: 2, marks: 1 },
      { questionText: 'Deadlock occurs when?', options: ['Two transactions wait for each other', 'Single transaction fails', 'DB crashes', 'Index is missing'], correctAnswer: 0, marks: 1 },
      { questionText: 'B+ tree is used for?', options: ['Sorting', 'Indexing', 'Hashing', 'Compression'], correctAnswer: 1, marks: 1 },
      { questionText: 'What does GROUP BY do?', options: ['Sorts data', 'Groups rows by column values', 'Filters data', 'Joins tables'], correctAnswer: 1, marks: 1 }
    ]
  },
  // Semester 4
  {
    name: 'Operating Systems',
    semester: 4,
    timer: 10,
    totalMarks: 10,
    order: 7,
    questions: [
      { questionText: 'What is a process?', options: ['A file', 'A program in execution', 'A thread', 'A function'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which scheduling algorithm has the shortest average wait time?', options: ['FCFS', 'SJF', 'Round Robin', 'Priority'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is thrashing?', options: ['Fast processing', 'Excessive paging', 'Memory allocation', 'CPU scheduling'], correctAnswer: 1, marks: 1 },
      { questionText: 'Semaphore is used for?', options: ['Memory management', 'Process synchronization', 'File management', 'I/O scheduling'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which page replacement algorithm is optimal?', options: ['FIFO', 'LRU', 'Optimal (Belady)', 'Random'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is virtual memory?', options: ['Physical RAM', 'Extended storage using disk', 'Cache memory', 'ROM'], correctAnswer: 1, marks: 1 },
      { questionText: 'A deadlock requires how many conditions?', options: ['2', '3', '4', '5'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is a thread?', options: ['Heavy process', 'Lightweight process', 'File', 'Socket'], correctAnswer: 1, marks: 1 },
      { questionText: 'What does fork() return to child?', options: ['-1', '0', 'PID of parent', 'PID of child'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which memory allocation strategy is best fit?', options: ['Allocates first fit', 'Allocates smallest sufficient block', 'Allocates largest block', 'Random allocation'], correctAnswer: 1, marks: 1 }
    ]
  },
  {
    name: 'Computer Networks',
    semester: 4,
    timer: 10,
    totalMarks: 10,
    order: 8,
    questions: [
      { questionText: 'How many layers does the OSI model have?', options: ['5', '6', '7', '4'], correctAnswer: 2, marks: 1 },
      { questionText: 'TCP is a _____ protocol.', options: ['Connectionless', 'Connection-oriented', 'Stateless', 'Simple'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which layer handles routing?', options: ['Transport', 'Network', 'Data Link', 'Application'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the default port for HTTP?', options: ['21', '25', '80', '443'], correctAnswer: 2, marks: 1 },
      { questionText: 'DNS resolves?', options: ['IP to MAC', 'Domain to IP', 'MAC to IP', 'IP to domain'], correctAnswer: 1, marks: 1 },
      { questionText: 'What protocol does ping use?', options: ['TCP', 'UDP', 'ICMP', 'ARP'], correctAnswer: 2, marks: 1 },
      { questionText: 'Subnet mask 255.255.255.0 means?', options: ['8-bit network', '16-bit network', '24-bit network', '32-bit network'], correctAnswer: 2, marks: 1 },
      { questionText: 'Which topology has a single point of failure?', options: ['Ring', 'Star', 'Mesh', 'Bus'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is MTU?', options: ['Maximum Transfer Unit', 'Minimum Transfer Unit', 'Maximum Transmission Unit', 'Minimum Transmission Unit'], correctAnswer: 2, marks: 1 },
      { questionText: 'ARP is used to find?', options: ['IP address', 'MAC address', 'Port number', 'Domain name'], correctAnswer: 1, marks: 1 }
    ]
  },
  // Semester 5
  {
    name: 'Compiler Design',
    semester: 5,
    timer: 10,
    totalMarks: 10,
    order: 9,
    questions: [
      { questionText: 'First phase of a compiler is?', options: ['Parser', 'Lexical Analysis', 'Code Generation', 'Optimization'], correctAnswer: 1, marks: 1 },
      { questionText: 'Lexical analyzer produces?', options: ['Parse tree', 'Tokens', 'Assembly code', 'Machine code'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which parsing is bottom-up?', options: ['Recursive Descent', 'LL(1)', 'LR', 'Predictive'], correctAnswer: 2, marks: 1 },
      { questionText: 'Symbol table stores?', options: ['Only variables', 'Identifiers and their attributes', 'Only functions', 'Only constants'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is an intermediate representation?', options: ['Source code', 'Machine code', 'Code between source and target', 'Binary'], correctAnswer: 2, marks: 1 },
      { questionText: 'Context-free grammar is used in?', options: ['Lexical analysis', 'Syntactic analysis', 'Semantic analysis', 'Code generation'], correctAnswer: 1, marks: 1 },
      { questionText: 'Dead code elimination is a type of?', options: ['Parsing', 'Optimization', 'Lexing', 'Linking'], correctAnswer: 1, marks: 1 },
      { questionText: 'What does a linker do?', options: ['Compiles code', 'Links object files', 'Parses code', 'Optimizes code'], correctAnswer: 1, marks: 1 },
      { questionText: 'Peephole optimization works on?', options: ['Entire program', 'Small window of instructions', 'Single function', 'Single variable'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which is not a compiler phase?', options: ['Lexer', 'Parser', 'Interpreter', 'Optimizer'], correctAnswer: 2, marks: 1 }
    ]
  },
  {
    name: 'Theory of Computation',
    semester: 5,
    timer: 10,
    totalMarks: 10,
    order: 10,
    questions: [
      { questionText: 'DFA stands for?', options: ['Direct Finite Automaton', 'Deterministic Finite Automaton', 'Dynamic Finite Automaton', 'Distributed Finite Automaton'], correctAnswer: 1, marks: 1 },
      { questionText: 'Pumping lemma is used to prove?', options: ['Language is regular', 'Language is not regular', 'Language is context-free', 'Language is recursive'], correctAnswer: 1, marks: 1 },
      { questionText: 'Turing machine has?', options: ['Finite tape', 'Infinite tape', 'No tape', 'Circular tape'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which language is accepted by PDA?', options: ['Regular', 'Context-free', 'Context-sensitive', 'Recursive'], correctAnswer: 1, marks: 1 },
      { questionText: 'Halting problem is?', options: ['Decidable', 'Undecidable', 'Semi-decidable', 'Regular'], correctAnswer: 1, marks: 1 },
      { questionText: 'NFA can have ___ transitions?', options: ['Only one', 'Multiple for same input', 'No transitions', 'Only self-loops'], correctAnswer: 1, marks: 1 },
      { questionText: 'Chomsky hierarchy has how many types?', options: ['2', '3', '4', '5'], correctAnswer: 2, marks: 1 },
      { questionText: 'Regular expressions describe?', options: ['Type 0 languages', 'Type 1 languages', 'Type 2 languages', 'Type 3 languages'], correctAnswer: 3, marks: 1 },
      { questionText: 'Epsilon transition means?', options: ['No input consumed', 'Input is epsilon', 'End of string', 'Error state'], correctAnswer: 0, marks: 1 },
      { questionText: 'CYK algorithm is for?', options: ['DFA minimization', 'CFL parsing', 'Turing machine simulation', 'NFA to DFA conversion'], correctAnswer: 1, marks: 1 }
    ]
  },
  // Semester 6
  {
    name: 'Software Engineering',
    semester: 6,
    timer: 10,
    totalMarks: 10,
    order: 11,
    questions: [
      { questionText: 'Which model is called classical life cycle?', options: ['Spiral', 'Waterfall', 'Agile', 'V-model'], correctAnswer: 1, marks: 1 },
      { questionText: 'What does SDLC stand for?', options: ['Software Design Life Cycle', 'Software Development Life Cycle', 'System Design Life Cycle', 'System Development Life Cycle'], correctAnswer: 1, marks: 1 },
      { questionText: 'Black box testing tests?', options: ['Internal structure', 'Functionality without knowing internals', 'Code coverage', 'Performance'], correctAnswer: 1, marks: 1 },
      { questionText: 'UML stands for?', options: ['Unified Modeling Language', 'Universal Modeling Language', 'Unified Machine Language', 'Universal Machine Language'], correctAnswer: 0, marks: 1 },
      { questionText: 'Which is an Agile methodology?', options: ['Waterfall', 'Scrum', 'Spiral', 'RAD'], correctAnswer: 1, marks: 1 },
      { questionText: 'Coupling should be?', options: ['High', 'Low', 'Medium', 'None'], correctAnswer: 1, marks: 1 },
      { questionText: 'Cohesion should be?', options: ['Low', 'Medium', 'High', 'None'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is regression testing?', options: ['Testing new features', 'Re-testing after changes', 'Load testing', 'Security testing'], correctAnswer: 1, marks: 1 },
      { questionText: 'COCOMO is used for?', options: ['Testing', 'Cost estimation', 'Design', 'Coding'], correctAnswer: 1, marks: 1 },
      { questionText: 'Risk management is most emphasized in?', options: ['Waterfall', 'V-model', 'Spiral', 'Agile'], correctAnswer: 2, marks: 1 }
    ]
  },
  {
    name: 'Machine Learning',
    semester: 6,
    timer: 10,
    totalMarks: 10,
    order: 12,
    questions: [
      { questionText: 'Supervised learning requires?', options: ['Unlabeled data', 'Labeled data', 'No data', 'Random data'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which is a classification algorithm?', options: ['K-Means', 'Linear Regression', 'Decision Tree', 'PCA'], correctAnswer: 2, marks: 1 },
      { questionText: 'Overfitting means?', options: ['Model too simple', 'Model memorizes training data', 'Model underfits', 'Model is balanced'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the purpose of cross-validation?', options: ['Train model', 'Evaluate model performance', 'Deploy model', 'Clean data'], correctAnswer: 1, marks: 1 },
      { questionText: 'K-Means is a _____ algorithm?', options: ['Supervised', 'Unsupervised', 'Semi-supervised', 'Reinforcement'], correctAnswer: 1, marks: 1 },
      { questionText: 'Gradient descent minimizes?', options: ['Accuracy', 'Loss function', 'Data size', 'Features'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which metric is used for regression?', options: ['Accuracy', 'F1 Score', 'MSE', 'Precision'], correctAnswer: 2, marks: 1 },
      { questionText: 'Random Forest is an ensemble of?', options: ['SVMs', 'Decision Trees', 'Neural Networks', 'KNN'], correctAnswer: 1, marks: 1 },
      { questionText: 'Bias-variance tradeoff suggests?', options: ['High bias = overfitting', 'High variance = overfitting', 'Both should be high', 'Both should be zero'], correctAnswer: 1, marks: 1 },
      { questionText: 'Feature scaling is important for?', options: ['Decision Trees', 'KNN', 'Random Forest', 'Naive Bayes'], correctAnswer: 1, marks: 1 }
    ]
  },
  // Semester 7
  {
    name: 'Cryptography & Network Security',
    semester: 7,
    timer: 10,
    totalMarks: 10,
    order: 13,
    questions: [
      { questionText: 'AES stands for?', options: ['Advanced Encryption Standard', 'Advanced Encryption System', 'Automated Encryption Standard', 'Advanced Electronic Standard'], correctAnswer: 0, marks: 1 },
      { questionText: 'RSA is based on?', options: ['Discrete log', 'Factoring large primes', 'Elliptic curves', 'Hash functions'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is a digital signature?', options: ['Handwritten signature', 'Encrypted hash of a message', 'Password', 'OTP'], correctAnswer: 1, marks: 1 },
      { questionText: 'SHA-256 produces a hash of?', options: ['128 bits', '256 bits', '512 bits', '64 bits'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which is a symmetric encryption algorithm?', options: ['RSA', 'AES', 'ECC', 'Diffie-Hellman'], correctAnswer: 1, marks: 1 },
      { questionText: 'SSL/TLS operates at which layer?', options: ['Network', 'Transport', 'Between Transport and Application', 'Data Link'], correctAnswer: 2, marks: 1 },
      { questionText: 'What is a firewall?', options: ['Hardware only', 'Network security system', 'Antivirus', 'VPN'], correctAnswer: 1, marks: 1 },
      { questionText: 'Man-in-the-middle attack targets?', options: ['Data at rest', 'Communication channel', 'Database', 'File system'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is the purpose of a nonce?', options: ['Encryption key', 'Prevent replay attacks', 'Hash value', 'Session ID'], correctAnswer: 1, marks: 1 },
      { questionText: 'PKI stands for?', options: ['Public Key Interface', 'Public Key Infrastructure', 'Private Key Infrastructure', 'Private Key Interface'], correctAnswer: 1, marks: 1 }
    ]
  },
  {
    name: 'Cloud Computing',
    semester: 7,
    timer: 10,
    totalMarks: 10,
    order: 14,
    questions: [
      { questionText: 'IaaS stands for?', options: ['Internet as a Service', 'Infrastructure as a Service', 'Information as a Service', 'Integration as a Service'], correctAnswer: 1, marks: 1 },
      { questionText: 'Which is a public cloud provider?', options: ['VMware', 'AWS', 'OpenStack', 'Docker'], correctAnswer: 1, marks: 1 },
      { questionText: 'Virtualization allows?', options: ['Single OS', 'Multiple virtual machines on one host', 'No OS', 'Only Linux'], correctAnswer: 1, marks: 1 },
      { questionText: 'Docker containers are?', options: ['Virtual machines', 'Lightweight isolated processes', 'Physical servers', 'Databases'], correctAnswer: 1, marks: 1 },
      { questionText: 'Kubernetes is used for?', options: ['Database management', 'Container orchestration', 'Version control', 'Code compilation'], correctAnswer: 1, marks: 1 },
      { questionText: 'SaaS example is?', options: ['AWS EC2', 'Google Docs', 'AWS S3', 'Docker'], correctAnswer: 1, marks: 1 },
      { questionText: 'Auto-scaling means?', options: ['Manual scaling', 'Automatic resource adjustment', 'Fixed resources', 'No scaling'], correctAnswer: 1, marks: 1 },
      { questionText: 'What is serverless computing?', options: ['No servers exist', 'Server management abstracted away', 'Client-side only', 'P2P computing'], correctAnswer: 1, marks: 1 },
      { questionText: 'CDN stands for?', options: ['Central Data Network', 'Content Delivery Network', 'Cloud Data Network', 'Content Distribution Node'], correctAnswer: 1, marks: 1 },
      { questionText: 'Multi-tenancy means?', options: ['Single user system', 'Multiple users share resources', 'No sharing', 'Private cloud only'], correctAnswer: 1, marks: 1 }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Subject.deleteMany({});
    await User.deleteMany({ role: 'admin' });

    // Create subjects
    await Subject.insertMany(subjects);
    console.log('✅ 14 subjects with questions seeded');

    // Create admin user
    const admin = await User.create({
      name: 'LCS Admin',
      email: 'admin@lcs.com',
      college: 'IIIT Surat',
      password: 'admin123',
      role: 'admin'
    });
    console.log(`✅ Admin created: ${admin.email} / admin123`);

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
