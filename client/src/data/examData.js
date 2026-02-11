// ─── Core CS Assessment — Question Bank ──────────────────────────────────────
// 4 Rounds · 13 Subjects · 26 Passages · 78 MCQs
// Answer key is stored server-side only (examController.js).
// ──────────────────────────────────────────────────────────────────────────────

export const examData = {
  rounds: [
    // ═══════════════════════════════════════════════════════════════════════════
    // ROUND 1 — PROGRAMMING FOUNDATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 1,
      name: "Programming Foundations",
      sections: [
        // ── FCP – Passage 1 ── Key: C, C, B
        {
          title: "FCP – Passage 1",
          passage:
            "A first-year engineering student is tasked with writing a C program that reads N integers from the user one at a time and outputs their sum. The value of N can be extremely large (up to 10⁸). The student has limited memory available on the target embedded system (only a few kilobytes of RAM). Additionally, the integers can be very large positive values, and the sum could exceed the range of a standard 32-bit int. The student must choose the right strategy and data types to ensure the program runs correctly under these constraints.",
          questions: [
            {
              id: "R1_FCP_P1_Q1",
              text: "What is the most memory-efficient approach to compute the sum of N integers?",
              options: [
                "Store all N integers in an array, then iterate to find the sum",
                "Sort the integers first, then compute a prefix sum",
                "Maintain a running total, adding each integer as it is read",
                "Use deep recursion to accumulate the sum",
              ],

            },
            {
              id: "R1_FCP_P1_Q2",
              text: "If the integers arrive as a continuous stream (one at a time), what is the most appropriate way to hold the current input?",
              options: [
                "A dynamically allocated array",
                "A linked list node",
                "A single temporary variable",
                "A stack data structure",
              ],

            },
            {
              id: "R1_FCP_P1_Q3",
              text: "To prevent integer overflow when summing very large positive values, which data type modification is most appropriate in C?",
              options: [
                "Use float instead of int",
                "Use long long instead of int",
                "Ignore the issue; overflow rarely happens in practice",
                "Store the sum as a string",
              ],

            },
          ],
        },

        // ── FCP – Passage 2 ── Key: B, C, B
        {
          title: "FCP – Passage 2",
          passage:
            "A developer is building a command-line utility in C that searches for a specific keyword in a large text file. The file may be several gigabytes in size. The program must read the file line by line, compare each line against the keyword, and print matching lines with their line numbers. Performance and memory efficiency are both critical, as the tool may be used on machines with limited resources.",
          questions: [
            {
              id: "R1_FCP_P2_Q1",
              text: "Which I/O approach is best suited for processing such a large file line by line?",
              options: [
                "Read the entire file into memory using malloc, then process",
                "Use fgets() in a loop to read one line at a time into a fixed buffer",
                "Use fread() to load the file in one system call",
                "Memory-map the file and parse manually",
              ],

            },
            {
              id: "R1_FCP_P2_Q2",
              text: "Which standard library function compares two strings and is appropriate for keyword matching?",
              options: [
                "strcpy()",
                "strlen()",
                "strstr()",
                "memset()",
              ],

            },
            {
              id: "R1_FCP_P2_Q3",
              text: "To track the current line number, what is the simplest and most efficient approach?",
              options: [
                "Store all line numbers in an array",
                "Increment a counter variable each time a line is read",
                "Compute line number from byte offset",
                "Use a recursive function to count lines",
              ],

            },
          ],
        },

        // ── OOPS – Passage 1 ── Key: C, C, B
        {
          title: "OOPS – Passage 1",
          passage:
            "A software team is designing a Shape hierarchy in C++. The base class Shape has a draw() method. Derived classes like Circle, Rectangle, and Triangle each implement draw() differently. The rendering engine receives a collection of Shape pointers and must call the appropriate draw() for each, without knowing the concrete type at compile time. The team wants to eliminate long if-else or switch chains.",
          questions: [
            {
              id: "R1_OOPS_P1_Q1",
              text: "Which OOP concept allows the rendering engine to call the correct draw() on each Shape pointer at runtime?",
              options: [
                "Encapsulation",
                "Inheritance",
                "Polymorphism",
                "Abstraction",
              ],

            },
            {
              id: "R1_OOPS_P1_Q2",
              text: "What mechanism does C++ use to resolve function calls on base-class pointers at runtime?",
              options: [
                "Function overloading",
                "Static dispatch",
                "Dynamic binding (vtable lookup)",
                "Method chaining",
              ],

            },
            {
              id: "R1_OOPS_P1_Q3",
              text: "How can the team avoid if-else chains when adding new Shapes?",
              options: [
                "Use global functions for each shape type",
                "Declare draw() as virtual in the base class and override it in each subclass",
                "Use C-style macros to dispatch calls",
                "Mark draw() as static in each class",
              ],

            },
          ],
        },

        // ── OOPS – Passage 2 ── Key: B, C, B
        {
          title: "OOPS – Passage 2",
          passage:
            "An e-commerce platform has a Payment base class with a processPayment() method. Subclasses include CreditCardPayment, UPIPayment, and WalletPayment. The checkout module receives a Payment reference and calls processPayment(). The team notices that adding a new payment method currently requires editing the checkout module's conditional logic. They want a cleaner, extensible architecture.",
          questions: [
            {
              id: "R1_OOPS_P2_Q1",
              text: "Which design principle suggests that the checkout module should depend on the Payment abstraction rather than concrete classes?",
              options: [
                "Single Responsibility Principle",
                "Open/Closed Principle",
                "Liskov Substitution Principle",
                "DRY Principle",
              ],

            },
            {
              id: "R1_OOPS_P2_Q2",
              text: "What C++ feature ensures that the correct processPayment() is called through a Payment pointer?",
              options: [
                "Template specialization",
                "Operator overloading",
                "Virtual functions",
                "Friend functions",
              ],

            },
            {
              id: "R1_OOPS_P2_Q3",
              text: "What is the primary benefit of using polymorphism in this scenario?",
              options: [
                "Faster compilation times",
                "New payment methods can be added without modifying the checkout module",
                "Reduced memory usage for payment objects",
                "Automatic error handling in payments",
              ],

            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ROUND 2 — CORE COMPUTER SCIENCE
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 2,
      name: "Core Computer Science",
      sections: [
        // ── DSA – Passage 1 ── Key: C, B, C
        {
          title: "DSA – Passage 1",
          passage:
            "A logistics company needs to find the shortest delivery routes between warehouses in a weighted, directed graph with no negative edge weights. The graph has V vertices and E edges. The team is evaluating algorithms such as BFS, Dijkstra's, and Bellman-Ford. They also need an efficient priority queue for the chosen algorithm.",
          questions: [
            {
              id: "R2_DSA_P1_Q1",
              text: "Which algorithm is the most efficient choice for shortest paths in this graph (non-negative weights)?",
              options: [
                "Breadth-First Search (BFS)",
                "Bellman-Ford Algorithm",
                "Dijkstra's Algorithm",
                "Floyd-Warshall Algorithm",
              ],

            },
            {
              id: "R2_DSA_P1_Q2",
              text: "What data structure is typically used to optimize Dijkstra's for efficient minimum extraction?",
              options: [
                "Stack",
                "Min-Heap (Priority Queue)",
                "Hash Table",
                "Doubly Linked List",
              ],

            },
            {
              id: "R2_DSA_P1_Q3",
              text: "What is the time complexity of Dijkstra's algorithm when using a binary min-heap?",
              options: [
                "O(V²)",
                "O(V × E)",
                "O((V + E) log V)",
                "O(E²)",
              ],

            },
          ],
        },

        // ── DSA – Passage 2 ── Key: A, B, C
        {
          title: "DSA – Passage 2",
          passage:
            "A social media platform needs to detect cycles in its user-follow graph to identify mutual-follow clusters. The graph is directed and may contain millions of nodes. The engineering team is considering DFS-based approaches with coloring (white/gray/black) to detect back edges.",
          questions: [
            {
              id: "R2_DSA_P2_Q1",
              text: "In DFS-based cycle detection, a cycle is confirmed when a traversal encounters which type of edge?",
              options: [
                "A back edge (edge to a gray/in-progress node)",
                "A forward edge (edge to a descendant)",
                "A cross edge (edge to a fully processed node)",
                "A tree edge (edge to an unvisited node)",
              ],

            },
            {
              id: "R2_DSA_P2_Q2",
              text: "What is the time complexity of DFS-based cycle detection on a graph with V vertices and E edges?",
              options: [
                "O(V²)",
                "O(V + E)",
                "O(E log V)",
                "O(V × E)",
              ],

            },
            {
              id: "R2_DSA_P2_Q3",
              text: "Which data structure is implicitly used by the recursive DFS to track the current path?",
              options: [
                "Queue",
                "Hash Map",
                "Call Stack",
                "Priority Queue",
              ],

            },
          ],
        },

        // ── DD – Passage 1 ── Key: C, B, C
        {
          title: "DD – Passage 1",
          passage:
            "A hardware design team is building a 4-bit binary adder circuit. They need to decide between a ripple-carry adder and a carry-lookahead adder. The ripple-carry adder chains full adders sequentially, while the carry-lookahead computes carry signals in parallel using generate and propagate logic. The design must minimize propagation delay for a time-critical embedded application.",
          questions: [
            {
              id: "R2_DD_P1_Q1",
              text: "Why is a carry-lookahead adder faster than a ripple-carry adder?",
              options: [
                "It uses fewer transistors overall",
                "It avoids using full adders entirely",
                "It computes carry bits in parallel rather than sequentially",
                "It stores intermediate results in flip-flops",
              ],

            },
            {
              id: "R2_DD_P1_Q2",
              text: "In carry-lookahead logic, the 'generate' signal G_i for bit position i equals:",
              options: [
                "A_i XOR B_i",
                "A_i AND B_i",
                "A_i OR B_i",
                "NOT A_i",
              ],

            },
            {
              id: "R2_DD_P1_Q3",
              text: "What is the propagation delay order of a carry-lookahead adder for n bits?",
              options: [
                "O(n)",
                "O(n²)",
                "O(log n)",
                "O(1)",
              ],

            },
          ],
        },

        // ── DD – Passage 2 ── Key: B, C, B
        {
          title: "DD – Passage 2",
          passage:
            "A team is designing a synchronous sequential circuit to detect the bit pattern '101' in a serial input stream. They choose a Moore machine, where outputs depend only on the current state. The machine uses D flip-flops clocked by a system clock. States are encoded and transitions are driven by the input bit at each clock edge.",
          questions: [
            {
              id: "R2_DD_P2_Q1",
              text: "What distinguishes a Moore machine from a Mealy machine?",
              options: [
                "Moore machines have fewer states than Mealy machines",
                "In a Moore machine, output depends only on the current state",
                "In a Moore machine, output depends on both state and input",
                "Moore machines do not require a clock signal",
              ],

            },
            {
              id: "R2_DD_P2_Q2",
              text: "How many states are needed at minimum for a Moore machine detecting the pattern '101'?",
              options: [
                "2 states",
                "3 states",
                "4 states",
                "5 states",
              ],

            },
            {
              id: "R2_DD_P2_Q3",
              text: "Why are D flip-flops preferred for storing state in synchronous circuits?",
              options: [
                "They require no clock input",
                "They reliably capture input data on each clock edge, preventing race conditions",
                "They are combinational elements with no memory",
                "They can store multiple bits per flip-flop",
              ],

            },
          ],
        },

        // ── COA – Passage 1 ── Key: B, B, B
        {
          title: "COA – Passage 1",
          passage:
            "A CPU architect is designing a 5-stage instruction pipeline: Fetch (IF), Decode (ID), Execute (EX), Memory Access (MEM), and Write Back (WB). During testing, the team discovers that certain instruction sequences cause data hazards — for example, when an ADD instruction writes a register that the immediately following SUB instruction reads. The team needs techniques to handle these pipeline hazards without simply stalling.",
          questions: [
            {
              id: "R2_COA_P1_Q1",
              text: "What technique forwards the result from the EX stage directly to the next instruction's input, avoiding a stall?",
              options: [
                "Branch prediction",
                "Data forwarding (bypassing)",
                "Instruction reordering",
                "Cache prefetching",
              ],

            },
            {
              id: "R2_COA_P1_Q2",
              text: "What type of hazard occurs when an instruction depends on the result of a preceding instruction that hasn't completed?",
              options: [
                "Structural hazard",
                "Data hazard (RAW — Read After Write)",
                "Control hazard",
                "Memory hazard",
              ],

            },
            {
              id: "R2_COA_P1_Q3",
              text: "If forwarding cannot resolve a load-use hazard, what is the necessary fallback?",
              options: [
                "Flush the entire pipeline",
                "Insert a pipeline bubble (stall for one cycle)",
                "Skip the dependent instruction",
                "Switch to a different thread",
              ],

            },
          ],
        },

        // ── COA – Passage 2 ── Key: B, B, A
        {
          title: "COA – Passage 2",
          passage:
            "A system designer is evaluating cache performance for a CPU with a two-level cache hierarchy (L1 and L2). The L1 cache has a hit time of 1 cycle and a miss rate of 5%. The L2 cache has a hit time of 10 cycles and a miss rate of 20% (of L1 misses). Main memory access time is 100 cycles. The designer wants to compute the effective memory access time (EMAT) to assess whether the hierarchy meets latency targets.",
          questions: [
            {
              id: "R2_COA_P2_Q1",
              text: "What is the formula for Effective Memory Access Time (EMAT) with a two-level cache?",
              options: [
                "L1_hit_time + L1_miss_rate × L2_hit_time",
                "L1_hit_time + L1_miss_rate × (L2_hit_time + L2_miss_rate × Memory_time)",
                "L1_hit_time × L1_hit_rate + L2_hit_time × L2_hit_rate",
                "(L1_hit_time + L2_hit_time + Memory_time) / 3",
              ],

            },
            {
              id: "R2_COA_P2_Q2",
              text: "Using the given values, what is the EMAT?",
              options: [
                "1.5 cycles",
                "2.5 cycles",
                "5.0 cycles",
                "11.0 cycles",
              ],

            },
            {
              id: "R2_COA_P2_Q3",
              text: "Which cache mapping strategy offers the best trade-off between hit rate and hardware complexity for L1 caches?",
              options: [
                "Set-associative mapping",
                "Direct mapping",
                "Fully associative mapping",
                "Random replacement mapping",
              ],

            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ROUND 3 — SYSTEMS & SOFTWARE ENGINEERING
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 3,
      name: "Systems & Software Engineering",
      sections: [
        // ── OS – Passage 1 ── Key: C, B, A
        {
          title: "OS – Passage 1",
          passage:
            "A multi-threaded server application running on Linux experiences occasional deadlocks. Upon investigation, the team finds that two threads each hold one mutex and are waiting for the other. The system has four resources, and six threads compete for them. The team must understand the conditions for deadlock and evaluate prevention strategies such as strict resource ordering.",
          questions: [
            {
              id: "R3_OS_P1_Q1",
              text: "According to Coffman's conditions, which is NOT a necessary condition for deadlock?",
              options: [
                "Mutual Exclusion",
                "Hold and Wait",
                "Preemption (resources can be forcibly taken)",
                "Circular Wait",
              ],

            },
            {
              id: "R3_OS_P1_Q2",
              text: "What is the most practical prevention strategy that eliminates circular wait?",
              options: [
                "Allow only one thread to run at a time",
                "Impose a strict ordering on resource acquisition",
                "Convert all resources to sharable mode",
                "Kill threads at random intervals",
              ],

            },
            {
              id: "R3_OS_P1_Q3",
              text: "The Banker's Algorithm is used for which deadlock handling strategy?",
              options: [
                "Deadlock avoidance — it checks if granting a request leaves the system in a safe state",
                "Deadlock detection — it finds existing circular waits",
                "Deadlock prevention — it removes mutual exclusion",
                "Deadlock recovery — it rolls back transactions",
              ],

            },
          ],
        },

        // ── OS – Passage 2 ── Key: B, A, C
        {
          title: "OS – Passage 2",
          passage:
            "An operating system supports demand paging with a page size of 4 KB. A process has a virtual address space of 4 GB. When a page is not in physical memory, a page fault occurs, and the OS must load the page from disk. The system uses the LRU (Least Recently Used) page replacement algorithm. The team wants to understand page table sizing and the impact of page faults on performance.",
          questions: [
            {
              id: "R3_OS_P2_Q1",
              text: "How many entries does a single-level page table need for a 4 GB address space with 4 KB pages?",
              options: [
                "512 K entries",
                "1 M entries (2²⁰)",
                "4 M entries",
                "16 M entries",
              ],

            },
            {
              id: "R3_OS_P2_Q2",
              text: "What is the key advantage of LRU over FIFO page replacement?",
              options: [
                "LRU exploits temporal locality — recently used pages are likely to be used again",
                "LRU uses less memory for bookkeeping",
                "LRU is simpler to implement in hardware",
                "LRU never causes page faults",
              ],

            },
            {
              id: "R3_OS_P2_Q3",
              text: "What problem does a multi-level page table solve?",
              options: [
                "It speeds up TLB lookups",
                "It increases the page size dynamically",
                "It avoids allocating page table entries for unused regions of the address space",
                "It eliminates page faults entirely",
              ],

            },
          ],
        },

        // ── DBMS – Passage 1 ── Key: B, B, C
        {
          title: "DBMS – Passage 1",
          passage:
            "A university database stores Students, Courses, and Enrollments. The Enrollments table references both Students and Courses via foreign keys. A query joins all three tables to generate a report of each student's enrolled courses with grades. The DBA notices the query is slow on large datasets and is considering indexing strategies and normalization review.",
          questions: [
            {
              id: "R3_DBMS_P1_Q1",
              text: "Which type of index would most improve the performance of the join on Enrollments.student_id?",
              options: [
                "Full-text index",
                "B-tree index on the foreign key column",
                "Hash index on the primary key",
                "Bitmap index on the grade column",
              ],

            },
            {
              id: "R3_DBMS_P1_Q2",
              text: "What normal form eliminates transitive dependencies?",
              options: [
                "1NF",
                "3NF (Third Normal Form)",
                "BCNF",
                "2NF",
              ],

            },
            {
              id: "R3_DBMS_P1_Q3",
              text: "What does the foreign key constraint on Enrollments.student_id enforce?",
              options: [
                "Uniqueness of student names",
                "That grades must be within a valid range",
                "Referential integrity — every student_id in Enrollments must exist in Students",
                "Automatic deletion of student records",
              ],

            },
          ],
        },

        // ── DBMS – Passage 2 ── Key: B, B, B
        {
          title: "DBMS – Passage 2",
          passage:
            "A banking application uses transactions to process fund transfers. Each transfer debits one account and credits another. The system must ensure that if a debit succeeds but the credit fails (e.g., due to a crash), the entire operation is rolled back. The DBA must ensure ACID properties are maintained, and the team is evaluating isolation levels to handle concurrent transfers.",
          questions: [
            {
              id: "R3_DBMS_P2_Q1",
              text: "Which ACID property ensures that a transaction either fully completes or has no effect?",
              options: [
                "Consistency",
                "Atomicity",
                "Isolation",
                "Durability",
              ],

            },
            {
              id: "R3_DBMS_P2_Q2",
              text: "Which isolation level prevents dirty reads but still allows non-repeatable reads?",
              options: [
                "Read Uncommitted",
                "Read Committed",
                "Repeatable Read",
                "Serializable",
              ],

            },
            {
              id: "R3_DBMS_P2_Q3",
              text: "What mechanism does the DBMS use to support rollback of failed transactions?",
              options: [
                "Checkpoints only",
                "Write-Ahead Logging (WAL)",
                "Shadow paging only",
                "Timestamp ordering",
              ],

            },
          ],
        },

        // ── CN – Passage 1 ── Key: C, B, B
        {
          title: "CN – Passage 1",
          passage:
            "A company is designing a reliable file transfer protocol over an unreliable network. Packets may be lost, duplicated, or arrive out of order. The protocol must detect lost packets via timeouts, retransmit them, handle duplicates using sequence numbers, and ensure in-order delivery to the application. The team is comparing Go-Back-N and Selective Repeat ARQ strategies.",
          questions: [
            {
              id: "R3_CN_P1_Q1",
              text: "Which ARQ variant retransmits only the specific packets that were lost, not the entire window?",
              options: [
                "Stop-and-Wait",
                "Go-Back-N",
                "Selective Repeat",
                "Sliding Window without ARQ",
              ],

            },
            {
              id: "R3_CN_P1_Q2",
              text: "What is the primary purpose of sequence numbers in a reliable transfer protocol?",
              options: [
                "To encrypt the packet payload",
                "To detect duplicates and ensure in-order reassembly",
                "To calculate the checksum",
                "To route packets through the network",
              ],

            },
            {
              id: "R3_CN_P1_Q3",
              text: "In Go-Back-N, what happens when a packet in the middle of the window is lost?",
              options: [
                "Only the lost packet is retransmitted",
                "The sender retransmits the lost packet and all subsequent packets in the window",
                "The receiver discards all packets and resets the connection",
                "The sender doubles the window size and continues",
              ],

            },
          ],
        },

        // ── CN – Passage 2 ── Key: B, C, C
        {
          title: "CN – Passage 2",
          passage:
            "A network engineer is subnetting a Class C network (192.168.1.0/24) to create 6 subnets for different departments. Each subnet must support at least 25 hosts. The engineer must determine the correct subnet mask, the number of usable hosts per subnet, and verify that the design meets the requirements without wasting IP addresses excessively.",
          questions: [
            {
              id: "R3_CN_P2_Q1",
              text: "How many bits must be borrowed from the host portion to create at least 6 subnets?",
              options: [
                "2 bits (4 subnets)",
                "3 bits (8 subnets)",
                "4 bits (16 subnets)",
                "1 bit (2 subnets)",
              ],

            },
            {
              id: "R3_CN_P2_Q2",
              text: "With a /27 subnet mask, how many usable host addresses are available per subnet?",
              options: [
                "16",
                "32",
                "30",
                "62",
              ],

            },
            {
              id: "R3_CN_P2_Q3",
              text: "What is the subnet mask in dotted decimal for a /27 prefix?",
              options: [
                "255.255.255.192",
                "255.255.255.128",
                "255.255.255.224",
                "255.255.255.240",
              ],

            },
          ],
        },

        // ── SE – Passage 1 ── Key: B, B, B
        {
          title: "SE – Passage 1",
          passage:
            "A software team is choosing between Agile (Scrum) and Waterfall methodologies for a new mobile banking app. The client expects frequent iterations, early demos, and the ability to change requirements mid-development. The team consists of 8 developers and 2 testers. They need to decide on a methodology, define sprint lengths, and plan how to handle requirement changes efficiently.",
          questions: [
            {
              id: "R3_SE_P1_Q1",
              text: "Given the client's need for frequent iterations and mid-course requirement changes, which methodology is most suitable?",
              options: [
                "Waterfall — sequential phases ensure completeness",
                "Agile (Scrum) — iterative sprints allow frequent feedback and adaptation",
                "V-Model — rigid testing phases map to requirements",
                "Spiral — primarily for risk analysis in large projects",
              ],

            },
            {
              id: "R3_SE_P1_Q2",
              text: "In Scrum, what artifact contains the prioritized list of all desired product features?",
              options: [
                "Sprint Backlog",
                "Product Backlog",
                "Burndown Chart",
                "Release Plan",
              ],

            },
            {
              id: "R3_SE_P1_Q3",
              text: "What is the recommended sprint length for a Scrum team working on a project with frequently changing requirements?",
              options: [
                "1 month",
                "2 weeks",
                "6 weeks",
                "3 months",
              ],

            },
          ],
        },

        // ── SE – Passage 2 ── Key: A, C, A
        {
          title: "SE – Passage 2",
          passage:
            "A QA team is developing a test strategy for an e-commerce checkout module. The module has functions for applying discount codes, calculating tax, and processing payments. The team wants to write tests that verify internal logic paths (white-box) as well as tests based purely on input/output specifications (black-box). They also need to measure how thoroughly their tests exercise the code.",
          questions: [
            {
              id: "R3_SE_P2_Q1",
              text: "Which testing technique examines internal code structure and logic paths?",
              options: [
                "White-box testing",
                "Black-box testing",
                "Acceptance testing",
                "Exploratory testing",
              ],

            },
            {
              id: "R3_SE_P2_Q2",
              text: "What metric measures the percentage of code lines executed during testing?",
              options: [
                "Defect density",
                "Cyclomatic complexity",
                "Code coverage (line coverage)",
                "Function point analysis",
              ],

            },
            {
              id: "R3_SE_P2_Q3",
              text: "Boundary value analysis is a technique primarily associated with which testing approach?",
              options: [
                "Black-box testing — it tests at the edges of input ranges without knowing internals",
                "White-box testing — it requires seeing the code",
                "Integration testing — it tests module boundaries",
                "Regression testing — it tests previous failures",
              ],

            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ROUND 4 — ADVANCED TOPICS
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: 4,
      name: "Advanced Topics",
      sections: [
        // ── DAA – Passage 1 ── Key: C, B, C
        {
          title: "DAA – Passage 1",
          passage:
            "A logistics startup needs to solve the 0/1 Knapsack problem: given N items each with a weight and value, find the maximum total value that fits within a weight capacity W. N can be up to 1000 and W up to 10,000. The team evaluates greedy approaches versus dynamic programming. They need to understand time and space complexity to choose the right approach.",
          questions: [
            {
              id: "R4_DAA_P1_Q1",
              text: "Why does a greedy approach (sorting by value/weight ratio) NOT guarantee an optimal solution for the 0/1 Knapsack?",
              options: [
                "Greedy is always optimal for knapsack problems",
                "Greedy doesn't explore all combinations — it works only for fractional knapsack",
                "Because items cannot be split, greedy may miss better combinations by committing early",
                "Greedy has higher time complexity than DP",
              ],

            },
            {
              id: "R4_DAA_P1_Q2",
              text: "What is the time complexity of the DP solution for 0/1 Knapsack with N items and capacity W?",
              options: [
                "O(N log W)",
                "O(N × W)",
                "O(2^N)",
                "O(N²)",
              ],

            },
            {
              id: "R4_DAA_P1_Q3",
              text: "What technique can reduce the space complexity of the DP knapsack from O(N × W) to O(W)?",
              options: [
                "Memoization with a hash map",
                "Divide and conquer partitioning",
                "Using a single 1D array and iterating weights in reverse",
                "Sorting items by weight first",
              ],

            },
          ],
        },

        // ── DAA – Passage 2 ── Key: B, C, B
        {
          title: "DAA – Passage 2",
          passage:
            "A research team is analyzing the time complexity of various sorting algorithms. They need to prove a theoretical lower bound for comparison-based sorting and understand when non-comparison sorts like Radix Sort can outperform merge sort. The team is also evaluating the stability and in-place properties of each algorithm for their data pipeline.",
          questions: [
            {
              id: "R4_DAA_P2_Q1",
              text: "What is the lower bound time complexity for any comparison-based sorting algorithm?",
              options: [
                "O(n)",
                "O(n log n)",
                "O(n²)",
                "O(log n)",
              ],

            },
            {
              id: "R4_DAA_P2_Q2",
              text: "How can Radix Sort achieve O(n·k) time, beating O(n log n)?",
              options: [
                "It uses comparison-based partitioning",
                "It uses divide and conquer on sub-arrays",
                "It sorts digit-by-digit using counting sort, avoiding element comparisons",
                "It uses a priority queue for extraction",
              ],

            },
            {
              id: "R4_DAA_P2_Q3",
              text: "Which sorting algorithm is both stable and has O(n log n) worst-case time complexity?",
              options: [
                "Quick Sort",
                "Merge Sort",
                "Heap Sort",
                "Selection Sort",
              ],

            },
          ],
        },

        // ── ML – Passage 1 ── Key: B, C, B
        {
          title: "ML – Passage 1",
          passage:
            "A data science team is building a model to predict house prices based on features like area, number of bedrooms, and location. They start with linear regression but notice underfitting. They then try polynomial regression, which overfits on the training data. The team must balance bias and variance, and they are considering regularization techniques (L1/L2) to improve generalization.",
          questions: [
            {
              id: "R4_ML_P1_Q1",
              text: "When a model has high bias and low variance (underfitting), what is the best next step?",
              options: [
                "Reduce the number of features",
                "Increase model complexity (e.g., add polynomial features)",
                "Add more regularization",
                "Reduce the training set size",
              ],

            },
            {
              id: "R4_ML_P1_Q2",
              text: "What does L1 (Lasso) regularization do that L2 (Ridge) does not?",
              options: [
                "It penalizes large weights more aggressively",
                "It always produces lower training error",
                "It can drive some feature weights to exactly zero, enabling feature selection",
                "It prevents all overfitting completely",
              ],

            },
            {
              id: "R4_ML_P1_Q3",
              text: "What technique splits data into k subsets and rotates the validation set to get a more reliable performance estimate?",
              options: [
                "Train-test split",
                "K-fold cross-validation",
                "Bootstrapping",
                "Holdout validation",
              ],

            },
          ],
        },

        // ── ML – Passage 2 ── Key: B, B, B
        {
          title: "ML – Passage 2",
          passage:
            "A healthcare company is building a binary classifier to predict whether a patient has a certain disease. The dataset is imbalanced — only 5% of samples are positive. The team trains a logistic regression model and achieves 95% accuracy, but the recall for the positive class is only 20%. They need to choose appropriate evaluation metrics and techniques to handle class imbalance.",
          questions: [
            {
              id: "R4_ML_P2_Q1",
              text: "Why is accuracy a misleading metric for this imbalanced dataset?",
              options: [
                "Accuracy doesn't account for model complexity",
                "A model predicting all negatives would still achieve 95% accuracy, missing most actual positives",
                "Accuracy penalizes false positives too heavily",
                "Accuracy requires balanced class priors to compute",
              ],

            },
            {
              id: "R4_ML_P2_Q2",
              text: "Which metric measures the proportion of actual positives that the model correctly identifies?",
              options: [
                "Precision",
                "Recall (Sensitivity)",
                "Specificity",
                "F1-Score",
              ],

            },
            {
              id: "R4_ML_P2_Q3",
              text: "Which technique can help address class imbalance during model training?",
              options: [
                "Reducing the learning rate",
                "Oversampling the minority class (e.g., SMOTE) or using class weights",
                "Removing all features with low variance",
                "Using a larger test set",
              ],

            },
          ],
        },

        // ── HPC – Passage 1 ── Key: C, C, B
        {
          title: "HPC – Passage 1",
          passage:
            "A computational physics lab is parallelizing a matrix multiplication algorithm to run on a cluster with 64 cores. The sequential version takes 640 seconds. Using Amdahl's Law, they estimate speedup assuming 90% of the code is parallelizable. They also need to understand the difference between shared-memory (OpenMP) and distributed-memory (MPI) programming models.",
          questions: [
            {
              id: "R4_HPC_P1_Q1",
              text: "According to Amdahl's Law, what is the maximum theoretical speedup with 64 cores if 90% of the code is parallelizable?",
              options: [
                "64x",
                "32x",
                "Approximately 10x (limited by the 10% serial portion)",
                "90x",
              ],

            },
            {
              id: "R4_HPC_P1_Q2",
              text: "What is the key difference between OpenMP and MPI?",
              options: [
                "OpenMP is for GPUs; MPI is for CPUs only",
                "OpenMP is slower but more portable",
                "OpenMP uses shared memory with thread directives; MPI uses message passing between distributed processes",
                "MPI requires shared memory; OpenMP does not",
              ],

            },
            {
              id: "R4_HPC_P1_Q3",
              text: "In shared-memory parallelism, what synchronization primitive prevents race conditions when multiple threads update a shared variable?",
              options: [
                "Semaphore broadcast",
                "Mutex (mutual exclusion lock)",
                "Process fork",
                "Pipeline flush",
              ],

            },
          ],
        },

        // ── HPC – Passage 2 ── Key: B, B, B
        {
          title: "HPC – Passage 2",
          passage:
            "A GPU computing team is using CUDA to accelerate a deep learning training pipeline. The model performs large matrix operations (GEMM) during forward and backward passes. The team needs to optimize GPU utilization by tuning thread block sizes, maximizing occupancy, and minimizing data transfer between CPU (host) and GPU (device). They also monitor throughput in GFLOPS.",
          questions: [
            {
              id: "R4_HPC_P2_Q1",
              text: "Why is minimizing CPU-GPU data transfer critical for performance?",
              options: [
                "The GPU cannot process data from the CPU",
                "PCIe bus bandwidth is much lower than GPU memory bandwidth, making transfers a bottleneck",
                "Data transfers corrupt the computation results",
                "The CPU must be idle during transfers",
              ],

            },
            {
              id: "R4_HPC_P2_Q2",
              text: "What does GPU 'occupancy' measure?",
              options: [
                "The percentage of GPU memory used",
                "The ratio of active warps to the maximum warps supported by a streaming multiprocessor",
                "The clock speed of the GPU",
                "The number of CUDA cores in use",
              ],

            },
            {
              id: "R4_HPC_P2_Q3",
              text: "What is the primary advantage of using CUDA streams for overlapping computation and data transfer?",
              options: [
                "It reduces the total amount of data transferred",
                "It allows data transfer and kernel execution to happen concurrently, hiding transfer latency",
                "It increases GPU clock speed during transfers",
                "It eliminates the need for synchronization",
              ],

            },
          ],
        },
      ],
    },
  ],
};
