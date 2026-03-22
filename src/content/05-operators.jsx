import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Operators() {
  return (
    <Section id="operators" title="Operators">
      <p className="mt-2 text-az-35">
        Azora provides a comprehensive set of operators for arithmetic, comparison, logic, bitwise
        manipulation, assignment, ranges, null handling, and member access.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.1 Arithmetic Operators</h3>
      <p className="mt-2 text-az-35">
        The standard arithmetic operators work on all numeric types. When mixing types, numeric
        promotion applies automatically (see Primitive Types).
      </p>

      <CodeBlock>{`2 + 3      // 5   (addition)
10 - 4     // 6   (subtraction)
3 * 7      // 21  (multiplication)
20 / 4     // 5   (division)
17 % 5     // 2   (modulo / remainder)
-x         // unary negation`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Integer division truncates toward zero: <code className="text-az-primary">7 / 2</code> yields <code className="text-az-primary">3</code>.
        For a fractional result, ensure one operand is <code className="text-az-primary">Real</code>:
      </p>

      <CodeBlock>{`7 / 2       // 3 (integer division, truncates)
7.0 / 2     // 3.5 (Real division)
7 / 2.0     // 3.5 (Int promoted to Real)

// Mixed Int/Real promotes to Real:
2 + 1.5     // 3.5 (Real)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Strings support <code className="text-az-primary">+</code> for concatenation
        and <code className="text-az-primary">*</code> for repetition:
      </p>

      <CodeBlock>{`"hello" + " " + "world"    // "hello world"
"ab" * 3                   // "ababab"
3 * "ha"                   // "hahaha"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.2 Comparison Operators</h3>
      <p className="mt-2 text-az-35">
        All comparison operators produce a <code className="text-az-primary">Bool</code> result.
        Equality (<code className="text-az-primary">==</code>) is structural, not referential.
        Comparing incompatible types is a compile-time error.
      </p>

      <CodeBlock>{`1 < 2      // true  (less than)
2 <= 2     // true  (less than or equal)
3 > 2      // true  (greater than)
3 >= 3     // true  (greater than or equal)
5 == 5     // true  (equality)
5 != 6     // true  (inequality)

// Works on strings and chars too
"abc" < "abd"    // true (lexicographic)
'a' < 'b'        // true (by Unicode code point)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.3 Logical Operators</h3>
      <p className="mt-2 text-az-35">
        Logical operators work on <code className="text-az-primary">Bool</code> values and use
        short-circuit evaluation.
      </p>

      <CodeBlock>{`true && true    // true   (logical AND)
true && false   // false
false || true   // true   (logical OR)
false || false  // false
!false          // true   (logical NOT)
!true           // false`}</CodeBlock>

      <p className="mt-4 text-az-35">
        With <code className="text-az-primary">&&</code>, if the left operand
        is <code className="text-az-primary">false</code>, the right operand is never evaluated.
        With <code className="text-az-primary">||</code>, if the left operand
        is <code className="text-az-primary">true</code>, the right operand is skipped.
        This makes it safe to write guard expressions:
      </p>

      <CodeBlock>{`// Safe: length check prevents out-of-bounds
if items.length > 0 && items[0] == target {
    println("Found it!")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.4 Bitwise Operators</h3>
      <p className="mt-2 text-az-35">
        Bitwise operators manipulate individual bits of integer values. They work on all integer
        types.
      </p>

      <CodeBlock>{`0b1100 & 0b1010    // 0b1000 = 8   (bitwise AND)
0b1100 | 0b1010    // 0b1110 = 14  (bitwise OR)
0b1100 ^ 0b1010    // 0b0110 = 6   (bitwise XOR)
~0b1100            // bitwise NOT (flips all bits)
1 << 3             // 8            (left shift)
16 >> 2            // 4            (right shift)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Common uses for bitwise operators include flag manipulation, low-level data packing, and
        performance-sensitive integer math:
      </p>

      <CodeBlock>{`// Flag manipulation
fin READ = 1       // 0b001
fin WRITE = 2      // 0b010
fin EXEC = 4       // 0b100

var perms = READ | WRITE    // 0b011 = 3
var canRead = (perms & READ) != 0   // true
var canExec = (perms & EXEC) != 0   // false`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.5 Assignment Operators</h3>
      <p className="mt-2 text-az-35">
        Assignment operators combine an operation with assignment. They only work
        with <code className="text-az-primary">var</code> variables.
      </p>

      <CodeBlock>{`var x = 10
x = 20     // simple assignment
x += 5     // x = x + 5  -> 25
x -= 3     // x = x - 3  -> 22
x *= 2     // x = x * 2  -> 44
x /= 4     // x = x / 4  -> 11
x %= 3     // x = x % 3  -> 2`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> Compound assignment operators are syntactic sugar. <code className="text-az-primary">x += 5</code> is
        exactly equivalent to <code className="text-az-primary">x = x + 5</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.6 Increment/Decrement</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">++</code> and <code className="text-az-primary">--</code> operators
        increment or decrement an integer variable by one. They are <strong>statements only</strong>,
        not expressions. You cannot use them inside another expression or assign their result.
        They modify the variable in-place and work on integer types
        (<code className="text-az-primary">Int</code>, <code className="text-az-primary">Byte</code>,{' '}
        <code className="text-az-primary">Long</code>, etc.).
      </p>

      <CodeBlock>{`var count = 0
count++        // count is now 1
count++        // count is now 2
count--        // count is now 1

// These are INVALID because ++ and -- are statements, not expressions:
// var x = count++    // ERROR: cannot use as expression
// println(count--)   // ERROR: cannot use as expression`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.7 Range Operators</h3>
      <p className="mt-2 text-az-35">
        Azora provides two range operators for creating sequences of values:
      </p>

      <CodeBlock>{`// Inclusive range (..) - both endpoints included
1..5       // 1, 2, 3, 4, 5

// Exclusive range (..<) - end is excluded
1..<5      // 1, 2, 3, 4`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Ranges are most commonly used with <code className="text-az-primary">for</code> loops:
      </p>

      <CodeBlock>{`// Inclusive: prints 0, 1, 2, 3, 4
for i in 0..4 {
    println(i)
}

// Exclusive: prints 0, 1, 2, 3
for i in 0..<4 {
    println(i)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.8 Null-Safe Operators</h3>
      <p className="mt-2 text-az-35">
        Null-safe operators work with nullable types to handle null values concisely.
      </p>

      <p className="mt-2 text-az-35">
        The <strong>null coalescing</strong> operator <code className="text-az-primary">??</code> returns the
        left operand if non-null, otherwise the right (fallback). It can be chained.
      </p>

      <CodeBlock>{`var name: String? = null
var display = name ?? "Anonymous"  // "Anonymous"

var score: Int? = 42
var value = score ?? 0             // 42

// Chaining
var a: Int? = null
var b: Int? = null
var c: Int? = 10
var result = a ?? b ?? c ?? 0      // 10`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Null-coalescing assignment</strong> (<code className="text-az-primary">?=</code>) assigns
        a value only if the variable is currently null:
      </p>

      <CodeBlock>{`var x: Int? = null
x ?= 42              // x is now 42 (was null)
x ?= 100             // x is still 42 (was not null)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Null-safe compound operators</strong> perform their operation only when the variable
        is non-null. If the variable is null, the operation is skipped:
      </p>

      <CodeBlock>{`var x: Int? = 10
x ?+= 5        // x is now 15
x ?-= 3        // x is now 12
x ?*= 2        // x is now 24
x ?/= 4        // x is now 6
x ?%= 4        // x is now 2
x ?++           // x is now 3
x ?--           // x is now 2

var y: Int? = null
y ?+= 5        // y is still null (skipped)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.9 Safe Call Operator (<code className="text-az-primary">?.</code>)</h3>
      <p className="mt-2 text-az-35">
        The safe call operator <code className="text-az-primary">?.</code> accesses a member only if
        the receiver is non-null. If the receiver is null, the entire expression evaluates to null.
      </p>

      <CodeBlock>{`var name: String? = "Azora"
var len = name?.length         // 5

var empty: String? = null
var len2 = empty?.length       // null`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Safe calls can be chained and combined with null coalescing:
      </p>

      <CodeBlock>{`var result = obj?.child?.value ?? "default"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.10 Operator Precedence</h3>
      <p className="mt-2 text-az-35">
        Operators are evaluated according to precedence, from lowest (evaluated last) to highest
        (evaluated first):
      </p>

      <Table
        headers={['Precedence', 'Operators', 'Description']}
        rows={[
          ['1 (lowest)', <code>??</code>, 'Null coalescing'],
          ['2', <code>||</code>, 'Logical OR'],
          ['3', <code>&&</code>, 'Logical AND'],
          ['4', <code>== !=</code>, 'Equality'],
          ['5', <code>{'< <= > >='}</code>, 'Comparison'],
          ['6', 'Infix functions', 'User-defined infix operators'],
          ['7', <code>as is</code>, 'Cast / type check'],
          ['8', <code>{'| ^'}</code>, 'Bitwise OR / XOR'],
          ['9', <code>&</code>, 'Bitwise AND'],
          ['10', <code>{'<< >>'}</code>, 'Bit shifts'],
          ['11', <code>+ -</code>, 'Addition / subtraction'],
          ['12', <code>* / %</code>, 'Multiplication / division / modulo'],
          ['13', <code>- ! ~</code>, 'Unary negation / logical NOT / bitwise NOT'],
          ['14 (highest)', <code>. () [] ?.</code>, 'Member access, call, index, safe call'],
        ]}
      />

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> When in doubt, use parentheses. <code className="text-az-primary">(a + b) * c</code> is
        immediately clear, regardless of whether you remember that <code className="text-az-primary">*</code> has
        higher precedence than <code className="text-az-primary">+</code>.
      </p>

      <CodeBlock>{`// Precedence examples
2 + 3 * 4          // 14 (multiplication first)
(2 + 3) * 4        // 20 (parentheses override)
true || false && false   // true (&& binds tighter than ||)
a ?? b + c         // a ?? (b + c), addition before coalescing`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Common Patterns</h3>

      <CodeBlock>{`// Clamping a value within bounds
var health = 120
health = if health > 100 { 100 } else { health }

// Safe default with null coalescing
var config: String? = null
fin setting = config ?? "default_value"

// Accumulating in a loop
var sum = 0
for i in 1..10 {
    sum += i
}

// Type-safe conditional logic
var input = 42
if input is Int && input > 0 {
    println("positive integer")
}

// Bit flag checking
fin hasPermission = (flags & REQUIRED_FLAG) != 0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">5.11 Platform Intrinsic</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">platform(scope::member)</code> intrinsic is a compile-time
        check that returns <code className="text-az-primary">true</code> or{' '}
        <code className="text-az-primary">false</code> based on the current target platform. It allows
        you to write platform-specific code that is resolved at compile time.
      </p>

      <CodeBlock>{`if platform(os::macOS) {
    println("Running on macOS")
}

if platform(os::Windows) {
    println("Running on Windows")
}

if platform(compiler::LLVM) {
    // LLVM-specific code
}`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Available scopes and their members:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><code className="text-az-primary">os</code>: <code className="text-az-primary">Android</code>, <code className="text-az-primary">iOS</code>, <code className="text-az-primary">Windows</code>, <code className="text-az-primary">macOS</code>, <code className="text-az-primary">Linux</code>, <code className="text-az-primary">Web</code></li>
        <li><code className="text-az-primary">compiler</code>: <code className="text-az-primary">Dynamic</code>, <code className="text-az-primary">LLVM</code>, <code className="text-az-primary">KT</code>, <code className="text-az-primary">JS</code></li>
      </ul>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> Since <code className="text-az-primary">platform()</code> is resolved at
        compile time, the compiler can eliminate unreachable branches entirely, producing no
        overhead in the emitted code.
      </p>
    </Section>
  )
}
