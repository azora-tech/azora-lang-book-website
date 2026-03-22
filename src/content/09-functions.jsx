import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Functions() {
  return (
    <Section id="functions" title="Functions">
      <p>
        Functions are declared at the top level with the <code className="text-az-primary">func</code>{' '}
        keyword. They accept typed parameters, optionally return a value, and support recursion. A
        function must be declared before it is called.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">10.1 Function Declaration</h3>
      <p className="mt-2 text-az-35">
        Functions are declared with <code className="text-az-primary">func</code>, followed by a
        name, parameter list, optional return type, and a body. The function name must be a valid
        identifier and is scoped to the file unless exposed.
      </p>
      <CodeBlock>{`func greet(name: String) {
    println("Hello, $name!")
}

func add(a: Int, b: Int): Int {
    return a + b
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.2 Parameters and Return Types</h3>
      <p className="mt-2 text-az-35">
        Each parameter requires a type annotation. The return type is specified after the parameter
        list with a colon. Omitting the return type means the function
        returns <code className="text-az-primary">Unit</code> (no meaningful value).
      </p>
      <CodeBlock>{`// Typed parameters, explicit return type:
func multiply(a: Int, b: Int): Int {
    return a * b
}

// No return type means Unit:
func logMessage(msg: String) {
    println(msg)
}

// Multiple return points:
func abs(x: Int): Int {
    if x < 0 { return -x }
    return x
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Arguments are positional by default and type-checked at compile time. Function calls can
        appear anywhere an expression is expected.
      </p>
      <CodeBlock>{`var sum = add(3, 4)       // 7
var dist = abs(-15)       // 15
println(multiply(6, 7))  // 42`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.3 Named Arguments</h3>
      <p className="mt-2 text-az-35">
        You can pass arguments by name for clarity, especially when a function has many parameters
        or when the meaning of positional arguments is ambiguous. Named arguments use{' '}
        <code className="text-az-primary">name: value</code> syntax at the call site.
      </p>
      <CodeBlock>{`func createUser(name: String, age: Int, active: Bool) {
    println("$name, age $age, active: $active")
}

// Positional:
createUser("Alice", 30, true)

// Named (order does not matter):
createUser(age: 30, name: "Alice", active: true)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.4 Exposed Functions</h3>
      <p className="mt-2 text-az-35">
        Functions are private to their file by default. Prefix with{' '}
        <code className="text-az-primary">expose</code> to make them visible to other files that
        import the containing scope or package.
      </p>
      <CodeBlock>{`// Visible only within this file:
func helper(x: Int): Int {
    return x * 2
}

// Visible to other files:
expose func publicApi(x: Int): Int {
    return helper(x) + 1
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.5 Expression Body</h3>
      <p className="mt-2 text-az-35">
        When a function body is a single expression, you can use the{' '}
        <code className="text-az-primary">= expr</code> shorthand instead of a block with{' '}
        <code className="text-az-primary">return</code>. This is concise and readable for simple
        transformations.
      </p>
      <CodeBlock>{`func double(x: Int): Int = x * 2

func isEven(n: Int): Bool = n % 2 == 0

func fullName(first: String, last: String): String = "$first $last"`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Expression-body functions behave identically to their block-body equivalents. The return
        type is still required.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.6 Tail Recursion</h3>
      <p className="mt-2 text-az-35">
        Annotate a recursive function with <code className="text-az-primary">@tailrec</code> to
        enable tail-call optimization. The preprocessor transforms the function so that the
        recursive call in tail position is compiled into an efficient loop, preventing stack
        overflow on deep recursions.
      </p>
      <CodeBlock>{`@tailrec
func factorial(n: Int, acc: Int): Int {
    if n <= 1 { return acc }
    return factorial(n - 1, n * acc)
}

println(factorial(5, 1))    // 120
println(factorial(20, 1))   // 2432902008176640000`}</CodeBlock>

      <p className="mt-4 text-az-35">
        The recursive call must be in tail position (the last operation before{' '}
        <code className="text-az-primary">return</code>). If the call is not in tail position,
        the annotation has no effect and the function runs as normal recursion.
      </p>
      <CodeBlock>{`// Accumulator pattern for tail-recursive sum:
@tailrec
func sumTo(n: Int, acc: Int): Int {
    if n <= 0 { return acc }
    return sumTo(n - 1, acc + n)
}

println(sumTo(1000000, 0))   // safe: no stack overflow`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">10.7 Built-in Functions</h3>
      <p className="mt-2 text-az-35">
        The following functions are available globally without any import. They cover output,
        type conversion, timing, and runtime introspection.
      </p>

      <Table
        headers={['Function', 'Description']}
        rows={[
          [<code>print(val)</code>, 'Print a value without a trailing newline'],
          [<code>println(val)</code>, 'Print a value followed by a newline'],
          [<code>toString(val)</code>, 'Convert any value to its String representation'],
          [<code>toInt(val)</code>, 'Convert to Int (truncates Reals, parses Strings)'],
          [<code>toReal(val)</code>, 'Convert to Real (widens Ints, parses Strings)'],
          [<code>stringLength(s)</code>, 'Return the number of characters in a String'],
          [<code>delay(ms)</code>, 'Suspend execution for the given number of milliseconds'],
          [<code>platform(scope)</code>, 'Get platform info ("os" or "compiler")'],
          [<code>hasDeco(v, d)</code>, 'Check if a variable has a specific decorator'],
          [<code>getDeco(v, d, f)</code>, 'Get a decorator field value from a variable'],
        ]}
      />

      <CodeBlock>{`// Output:
print("no newline")
println("with newline")

// Conversion:
var s = toString(42)       // "42"
var n = toInt("123")       // 123
var r = toReal(42)         // 42.0

// String length:
var len = stringLength("hello")   // 5

// Timing:
delay(1000)   // pause for 1 second`}</CodeBlock>
    </Section>
  )
}
