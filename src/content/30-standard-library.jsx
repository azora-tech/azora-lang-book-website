import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function StandardLibrary() {
  return (
    <Section id="standard-library" title="Standard Library">
      <p className="mt-2 text-az-35">
        The standard library ships as built-in modules imported with <code className="text-az-primary">use</code>.
        Every module uses the same language features available to user code. Import a module and
        optionally bring its contents into scope:
      </p>
      <CodeBlock>{`use std.math
use scope std::math   // brings PI, E, etc. into scope directly`}</CodeBlock>

      {/* ── 35.1 std.math ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.1 std.math</h3>
      <p className="mt-2 text-az-35">Constants and common numeric operations.</p>
      <CodeBlock>{`use scope std::math

std::math::PI     // 3.14159265358979
std::math::E      // 2.71828182845905
std::math::TAU    // 6.28318530717959`}</CodeBlock>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>{'abs<T>(x: T): T'}</code>, 'Absolute value'],
          [<code>{'min<T>(a: T, b: T): T'}</code>, 'Minimum of two values'],
          [<code>{'max<T>(a: T, b: T): T'}</code>, 'Maximum of two values'],
          [<code>{'clamp<T>(x: T, lo: T, hi: T): T'}</code>, 'Clamp to range [lo, hi]'],
          [<code>{'sign<T>(x: T): Int'}</code>, 'Sign: -1, 0, or 1'],
          [<code>{'lerp(a: Real, b: Real, t: Real): Real'}</code>, 'Linear interpolation'],
          [<code>{'pow<T>(base: T, exp: Int): T'}</code>, 'Exponentiation'],
          [<code>{'factorial<T>(n: T): T'}</code>, 'n!'],
          [<code>{'fib<T>(n: T): T'}</code>, 'Nth Fibonacci number'],
          [<code>{'gcd<T>(a: T, b: T): T'}</code>, 'Greatest common divisor'],
          [<code>{'lcm<T>(a: T, b: T): T'}</code>, 'Least common multiple'],
          [<code>{'isEven<T>(n: T): Bool'}</code>, 'Parity check (even)'],
          [<code>{'isOdd<T>(n: T): Bool'}</code>, 'Parity check (odd)'],
          [<code>{'sum<T>(arr: T[]): T'}</code>, 'Sum of integer array'],
          [<code>{'sumReal<T>(arr: T[]): T'}</code>, 'Sum of real array'],
          [<code>{'product<T>(arr: T[]): T'}</code>, 'Product of array elements'],
        ]}
      />
      <p className="mt-4 text-az-35">
        Trigonometric, logarithmic, and exponential functions are available
        under <code className="text-az-primary">std::math</code> as non-generic functions bridged to platform math libraries:
      </p>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>sin(x: Real): Real</code>, 'Sine'],
          [<code>cos(x: Real): Real</code>, 'Cosine'],
          [<code>tan(x: Real): Real</code>, 'Tangent'],
          [<code>asin(x: Real): Real</code>, 'Arc sine'],
          [<code>acos(x: Real): Real</code>, 'Arc cosine'],
          [<code>atan(x: Real): Real</code>, 'Arc tangent'],
          [<code>atan2(y: Real, x: Real): Real</code>, 'Two-argument arc tangent'],
          [<code>sqrt(x: Real): Real</code>, 'Square root'],
          [<code>cbrt(x: Real): Real</code>, 'Cube root'],
          [<code>log(x: Real): Real</code>, 'Natural logarithm'],
          [<code>log2(x: Real): Real</code>, 'Base-2 logarithm'],
          [<code>log10(x: Real): Real</code>, 'Base-10 logarithm'],
          [<code>exp(x: Real): Real</code>, 'Euler exponentiation (e^x)'],
          [<code>hypot(x: Real, y: Real): Real</code>, 'Hypotenuse'],
        ]}
      />
      <CodeBlock>{`use scope std::math

fin angle = PI / 4.0
fin s = sin(angle)         // ~0.707
fin c = cos(angle)         // ~0.707
fin root = sqrt(144.0)     // 12.0`}</CodeBlock>

      {/* ── 35.2 std.functional ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.2 std.functional</h3>
      <p className="mt-2 text-az-35">Higher-order function utilities for array transformation and reduction.</p>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>{'identity<T>(x: T): T'}</code>, 'Returns the value unchanged'],
          [<code>{'map<T>(arr: [T], f: (T) -> T): [T]'}</code>, 'Transform each element'],
          [<code>{'filter<T>(arr: [T], pred: (T) -> Bool): [T]'}</code>, 'Keep elements matching predicate'],
          [<code>{'reduce<T>(arr: [T], initial: T, f: (T, T) -> T): T'}</code>, 'Reduce to single value'],
          [<code>{'forEach<T>(arr: [T], action: (T) -> Unit)'}</code>, 'Apply action to each element'],
          [<code>{'any<T>(arr: [T], pred: (T) -> Bool): Bool'}</code>, 'True if any element matches'],
          [<code>{'all<T>(arr: [T], pred: (T) -> Bool): Bool'}</code>, 'True if all elements match'],
          [<code>{'none<T>(arr: [T], pred: (T) -> Bool): Bool'}</code>, 'True if no elements match'],
          [<code>{'take<T>(arr: [T], n: Int): [T]'}</code>, 'First N elements'],
          [<code>{'drop<T>(arr: [T], n: Int): [T]'}</code>, 'Skip first N elements'],
          [<code>{'zip<T>(a: [T], b: [T]): [[T]]'}</code>, 'Pair elements from two arrays'],
          [<code>{'fill<T>(value: T, count: Int): [T]'}</code>, 'Create array filled with value'],
          [<code>{'generate<T>(count: T, f: (T) -> T): [T]'}</code>, 'Generate array from index function'],
          [<code>{'countWhere<T>(arr: [T], pred: (T) -> Bool): Int'}</code>, 'Count matching elements'],
          [<code>{'findOr<T>(arr: [T], pred: (T) -> Bool, default: T): T'}</code>, 'First match or default'],
          [<code>{'flatMap<T>(arr: [T], f: (T) -> [T]): [T]'}</code>, 'Map and flatten'],
          [<code>{'fold<T>(arr: [T], initial: T, f: (T, T) -> T): T'}</code>, 'Left fold'],
          [<code>{'scan<T>(arr: [T], initial: T, f: (T, T) -> T): [T]'}</code>, 'All intermediate fold results'],
          [<code>{'partition<T>(arr: [T], pred: (T) -> Bool): [[T]]'}</code>, 'Split into matching/non-matching'],
          [<code>{'chunk<T>(arr: [T], size: Int): [[T]]'}</code>, 'Split into fixed-size chunks'],
          [<code>{'flatten<T>(arr: [[T]]): [T]'}</code>, 'Flatten nested array by one level'],
          [<code>{'distinct<T>(arr: [T]): [T]'}</code>, 'Remove duplicates, keep first occurrence'],
          [<code>{'slice<T>(arr: [T], start: Int, end: Int): [T]'}</code>, 'Extract sub-range'],
        ]}
      />
      <CodeBlock>{`use scope std

var nums = [1, 2, 3, 4, 5]
var doubled = map<Int>(nums, { it * 2 })       // [2, 4, 6, 8, 10]
var evens = filter<Int>(nums, { it % 2 == 0 }) // [2, 4]
var total = reduce<Int>(nums, 0, { a, b -> a + b })  // 15
var hasNeg = any<Int>(nums, { it < 0 })        // false`}</CodeBlock>

      {/* ── 35.3 std.algorithm ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.3 std.algorithm</h3>
      <p className="mt-2 text-az-35">Sorting, searching, and array manipulation.</p>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>{'sort<T>(arr: [T]): [T]'}</code>, 'Sort ascending (returns new array)'],
          [<code>{'sortDescending<T>(arr: [T]): [T]'}</code>, 'Sort descending'],
          [<code>{'isSorted<T>(arr: [T]): Bool'}</code>, 'Check if sorted ascending'],
          [<code>{'isSortedDescending<T>(arr: [T]): Bool'}</code>, 'Check if sorted descending'],
          [<code>{'reverse<T>(arr: [T]): [T]'}</code>, 'Reverse array'],
          [<code>{'unique<T>(arr: [T]): [T]'}</code>, 'Remove consecutive duplicates'],
          [<code>{'swap<T>(arr: [T], i: Int, j: Int): [T]'}</code>, 'Swap two elements by index'],
          [<code>{'rotateLeft<T>(arr: [T], n: Int): [T]'}</code>, 'Rotate left by n positions'],
          [<code>{'mergeSort<T>(arr: [T]): [T]'}</code>, 'O(n log n) stable merge sort'],
          [<code>{'merge<T>(a: [T], b: [T]): [T]'}</code>, 'Merge two sorted arrays'],
          [<code>{'sortBy<T>(arr: [T], key: (T) -> T): [T]'}</code>, 'Sort by key function'],
          [<code>{'groupBy<T>(arr: [T], key: (T) -> T): [[T]]'}</code>, 'Group elements by key'],
          [<code>{'interleave<T>(a: [T], b: [T]): [T]'}</code>, 'Alternate elements from two arrays'],
          [<code>{'windows<T>(arr: [T], size: Int): [[T]]'}</code>, 'Sliding window'],
          [<code>{'linearSearch<T>(arr: [T], target: T): Int'}</code>, 'Linear search, returns index or -1'],
          [<code>{'binarySearch<T>(arr: [T], target: T): Int'}</code>, 'Binary search (array must be sorted)'],
          [<code>{'minOf<T>(arr: [T]): T'}</code>, 'Minimum element'],
          [<code>{'maxOf<T>(arr: [T]): T'}</code>, 'Maximum element'],
          [<code>{'count<T>(arr: [T], target: T): Int'}</code>, 'Count occurrences'],
        ]}
      />
      <CodeBlock>{`use scope std

var data = [5, 3, 8, 1, 4]
var sorted = sort<Int>(data)            // [1, 3, 4, 5, 8]
var desc = sortDescending<Int>(data)    // [8, 5, 4, 3, 1]
var idx = binarySearch<Int>(sorted, 4)  // 2
var biggest = maxOf<Int>(data)          // 8
var rev = reverse<Int>(data)            // [4, 1, 8, 3, 5]`}</CodeBlock>

      {/* ── 35.4 std.container ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.4 std.container</h3>
      <p className="mt-2 text-az-35">
        Generic container types backed by pointer arrays with automatic growth.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Tuple</h4>
      <p className="mt-2 text-az-35">
        A fixed-size heterogeneous container using variadic type parameters.
        Requires at least two elements. Fields are accessed by position.
      </p>
      <CodeBlock>{`var t = Tuple(1, 2.3, "hello", true)
t.0    // 1
t.1    // 2.3`}</CodeBlock>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">List&lt;T&gt;</h4>
      <p className="mt-2 text-az-35">Dynamically-sized ordered collection.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>add(element: T)</code>, 'Append element'],
          [<code>insert(index: Int, element: T)</code>, 'Insert at index'],
          [<code>get(index: Int): T</code>, 'Read element at index'],
          [<code>set(index: Int, element: T)</code>, 'Replace element at index'],
          [<code>removeAt(index: Int): T</code>, 'Remove and return element'],
          [<code>removeFirst(): T</code>, 'Remove and return first'],
          [<code>removeLast(): T</code>, 'Remove and return last'],
          [<code>contains(element: T): Bool</code>, 'Membership test'],
          [<code>indexOf(element: T): Int</code>, 'First index of element, or -1'],
          [<code>{'subList(from: Int, to: Int): List<T>'}</code>, 'Sub-range [from, to)'],
          [<code>clear()</code>, 'Remove all elements'],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Properties: <code className="text-az-primary">length</code>,{' '}
        <code className="text-az-primary">isEmpty</code>,{' '}
        <code className="text-az-primary">isNotEmpty</code>,{' '}
        <code className="text-az-primary">first</code>,{' '}
        <code className="text-az-primary">last</code>,{' '}
        <code className="text-az-primary">reversed</code>.
        Functional: <code className="text-az-primary">forEach</code>,{' '}
        <code className="text-az-primary">map</code>,{' '}
        <code className="text-az-primary">filter</code>,{' '}
        <code className="text-az-primary">any</code>,{' '}
        <code className="text-az-primary">all</code>,{' '}
        <code className="text-az-primary">none</code>,{' '}
        <code className="text-az-primary">count</code>.
        Supports <code className="text-az-primary">oper[]</code> and{' '}
        <code className="text-az-primary">oper[]=</code>.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Set&lt;T&gt;</h4>
      <p className="mt-2 text-az-35">Unique-element collection with set algebra.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>add(element: T): Bool</code>, 'Add element (false if duplicate)'],
          [<code>remove(element: T): Bool</code>, 'Remove element'],
          [<code>contains(element: T): Bool</code>, 'Membership test'],
          [<code>{'union(other: Set<T>): Set<T>'}</code>, 'Union of two sets'],
          [<code>{'intersect(other: Set<T>): Set<T>'}</code>, 'Intersection'],
          [<code>{'difference(other: Set<T>): Set<T>'}</code>, 'Set difference'],
          [<code>clear()</code>, 'Remove all elements'],
        ]}
      />

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Map&lt;K, V&gt;</h4>
      <p className="mt-2 text-az-35">Key-value dictionary backed by parallel pointer arrays.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>put(key: K, value: V)</code>, 'Insert or update entry'],
          [<code>get(key: K): V</code>, 'Get value by key'],
          [<code>getOrDefault(key: K, default: V): V</code>, 'Get or return fallback'],
          [<code>remove(key: K): V</code>, 'Remove entry and return value'],
          [<code>containsKey(key: K): Bool</code>, 'Check if key exists'],
          [<code>containsValue(value: V): Bool</code>, 'Check if value exists'],
          [<code>keys(): [K]</code>, 'Array of all keys'],
          [<code>values(): [V]</code>, 'Array of all values'],
          [<code>clear()</code>, 'Remove all entries'],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Supports <code className="text-az-primary">oper[:]</code> and{' '}
        <code className="text-az-primary">oper[:]=</code> for key access.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Stack&lt;T&gt; / Queue&lt;T&gt;</h4>
      <Table
        headers={['Type', 'Operations']}
        rows={[
          [<code>{'Stack<T>'}</code>, <span><code>push(element)</code>, <code>pop(): T</code>, <code>peek(): T</code>, <code>clear()</code></span>],
          [<code>{'Queue<T>'}</code>, <span><code>enqueue(element)</code>, <code>dequeue(): T</code>, <code>peek(): T</code>, <code>clear()</code></span>],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Both expose <code className="text-az-primary">length</code>,{' '}
        <code className="text-az-primary">isEmpty</code>, and{' '}
        <code className="text-az-primary">isNotEmpty</code> properties.
      </p>

      <h4 className="text-base font-semibold mt-4 mb-1 text-az-30">Deque&lt;T&gt;</h4>
      <p className="mt-2 text-az-35">
        Double-ended queue supporting O(1) push/pop at both ends, implemented as a circular buffer
        with automatic resizing.
      </p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>pushFront(value: T)</code>, 'Add to front'],
          [<code>pushBack(value: T)</code>, 'Add to back'],
          [<code>popFront(): T</code>, 'Remove and return front'],
          [<code>popBack(): T</code>, 'Remove and return back'],
          [<code>peekFront(): T</code>, 'View front without removing'],
          [<code>peekBack(): T</code>, 'View back without removing'],
          [<code>clear()</code>, 'Remove all elements'],
        ]}
      />
      <CodeBlock>{`use std.container
use scope std

var dq = Deque<Int>()
dq.pushBack(1)
dq.pushBack(2)
dq.pushFront(0)
assert dq.popFront() == 0
assert dq.popBack() == 2`}</CodeBlock>

      {/* ── 35.5 std.string ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.5 std.string</h3>
      <p className="mt-2 text-az-35">String manipulation utilities.</p>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>strLength(s: String): Int</code>, 'String length'],
          [<code>strCharAt(s: String, index: Int): Char!StringError</code>, 'Character at index'],
          [<code>strSlice(s: String, start: Int, end: Int): String</code>, 'Substring [start, end)'],
          [<code>strStartsWith(s: String, prefix: String): Bool</code>, 'Prefix check'],
          [<code>strEndsWith(s: String, suffix: String): Bool</code>, 'Suffix check'],
          [<code>strContains(s: String, sub: String): Bool</code>, 'Substring search'],
          [<code>strIndexOf(s: String, sub: String): Int</code>, 'First occurrence index, or -1'],
          [<code>strTrim(s: String): String</code>, 'Remove leading/trailing whitespace'],
          [<code>strToUpper(s: String): String</code>, 'Convert to uppercase'],
          [<code>strToLower(s: String): String</code>, 'Convert to lowercase'],
          [<code>strReplace(s: String, old: String, new: String): String</code>, 'Replace all occurrences'],
          [<code>strSplit(s: String, delim: String): [String]</code>, 'Split by delimiter'],
          [<code>strReverse(s: String): String</code>, 'Reverse a string'],
          [<code>strRepeat(s: String, n: Int): String</code>, 'Repeat n times'],
          [<code>strIsEmpty(s: String): Bool</code>, 'Check if empty'],
          [<code>strIsNotEmpty(s: String): Bool</code>, 'Check if non-empty'],
          [<code>strIsNumeric(s: String): Bool</code>, 'All digits'],
          [<code>strIsAlpha(s: String): Bool</code>, 'All alphabetic'],
          [<code>strToChars(s: String): [Char]</code>, 'Convert to character array'],
          [<code>charsToString(chars: [Char]): String</code>, 'Build string from characters'],
        ]}
      />
      <CodeBlock>{`use scope std

fin s = "Hello, World!"
assert strLength(s) == 13
assert strContains(s, "World")
assert strToUpper(s) == "HELLO, WORLD!"

fin parts = strSplit("a,b,c", ",")    // ["a", "b", "c"]
fin rev = strReverse("abc")           // "cba"`}</CodeBlock>

      {/* ── 35.6 std.random ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.6 std.random</h3>
      <p className="mt-2 text-az-35">
        Pseudo-random number generation using a Linear Congruential Generator (LCG).
        Not cryptographically secure, suitable for games, simulations, and testing.
      </p>
      <Table
        headers={['Method / Function', 'Description']}
        rows={[
          [<code>Random(seed: Int)</code>, 'Create PRNG with seed'],
          [<code>rng.next(): Int</code>, 'Next pseudo-random integer'],
          [<code>rng.nextInt(max: Int): Int</code>, 'Random integer in [0, max)'],
          [<code>rng.nextRange(min: Int, max: Int): Int</code>, 'Random integer in [min, max]'],
          [<code>rng.nextBool(): Bool</code>, 'Random boolean'],
          [<code>{'shuffle<T>(arr: [T], rng: Random): [T]'}</code>, 'Fisher-Yates shuffle'],
          [<code>{'sample<T>(arr: [T], count: Int, rng: Random): [T]'}</code>, 'Random sample of n elements'],
        ]}
      />
      <CodeBlock>{`use scope std

var rng = Random(seed: 42)
fin n = rng.nextInt(100)          // random 0..99
fin b = rng.nextBool()            // random true/false
fin r = rng.nextRange(1, 6)       // random 1..6 (dice roll)

var cards = [1, 2, 3, 4, 5]
var shuffled = shuffle<Int>(cards, rng)
var hand = sample<Int>(cards, 3, rng)`}</CodeBlock>

      {/* ── 35.7 std.traits ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.7 std.traits</h3>
      <p className="mt-2 text-az-35">Core type specifications for generic programming.</p>
      <Table
        headers={['Spec', 'Implementors', 'Description']}
        rows={[
          [<code>Equatable</code>, 'Int, Real, String, Char, Bool', 'Supports == and !='],
          [<code>Comparable</code>, 'Int, Real, String, Char', 'Supports < and >'],
          [<code>Displayable</code>, 'Int, Real, String, Char, Bool', 'Has string representation'],
          [<code>Numeric</code>, 'Int, Real', 'Supports arithmetic operators'],
          [<code>Hashable</code>, 'Int, String, Char, Bool', 'Can be used as hash keys'],
          [<code>Copyable</code>, 'Int, Real, String, Char, Bool', 'Can be copied by value'],
        ]}
      />
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">promote</code> type function determines the widest
        type among a set of numeric types at compile time:
      </p>
      <CodeBlock>{`type promote(T: Type...) where T.length >= 2 {
    // promote(Int, Real) -> Real
    // promote(Int, Int) -> Int
}`}</CodeBlock>

      {/* ── 35.8 std.sync ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.8 std.sync</h3>
      <p className="mt-2 text-az-35">Synchronization primitives built on the language's <code className="text-az-primary">Mutex</code> and <code className="text-az-primary">Atomic</code> builtins.</p>
      <Table
        headers={['Type', 'Description']}
        rows={[
          [<code>{'Guard<T>'}</code>, <span>Mutex-protected value. Methods: <code>read(action)</code>, <code>write(action)</code>, <code>get(): T</code></span>],
          [<code>{'CountDownLatch<T>'}</code>, <span>Thread coordination. Methods: <code>countDown()</code>. Property: <code>isReached</code></span>],
          [<code>{'SpinLock<T>'}</code>, <span>CAS-based spin lock. Methods: <code>acquire()</code>, <code>release()</code>, <code>withLock(action)</code></span>],
        ]}
      />
      <CodeBlock>{`use std.sync
use scope std

var guard = Guard(value: 0)
guard.write({ it + 1 })
guard.read({ println(it) })   // 1

withMutex(myMutex) {
    // critical section
}`}</CodeBlock>

      {/* ── 35.9 std.channel ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.9 std.channel</h3>
      <p className="mt-2 text-az-35">Thread-safe FIFO message channel for inter-coroutine communication.</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>send(value: T)</code>, 'Send a message (asserts not closed)'],
          [<code>receive(): T</code>, 'Receive next message (asserts not empty)'],
          [<code>tryReceive(default: T): T</code>, 'Receive or return default'],
          [<code>close()</code>, 'Close the channel'],
        ]}
      />
      <p className="mt-2 text-sm text-az-50">
        Properties: <code className="text-az-primary">length</code>,{' '}
        <code className="text-az-primary">isEmpty</code>,{' '}
        <code className="text-az-primary">isClosed</code>.
      </p>
      <CodeBlock>{`use std.channel
use scope std

var ch = Channel<Int>()
ch.send(42)
fin msg = ch.receive()   // 42
ch.close()`}</CodeBlock>

      {/* ── 35.10 std.concurrency ── */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">35.10 std.concurrency</h3>
      <p className="mt-2 text-az-35">Higher-level async patterns built on coroutines.</p>
      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>delayed(ms: Int, action: () -&gt; Unit)</code>, 'Execute action after delay'],
          [<code>{'timeout<T>(ms: T, action: () -> Unit): Bool'}</code>, 'Run with timeout, returns success'],
          [<code>{'retry<T>(attempts: T, delayMs: T, action: () -> Bool): Bool'}</code>, 'Retry action up to N times'],
          [<code>{'parallel<T>(tag: T, a: () -> Unit, b: () -> Unit)'}</code>, 'Run two actions concurrently, wait for both'],
          [<code>{'race<T>(tag: T, a: () -> Unit, b: () -> Unit)'}</code>, 'Run two actions, complete when first finishes'],
        ]}
      />
      <CodeBlock>{`use std.concurrency
use scope std

// Retry up to 3 times with 100ms delay
await retry(3, 100) {
    return tryConnect()
}

// Run with 5 second timeout
await timeout(5000) {
    fetchData()
}

// Run two tasks in parallel
await parallel("load") {
    loadTextures()
} {
    loadSounds()
}`}</CodeBlock>
    </Section>
  )
}
