import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Tuples() {
  return (
    <Section id="tuples" title="Tuples">
      <p className="mt-2 text-az-35">
        Tuples are fixed-size, ordered, heterogeneous collections. Unlike arrays (which hold
        elements of the same type), a tuple can hold values of different types. Tuples are
        built into the language with <code className="text-az-primary">()</code> syntax.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.1 Tuple Literals</h3>
      <p className="mt-2 text-az-35">
        Create a tuple by placing two or more comma-separated values inside parentheses.
        A single value in parentheses is just grouping, not a tuple.
      </p>
      <CodeBlock>{`// Two elements
var pair = (1, "hello")

// Three elements
var triple = (42, "azora", true)

// Four elements with mixed types
var quad = (1, 3.14, 'a', "text")

// Single value in parens is grouping, NOT a tuple
var x = (42)    // x is Int, not a tuple`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.2 Accessing Elements</h3>
      <p className="mt-2 text-az-35">
        Access tuple elements by their zero-based positional index using dot notation:
        <code className="text-az-primary">.0</code>, <code className="text-az-primary">.1</code>,
        <code className="text-az-primary">.2</code>, and so on.
      </p>
      <CodeBlock>{`var t = (10, "hello", true)

fin first = t.0     // 10
fin second = t.1    // "hello"
fin third = t.2     // true

assert first == 10
assert second == "hello"
assert third == true`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.3 Nested Tuples</h3>
      <p className="mt-2 text-az-35">
        Tuples can contain other tuples. Access nested elements by binding the inner tuple
        to a variable first:
      </p>
      <CodeBlock>{`var t = (1, (2, 3))

assert t.0 == 1

fin inner = t.1
assert inner.0 == 2
assert inner.1 == 3`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.4 Tuples as Return Values</h3>
      <p className="mt-2 text-az-35">
        Tuples are useful for returning multiple values from a function without defining
        a full pack:
      </p>
      <CodeBlock>{`func divmod(a: Int, b: Int): (Int, Int) {
    return (a / b, a % b)
}

fin result = divmod(17, 5)
assert result.0 == 3    // quotient
assert result.1 == 2    // remainder`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.5 Tuples as Function Arguments</h3>
      <p className="mt-2 text-az-35">
        Pass tuples as arguments to functions:
      </p>
      <CodeBlock>{`func sum(pair: (Int, Int)): Int {
    return pair.0 + pair.1
}

fin result = sum((3, 4))
assert result == 7`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.6 Immutability</h3>
      <p className="mt-2 text-az-35">
        Tuple values are immutable. You cannot change individual elements after creation.
        To "modify" a tuple, create a new one:
      </p>
      <CodeBlock>{`fin t = (1, 2, 3)
// t.0 = 10    // ERROR: cannot modify tuple elements

// Create a new tuple instead
fin t2 = (10, t.1, t.2)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.7 The Tuple Pack (Advanced)</h3>
      <p className="mt-2 text-az-35">
        Under the hood, the tuple literal <code className="text-az-primary">(a, b, c)</code> is
        backed by the built-in <code className="text-az-primary">Tuple</code> pack, which uses
        variadic generics to support any number of elements with different types. The{' '}
        <code className="text-az-primary">()</code> syntax is simply syntactic sugar for constructing
        this pack.
      </p>
      <CodeBlock>{`// These are equivalent:
var t1 = (1, "hello")
var t2 = Tuple(0: 1, 1: "hello")

// The pack definition (internal):
// pack Tuple<T...> where T.length >= 2 {
//     inline for Ty in T with index {
//         $index: Ty
//     }
// }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">41.8 When to Use Tuples</h3>
      <p className="mt-2 text-az-35">
        Use tuples for lightweight grouping of a small number of values. For anything
        more structured (named fields, methods, identity), use a <code className="text-az-primary">pack</code> instead.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li><strong>Tuples:</strong> quick return of 2-3 values, temporary grouping, coordinate pairs</li>
        <li><strong>Packs:</strong> named fields, associated methods, long-lived domain objects</li>
      </ul>
      <CodeBlock>{`// Tuple: simple, unnamed, short-lived
func minMax(arr: [Int]): (Int, Int) {
    var lo = arr[0]
    var hi = arr[0]
    for x in arr {
        if x < lo { lo = x }
        if x > hi { hi = x }
    }
    return (lo, hi)
}

// Pack: named, meaningful, reusable
pack Range {
    var min: Int
    var max: Int
}`}</CodeBlock>
    </Section>
  )
}
