import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Variables() {
  return (
    <Section id="variables" title="Variables">
      <p className="mt-2 text-az-35">
        Azora provides two keywords for declaring variables: <code className="text-az-primary">var</code> for
        mutable bindings and <code className="text-az-primary">fin</code> for immutable ones. Every
        variable is statically typed, and the compiler enforces type safety at compile time.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.1 Mutable Variables (<code className="text-az-primary">var</code>)</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">var</code> variable can be reassigned at any point after
        declaration. Use <code className="text-az-primary">var</code> when the value needs to change
        over the course of the program.
      </p>

      <CodeBlock>{`var x = 42           // type inferred as Int
var y: Int = 5        // explicit type annotation
var s = "hello"       // type inferred as String

x = 100              // reassignment is allowed
s = "world"          // s is now "world"`}</CodeBlock>

      <p className="mt-2 text-az-35">
        The type of a <code className="text-az-primary">var</code> is fixed at declaration. You cannot
        reassign a variable to a value of a different type:
      </p>

      <CodeBlock>{`var x = 42
x = "hello"          // ERROR: cannot assign String to Int`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> Let the compiler infer types when the initializer makes the type
        obvious (<code className="text-az-primary">var name = "Alice"</code>). Use explicit
        annotations when the type might be ambiguous or when declaring nullable types.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.2 Immutable Variables (<code className="text-az-primary">fin</code>)</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">fin</code> binding cannot be reassigned after initialization.
        The compiler enforces this and will produce an error on any attempt to reassign. This is
        similar to <code className="text-az-primary">val</code> in Kotlin
        or <code className="text-az-primary">let</code> in Swift.
      </p>

      <CodeBlock>{`fin x = 10            // immutable, cannot reassign
fin pi: Real = 3.14   // explicit type
fin name = "Azora"    // inferred as String

x = 20               // ERROR: cannot reassign fin variable`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Tip:</strong> Prefer <code className="text-az-primary">fin</code> by default. Only
        use <code className="text-az-primary">var</code> when you genuinely need reassignment. This
        makes your code easier to reason about and enables the compiler to apply more optimizations.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.3 Type Inference</h3>
      <p className="mt-2 text-az-35">
        The compiler determines a variable's type from its initializer. This works for all
        primitives, collections, and generic expressions. Azora is fully statically typed: once
        inferred, the type is fixed and cannot change.
      </p>

      <CodeBlock>{`var count = 10         // Int
var ratio = 0.75       // Real
var active = true      // Bool
var label = "score"    // String
var letter = 'A'       // Char
fin items = [1, 2, 3]  // Array<Int>`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Type inference applies to both <code className="text-az-primary">var</code> and <code className="text-az-primary">fin</code> declarations.
        The inferred type is identical to what you would write explicitly, so <code className="text-az-primary">var x = 42</code> is
        the same as <code className="text-az-primary">var x: Int = 42</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.4 Type Annotations</h3>
      <p className="mt-2 text-az-35">
        You can always provide an explicit type annotation using a colon after the variable name.
        Annotations are required in some cases and optional in others.
      </p>

      <CodeBlock>{`// Optional: type is clear from the initializer
var x: Int = 42
fin name: String = "Azora"

// Required: no initializer or ambiguous context
var y: Int = _          // zero-value default requires annotation
var score: Int? = null   // nullable requires annotation

// Required: when the desired type differs from the literal
var b: Byte = 42        // literal 42 would default to Int
var f: Float = 3.14     // literal 3.14 would default to Real`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.5 Default Zero Values (<code className="text-az-primary">_</code>)</h3>
      <p className="mt-2 text-az-35">
        The underscore <code className="text-az-primary">_</code> means "use the zero value for this
        type." It requires an explicit type annotation so the compiler knows which zero value to
        use.
      </p>

      <CodeBlock>{`var x: Int = _      // x = 0
var r: Real = _     // r = 0.0
var s: String = _   // s = ""
var b: Bool = _     // b = false
var c: Char = _     // c = '\0' (null character)

var y = _           // ERROR: requires type annotation`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Zero values by type:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Integer types (<code className="text-az-primary">Int</code>, <code className="text-az-primary">Byte</code>, <code className="text-az-primary">Long</code>, etc.): <code className="text-az-primary">0</code></li>
        <li>Floating-point types (<code className="text-az-primary">Real</code>, <code className="text-az-primary">Float</code>, <code className="text-az-primary">Decimal</code>): <code className="text-az-primary">0.0</code></li>
        <li><code className="text-az-primary">Bool</code>: <code className="text-az-primary">false</code></li>
        <li><code className="text-az-primary">String</code>: <code className="text-az-primary">""</code></li>
        <li><code className="text-az-primary">Char</code>: <code className="text-az-primary">'\0'</code></li>
      </ul>

      <p className="mt-4 text-az-35">
        Every variable in Azora is always initialized, either with an explicit value or with the
        type's zero value. There is no undefined behavior from reading uninitialized variables.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.6 Nullable Variables</h3>
      <p className="mt-2 text-az-35">
        By default, variables cannot be <code className="text-az-primary">null</code>. To allow null,
        add a question mark to the type. <code className="text-az-primary">Int?</code> is distinct
        from <code className="text-az-primary">Int</code>: the compiler tracks nullability and
        requires you to handle the null case before using the value.
      </p>

      <CodeBlock>{`var x: Int? = null      // nullable Int, starts as null
var y: Int? = 42        // nullable Int, starts with a value
var name: String? = null

// Using null-safe operators
fin value = x ?? 0     // null coalescing: 0 if x is null
fin len = name?.length  // safe call: null if name is null`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Azora provides null-safe operators including <code className="text-az-primary">??</code> (null
        coalescing), <code className="text-az-primary">?.</code> (safe call),
        <code className="text-az-primary"> ?=</code> (null-coalescing assignment), and null-safe
        compound operators like <code className="text-az-primary">?+=</code>,
        <code className="text-az-primary"> ?++</code>, and <code className="text-az-primary">?--</code>.
        These are covered in detail in the Nullable Types chapter.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.7 Exposed Variables</h3>
      <p className="mt-2 text-az-35">
        All declarations are file-private by default. The <code className="text-az-primary">expose</code> keyword
        makes a declaration visible to other files in the same package and to importers.
      </p>

      <CodeBlock>{`expose var health: Int = 100        // visible to other files
expose fin MAX_HEALTH: Int = 100    // exposed immutable constant

var secret = "hidden"               // file-private, not accessible outside`}</CodeBlock>

      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">confine</code> keyword restricts visibility further,
        limiting access to the declaring scope only. This is useful for internal implementation
        details within a module.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.8 Naming Conventions</h3>
      <p className="mt-2 text-az-35">
        Azora follows these naming conventions:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Variables and functions: <code className="text-az-primary">camelCase</code> (e.g., <code className="text-az-primary">playerScore</code>, <code className="text-az-primary">calculateArea</code>)</li>
        <li>Constants (top-level <code className="text-az-primary">fin</code>): <code className="text-az-primary">UPPER_SNAKE_CASE</code> or <code className="text-az-primary">PascalCase</code> (e.g., <code className="text-az-primary">MAX_SIZE</code>)</li>
        <li>Type names (packs, enums, specs, slots): <code className="text-az-primary">PascalCase</code> (e.g., <code className="text-az-primary">Player</code>, <code className="text-az-primary">Direction</code>)</li>
        <li>Packages: <code className="text-az-primary">lowercase</code> with dots (e.g., <code className="text-az-primary">game.engine</code>)</li>
      </ul>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> These conventions are not compiler-enforced but are standard
        across the ecosystem and strongly recommended for consistency.
      </p>

      <CodeBlock>{`package game.world

expose fin MAX_ENTITIES = 1000

var entityCount = 0

func spawnEntity(name: String): Bool {
    if entityCount >= MAX_ENTITIES { return false }
    entityCount += 1
    println("Spawned: $name")
    return true
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">3.9 Thread-Local Variables</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">threadlocal</code> keyword declares a thread-local variable.
        Each thread gets its own independent copy of the variable, so reads and writes in one thread
        do not affect the value seen by other threads. Both <code className="text-az-primary">var</code> and{' '}
        <code className="text-az-primary">fin</code> are supported.
      </p>

      <CodeBlock>{`threadlocal var requestId: Int = 0
threadlocal fin config: String = "default"`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Thread-local variables are useful for per-thread state such as request identifiers,
        thread-specific caches, or configuration that varies between threads. The syntax
        is <code className="text-az-primary">threadlocal var name: Type = value</code> or{' '}
        <code className="text-az-primary">threadlocal fin name: Type = value</code>.
      </p>

      <CodeBlock>{`threadlocal var counter: Int = 0

func incrementCounter() {
    counter++
}

// Each thread calling incrementCounter() modifies only its own copy`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> Thread-local variables require an explicit initializer. Each thread
        starts with the initial value, and subsequent modifications are isolated to that thread.
      </p>
    </Section>
  )
}
