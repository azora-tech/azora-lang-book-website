import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Packs() {
  return (
    <Section id="packs" title="Packs">
      <p>
        Packs are Azora's product types, similar to structs in other languages. They group related
        data into a named type with typed fields, support construction via positional or named
        arguments, and provide structural equality out of the box. Methods are added separately
        through <code className="text-az-primary">impl</code> blocks.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">13.1 Pack Declaration</h3>
      <p className="mt-2 text-az-35">
        Declare a pack with the <code className="text-az-primary">pack</code> keyword. Each field
        has a name, a type, and an optional default value.
      </p>
      <CodeBlock>{`pack Point {
    x: Real
    y: Real
}

pack Config {
    debug: Bool = false
    level: Int = 1
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.2 Fields (var and fin)</h3>
      <p className="mt-2 text-az-35">
        Fields can be declared with <code className="text-az-primary">var</code> (mutable) or{' '}
        <code className="text-az-primary">fin</code> (immutable). Fields without a modifier default
        to immutable.
      </p>
      <CodeBlock>{`pack Food {
    fin name: String         // immutable field
    var quantity: Int = 0    // mutable field
}

pack Settings {
    theme: String = "dark"   // no modifier, defaults to immutable
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        When a field has a default value, the type annotation can be omitted and the type is
        inferred from the initializer:
      </p>
      <CodeBlock>{`pack Counter {
    var count = 0          // type inferred as Int
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.3 Default Values</h3>
      <p className="mt-2 text-az-35">
        Fields with defaults can be omitted during construction. The default expression is evaluated
        each time a new instance is created.
      </p>
      <CodeBlock>{`pack Window {
    title: String = "Untitled"
    width: Int = 800
    height: Int = 600
}

var w = Window()                    // all defaults
var w2 = Window("My App")          // title set, rest default
var w3 = Window("App", 1024, 768)  // all specified`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.4 Constructing Packs</h3>
      <p className="mt-2 text-az-35">
        Call the pack name like a function. Supports both positional and named arguments. Named
        arguments use <code className="text-az-primary">name: value</code> syntax and can appear
        in any order.
      </p>
      <CodeBlock>{`pack Rect {
    width: Real
    height: Real
}

// Positional:
var r1 = Rect(5.0, 10.0)

// Named (order does not matter):
var r2 = Rect(height: 10.0, width: 5.0)

// Mixed (positional first, then named):
var p = Point(3.0, y: 4.0)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.5 Accessing Fields</h3>
      <p className="mt-2 text-az-35">
        Access fields with dot notation. Fields are resolved at compile time.
      </p>
      <CodeBlock>{`var p = Point(3.0, 4.0)
println(p.x)     // 3.0
println(p.y)     // 4.0`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Packs use structural equality: two instances are equal if all corresponding fields are
        equal. Nested packs are compared recursively.
      </p>
      <CodeBlock>{`Point(1.0, 2.0) == Point(1.0, 2.0)    // true
Point(1.0, 2.0) != Point(3.0, 4.0)    // true`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.6 Mutating Fields</h3>
      <p className="mt-2 text-az-35">
        Fields declared with <code className="text-az-primary">var</code> can be reassigned.
        Compound assignment operators work as expected. Reassigning a{' '}
        <code className="text-az-primary">fin</code> field is a compile-time error.
      </p>
      <CodeBlock>{`var f = Food("apple")
f.quantity = 7          // OK: var field
f.quantity += 5         // compound assignment OK
println(f.quantity)     // 12

f.name = "banana"       // ERROR: fin field is immutable`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.7 Exposed Packs</h3>
      <p className="mt-2 text-az-35">
        Like functions, packs are private to their file by default. Use{' '}
        <code className="text-az-primary">expose</code> to make a pack visible to other files.
      </p>
      <CodeBlock>{`// Visible to other files:
expose pack Vec2 {
    x: Real
    y: Real
}

// Private to this file:
pack InternalState {
    var step: Int = 0
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Generic packs can also be exposed. The preprocessor monomorphizes them at each call site:
      </p>
      <CodeBlock>{`expose pack Pair<A, B> {
    first: A
    second: B
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.8 Confined Fields</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">confine</code> keyword restricts a field so it can
        only be accessed from within the pack's own <code className="text-az-primary">impl</code>{' '}
        block. External code cannot read or write confined fields. This is useful for hiding
        internal implementation details like backing storage or capacity counters.
      </p>
      <CodeBlock>{`pack Buffer {
    confine var data: Int[] = []
    confine var capacity: Int = 8
    var name: String = ""
}

// In an impl block:
impl Buffer {
    func getCapacity(): Int {
        return capacity    // OK: accessed from impl
    }
}

// External code:
var buf = Buffer()
println(buf.name)           // OK: public field
// println(buf.capacity)    // ERROR: confined field`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">13.9 Packs with Pointers</h3>
      <p className="mt-2 text-az-35">
        Packs can hold pointer fields for manual memory management. Use{' '}
        <code className="text-az-primary">alloc</code> to allocate heap memory and{' '}
        <code className="text-az-primary">drop</code> to free it. Pointer fields use the{' '}
        <code className="text-az-primary">*</code> suffix type syntax (e.g.,{' '}
        <code className="text-az-primary">[T]*</code> is a pointer to an array of T).
      </p>
      <CodeBlock>{`pack DynamicArray {
    confine var data: [Int]* = alloc [Int](16)
    confine var size: Int = 0
    confine var capacity: Int = 16
}

impl DynamicArray {
    func add(value: Int) {
        (*data)[size] = value       // dereference pointer
        self.size = size + 1
    }

    func free() {
        drop data                   // free heap memory
    }
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        The standard library container packs (<code className="text-az-primary">List</code>,{' '}
        <code className="text-az-primary">Set</code>, <code className="text-az-primary">Map</code>,{' '}
        <code className="text-az-primary">Stack</code>,{' '}
        <code className="text-az-primary">Queue</code>,{' '}
        <code className="text-az-primary">Deque</code>) all use this pointer-backed pattern
        internally. For most use cases, prefer the stdlib containers over manual pointer management.
      </p>

      <p className="mt-3 text-sm text-az-50">
        Packs work with generics. You can parameterize a pack with type parameters
        like <code className="text-az-primary">{'pack Box<T>'}</code>. See Generics and Impl Blocks
        for details.
      </p>
    </Section>
  )
}
