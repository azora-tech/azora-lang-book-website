import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Reactivity() {
  return (
    <Section id="reactivity" title="Reactivity">
      <p className="mt-2 text-az-35">
        Azora includes a built-in reactivity system for building interactive UIs and managing
        application state. It introduces eight keywords:{' '}
        <code className="text-az-primary">solo</code>, <code className="text-az-primary">inject</code>,{' '}
        <code className="text-az-primary">wrap</code>, <code className="text-az-primary">bind</code>,{' '}
        <code className="text-az-primary">lazy</code>, <code className="text-az-primary">rem</code>,{' '}
        <code className="text-az-primary">view</code>, and <code className="text-az-primary">effect</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.1 Solo (Singleton Services)</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">solo</code> is a singleton type. Each wrap creates exactly
        one instance, initialized lazily on first <code className="text-az-primary">inject</code>.
        Methods inside a solo have implicit access to its fields, so
        no <code className="text-az-primary">self.</code> prefix is needed.
      </p>
      <CodeBlock>{`solo Logger {
    var level: Int = 0

    func log(msg: String) {
        if level > 0 { println(msg) }
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A solo can hold mutable state, expose methods, and be injected anywhere within its wrap.
      </p>
      <CodeBlock>{`solo CounterService {
    var count: Int = 0

    func increment() {
        count += 1
    }

    func getCount(): Int {
        return count
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.2 Solo Fields and Methods</h3>
      <p className="mt-2 text-az-35">
        Solo fields are declared with <code className="text-az-primary">var</code> (mutable)
        or <code className="text-az-primary">fin</code> (immutable), just like regular variables. Methods
        can read and write fields directly by name.
      </p>
      <CodeBlock>{`solo Database {
    fin connectionString: String = "localhost:5432"
    var isConnected: Bool = false

    func connect() {
        // connectionString is accessible directly
        println("Connecting to " + connectionString)
        isConnected = true
    }

    func disconnect() {
        isConnected = false
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.3 Inject (Dependency Resolution)</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">ref x = inject TypeName</code> to resolve a solo instance
        from the active wrap. The <code className="text-az-primary">ref</code> keyword behaves
        like <code className="text-az-primary">fin</code> (immutable binding). The solo instance is created
        on first injection and reused for all subsequent injections of the same type.
      </p>
      <CodeBlock>{`ref counter = inject CounterService
counter.increment()
counter.increment()
println(counter.getCount())   // 2`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.4 Wrap (DI Containers)</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">wrap</code> groups solo registrations and bindings into
        a dependency injection container. It defines which solos are available and how they
        relate to each other.
      </p>
      <CodeBlock>{`wrap AppModule {
    solo Logger
    solo Database
    Logger bind LogSpec
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Activate and deactivate the wrap with lifecycle calls:
      </p>
      <CodeBlock>{`App.initLifecycle()    // activate the wrap
// ... use inject to resolve solos ...
App.endLifecycle()     // destroy the wrap`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.5 Bind (Connecting Services to Specs)</h3>
      <p className="mt-2 text-az-35">
        Bindings connect solos to consumers or specs. There are three forms:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Consumer binding:</strong> <code className="text-az-primary">X bind Y</code>, connects solo X to consumer Y</li>
        <li><strong>Spec binding:</strong> <code className="text-az-primary">solo ConcreteType bind SpecName</code>, registers a concrete solo as a spec implementation</li>
      </ul>
      <CodeBlock>{`wrap AppModule {
    solo HttpClient
    solo ApiService
    ApiService bind HttpClient           // consumer binding
    solo SqliteDb bind DatabaseSpec      // spec binding
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.6 Lazy Bind</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">lazy bind</code> to break circular dependencies between solos.
        A lazy binding defers resolution until the solo is actually accessed, allowing two solos
        to reference each other.
      </p>
      <CodeBlock>{`wrap AppModule {
    solo HttpClient
    solo ApiService
    HttpClient lazy bind ApiService      // deferred resolution
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.7 Rem (Persistent Remembered State)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">rem</code> keyword declares persistent state that
        survives re-executions. Unlike <code className="text-az-primary">var</code>, a{' '}
        <code className="text-az-primary">rem</code> variable retains its value across view re-renders.
        The initializer runs only on the first execution.
      </p>
      <CodeBlock>{`rem count: Int = 0       // persists across re-renders
rem name: String = "default"

// Each re-render, count keeps its previous value
count += 1`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.8 View (Reactive UI Components)</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">view</code> declares a reactive UI component. Views
        can accept parameters and contain any Azora code in their body. When the view's state
        changes, it re-executes automatically.
      </p>
      <CodeBlock>{`view Counter(initial: Int) {
    rem count: Int = initial

    println("Count: " + count.toString())
    count += 1
}

view App() {
    Counter(0)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">30.9 Effect (Reactive Side Effects)</h3>
      <p className="mt-2 text-az-35">
        An <code className="text-az-primary">effect</code> declares a side effect that runs when
        its dependencies change. List the dependencies before the block. The effect body can
        return a cleanup lambda that runs before the next execution or on disposal.
      </p>
      <CodeBlock>{`effect timer.elapsed {
    println("Elapsed changed: " + timer.elapsed.toString())

    // cleanup: return a lambda
    return {
        println("cleaning up previous effect")
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Effects without explicit dependencies use the bare syntax:
      </p>
      <CodeBlock>{`effect {
    println("effect triggered on every render")
    return { }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Complete Example</h3>
      <CodeBlock>{`solo TimerService {
    var elapsed: Int = 0

    func tick() {
        elapsed += 1
    }
}

wrap GameModule {
    solo TimerService
}

view GameHUD() {
    ref timer = inject TimerService

    rem frames: Int = 0
    frames += 1

    effect timer.elapsed {
        println("Elapsed: " + timer.elapsed.toString())
        return { }
    }
}`}</CodeBlock>
    </Section>
  )
}
