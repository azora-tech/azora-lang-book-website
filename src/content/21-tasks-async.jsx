import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function TasksAsync() {
  return (
    <Section id="tasks-async" title="Tasks & Async">
      <p className="mt-2 text-az-35">
        Azora provides coroutine-based concurrency
        with <code className="text-az-primary">task</code>, <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code>,
        and <code className="text-az-primary">launch</code>. Tasks are lightweight coroutines that can suspend
        and resume without blocking the underlying thread.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.1 Task Declaration</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">task</code> is like a function but runs in a suspendable context.
        Inside a task, you can use <code className="text-az-primary">suspend</code>, <code className="text-az-primary">async</code>,
        <code className="text-az-primary"> await</code>, and <code className="text-az-primary">launch</code>.
        These operations are not allowed inside regular <code className="text-az-primary">func</code> bodies.
        Tasks can accept parameters, return values, and be generic.
      </p>
      <CodeBlock>{`task simpleTask(): Int {
    suspend 10
    return 42
}

task addAsync(a: Int, b: Int): Int {
    suspend 5
    return a + b
}

// Calling a task directly returns its result:
assert simpleTask() == 42
assert addAsync(3, 7) == 10`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.2 Async/Await</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">async</code> launches a block as a concurrent coroutine and returns
        a handle. <code className="text-az-primary">await(handle)</code> suspends the caller until the async
        block completes and returns its value. This lets you run multiple operations concurrently and
        collect their results.
      </p>
      <CodeBlock>{`test "Async and await" {
    fin t = async { 100 }
    fin r = await(t)
    assert r == 100
}

test "Multiple async tasks" {
    fin t1 = async { 1 }
    fin t2 = async { 2 }
    assert await(t1) + await(t2) == 3
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.3 Launch (concurrent execution)</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">launch</code> starts a coroutine that runs independently with no
        handle returned. The calling code continues immediately. Use <code className="text-az-primary">launch</code> for
        fire-and-forget side effects you do not need to wait on.
      </p>
      <CodeBlock>{`test "Launch executes" {
    var x = 0
    launch { x = 99 }
    suspend 50
    assert x == 99
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.4 Suspend (pausing execution)</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">suspend</code> pauses the current coroutine for a given number of
        milliseconds, yielding control to the scheduler. It is valid
        inside <code className="text-az-primary">task</code>, <code className="text-az-primary">hook</code>,
        and <code className="text-az-primary">test</code> bodies.
      </p>
      <CodeBlock>{`task delayedGreeting(): String {
    suspend 100    // pause for 100ms
    return "hello"
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A task that never suspends is equivalent to a regular function but with coroutine overhead.
        Prefer <code className="text-az-primary">func</code> in that case.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.5 Async For Loops</h3>
      <p className="mt-2 text-az-35">
        Flows (lazy generators) are consumed using <code className="text-az-primary">async for</code>. This is
        the only way to iterate over a flow. A plain <code className="text-az-primary">for</code> over a flow
        produces a runtime error.
      </p>
      <CodeBlock>{`flow numbers(n: Int): Int {
    for i in 0..n {
        yield i
    }
}

test "async for flow" {
    var sum = 0
    async for x in numbers(4) {
        sum += x
    }
    assert sum == 10
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">async for</code> can also be used as an expression with
        an <code className="text-az-primary">else</code> clause for a fallback value when the flow is empty:
      </p>
      <CodeBlock>{`flow single(): Int {
    yield 42
}

var result = async for x in single() { x } else { 0 }
assert result == 42`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">24.6 Isolated Values (deep copy for concurrency)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">isolated</code> function creates a deep copy of a value wrapped in
        an <code className="text-az-primary">Isolated</code> container. This ensures safe concurrent access by
        preventing shared mutable state. Access the value
        through <code className="text-az-primary">.with</code>, which provides an exclusive reference.
      </p>
      <CodeBlock>{`test "isolated with" {
    var iso = isolated(42)
    iso.with({ mut value ->
        assert value == 42
    })
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">isolated</code> when sharing data between tasks or launched
        coroutines. The deep copy guarantees that mutations inside one coroutine cannot affect
        another.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Generic Tasks</h3>
      <p className="mt-2 text-az-35">
        Tasks support generics just like functions. The preprocessor monomorphizes each generic task
        at its call sites.
      </p>
      <CodeBlock>{`task<T> identity(x: T): T {
    suspend 1
    return x
}

assert identity(42) == 42
assert identity("hi") == "hi"`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Use <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code> when
        you need the result. Use <code className="text-az-primary">launch</code> for side effects you do not
        need to wait on. Use <code className="text-az-primary">isolated</code> to safely share data across
        concurrent boundaries.
      </p>
    </Section>
  )
}
