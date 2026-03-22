import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ImplBlocks() {
  return (
    <Section id="impl-blocks" title="Impl Blocks">
      <p className="mt-2 text-az-35">
        Impl blocks attach behavior to types, cleanly separating data definition from methods.
        They support read-only methods, mutating methods, computed properties, custom constructors,
        destructors, and spec implementations. You can have multiple impl blocks for the same type.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.1 Adding Methods to Types</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">impl TypeName</code> followed by a block of{' '}
        <code className="text-az-primary">func</code> declarations. Inside the block, the
        receiver convention (<code className="text-az-primary">ref self</code> or{' '}
        <code className="text-az-primary">mut self</code>) determines how the method accesses
        the instance. Methods without a self receiver are static.
      </p>
      <CodeBlock>{`pack Size {
    var width: Int
    var height: Int
}

impl Size {
    func area(): Int { ref self ->
        self.width * self.height
    }

    func perimeter(): Int { ref self ->
        2 * (self.width + self.height)
    }
}

var s = Size(width: 10, height: 5)
assert s.area() == 50
assert s.perimeter() == 30`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Call methods with dot notation on an instance. You can define multiple impl blocks for
        the same type, in the same file or across different files.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.2 Immutable Methods (ref self)</h3>
      <p className="mt-2 text-az-35">
        A method with <code className="text-az-primary">ref self</code> borrows the instance
        immutably. It can read fields but cannot modify them. This is the most common receiver
        for methods that compute or query values.
      </p>
      <CodeBlock>{`impl Size {
    func isSquare(): Bool { ref self ->
        self.width == self.height
    }

    func max(): Int { ref self ->
        if self.width > self.height { self.width } else { self.height }
    }

    func contains(other: ref Self): Bool { ref self ->
        self.width >= other.width && self.height >= other.height
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">ref Self</code> parameter type (capital S) refers
        to the enclosing pack type. It lets you write methods that accept other instances of the
        same type without hardcoding the type name.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.3 Mutating Methods (mut self)</h3>
      <p className="mt-2 text-az-35">
        A method with <code className="text-az-primary">mut self</code> borrows the instance
        mutably. It can read and write fields. Use this for methods that change the state of
        the instance in place.
      </p>
      <CodeBlock>{`impl Size {
    func scale(factor: Int) { mut self ->
        self.width *= factor
        self.height *= factor
    }

    func clamp(maxWidth: Int, maxHeight: Int) { mut self ->
        if self.width > maxWidth { self.width = maxWidth }
        if self.height > maxHeight { self.height = maxHeight }
    }

    func swap() { mut self ->
        fin tmp = self.width
        self.width = self.height
        self.height = tmp
    }

    func reset() { mut self ->
        self.width = 0
        self.height = 0
    }
}

var s = Size(width: 10, height: 5)
s.scale(2)
assert s.width == 20
assert s.height == 10`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.4 Computed Properties</h3>
      <p className="mt-2 text-az-35">
        Computed properties are declared with <code className="text-az-primary">prop</code>
        inside an impl block. They look like fields when accessed but compute their value on
        each read. A simple computed property uses an expression after{' '}
        <code className="text-az-primary">=</code>. For more complex logic, use a block with a
        self receiver.
      </p>
      <CodeBlock>{`impl Size {
    prop area: Int = self.width * self.height

    prop isLandscape: Bool = self.width > self.height

    prop aspectRatio: Real = self.width as Real / self.height as Real

    prop diagonal: Real { ref self ->
        ((self.width * self.width + self.height * self.height) as Real) ^ 0.5
    }
}

var s = Size(width: 1920, height: 1080)
println(s.area)          // 2073600
println(s.isLandscape)   // true`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Computed properties are accessed without parentheses, just like regular fields. They
        are read-only.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.5 Custom Constructors (impl ctor)</h3>
      <p className="mt-2 text-az-35">
        Every pack gets an auto-generated constructor that accepts all fields by name. To add
        additional constructors with different signatures or validation logic, use{' '}
        <code className="text-az-primary">impl ctor</code>. Custom constructors use{' '}
        <code className="text-az-primary">mut self</code> to initialize fields.
      </p>
      <CodeBlock>{`pack Size {
    var width: Int
    var height: Int
}

// No-argument constructor with defaults
impl ctor() for Size { mut self ->
    self.width = 6
    self.height = 7
}

// Constructor with validation
impl ctor(side: Int) for Size { mut self ->
    self.width = if side > 0 { side } else { 1 }
    self.height = if side > 0 { side } else { 1 }
}

var a = Size()            // width: 6, height: 7
var b = Size(side: 5)     // width: 5, height: 5`}</CodeBlock>
      <p className="mt-2 text-az-35">
        You can define multiple custom constructors with different parameter lists. The compiler
        selects the right one based on the arguments at the call site.
      </p>
      <CodeBlock>{`pack Vec2 {
    var x: Real = _
    var y: Real = _
}

// Construct from angle and length (polar coordinates)
impl ctor(angle: Real, length: Real) for Vec2 { mut self ->
    self.x = length * cos(angle)
    self.y = length * sin(angle)
}

var v = Vec2(angle: 1.57, length: 1.0)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.6 Destructors (impl dtor)</h3>
      <p className="mt-2 text-az-35">
        A destructor runs when the instance goes out of scope or is explicitly dropped. Use it
        for cleanup of non-owned resources such as file handles or network connections. Destructors
        run deterministically at scope exit, not at garbage-collection time.
      </p>
      <CodeBlock>{`pack FileHandle {
    var handle: Int
    var path: String
}

impl dtor() for FileHandle { ref self ->
    closeHandle(self.handle)
}

// The destructor runs automatically when fh leaves scope
func readFile(path: String): String {
    var fh = FileHandle(handle: openFile(path), path: path)
    return read(fh)
}   // fh.dtor() called here`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">16.7 Implementing Specs</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">impl SpecName for Type</code> to declare that a
        type satisfies a spec (trait). If the spec has required methods, provide their
        implementations inside the block. For marker specs with no methods, use the short form.
      </p>
      <CodeBlock>{`spec Printable {
    func toString(): String
}

impl Printable for Size {
    func toString(): String { ref self ->
        "Size(" + toString(self.width) + ", " + toString(self.height) + ")"
    }
}

// Marker specs (no methods required)
impl Copyable for Size
impl Send for Size`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Once a type implements a spec, it can be used anywhere that spec is required: as a
        generic constraint, as a <code className="text-az-primary">dyn</code> type for dynamic
        dispatch, or as a marker for compiler checks.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Impl with Generics</h3>
      <p className="mt-2 text-az-35">
        Impl blocks work with generic packs. The type parameter carries through to method
        signatures. A <code className="text-az-primary">typealias</code> generates a concrete
        specialization of both the pack and its impl block through monomorphization.
      </p>
      <CodeBlock>{`pack Box<T> {
    value: T
}

impl Box<T> {
    func get(): T { ref self ->
        self.value
    }
}

typealias IntBox = Box<Int>
// Generates: impl IntBox { func get(): Int { ... } }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Static Methods</h3>
      <p className="mt-2 text-az-35">
        Methods without a self receiver are static. They are called on the type itself, not on
        an instance. Use <code className="text-az-primary">Self</code> to refer to the
        enclosing type.
      </p>
      <CodeBlock>{`impl Size {
    func square(side: Int): Self {
        Self(width: side, height: side)
    }

    func zero(): Self {
        Self(width: 0, height: 0)
    }
}

var s = Size.square(side: 10)
var z = Size.zero()`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Impl blocks keep data and behavior separate. A pack declares fields; one or more impl
        blocks attach methods, properties, constructors, destructors, and spec implementations.
        This separation makes it easy to extend types without modifying their definition.
      </p>
    </Section>
  )
}
