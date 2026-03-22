import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function CTCE() {
  return (
    <Section id="ctce" title="Compile-Time Code Execution">
      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.1 What is CTCE</h3>
      <p className="mt-2 text-az-35">
        Azora supports compile-time code execution (CTCE), similar to D's CTFE. Functions
        declared with <code className="text-az-primary">func</code> are automatically available for compile-time
        evaluation. The preprocessor can evaluate function calls, conditionals, loops, and string
        operations during compilation, replacing expressions with their computed results. The emitted
        code contains only literal constants, with zero runtime computation for anything evaluated
        at compile time.
      </p>
      <CodeBlock>{`func factorial(n: Int): Int {
    if n <= 1 { return 1 }
    return n * factorial(n - 1)
}

inline fin result = factorial(10)   // computed at compile time
// result is 3628800, use $result to reference it in emitted code`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">inline fin</code> keyword declares a compile-time constant.
        The right-hand side function call is evaluated entirely during preprocessing. Use
        the <code className="text-az-primary">$name</code> syntax to reference the value in emitted code.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.2 Inline Variables (inline fin, inline var)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">inline fin</code> and <code className="text-az-primary">inline var</code> syntax
        declares compile-time constants and mutable compile-time variables. They are evaluated
        and substituted during preprocessing. Reference them with <code className="text-az-primary">$name</code> in
        the emitted code.
      </p>
      <CodeBlock>{`inline fin x = 42
func main() {
    println($x)    // emits: println(42)
}

inline var count = 0
inline for i in 0..2 {
    $count = $count + 1
}
func main() {
    println($count)    // emits: println(3)
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline fin</code> can also evaluate function calls at compile time:
      </p>
      <CodeBlock>{`func double(n: Int): Int {
    return n * 2
}

inline fin result = double(21)
func main() {
    println($result)    // emits: println(42)
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Type annotations are optional:
      </p>
      <CodeBlock>{`inline fin msg: String = "hello"
func main() {
    println($msg)    // emits: println("hello")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.3 Inline If (compile-time conditionals)</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline if</code> evaluates a condition at compile time and includes or
        excludes blocks of code based on the result. The excluded branch is not emitted at all.
      </p>
      <CodeBlock>{`inline fin DEBUG = true

inline if DEBUG {
    func logDebug() {}     // included in output
}

inline fin VERBOSE = false

inline if VERBOSE {
    func logVerbose() {}   // NOT included in output
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline if</code> supports <code className="text-az-primary">else</code> branches:
      </p>
      <CodeBlock>{`inline fin x = 0

inline if $x > 0 {
    func positive() {}
}
else {
    func nonPositive() {}   // this branch is emitted
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.4 Inline For (loop unrolling with $i syntax)</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline for</code> unrolls a loop at compile time. The loop variable is
        referenced using <code className="text-az-primary">$i</code> syntax (with the <code className="text-az-primary">$</code> prefix)
        inside the loop body. Each iteration produces a separate copy of the body with the loop
        variable substituted.
      </p>
      <CodeBlock>{`var sum = 0
inline for i in 0..4 {
    sum += 1
}
// unrolls to:
// sum += 1
// sum += 1
// sum += 1
// sum += 1
// sum += 1
assert sum == 5`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Using <code className="text-az-primary">$i</code> to reference the loop variable's value:
      </p>
      <CodeBlock>{`var total = 0
inline for i in 0..2 {
    total += ($i + 1) * 10
}
// unrolls to:
// total += (0 + 1) * 10    = 10
// total += (1 + 1) * 10    = 20
// total += (2 + 1) * 10    = 30
assert total == 60`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline for</code> supports both inclusive and exclusive ranges:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><code className="text-az-primary">0..4</code> is an <strong>inclusive</strong> range: 0, 1, 2, 3, 4 (5 iterations)</li>
        <li><code className="text-az-primary">0..&lt;4</code> is an <strong>exclusive</strong> range: 0, 1, 2, 3 (4 iterations)</li>
      </ul>

      <CodeBlock>{`// Inclusive range: iterates 0, 1, 2, 3, 4
var a = 0
inline for i in 0..4 {
    a += 1
}
assert a == 5

// Exclusive range: iterates 0, 1, 2, 3
var b = 0
inline for i in 0..<4 {
    b += 1
}
assert b == 4`}</CodeBlock>

      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">$i</code> syntax can also generate names:
      </p>
      <CodeBlock>{`inline for i in 0..<3 {
    func f$i() {}
}
// generates: func f0() {}  func f1() {}  func f2() {}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.5 Inline Loop and When</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline loop</code> repeats a block at compile time while a condition
        is true. It is the compile-time equivalent of a <code className="text-az-primary">while</code> loop.
      </p>
      <CodeBlock>{`inline var n = 5
inline loop $n > 0 {
    $n = $n - 1
}
// $n is now 0`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline when</code> is a compile-time pattern match. It evaluates a
        subject expression and selects the matching branch:
      </p>
      <CodeBlock>{`inline fin mode = "debug"

inline when $mode {
    "debug" -> {
        func enableDebugLogging() {}
    }
    "release" -> {
        func enableOptimizations() {}
    }
    else -> {
        func defaultSetup() {}
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.6 Inline Assert and Trace</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline assert</code> checks a condition at compile time. If the
        condition is false, it produces a preprocessor error that stops compilation.
      </p>
      <CodeBlock>{`inline fin SIZE = 4
inline assert SIZE > 0, "SIZE must be positive"
inline assert $SIZE <= 1024`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">inline trace</code> prints a message during preprocessing. It is
        useful for compile-time debugging. The message requires a lambda body and supports
        log level variants:
      </p>
      <CodeBlock>{`inline fin p = Point(1.0, 2.0)
inline trace { "point: $p" }

// With log levels:
inline trace .Info { "compiling module X" }
inline trace .Warning { "deprecated feature used" }
inline trace .Error { "unsupported configuration" }
inline trace .Debug { "value of x: $x" }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.7 Deepinline Blocks</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">deepinline</code> block automatically prefixes every statement
        inside it with <code className="text-az-primary">inline</code>. This is useful when you have many
        compile-time declarations in a row.
      </p>
      <CodeBlock>{`deepinline {
    fin x = 42
    trace { "x = $x" }
}
// equivalent to:
// inline fin x = 42
// inline trace { "x = $x" }`}</CodeBlock>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">deepinline</code> also works with <code className="text-az-primary">if</code>,
        <code className="text-az-primary"> for</code>, <code className="text-az-primary">loop</code>,
        and <code className="text-az-primary">when</code>, propagating inline to all nested statements within
        the block:
      </p>
      <CodeBlock>{`deepinline if DEBUG {
    fin msg = "debug mode active"
    trace { $msg }
}

deepinline for i in 0..3 {
    fin val = $i * 10
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.8 Noinline Opt-Out</h3>
      <p className="mt-2 text-az-35">
        Inside a <code className="text-az-primary">deepinline</code> block, use
        the <code className="text-az-primary">noinline</code> prefix to exempt a specific line from being
        made inline. The <code className="text-az-primary">noinline</code> prefix is stripped, and the line
        is emitted as regular runtime code.
      </p>
      <CodeBlock>{`deepinline {
    fin x = 42
    noinline var y = $x    // emitted as: var y = 42 (runtime)
    trace { "done" }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.9 CT String Operations</h3>
      <p className="mt-2 text-az-35">
        The compile-time evaluator supports string methods. These let you perform string
        manipulation at compile time and use the results in <code className="text-az-primary">inline if</code> conditions
        or as compile-time constants.
      </p>
      <CodeBlock>{`// .length
inline fin len = "hello".length           // len = 5

// .contains()
inline fin has = "hello world".contains("world")    // has = true

// .startsWith()
inline fin starts = "azora".startsWith("az")        // starts = true

// .toUpper()
inline fin upper = "hello".toUpper()                // upper = "HELLO"

// String interpolation in CT functions
func greet(name: String): String {
    return "Hello, " + name + "!"
}
inline fin msg = greet("Azora")                     // msg = "Hello, Azora!"`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Compile-time strings are properly escaped when substituted into the emitted source code.
        Quotes, backslashes, newlines, and tabs are all handled correctly.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">26.10 CT Limitations</h3>
      <p className="mt-2 text-az-35">
        Compile-time evaluation has safety limits to prevent infinite computation:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Recursion depth limit: <strong>100 calls</strong></li>
        <li>Loop iteration limit: <strong>10,000 iterations</strong> per loop</li>
        <li>Functions that exceed these limits produce a preprocessor error</li>
      </ul>
      <p className="mt-2 text-az-35">
        The CTCE evaluator supports the following constructs:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="text-az-primary">if</code>/<code className="text-az-primary">else</code> conditionals</li>
        <li><code className="text-az-primary">while</code> and <code className="text-az-primary">for</code> loops</li>
        <li><code className="text-az-primary">var</code>/<code className="text-az-primary">fin</code> declarations</li>
        <li><code className="text-az-primary">return</code>, <code className="text-az-primary">break</code>, <code className="text-az-primary">continue</code></li>
        <li>Recursion (up to the depth limit)</li>
        <li>String interpolation (<code className="text-az-primary">"hello $name"</code> and <code className="text-az-primary">{"\"value: ${expr}\""}</code>)</li>
        <li>Pack construction and field access</li>
        <li>Arithmetic, comparison, and boolean operators</li>
      </ul>
      <CodeBlock>{`func sumRange(n: Int): Int {
    var total = 0
    for i in 1..n {
        total += i
    }
    return total
}

fin $sum = sumRange(100)    // $sum = 5050

// CT values with generics:
func computeSize(): Int {
    return 4
}

fin $size = computeSize()
pack Arr<T, N> { data: T[N] }
typealias Vec4 = Arr<Real, $size>
// Creates: pack Vec4 { data: Real[4] }`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: CTCE is most powerful when combined with <code className="text-az-primary">inline if</code> for
        feature flags, <code className="text-az-primary">inline for</code> for code generation, and compile-time
        constants for generic type parameters. The preprocessor handles all the computation, so the
        emitted code is as efficient as hand-written specializations.
      </p>
    </Section>
  )
}
