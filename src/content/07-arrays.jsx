import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Arrays() {
  return (
    <Section id="arrays" title="Arrays">
      <p className="mt-2 text-az-35">
        Arrays are ordered, zero-indexed, fixed-size collections of a single element type. They
        carry their length at runtime and support structural equality. Arrays do not grow
        dynamically: use <code className="text-az-primary">List{'<T>'}</code> when you need a
        collection that can change size.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.1 Array Literals</h3>
      <p className="mt-2 text-az-35">
        Arrays are created using square bracket syntax. The element type is inferred from the
        contents, or can be declared explicitly with a type annotation.
      </p>
      <CodeBlock>{`// Type inferred from contents:
fin numbers = [1, 2, 3]           // Array of Int
fin names = ["Alice", "Bob"]      // Array of String
fin flags = [true, false, true]   // Array of Bool
fin reals = [1.0, 2.5, 3.7]      // Array of Real
fin chars = ['a', 'b', 'c']      // Array of Char

// Explicit type annotations:
var x: [Int] = [1, 2, 3]
var s: [String] = ["hello", "world"]
var c: [Char] = ['x', 'y', 'z']`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.2 Static Arrays</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">[T]</code> is a fixed-size array type. Once created, an
        array's length cannot change. You cannot push or pop elements. If you need a dynamically
        growing collection, use <code className="text-az-primary">List{'<T>'}</code> instead.
      </p>
      <CodeBlock>{`fin arr = [1, 2, 3]
// arr has exactly 3 elements, this cannot change

// You can mutate elements (if declared with var):
var nums: [Int] = [10, 20, 30]
nums[0] = 99    // OK, changes the value at index 0

// But you cannot change the array's size:
// There is no push, pop, append, or resize operation on arrays`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.3 Creating Arrays with fill</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">fill</code> method creates an array of a given size,
        initialized with default values. The generic type parameter determines what default value is
        used to fill each slot.
      </p>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Default fill by type</h4>
      <CodeBlock>{`// Int fills with 0:
var ints: [Int] = [].fill<Int>(5)
// [0, 0, 0, 0, 0]

// String fills with "":
var strs: [String] = [].fill<String>(3)
// ["", "", ""]

// Bool fills with false:
var bools: [Bool] = [].fill<Bool>(2)
// [false, false]

// Real fills with 0.0:
var reals: [Real] = [].fill<Real>(4)
// [0.0, 0.0, 0.0, 0.0]

// Char fills with '\\0' (null character):
var chars: [Char] = [].fill<Char>(3)
// ['\\0', '\\0', '\\0']`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Fill with an explicit value</h4>
      <p className="mt-2 text-az-35">
        Pass a second argument to <code className="text-az-primary">fill</code> to specify the
        value used for every element:
      </p>
      <CodeBlock>{`// Fill with a specific value:
fin fives = [].fill(5, 42)
// [42, 42, 42, 42, 42]

fin zeroed = [].fill(3, 0)
// [0, 0, 0]

fin board = [].fill(200, 0)
// An array of 200 zeros`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Fill in generic functions</h4>
      <p className="mt-2 text-az-35">
        Inside generic functions, use the type parameter with fill to create arrays of the generic
        type:
      </p>
      <CodeBlock>{`func<T> makeArray(size: Int): [T] {
    return [].fill<T>(size)
}`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Key point:</strong> The generic type parameter determines the default fill value.{' '}
        <code className="text-az-primary">Int</code> gives <code className="text-az-primary">0</code>,{' '}
        <code className="text-az-primary">String</code> gives <code className="text-az-primary">""</code>,{' '}
        <code className="text-az-primary">Bool</code> gives <code className="text-az-primary">false</code>,{' '}
        <code className="text-az-primary">Real</code> gives <code className="text-az-primary">0.0</code>,{' '}
        and <code className="text-az-primary">Char</code> gives <code className="text-az-primary">'\\0'</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.4 Empty Arrays are NOT Allowed</h3>
      <p className="mt-2 text-az-35">
        You cannot create an empty array with a bare empty literal. This is a compiler error:
      </p>
      <CodeBlock>{`// COMPILER ERROR: empty array literal is not allowed
var x: [Int] = []`}</CodeBlock>

      <p className="mt-4 text-az-35">
        The reason is that arrays are fixed-size and an empty array has no slots to write to.
        Instead, use <code className="text-az-primary">fill</code> to create a pre-sized array, or
        use <code className="text-az-primary">List{'<T>'}</code> for a dynamic collection:
      </p>
      <CodeBlock>{`// CORRECT: use fill for a pre-sized array with zero elements:
var a: [Int] = [].fill<Int>(0)

// CORRECT: use fill for a pre-sized array you will populate:
var buffer: [Int] = [].fill<Int>(10)
buffer[0] = 42    // works, array has 10 slots

// CORRECT: use List<T> for a dynamic collection:
var items: List<Int> = []
// items.add(42)  // List supports add/remove`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.5 Array Indexing</h3>
      <p className="mt-2 text-az-35">
        Arrays are zero-indexed. Access elements using square bracket notation. Expressions can
        be used as indices.
      </p>
      <CodeBlock>{`fin a = [10, 20, 30]
a[0]                   // 10 (first element)
a[1]                   // 20
a[2]                   // 30 (last element)
a[a.length - 1]        // 30 (last element using length)

var i = 1
a[i]                   // 20
a[i + 1]               // 30 (expression as index)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Out-of-bounds access is a runtime error. When the array size is statically known, the
        preprocessor can detect out-of-bounds access at compile time:
      </p>
      <CodeBlock>{`fin a = [1, 2, 3]
println(a[3])        // PREPROCESSOR ERROR: index out of bounds`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.6 Array Length</h3>
      <p className="mt-2 text-az-35">
        Every array exposes a <code className="text-az-primary">.length</code> property that returns
        the number of elements.
      </p>
      <CodeBlock>{`fin items = [10, 20, 30]
println(items.length)     // 3

fin single = [99]
println(single.length)    // 1`}</CodeBlock>

      <p className="mt-4 text-az-35">
        When the array size is known at compile time, the preprocessor
        folds <code className="text-az-primary">.length</code> into a constant. This means there
        is no runtime cost for checking the length of a statically-sized array:
      </p>
      <CodeBlock>{`fin a = [1, 2, 3]
println(a.length)    // preprocessed to: println(3)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.7 Array Mutation</h3>
      <p className="mt-2 text-az-35">
        Arrays declared with <code className="text-az-primary">var</code> allow element mutation
        through index assignment. Compound assignment operators also work on array elements.
      </p>
      <CodeBlock>{`var x: [Int] = [1, 2, 3]

// Direct assignment:
x[0] = 10         // [10, 2, 3]

// Compound assignment:
x[0] += 5         // [15, 2, 3]
x[1] -= 1         // [15, 1, 3]
x[2] *= 4         // [15, 1, 12]`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Arrays declared with <code className="text-az-primary">fin</code> are immutable. Any attempt
        to modify their elements causes a runtime error:
      </p>
      <CodeBlock>{`fin z = [1, 2, 3]
z[0] = 10          // RUNTIME ERROR: cannot mutate immutable array`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Array equality is structural. Two arrays are equal if they have the same length and all
        corresponding elements are equal:
      </p>
      <CodeBlock>{`[1, 2, 3] == [1, 2, 3]    // true
[1, 2] != [1, 2, 3]       // true (different length)
[1, 2, 3] != [1, 2, 4]    // true (different content)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.8 Array Iteration</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">for...in</code> to iterate over array elements.
        Use <code className="text-az-primary">with</code> for indexed iteration.
      </p>
      <CodeBlock>{`fin fruits = ["apple", "banana", "cherry"]

// Simple iteration:
for fruit in fruits {
    println(fruit)
}
// apple
// banana
// cherry

// Indexed iteration with "with":
for fruit in fruits with idx {
    println("$idx: $fruit")
}
// 0: apple
// 1: banana
// 2: cherry`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Boolean coercion: non-empty arrays are truthy, empty arrays are falsy:
      </p>
      <CodeBlock>{`var a: [Int] = [1, 2, 3]
if a {
    println("has elements")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.9 Sized Arrays</h3>
      <p className="mt-2 text-az-35">
        Use the <code className="text-az-primary">[T; N]</code> type annotation to declare a
        fixed-size array where the size is part of the type. The compiler verifies that exactly{' '}
        <code className="text-az-primary">N</code> elements are provided.
      </p>
      <CodeBlock>{`// Fixed-size array: exactly 3 elements
var rgb: [Int; 3] = [255, 128, 0]

// The size is part of the type:
var point2d: [Real; 2] = [1.5, 2.7]
var point3d: [Real; 3] = [1.0, 2.0, 3.0]

// Size mismatch is an error:
var bad: [Int; 3] = [1, 2]       // ERROR: expected 3 elements, got 2`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> Use sized arrays (e.g., <code className="text-az-primary">[Int; 3]</code>) when
        the element count is known and fixed. This enables the preprocessor to catch more errors
        and apply more optimizations, including compile-time bounds checking and length folding.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">7.10 Arrays vs Lists</h3>
      <p className="mt-2 text-az-35">
        Azora provides two main sequential collection types. Choose based on whether you need a
        fixed or dynamic size.
      </p>

      <CodeBlock>{`// Static array [T]: fixed size, cannot grow or shrink
fin arr = [1, 2, 3]
// arr has exactly 3 elements, forever

// Dynamic list List<T>: can add and remove elements
var list: List<Int> = [1, 2, 3]
// list can grow and shrink over time`}</CodeBlock>

      <p className="mt-4 text-az-35">
        When to use each:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>
          Use <code className="text-az-primary">[T]</code> (arrays) when the size is known upfront,
          for example: pixel buffers, fixed grids, coordinate tuples, or any data where the element
          count does not change.
        </li>
        <li>
          Use <code className="text-az-primary">List{'<T>'}</code> when the collection needs to
          grow or shrink, for example: accumulating results, user input, or collections built
          incrementally.
        </li>
      </ul>

      <CodeBlock>{`// Array: game board with known size
var board: [Int] = [].fill(200, 0)
board[0] = 1
board[42] = 2

// List: collecting unknown number of results
var results: List<String> = []
// results grow as items are added`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Performance note:</strong> Arrays have no overhead for size management and support
        compile-time optimizations like bounds checking and length folding. Lists are more flexible
        but carry the cost of dynamic resizing.
      </p>
    </Section>
  )
}
