import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function MemoryManagement() {
  return (
    <Section id="memory-management" title="Memory Management">
      <p className="mt-2 text-az-35">
        Azora gives you direct control over memory when you need it. Values are stack-allocated
        by default, keeping everyday code fast and simple. When you need heap allocation, you
        use explicit keywords: <code className="text-az-primary">alloc</code> to allocate
        and <code className="text-az-primary">drop</code> to free. Pointers, unsafe blocks,
        and region-based arenas round out the memory model.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.1 Stack vs Heap</h3>
      <p className="mt-2 text-az-35">
        By default, all Azora values live on the stack. Local variables, function parameters,
        and return values are stack-allocated, which means they are created and destroyed
        automatically as functions enter and exit. No garbage collector is involved.
      </p>
      <CodeBlock>{`// Stack-allocated values, no heap involvement
fin x: Int = 42
fin name: String = "Azora"
fin point = Point(x: 1.0, y: 2.0)

func add(a: Int, b: Int): Int {
    fin result = a + b    // result lives on the stack
    return result          // copied to the caller's stack frame
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Heap allocation is explicit. You only pay for it when you ask for it with
        the <code className="text-az-primary">alloc</code> keyword.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.2 Alloc (Heap Allocation)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">alloc</code> keyword allocates memory on the heap and
        returns a pointer. You can allocate packs or arrays.
      </p>
      <p className="mt-2 text-az-35">
        To allocate a pack on the heap, use <code className="text-az-primary">alloc Type(args)</code>.
        The result is a pointer to the heap-allocated instance.
      </p>
      <CodeBlock>{`pack Vec2 {
    var x: Real
    var y: Real
}

// Allocate a Vec2 on the heap
var pos: Vec2* = alloc Vec2(x: 0.0, y: 0.0)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        To allocate an array on the heap, use <code className="text-az-primary">alloc [T](capacity)</code>.
        The <code className="text-az-primary">*</code> suffix on a type denotes that it is a pointer.
      </p>
      <CodeBlock>{`// Allocate a heap array of 8 integers
var data: [Int]* = alloc [Int](8)

// Allocate a heap array of 100 reals
var buffer: [Real]* = alloc [Real](100)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.3 Pointer Dereferencing</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">*ptr</code> to dereference a pointer and access the
        value it points to. For heap-allocated arrays, use parentheses to group the dereference
        before indexing.
      </p>
      <CodeBlock>{`var pos: Vec2* = alloc Vec2(x: 3.0, y: 4.0)

// Dereference to read the value
fin value: Vec2 = *pos
assert value.x == 3.0

// Access fields through a dereferenced pointer
fin xVal = (*pos).x
assert xVal == 3.0`}</CodeBlock>
      <p className="mt-2 text-az-35">
        For heap-allocated arrays, dereference and then index:
      </p>
      <CodeBlock>{`var data: [Int]* = alloc [Int](4)

// Write to heap array elements
(*data)[0] = 10
(*data)[1] = 20
(*data)[2] = 30
(*data)[3] = 40

// Read from heap array elements
fin first = (*data)[0]
assert first == 10

fin third = (*data)[2]
assert third == 30`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.4 Drop (Manual Deallocation)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">drop</code> keyword frees the memory pointed to by a
        pointer. After dropping, the pointer is invalid and must not be used. You are responsible
        for calling <code className="text-az-primary">drop</code> on every heap allocation to
        avoid memory leaks.
      </p>
      <CodeBlock>{`var data: [Int]* = alloc [Int](16)
(*data)[0] = 42

// Free the heap memory when done
drop data`}</CodeBlock>
      <p className="mt-2 text-az-35">
        When reassigning a pointer field, you must drop the old data first to prevent leaking
        the previous allocation:
      </p>
      <CodeBlock>{`// Inside a dynamic array's grow method
fin oldData = self.data
self.data = alloc [Int](newCapacity)

// Copy elements from old to new
var i = 0
while i < self.size {
    (*self.data)[i] = (*oldData)[i]
    i = i + 1
}

// Free the old allocation
drop oldData`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.5 Unsafe Blocks</h3>
      <p className="mt-2 text-az-35">
        Certain low-level pointer operations require an <code className="text-az-primary">unsafe</code> block.
        Inside an unsafe block you can perform raw pointer arithmetic and other operations that
        the compiler cannot verify for safety.
      </p>
      <CodeBlock>{`var buffer: [Int]* = alloc [Int](64)

unsafe {
    // Raw pointer operations allowed here
    fin rawPtr = toRawPointer(buffer)
    fin offset = rawPtr + 8
    writeToAddress(offset, 255)
}

drop buffer`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Keep unsafe blocks as small as possible. Wrap them in safe functions so the rest
        of your code stays safe by default.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.6 Region Blocks (Arena Allocation)</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">region</code> block creates a scoped memory arena.
        All allocations made through the arena's allocator are freed automatically when the
        region block exits. This is useful for temporary batch allocations where tracking
        individual lifetimes is unnecessary.
      </p>
      <CodeBlock>{`region(1024) { allocator ->
    // All allocations here use the arena
    var a: [Int]* = allocator.alloc([Int](128))
    var b: [Int]* = allocator.alloc([Int](128))

    (*a)[0] = 1
    (*b)[0] = 2

    fin sum = (*a)[0] + (*b)[0]
    assert sum == 3

    // No need to drop a or b individually
}
// All arena memory is freed here automatically`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The argument to <code className="text-az-primary">region</code> is the size in bytes of the
        arena. If allocations exceed this size, the arena grows as needed, but choosing a
        reasonable initial size avoids unnecessary resizing.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.7 Deref Assignment</h3>
      <p className="mt-2 text-az-35">
        You can assign through a pointer using <code className="text-az-primary">*ptr = value</code>.
        This writes a new value to the memory location the pointer refers to.
      </p>
      <CodeBlock>{`var pos: Vec2* = alloc Vec2(x: 0.0, y: 0.0)

// Assign through the pointer
*pos = Vec2(x: 5.0, y: 10.0)

assert (*pos).x == 5.0
assert (*pos).y == 10.0

drop pos`}</CodeBlock>
      <p className="mt-2 text-az-35">
        For heap-allocated arrays, combine dereferencing with indexing to assign to individual
        elements:
      </p>
      <CodeBlock>{`var scores: [Int]* = alloc [Int](3)

// Assign to individual elements
(*scores)[0] = 100
(*scores)[1] = 95
(*scores)[2] = 88

drop scores`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.8 The Confined Modifier</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">confine</code> modifier restricts field access to
        impl methods only. External code cannot read or write the field directly. This is
        essential for internal state like a dynamic array's backing pointer, which should
        only be manipulated through the type's own methods.
      </p>
      <CodeBlock>{`pack List {
    confine var data: [Int]*     // only accessible inside impl List
    confine var capacity: Int
    var size: Int = 0
}

impl List {
    func get(index: Int): Int { ref self ->
        assert index >= 0 && index < self.size
        (*self.data)[index]       // OK: inside impl block
    }

    func set(index: Int, value: Int) { mut self ->
        assert index >= 0 && index < self.size
        (*self.data)[index] = value   // OK: inside impl block
    }
}

var list = List(data: alloc [Int](4), capacity: 4)

// list.data         // ERROR: data is confined
// list.capacity     // ERROR: capacity is confined
assert list.size == 0     // OK: size is not confined`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">39.9 Practical Example: Dynamic Array</h3>
      <p className="mt-2 text-az-35">
        Here is a simple dynamic array (list) that uses heap allocation, pointer dereferencing,
        and manual deallocation. It demonstrates how the memory primitives fit together in practice.
      </p>
      <CodeBlock>{`pack IntList {
    confine var data: [Int]*
    confine var capacity: Int
    var size: Int = 0
}

impl IntList {
    func new(initialCapacity: Int): IntList {
        IntList(
            data: alloc [Int](initialCapacity),
            capacity: initialCapacity,
            size: 0
        )
    }

    func push(value: Int) { mut self ->
        if self.size == self.capacity {
            self.grow()
        }
        (*self.data)[self.size] = value
        self.size = self.size + 1
    }

    func get(index: Int): Int { ref self ->
        assert index >= 0 && index < self.size
        (*self.data)[index]
    }

    func grow() { mut self ->
        fin newCapacity = self.capacity * 2
        fin newData: [Int]* = alloc [Int](newCapacity)

        // Copy existing elements
        var i = 0
        while i < self.size {
            (*newData)[i] = (*self.data)[i]
            i = i + 1
        }

        // Free old backing array, switch to new one
        fin oldData = self.data
        self.data = newData
        self.capacity = newCapacity
        drop oldData
    }

    func free() { mut self ->
        drop self.data
        self.size = 0
        self.capacity = 0
    }
}

// Usage
var list = IntList.new(4)
list.push(10)
list.push(20)
list.push(30)

assert list.get(0) == 10
assert list.get(1) == 20
assert list.get(2) == 30
assert list.size == 3

list.free()`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: For most application code, stack allocation and regions are sufficient. Reach
        for manual alloc/drop only when you need data to outlive the current scope, or when
        building low-level data structures.
      </p>
    </Section>
  )
}
