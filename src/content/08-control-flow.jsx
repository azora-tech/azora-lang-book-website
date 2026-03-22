import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ControlFlow() {
  return (
    <Section id="control-flow" title="Control Flow">
      <p>
        Azora provides conditionals, loops, pattern matching, and loop control. No parentheses are
        required around conditions. Every control flow construct can be used as an expression that
        produces a value, making Azora highly expression-oriented.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">9.1 If Statements and If Expressions</h3>
      <p className="mt-2 text-az-35">
        Standard conditional with optional <code className="text-az-primary">else if</code> and{' '}
        <code className="text-az-primary">else</code>. No parentheses around the condition. There
        is no ternary operator in Azora, because <code className="text-az-primary">if</code> itself
        can be used as an expression.
      </p>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">If/else statements</h4>
      <CodeBlock>{`// Simple if/else:
if x < 5 {
    println("small")
} else {
    println("big")
}

// Chained else if:
if score >= 90 {
    grade = "A"
} else if score >= 80 {
    grade = "B"
} else if score >= 70 {
    grade = "C"
} else {
    grade = "F"
}`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">If as expression</h4>
      <p className="mt-2 text-az-35">
        When used as an expression, <code className="text-az-primary">if</code> always returns a
        value. The last expression in each branch is the result. The{' '}
        <code className="text-az-primary">else</code> branch is required when{' '}
        <code className="text-az-primary">if</code> is used as an expression.
      </p>
      <CodeBlock>{`// if as expression (replaces ternary):
fin x = if true { 42 } else { 0 }

// Multi-line expression:
fin label = if score >= 90 {
    "excellent"
} else if score >= 70 {
    "good"
} else {
    "needs improvement"
}

// Nested if expressions:
fin category = if age < 13 {
    if supervised { "child-supervised" } else { "child" }
} else if age < 18 {
    "teen"
} else {
    "adult"
}`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Key point:</strong> When <code className="text-az-primary">if</code> is used as an
        expression, it ALWAYS returns a value. Every branch must produce a value of the same type,
        and the <code className="text-az-primary">else</code> branch is mandatory.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.2 For Loops</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">for...in</code> syntax iterates over ranges and
        collections. The loop variable is scoped to the body.
      </p>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Iterating over a collection</h4>
      <CodeBlock>{`fin names = ["Alice", "Bob", "Carol"]
for name in names {
    println(name)
}
// Alice
// Bob
// Carol`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Inclusive range (..)</h4>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">..</code> operator creates an inclusive range where
        both endpoints are included.
      </p>
      <CodeBlock>{`// Inclusive: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
for i in 0..10 {
    print(i)
}
// prints: 012345678910`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Exclusive range ({'..<'})</h4>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">{'..<'}</code> operator creates an exclusive range
        where the end value is excluded. This is useful for array indexing.
      </p>
      <CodeBlock>{`// Exclusive: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
for i in 0..<10 {
    print(i)
}
// prints: 0123456789

// Array indexing with exclusive range:
fin arr = [10, 20, 30]
for i in 0..<arr.length {
    println(arr[i])
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.3 For Loop Features</h3>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Indexed iteration</h4>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">with</code> clause provides a zero-based iteration
        counter alongside each element. The syntax
        is <code className="text-az-primary">for item in collection with idx</code>.
      </p>
      <CodeBlock>{`fin fruits = ["apple", "banana", "cherry"]
for fruit in fruits with idx {
    println("$idx: $fruit")
}
// 0: apple
// 1: banana
// 2: cherry

// Also works with ranges:
for i in 10..12 with idx {
    println("idx=$idx, i=$i")
}
// idx=0, i=10
// idx=1, i=11
// idx=2, i=12`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Reversed iteration</h4>
      <p className="mt-2 text-az-35">
        Prefix a <code className="text-az-primary">for</code> loop with{' '}
        <code className="text-az-primary">reverse</code> to iterate in reverse order. Works with
        both ranges and arrays.
      </p>
      <CodeBlock>{`// Reverse range: 4, 3, 2, 1
reverse for i in 1..4 {
    print(i)
}

// Reverse array:
fin arr = [10, 20, 30]
reverse for item in arr {
    print(item)    // 302010
}`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Async iteration</h4>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">async for</code> syntax iterates over asynchronous
        flows. Each value is awaited as it becomes available.
      </p>
      <CodeBlock>{`// Iterate over an async flow:
async for x in numberFlow {
    println(x)
}

// With index:
async for x in range(2) with idx {
    println("$idx: $x")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.4 For as Expression</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">for</code> loop can be used as an expression that
        produces a value. Use <code className="text-az-primary">break value</code> inside the loop
        body to produce the result. The <code className="text-az-primary">else</code> branch
        provides a default value if the loop completes without breaking.
      </p>
      <CodeBlock>{`// Find first value greater than 50:
fin result = for i in 0..100 {
    if i > 50 { break i }
} else { -1 }
// result == 51

// Search an array:
fin items = [10, 20, 30, 40]
fin found = for e in items {
    if e > 25 { break e }
} else { -1 }
// found == 30

// When nothing matches, the else branch provides the default:
fin items2 = [1, 2, 3]
fin notFound = for e in items2 {
    if e > 100 { break e }
} else { -1 }
// notFound == -1`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Key point:</strong> The <code className="text-az-primary">else</code> branch runs
        when the loop completes without a{' '}
        <code className="text-az-primary">break value</code>. This includes both empty collections
        and loops where the condition inside is never satisfied.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.5 While Loops</h3>
      <p className="mt-2 text-az-35">
        Repeats its body while the condition is <code className="text-az-primary">true</code>.
        The condition is checked before each iteration.
      </p>
      <CodeBlock>{`var x = 0
while x < 5 {
    x += 1
}
// x is now 5`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">While as expression</h4>
      <p className="mt-2 text-az-35">
        Like <code className="text-az-primary">for</code>,{' '}
        <code className="text-az-primary">while</code> can produce a value using{' '}
        <code className="text-az-primary">break value</code> or a bare expression inside
        an <code className="text-az-primary">if</code>.
        The <code className="text-az-primary">else</code> branch provides a fallback if
        the condition is <code className="text-az-primary">false</code> from the start or the loop
        ends without yielding a value.
      </p>
      <CodeBlock>{`var i = 0
fin result = while i < 10 {
    i += 1
    if i == 5 { i * 10 }
} else { -1 }
// result == 50

// When the condition is false from the start, else runs:
fin fallback = while false {
    42
} else { 99 }
// fallback == 99`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.6 Loop (Infinite Loops)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">loop</code> keyword creates an unconditional infinite
        loop. Use <code className="text-az-primary">break</code> to exit.
      </p>
      <CodeBlock>{`var x = 0
loop {
    x += 1
    if x == 10 { break }
}`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Do-while pattern</h4>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">while</code> clause after the loop body guarantees at
        least one execution before the condition is checked.
      </p>
      <CodeBlock>{`var x = 0
loop {
    x += 1
} while x < 5
// x is now 5`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Timed loops</h4>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">loop by</code> pauses for a specified number of
        milliseconds between iterations. Can be combined with the do-while pattern.
      </p>
      <CodeBlock>{`// Runs every 100ms:
var ticks = 0
loop by 100 {
    ticks += 1
    if ticks == 10 { break }
}

// Do-while with interval (every 10ms):
var y = 0
loop by 10 {
    y += 1
} while y < 5`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Loop as expression</h4>
      <p className="mt-2 text-az-35">
        Like other loops, <code className="text-az-primary">loop</code> can produce a value. Use a
        bare expression inside an <code className="text-az-primary">if</code> to yield, or{' '}
        <code className="text-az-primary">break value</code> to exit with a result.
      </p>
      <CodeBlock>{`// Yield a computed result:
var j = 0
fin value = loop {
    j += 1
    if j == 3 { j * 100 }
} else { -1 }
// value == 300

// break without a value falls through to else:
var k = 0
fin result = loop {
    k += 1
    if k == 5 { break }
} else { 42 }
// result == 42`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.7 Break and Continue</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">break</code> exits the innermost loop.{' '}
        <code className="text-az-primary">break value</code> exits and produces a value (for loop
        expressions). <code className="text-az-primary">continue</code> skips to the next iteration.
        All three work in <code className="text-az-primary">for</code>,{' '}
        <code className="text-az-primary">while</code>, and <code className="text-az-primary">loop</code>.
      </p>
      <CodeBlock>{`var sum = 0
for i in 1..10 {
    if i == 3 { continue }   // skip 3
    if i == 6 { break }      // stop at 6
    sum += i
}
// sum = 1 + 2 + 4 + 5 = 12`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <code className="text-az-primary">break value</code> exits a loop and produces a value,
        making the loop an expression:
      </p>
      <CodeBlock>{`fin found = for i in 0..100 {
    if i * i > 50 { break i }
} else { -1 }
// found == 8 (because 8*8 = 64 > 50)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.8 Labeled Loops</h3>
      <p className="mt-2 text-az-35">
        In nested loops, <code className="text-az-primary">break</code> and{' '}
        <code className="text-az-primary">continue</code> normally affect only the innermost loop.
        Labels let you target an outer loop. Prefix the loop with{' '}
        <code className="text-az-primary">@label</code>, then reference it with{' '}
        <code className="text-az-primary">break @label</code> or{' '}
        <code className="text-az-primary">continue @label</code>.
      </p>
      <CodeBlock>{`// Break out of an outer loop from an inner loop:
@outer for i in 0..10 {
    for j in 0..10 {
        if i + j > 5 {
            break @outer
        }
    }
}

// Continue an outer loop:
@outer for i in 0..5 {
    for j in 0..5 {
        if j == 2 { continue @outer }
        println("$i, $j")
    }
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Labels work with all loop types:
      </p>
      <CodeBlock>{`@outer while running {
    @inner loop {
        if done { break @outer }
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.9 When Expressions (Pattern Matching)</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">when</code> matches a value against branches using{' '}
        <code className="text-az-primary">-&gt;</code> arrows. There is no fall-through. Can be
        used as a statement or an expression.
      </p>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Basic when</h4>
      <CodeBlock>{`// As a statement:
when x {
    1 -> println("one")
    2 -> println("two")
    3 -> { var temp = 10; println(temp + 5) }
}

// As an expression (returns a value):
fin name = when x {
    1 -> "one"
    2 -> "two"
    _ -> "other"
}`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Dot shorthand for enums</h4>
      <p className="mt-2 text-az-35">
        When matching on an enum value, the dot shorthand <code className="text-az-primary">.Variant</code>{' '}
        infers the enum type from the subject:
      </p>
      <CodeBlock>{`fin colorName = when color {
    .Red -> "red"
    .Green -> "green"
    .Blue -> "blue"
}`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Wildcard pattern</h4>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">_</code> pattern matches anything. Use it as a
        catch-all default branch:
      </p>
      <CodeBlock>{`fin description = when statusCode {
    200 -> "OK"
    404 -> "Not Found"
    500 -> "Server Error"
    _ -> "Unknown status"
}`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">Multi-pattern branches</h4>
      <p className="mt-2 text-az-35">
        Comma-separated patterns match any of the listed values:
      </p>
      <CodeBlock>{`fin kind = when x {
    1, 2, 3 -> "small"
    4, 5, 6 -> "medium"
    7, 8, 9 -> "large"
    _ -> "out of range"
}`}</CodeBlock>

      <h4 className="text-md font-semibold mt-4 mb-1 text-az-25">When always returns a value as expression</h4>
      <p className="mt-2 text-az-35">
        When used as an expression, <code className="text-az-primary">when</code> always returns a
        value. Each branch must produce a value of the same type:
      </p>
      <CodeBlock>{`fin points = when grade {
    "A" -> 4
    "B" -> 3
    "C" -> 2
    "D" -> 1
    _ -> 0
}

// Used directly in function calls:
println(when x {
    1 -> "one"
    2 -> "two"
    _ -> "other"
})`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">9.10 Loop Expressions Summary</h3>
      <p className="mt-2 text-az-35">
        ALL control flow constructs in Azora can be used as expressions that produce values.
        Here is a summary comparing statement and expression usage for each construct:
      </p>

      <CodeBlock>{`// --- if ---
// Statement:
if x > 0 { println("positive") }
// Expression:
fin sign = if x > 0 { "positive" } else { "non-positive" }

// --- for ---
// Statement:
for i in 1..5 { println(i) }
// Expression (use break value, else provides default):
fin first = for i in 1..100 {
    if isPrime(i) { break i }
} else { -1 }

// --- while ---
// Statement:
while running { tick() }
// Expression:
fin answer = while attempts > 0 {
    attempts -= 1
    if check() { break 42 }
} else { -1 }

// --- loop ---
// Statement:
loop { if done { break } }
// Expression:
fin computed = loop {
    step += 1
    if step == target { break step * 10 }
} else { 0 }

// --- when ---
// Statement:
when x { 1 -> println("one") }
// Expression:
fin name = when x { 1 -> "one", 2 -> "two", _ -> "other" }`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Key principle:</strong> Azora is expression-oriented. Every control flow construct
        can produce a value, eliminating the need for ternary operators or separate "expression"
        variants. This makes code concise while keeping it readable.
      </p>
    </Section>
  )
}
