import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Testing() {
  return (
    <Section id="testing" title="Testing">
      <p className="mt-2 text-az-35">
        Azora has a built-in test framework. No external dependencies, no configuration. Tests can live
        inline alongside production code or in dedicated files. They participate in the same compilation
        pipeline, so type errors in tests are caught at compile time.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.1 Test Blocks</h3>
      <p className="mt-2 text-az-35">
        Use the <code className="text-az-primary">test</code> keyword followed by a name string and a body
        block. The compiler discovers all test blocks automatically. Each test runs in its own isolated
        context with no shared state.
      </p>
      <CodeBlock>{`test "addition works" {
    fin result = 1 + 1
    assert result == 2 { "1 + 1 should equal 2" }
}

test "string concatenation" {
    fin greeting = "hello" + " " + "world"
    assert greeting == "hello world" { "strings should concatenate" }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.2 Assert Statements</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">assert</code> keyword evaluates a boolean condition.
        On failure, it halts the test. The trailing block is a lazy lambda that produces
        the failure message, evaluated only when the assertion fails.
      </p>
      <CodeBlock>{`assert condition { "failure message" }
assert true { "this always passes" }
assert 1 == 1 { "equality check" }
assert 5 > 3 { "comparison check" }`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A test stops at the first failing assertion. For independent checks that should all be reported,
        use separate tests.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.3 Assert with Messages</h3>
      <p className="mt-2 text-az-35">
        The failure message lambda is lazily evaluated, so expensive operations like string interpolation
        or collection formatting incur zero cost when the assertion passes. Write descriptive messages
        that explain what was expected.
      </p>
      <CodeBlock>{`test "array operations" {
    fin arr = [1, 2, 3, 4, 5]
    assert arr.length == 5 { "array should have 5 elements" }
    assert arr[0] == 1 { "first element should be 1" }
    assert arr[4] == 5 { "last element should be 5" }
}

test "computed values" {
    fin x = 10 * 3 + 2
    assert x == 32 { "expected 32, got " + x.toString() }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.4 Running Tests</h3>
      <p className="mt-2 text-az-35">
        The framework prints a summary after all tests run. Passing tests
        show <code className="text-az-primary">PASS</code>, and failed tests
        show <code className="text-az-primary">FAIL</code> with the lazy failure message.
      </p>
      <CodeBlock>{`test "first" { assert 1 == 1 { "one" } }
test "second" { assert 2 == 2 { "two" } }
test "third" { assert 3 == 3 { "three" } }`}</CodeBlock>
      <CodeBlock title="Output">{`PASS: first
PASS: second
PASS: third
Tests: 3 passed, 0 failed, 3 total`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Every test body runs inside a suspendable context.
        You can use <code className="text-az-primary">suspend</code>, <code className="text-az-primary">async</code>,{' '}
        <code className="text-az-primary">await</code>, and <code className="text-az-primary">launch</code>{' '}
        directly in tests without special wrappers.
      </p>
      <CodeBlock>{`test "async addition" {
    fin a = async { 10 }
    fin b = async { 20 }
    assert await(a) + await(b) == 30 { "async sum should be 30" }
}

test "suspend in test" {
    suspend 10
    assert true { "works after suspend" }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">31.5 Test Organization</h3>
      <p className="mt-2 text-az-35">
        Tests can be placed in dedicated test files or inline alongside production code. Use descriptive
        test names that explain the expected behavior. Group related tests in the same file.
      </p>
      <CodeBlock>{`package testing

// Helper function used by tests
func factorial(n: Int): Int {
    if n <= 1 { return 1 }
    return n * factorial(n - 1)
}

test "factorial of 0 is 1" {
    assert factorial(0) == 1 { "0! should be 1" }
}

test "factorial of 5 is 120" {
    assert factorial(5) == 120 { "5! should be 120" }
}

test "factorial of 1 is 1" {
    assert factorial(1) == 1 { "1! should be 1" }
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Keep each test focused on a single behavior. When a focused test fails, the name plus
        the failure message usually tell you exactly what broke.
      </p>
    </Section>
  )
}
