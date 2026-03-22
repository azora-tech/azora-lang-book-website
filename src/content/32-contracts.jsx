import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Contracts() {
  return (
    <Section id="contracts" title="Contracts">
      <p className="mt-2 text-az-35">
        Contracts attach preconditions and postconditions to functions, inspired by the D programming
        language. They let you declare what must be true before a function runs and what must hold
        after it returns, separating validation logic from the function body.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">23.1 Preconditions (in &#123; assert ... &#125;)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">in</code> block declares a precondition that is checked before the
        function body executes. If the assertion fails, the program reports an error immediately,
        before any side effects from the body can occur.
      </p>
      <CodeBlock>{`func divide(a: Int, b: Int): Int
in { assert b != 0 }
scope {
    return a / b
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Preconditions can include a message string for clearer diagnostics:
      </p>
      <CodeBlock>{`func withdraw(balance: Int, amount: Int): Int
in {
    assert amount > 0 { "withdrawal must be positive" }
    assert amount <= balance { "insufficient funds" }
}
scope {
    return balance - amount
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">23.2 Postconditions (out &#123; r -&gt; assert ... &#125;)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">out</code> block declares a postcondition that is checked after the
        function body returns. The return value is bound to a named parameter (or the
        implicit <code className="text-az-primary">it</code> if no name is given).
      </p>
      <CodeBlock>{`func abs(x: Int): Int
out { r -> assert r >= 0 { "abs must be non-negative" } }
scope {
    if x < 0 { return -x }
    return x
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        When you omit the parameter name, the return value is available
        as <code className="text-az-primary">it</code>:
      </p>
      <CodeBlock>{`func abs(x: Int): Int
out { assert it >= 0 }
scope {
    if x < 0 { return -x }
    return x
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">23.3 Combined Contracts</h3>
      <p className="mt-2 text-az-35">
        Both <code className="text-az-primary">in</code> and <code className="text-az-primary">out</code> can be used
        together. Either order is allowed. Multiple assertions can appear inside each block.
      </p>
      <CodeBlock>{`func clamp(x: Int, lo: Int, hi: Int): Int
in {
    assert lo <= hi
}
out { result ->
    assert result >= lo
    assert result <= hi
}
scope {
    if x < lo { return lo }
    if x > hi { return hi }
    return x
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A classic example, division with both a precondition and a postcondition:
      </p>
      <CodeBlock>{`func divide(a: Int, b: Int): Int
in { assert b != 0 { "divisor must not be zero" } }
out { r -> assert r * b == a { "division identity" } }
scope {
    return a / b
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">23.4 The scope Keyword for Contract Bodies</h3>
      <p className="mt-2 text-az-35">
        When contracts are present, the function body must be preceded by
        the <code className="text-az-primary">scope</code> keyword. This keyword separates the contract
        declarations from the implementation and is required, not optional.
      </p>
      <CodeBlock>{`func safeSqrt(x: Real): Real
in { assert x >= 0.0 { "cannot take sqrt of negative" } }
out { assert it >= 0.0 }
scope {
    // function body goes here
    return x
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Without contracts, functions use a normal body block with no <code className="text-az-primary">scope</code> keyword.
        The <code className="text-az-primary">scope</code> keyword is only needed when
        at least one <code className="text-az-primary">in</code> or <code className="text-az-primary">out</code> block is present.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">23.5 Design by Contract Philosophy</h3>
      <p className="mt-2 text-az-35">
        Contracts work on <code className="text-az-primary">func</code>, <code className="text-az-primary">task</code>,
        <code className="text-az-primary"> impl</code> methods, <code className="text-az-primary">infx</code> methods,
        and <code className="text-az-primary">solo</code> methods. They express the caller's obligations
        (preconditions) and the function's guarantees (postconditions) as executable documentation.
      </p>
      <CodeBlock>{`task fetchData(url: String): String
in { assert url != "" }
scope {
    suspend 10
    return "data"
}

impl Rect {
    func area(): Real
    out { assert it >= 0.0 }
    scope {
        return width * height
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Rules to remember:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Either order is allowed: <code className="text-az-primary">in</code> before <code className="text-az-primary">out</code> or vice versa</li>
        <li>Both blocks are optional, you can use just <code className="text-az-primary">in</code> or just <code className="text-az-primary">out</code></li>
        <li>The <code className="text-az-primary">out</code> block uses implicit <code className="text-az-primary">it</code> when no parameter is named</li>
        <li>The <code className="text-az-primary">scope</code> keyword is required before the body when contracts are present</li>
        <li>Contract assertions are checked at runtime, not at compile time</li>
      </ul>

      <p className="mt-4 text-sm text-az-50">
        Tip: Think of contracts as machine-checked documentation. Preconditions tell callers what
        inputs are valid. Postconditions guarantee what the function delivers. Together, they
        make interfaces self-describing and bugs easier to trace.
      </p>
    </Section>
  )
}
