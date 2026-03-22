import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function VariadicLambdas() {
  return (
    <Section id="variadic-lambdas" title="Variadic Lambdas">
      <p>
        Variadic lambdas accept a variable number of arguments. They use the{' '}
        <code className="text-az-primary">{'<T...>'}</code> syntax prefix and make all arguments
        available through the implicit <code className="text-az-primary">it</code> parameter. The
        compiler resolves concrete types and argument count at compile time.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">12.1 Variadic Lambda Syntax</h3>
      <p className="mt-2 text-az-35">
        Place <code className="text-az-primary">{'<T...>'}</code> before the opening brace. The
        lambda can then be called with any number of arguments.
      </p>
      <CodeBlock>{`var sum = <T...>{
    var total = 0
    for x in it {
        total += x
    }
    total
}

assert sum(1, 2, 3) == 6
assert sum(10, 20, 30, 40) == 100`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.2 The "it" Array</h3>
      <p className="mt-2 text-az-35">
        Inside a variadic lambda, <code className="text-az-primary">it</code> behaves as an array
        of all the arguments. It exposes <code className="text-az-primary">it.length</code> for the
        argument count and bracket notation for indexed access. Both are resolved at compile time.
      </p>
      <CodeBlock>{`var len = <T...>{ it.length }
assert len() == 0
assert len(1, 2, 3) == 3

var first = <T...>{ it[0] }
assert first(42) == 42
assert first("hello") == "hello"`}</CodeBlock>

      <p className="mt-4 text-az-35">
        You can iterate over <code className="text-az-primary">it</code> with{' '}
        <code className="text-az-primary">for</code> loops, including indexed iteration with{' '}
        <code className="text-az-primary">with</code>:
      </p>
      <CodeBlock>{`var indexSum = <T...>{
    var total = 0
    for x in it with i {
        total += i
    }
    total
}
assert indexSum(10, 20, 30) == 3    // 0 + 1 + 2`}</CodeBlock>

      <p className="mt-4 text-az-35">
        For compile-time unrolling, prefix the loop with{' '}
        <code className="text-az-primary">inline</code> and use{' '}
        <code className="text-az-primary">$</code>-prefixed names for compile-time values:
      </p>
      <CodeBlock>{`var indexSum = <T...>{
    inline var total = 0
    inline for _ in it with i {
        $total = $total + $i
    }
    $total
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.3 Where Constraints on Length</h3>
      <p className="mt-2 text-az-35">
        Use a <code className="text-az-primary">where</code> clause on{' '}
        <code className="text-az-primary">T.length</code> to enforce a minimum (or exact) number
        of arguments. Violations are caught at compile time.
      </p>
      <CodeBlock>{`var needsThree = <T...> where T.length >= 3 {
    it[0] + it[1] + it[2]
}
assert needsThree(1, 2, 3) == 6

// This would be a compile-time error:
// needsThree(1, 2)   // ERROR: T.length >= 3 not satisfied`}</CodeBlock>

      <p className="mt-4 text-az-35">
        You can also use exact equality or other comparisons:
      </p>
      <CodeBlock>{`var pair = <T...> where T.length == 2 {
    it[0] + it[1]
}
assert pair(10, 20) == 30`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">12.4 Use Cases</h3>
      <p className="mt-2 text-az-35">
        Variadic lambdas are useful when you want a concise, type-safe way to work with a flexible
        number of arguments without defining multiple function overloads.
      </p>

      <p className="mt-4 text-az-35"><strong>Logging with variable arguments:</strong></p>
      <CodeBlock>{`var log = <T...>{
    var msg = ""
    for part in it {
        msg = msg + toString(part) + " "
    }
    println(msg)
}

log("User", "Alice", "logged in at", 1234567890)`}</CodeBlock>

      <p className="mt-4 text-az-35"><strong>Building arrays from arguments:</strong></p>
      <CodeBlock>{`var listOf = <T...>{
    var result: Int[] = [].fill<Int>(it.length)
    for x in it with i {
        result[i] = x
    }
    result
}
var arr = listOf(10, 20, 30)   // [10, 20, 30]`}</CodeBlock>

      <p className="mt-4 text-az-35"><strong>Min/max across any number of values:</strong></p>
      <CodeBlock>{`var max = <T...> where T.length >= 1 {
    var best = it[0]
    for x in it {
        if x > best { best = x }
    }
    best
}
assert max(3, 7, 2, 9, 1) == 9`}</CodeBlock>
    </Section>
  )
}
