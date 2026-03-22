import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function FlipFlop() {
  return (
    <Section id="flip-flop" title="Flip/Flop">
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">flip</code>/<code className="text-az-primary">flop</code> alternates
        execution between two blocks on successive calls. The first time execution reaches the construct,
        the <code className="text-az-primary">flip</code> block runs; the second time,
        the <code className="text-az-primary">flop</code> block runs; then it flips back, and so on.
        The alternation state is internal and managed automatically.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">33.1 What is Flip/Flop</h3>
      <p className="mt-2 text-az-35">
        Flip/flop is a control flow construct that encapsulates two-state alternation without external
        mutable variables or manual toggling. It is useful whenever you need a function to behave
        differently on alternating calls, such as toggling a UI element, alternating colors, or
        implementing ping-pong logic.
      </p>
      <p className="mt-2 text-az-35">
        Without flip/flop, you would need a mutable boolean and explicit toggling:
      </p>
      <CodeBlock>{`// Without flip/flop (manual approach):
var isFlip = true
func toggleManual(): String {
    if isFlip {
        isFlip = false
        return "flip"
    } else {
        isFlip = true
        return "flop"
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Flip/flop eliminates the external variable, the branching, and the toggling logic.
        The state is fully encapsulated.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">33.2 Alternating Execution</h3>
      <p className="mt-2 text-az-35">
        Place the two blocks side by side with <code className="text-az-primary">flip</code> before the
        first and <code className="text-az-primary">flop</code> before the second. Both blocks can contain
        any valid statements.
      </p>
      <CodeBlock>{`func toggle(): String {
    flip {
        return "flip"
    } flop {
        return "flop"
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The first call executes <code className="text-az-primary">flip</code>, the second
        executes <code className="text-az-primary">flop</code>, alternating indefinitely:
      </p>
      <CodeBlock>{`assert toggle() == "flip"
assert toggle() == "flop"
assert toggle() == "flip"
assert toggle() == "flop"`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Each <code className="text-az-primary">flip</code>/<code className="text-az-primary">flop</code> pair
        tracks its alternation independently. Multiple pairs in the same function do not interfere:
      </p>
      <CodeBlock>{`func multi() {
    flip { log = log + "A" } flop { log = log + "B" }
    flip { log = log + "1" } flop { log = log + "2" }
}
multi()    // log == "A1"
multi()    // log == "A1B2"
multi()    // log == "A1B2A1"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">33.3 Use Cases</h3>
      <p className="mt-2 text-az-35">
        Common applications for flip/flop include:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Alternating colors or styles in rendering (e.g., zebra-striped table rows)</li>
        <li>Ping-pong buffers or double-buffering logic</li>
        <li>Toggle switches in UI state</li>
        <li>Alternating between two strategies or behaviors</li>
      </ul>
      <CodeBlock>{`func zebraColor(): String {
    flip {
        return "white"
    } flop {
        return "gray"
    }
}

// Render rows with alternating backgrounds
var i = 0
while i < rows.length {
    renderRow(rows[i], zebraColor())
    i += 1
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Flip/flop supports exactly two states. For three or more, use an enum with a match expression.
        The construct is limited to function bodies. Because state is tracked per call site, a flip/flop
        inside a loop alternates on each iteration, not on each call to the enclosing function.
      </p>
    </Section>
  )
}
