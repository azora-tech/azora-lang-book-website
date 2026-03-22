import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Collections() {
  return (
    <Section id="collections" title="Collections">
      <p>
        Azora provides built-in literal syntax for sets and maps alongside arrays, plus a suite of
        generic container packs in the standard library for dynamic, resizable data structures. This
        chapter covers both the literal forms and the stdlib containers.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.1 Sets</h3>
      <p className="mt-2 text-az-35">
        A set literal is written with <code className="text-az-primary">![</code> and{' '}
        <code className="text-az-primary">]</code>. Sets contain unique elements with no guaranteed
        order. The type annotation uses <code className="text-az-primary">![Type]</code>.
      </p>
      <CodeBlock>{`var s: ![Int] = ![1, 2, 3]
var empty: ![String] = ![]

// Duplicates are silently ignored:
var unique: ![Int] = ![1, 1, 2, 2, 3]   // ![1, 2, 3]`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Set literals support structural equality. Two set literals are equal if they contain the same
        elements, regardless of insertion order.
      </p>
      <CodeBlock>{`![1, 2, 3] == ![3, 2, 1]    // true
![1, 2] != ![1, 2, 3]      // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Mutability follows the binding keyword: <code className="text-az-primary">var</code> sets are
        mutable, <code className="text-az-primary">fin</code> sets are immutable.
      </p>
      <CodeBlock>{`var mutable: ![Int] = ![1, 2]    // mutable set
fin frozen: ![Int] = ![1, 2]    // immutable set`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.2 Maps</h3>
      <p className="mt-2 text-az-35">
        A map literal uses <code className="text-az-primary">[key: value]</code> syntax. The empty
        map is <code className="text-az-primary">[:]</code>. Type annotations use{' '}
        <code className="text-az-primary">[KeyType:ValueType]</code>.
      </p>
      <CodeBlock>{`var m: [String:Int] = ["a": 1, "b": 2, "c": 3]
var empty: [String:Int] = [:]`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Map key access uses the <code className="text-az-primary">[:key]</code> postfix syntax,
        which is distinct from array indexing (<code className="text-az-primary">[index]</code>).
        This keeps the two operations visually distinguishable.
      </p>
      <CodeBlock>{`// Read by key:
var val = m[:key]

// Write by key:
m[:key] = value`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Maps support operator overloading through <code className="text-az-primary">oper[:]</code>{' '}
        (read) and <code className="text-az-primary">oper[:]=</code> (write). Any type that defines
        these operators can use the bracket-colon syntax.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.3 {'List<T>'}</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">List</code> is a dynamic, resizable, pointer-backed
        container from the standard library. Unlike arrays (which are fixed-size), lists grow
        automatically as elements are added. Import with{' '}
        <code className="text-az-primary">use scope std</code>.
      </p>
      <CodeBlock>{`use scope std

var names = List<String>()
names.add("Alice")
names.add("Bob")
names.add("Carol")

println(names.length)    // 3
println(names[0])        // Alice
println(names.last)      // Carol`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Array literals can be coerced into lists when assigned to a{' '}
        <code className="text-az-primary">List</code>-typed variable:
      </p>
      <CodeBlock>{`var list: List<Int> = [1, 2, 3]    // array literal -> List`}</CodeBlock>

      <p className="mt-4 text-az-35">Key operations:</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>add(element)</code>, 'Append to end'],
          [<code>insert(index, element)</code>, 'Insert at position, shifting subsequent elements'],
          [<code>set(index, element)</code>, 'Replace element at index'],
          [<code>get(index)</code>, 'Return element at index'],
          [<code>removeAt(index)</code>, 'Remove and return element at index'],
          [<code>removeFirst()</code>, 'Remove and return the first element'],
          [<code>removeLast()</code>, 'Remove and return the last element'],
          [<code>contains(element)</code>, 'Check membership'],
          [<code>indexOf(element)</code>, 'First index of element, or -1'],
          [<code>subList(from, to)</code>, 'Slice from (inclusive) to (exclusive)'],
          [<code>map(transform)</code>, 'Return new list with each element transformed'],
          [<code>filter(predicate)</code>, 'Return new list with matching elements'],
          [<code>any(predicate)</code>, 'True if at least one element matches'],
          [<code>all(predicate)</code>, 'True if every element matches'],
          [<code>clear()</code>, 'Remove all elements'],
        ]}
      />

      <p className="mt-4 text-az-35">
        Lists also expose <code className="text-az-primary">first</code>,{' '}
        <code className="text-az-primary">last</code>,{' '}
        <code className="text-az-primary">reversed</code>,{' '}
        <code className="text-az-primary">isEmpty</code>, and{' '}
        <code className="text-az-primary">isNotEmpty</code> as computed properties.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.4 {'Set<T>'}</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">Set</code> stdlib pack stores unique elements with
        insertion-order preservation. It provides classic set algebra operations.
      </p>
      <CodeBlock>{`use scope std

var s = Set<Int>()
s.add(1)
s.add(2)
s.add(2)         // duplicate, not added
println(s.length)  // 2

println(s.contains(1))  // true
s.remove(1)
println(s.contains(1))  // false`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Set literal coercion works the same way as with lists:
      </p>
      <CodeBlock>{`var set: Set<Int> = ![1, 2, 3]    // set literal -> Set`}</CodeBlock>

      <p className="mt-4 text-az-35">Set algebra:</p>
      <CodeBlock>{`var a = Set<Int>()
a.add(1); a.add(2); a.add(3)

var b = Set<Int>()
b.add(2); b.add(3); b.add(4)

var u = a.union(b)        // {1, 2, 3, 4}
var i = a.intersect(b)    // {2, 3}
var d = a.difference(b)   // {1}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <code className="text-az-primary">Set</code> also supports{' '}
        <code className="text-az-primary">forEach</code>,{' '}
        <code className="text-az-primary">filter</code>,{' '}
        <code className="text-az-primary">any</code>,{' '}
        <code className="text-az-primary">all</code>, and{' '}
        <code className="text-az-primary">toArray</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.5 {'Map<K, V>'}</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">Map</code> stdlib pack is a generic key-value
        dictionary backed by parallel pointer arrays. Keys are unique, and inserting with an existing
        key replaces the previous value.
      </p>
      <CodeBlock>{`use scope std

var scores = Map<String, Int>()
scores.put("Alice", 95)
scores.put("Bob", 82)

println(scores.get("Alice"))          // 95
println(scores.getOrDefault("Eve", 0))  // 0
println(scores.containsKey("Bob"))    // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Map literal coercion:
      </p>
      <CodeBlock>{`var map: Map<String, Int> = ["a": 1, "b": 2]    // map literal -> Map`}</CodeBlock>

      <p className="mt-4 text-az-35">Key operations:</p>
      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>put(key, value)</code>, 'Insert or update a key-value pair'],
          [<code>get(key)</code>, 'Return value for key (asserts if missing)'],
          [<code>getOrDefault(key, default)</code>, 'Return value or fallback'],
          [<code>remove(key)</code>, 'Remove entry and return value'],
          [<code>containsKey(key)</code>, 'Check if key exists'],
          [<code>containsValue(value)</code>, 'Check if value exists'],
          [<code>keys()</code>, 'Return array of all keys'],
          [<code>values()</code>, 'Return array of all values'],
          [<code>forEach(action)</code>, 'Execute action on each key-value pair'],
          [<code>clear()</code>, 'Remove all entries'],
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.6 {'Stack<T>'} and {'Queue<T>'}</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">Stack</code> is a last-in-first-out (LIFO) container.{' '}
        <code className="text-az-primary">Queue</code> is a first-in-first-out (FIFO) container.
        Both are pointer-backed and grow automatically.
      </p>
      <CodeBlock>{`use scope std

// Stack: LIFO
var stack = Stack<Int>()
stack.push(1)
stack.push(2)
stack.push(3)
println(stack.peek())    // 3 (top element)
println(stack.pop())     // 3 (removed)
println(stack.pop())     // 2

// Queue: FIFO
var queue = Queue<String>()
queue.enqueue("first")
queue.enqueue("second")
queue.enqueue("third")
println(queue.peek())      // first (front element)
println(queue.dequeue())   // first (removed)
println(queue.dequeue())   // second`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Both expose <code className="text-az-primary">length</code>,{' '}
        <code className="text-az-primary">isEmpty</code>,{' '}
        <code className="text-az-primary">isNotEmpty</code>, and{' '}
        <code className="text-az-primary">clear()</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.7 {'Deque<T>'}</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">Deque</code> (double-ended queue) supports efficient
        push and pop at both ends. It is implemented as a circular buffer with automatic resizing.
      </p>
      <CodeBlock>{`use scope std

var d = Deque<Int>()
d.pushBack(1)
d.pushBack(2)
d.pushFront(0)

println(d.peekFront())   // 0
println(d.peekBack())    // 2
println(d.popFront())    // 0
println(d.popBack())     // 2
println(d.length)        // 1`}</CodeBlock>

      <Table
        headers={['Method', 'Description']}
        rows={[
          [<code>pushFront(value)</code>, 'Add to front'],
          [<code>pushBack(value)</code>, 'Add to back'],
          [<code>popFront()</code>, 'Remove and return from front'],
          [<code>popBack()</code>, 'Remove and return from back'],
          [<code>peekFront()</code>, 'View front without removing'],
          [<code>peekBack()</code>, 'View back without removing'],
          [<code>clear()</code>, 'Remove all elements'],
        ]}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">8.8 Choosing the Right Collection</h3>
      <p className="mt-2 text-az-35">
        Each collection type serves a different purpose. The table below summarizes when to use each
        one.
      </p>
      <Table
        headers={['Type', 'Ordered', 'Unique', 'Dynamic', 'Best For']}
        rows={[
          [<code>Int[]</code>, 'Yes', 'No', 'No', 'Fixed-size sequences with known length'],
          [<code>![Int]</code>, 'No', 'Yes', 'No', 'Literal unique value checks'],
          [<code>[K:V]</code>, 'No', 'Keys', 'No', 'Literal key-value lookups'],
          [<code>{'List<T>'}</code>, 'Yes', 'No', 'Yes', 'Dynamic ordered sequences'],
          [<code>{'Set<T>'}</code>, 'Insert', 'Yes', 'Yes', 'Unique elements with set algebra'],
          [<code>{'Map<K,V>'}</code>, 'Insert', 'Keys', 'Yes', 'Dynamic key-value associations'],
          [<code>{'Stack<T>'}</code>, 'LIFO', 'No', 'Yes', 'Undo stacks, expression evaluation'],
          [<code>{'Queue<T>'}</code>, 'FIFO', 'No', 'Yes', 'Task queues, BFS'],
          [<code>{'Deque<T>'}</code>, 'Both', 'No', 'Yes', 'Sliding windows, double-ended access'],
        ]}
      />

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> Use array literals and set/map literals for small, fixed data. Use the
        stdlib container packs when you need dynamic sizing, functional operations like{' '}
        <code className="text-az-primary">map</code>/<code className="text-az-primary">filter</code>,
        or specialized access patterns like LIFO/FIFO.
      </p>
    </Section>
  )
}
