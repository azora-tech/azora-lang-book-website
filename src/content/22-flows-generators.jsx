import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function FlowsGenerators() {
  return (
    <Section id="flows-generators" title="Flows & Generators">
      <p className="mt-2 text-az-35">
        Flows are Azora's mechanism for lazy, on-demand iteration. A flow produces values one at
        a time using <code className="text-az-primary">yield</code>. Values are computed only as requested
        by the consumer, making flows ideal for large or infinite sequences.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.1 Flow Declaration</h3>
      <p className="mt-2 text-az-35">
        Declare a flow with the <code className="text-az-primary">flow</code> keyword. The return type
        annotation specifies the type of values yielded. Each <code className="text-az-primary">yield</code> is
        a suspension point: execution pauses there and resumes when the consumer requests the next
        value.
      </p>
      <CodeBlock>{`flow range(n: Int): Int {
    for i in 0..n {
        yield i
    }
}

flow fibonacci(n: Int): Int {
    var a = 0
    var b = 1
    for i in 0..n {
        yield a
        fin temp = a + b
        a = b
        b = temp
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.2 Yield Statement</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">yield</code> keyword produces a value and suspends the flow.
        When the consumer requests the next value, execution resumes after
        the <code className="text-az-primary">yield</code>. A flow can yield zero or more values. When execution
        reaches the end of the flow body, the flow is complete.
      </p>
      <CodeBlock>{`flow single(): Int {
    yield 42
}

flow empty(): Int {
    // no yield, produces zero values
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Yield can appear inside loops, conditionals, or any control flow structure. The flow
        preserves its local state between yields:
      </p>
      <CodeBlock>{`flow countdown(from: Int): Int {
    var i = from
    for _ in 0..from {
        yield i
        i -= 1
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.3 Consuming Flows (async for)</h3>
      <p className="mt-2 text-az-35">
        Flows must be consumed with <code className="text-az-primary">async for</code>. A
        plain <code className="text-az-primary">for</code> over a flow produces a runtime error. The loop runs
        until the flow has no more values to yield.
      </p>
      <CodeBlock>{`var sum = 0
async for x in range(3) {
    sum += x
}
assert sum == 6    // 0 + 1 + 2 + 3`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Use the <code className="text-az-primary">with</code> keyword to bind an index variable that starts at 0
        and increments each iteration:
      </p>
      <CodeBlock>{`var indices = 0
async for x in range(2) with idx {
    indices += idx
}
assert indices == 3    // 0 + 1 + 2`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Early termination with <code className="text-az-primary">break</code> is supported. No further values
        are produced after the break:
      </p>
      <CodeBlock>{`var last = -1
async for x in range(100) {
    last = x
    if x == 2 { break }
}
assert last == 2`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.4 Collecting Flow Results (.collect())</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">.collect()</code> method materializes the entire flow into an array.
        This eagerly consumes all yielded values.
      </p>
      <CodeBlock>{`fin arr = range(3).collect()
assert arr.length == 4     // [0, 1, 2, 3]
assert arr[0] == 0
assert arr[3] == 3

fin fibs = fibonacci(6).collect()
assert fibs[0] == 0
assert fibs[6] == 8`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.5 Generic Flows</h3>
      <p className="mt-2 text-az-35">
        Flows support generics, just like functions and tasks. The preprocessor monomorphizes each
        generic flow at its call sites.
      </p>
      <CodeBlock>{`flow<T> identityFlow(items: [T]): T {
    for x in items {
        yield x
    }
}

fin ints = identityFlow<Int>([10, 20, 30]).collect()
assert ints.length == 3
assert ints[0] == 10
assert ints[1] == 20
assert ints[2] == 30`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">25.6 Infinite Flows</h3>
      <p className="mt-2 text-az-35">
        Because flows are lazy, they can represent infinite sequences. The consumer controls how
        many values are pulled using <code className="text-az-primary">break</code> or by limiting iteration.
      </p>
      <CodeBlock>{`flow naturals(): Int {
    var n = 0
    for _ in 0..999999 {
        yield n
        n += 1
    }
}

// Only consume the first 5 values:
var count = 0
async for x in naturals() {
    count += 1
    if count == 5 { break }
}
assert count == 5`}</CodeBlock>

      <p className="mt-2 text-az-35">
        A flow with no <code className="text-az-primary">yield</code> statements produces zero values.
        Iterating over it does nothing:
      </p>
      <CodeBlock>{`flow empty(): Int { }

var count = 0
async for x in empty() {
    count += 1
}
assert count == 0`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Flows and tasks serve complementary roles. Tasks handle concurrency (doing multiple
        things at once), while flows handle lazy sequences (producing values on demand). You can
        combine them by consuming a flow inside a task.
      </p>
    </Section>
  )
}
