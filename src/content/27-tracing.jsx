import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Tracing() {
  return (
    <Section id="tracing" title="Tracing">
      <p className="mt-2 text-az-35">
        Tracing is Azora's built-in structured logging system. Unlike ad-hoc{' '}
        <code className="text-az-primary">println</code> calls, trace statements carry explicit severity
        levels, are lazily evaluated, and can be filtered by the runtime. Leave them in your code
        permanently.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">32.1 Inline Trace</h3>
      <p className="mt-2 text-az-35">
        A trace consists of the <code className="text-az-primary">trace</code> keyword, an optional{' '}
        <code className="text-az-primary">LogTrace</code> severity level (short dot syntax or fully
        qualified), and a trailing lambda that produces the message string. The lambda is lazily
        evaluated, so expensive operations incur zero cost when the trace level is filtered out.
      </p>
      <CodeBlock>{`trace .Info { "application started" }
trace .Warning { "disk space low" }
trace .Error { "connection failed" }

// Full enum access also works:
trace LogTrace.Warning { "watch out" }`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Omit the severity level for quick diagnostic output. Bare traces still benefit from
        lazy evaluation but are not filterable by level.
      </p>
      <CodeBlock>{`trace { "message without level" }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">32.2 Trace Levels</h3>
      <p className="mt-2 text-az-35">
        The built-in <code className="text-az-primary">LogTrace</code> enum defines five severity levels:
      </p>
      <Table
        headers={['Level', 'Purpose']}
        rows={[
          [<code>.Info</code>, 'Routine operational messages (startup, lifecycle events)'],
          [<code>.Warning</code>, 'Unexpected but recoverable conditions'],
          [<code>.Error</code>, 'Genuine failures and violated invariants'],
          [<code>.Todo</code>, 'Runtime markers for unfinished work (visible when the code path is hit)'],
          [<code>.Debug</code>, 'Verbose diagnostic info, typically suppressed outside development'],
        ]}
      />
      <CodeBlock>{`func loadAssets(path: String): AssetBundle {
    trace .Info { "Loading assets from: " + path }
    fin bundle = readBundle(path)
    trace .Debug { "Loaded " + bundle.count.toString() + " assets" }
    return bundle
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">32.3 Trace Messages</h3>
      <p className="mt-2 text-az-35">
        Because the message is a lambda, you can include any expression. Use string concatenation
        or method calls freely, knowing they only execute when the trace level is active.
      </p>
      <CodeBlock>{`// Expensive toString is free when Debug is filtered:
trace .Debug { "Matrix state: " + matrix.toString() }

// Use .Todo traces as runtime reminders:
func handleEvent(event: Event) {
    trace .Todo { "handle resize events" }
}

// Bracket operations with trace statements for timing/state:
func processData(data: [Int]) {
    trace .Info { "Processing " + data.length.toString() + " items" }
    fin result = transform(data)
    trace .Info { "Processing complete" }
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Prefer <code className="text-az-primary">trace</code> over{' '}
        <code className="text-az-primary">println</code> for all diagnostic output. Trace statements are
        structured, levelled, and lazily evaluated.
      </p>
    </Section>
  )
}
