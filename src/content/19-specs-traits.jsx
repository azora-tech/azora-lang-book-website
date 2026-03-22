import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function SpecsTraits() {
  return (
    <Section id="specs-traits" title="Specs & Traits">
      <p className="mt-2 text-az-35">
        Specs are Azora's trait system. A spec defines a contract: a set of methods and
        properties that a type must implement. Specs enable compile-time type constraints for
        generics and, with the <code className="text-az-primary">dyn</code> keyword, runtime
        polymorphism through dynamic dispatch.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.1 Defining Specs</h3>
      <p className="mt-2 text-az-35">
        Declare a spec with the <code className="text-az-primary">spec</code> keyword. Inside
        the body, list the method signatures and property declarations that implementing types
        must provide. Methods in a spec have signatures only, no bodies (unless providing a
        default implementation).
      </p>
      <CodeBlock>{`spec Printable {
    func toString(): String
}

spec Comparable {
    func compareTo(other: ref Self): Int
}

spec Drawable {
    func draw(): Unit
    func bounds(): Rect
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A spec can extend other specs using the colon syntax. The extending spec inherits all
        requirements from its parents.
      </p>
      <CodeBlock>{`spec Sortable: Comparable & Equatable {
    // inherits compareTo from Comparable
    // inherits equals from Equatable
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.2 Spec Methods and Properties</h3>
      <p className="mt-2 text-az-35">
        Specs can require both methods and computed properties. Methods list their parameter
        types and return type. Properties list their name and type. Specs can also provide
        default implementations, which types inherit unless they override them.
      </p>
      <CodeBlock>{`spec Equatable {
    func equals(other: ref Self): Bool

    // Default implementation: types get this for free
    func notEquals(other: ref Self): Bool { ref self ->
        !self.equals(other)
    }
}

spec Describable {
    prop id: Int
    func describe(): String
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">ref Self</code> (capital S) in spec signatures
        to refer to the implementing type. This lets you write specs that compare, combine, or
        otherwise interact with instances of the same concrete type.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.3 Implementing Specs</h3>
      <p className="mt-2 text-az-35">
        Tag a type with a spec using{' '}
        <code className="text-az-primary">impl SpecName for Type</code>. Provide implementations
        for all required methods and properties inside the block. Methods use{' '}
        <code className="text-az-primary">ref self</code> or{' '}
        <code className="text-az-primary">mut self</code> as the receiver.
      </p>
      <CodeBlock>{`pack Circle {
    var radius: Real
}

impl Drawable for Circle {
    func draw(): Unit {
        println("drawing circle")
    }

    func bounds(): Rect {
        return Rect(
            x: -self.radius,
            y: -self.radius,
            width: self.radius * 2.0,
            height: self.radius * 2.0
        )
    }
}

impl Printable for Circle {
    func toString(): String { ref self ->
        "Circle(radius: " + toString(self.radius) + ")"
    }
}

impl Equatable for Circle {
    func equals(other: ref Self): Bool { ref self ->
        self.radius == other.radius
    }
    // notEquals is inherited from the default
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.4 Marker Specs</h3>
      <p className="mt-2 text-az-35">
        Some specs have no methods at all. They serve as markers that signal a capability to
        the compiler. Implementing a marker spec is a one-line declaration with no body.
      </p>
      <CodeBlock>{`spec Numeric
spec Copyable
spec Send
spec Share`}</CodeBlock>
      <CodeBlock>{`// Marker spec implementations (no body needed)
impl Numeric for Int
impl Numeric for Real
impl Copyable for Vec2
impl Send for Vec2`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Marker specs are used as compile-time constraints. The preprocessor validates that type
        arguments implement the required marker specs and reports errors at the call site when
        they do not.
      </p>
      <CodeBlock>{`func<T> add(a: T, b: T): T
where T: Numeric {
    return a + b
}

var r = add(5, 7)                 // OK: Int implements Numeric
var bad = add("hello", "world")   // ERROR: String does not implement Numeric`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.5 Dynamic Dispatch (dyn Spec)</h3>
      <p className="mt-2 text-az-35">
        By default, specs are used for static, compile-time constraints. When you need runtime
        polymorphism, where the concrete type is not known at compile time, prefix the spec
        name with <code className="text-az-primary">dyn</code>. A{' '}
        <code className="text-az-primary">dyn Spec</code> value is dispatched through a vtable
        at runtime.
      </p>
      <CodeBlock>{`// Static dispatch: monomorphized, one copy per concrete type
func drawOne<T>(shape: T) where T: Drawable {
    shape.draw()
}

// Dynamic dispatch: vtable-based, one copy total
func drawAll(shapes: [dyn Drawable]) {
    for shape in shapes {
        shape.draw()    // dispatched through vtable
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">dyn</code> keyword works as a type modifier. You
        can use it in variable types, parameter types, return types, and collection element types.
      </p>
      <CodeBlock>{`// Variable type
var shape: dyn Drawable = Circle(radius: 5.0)
shape = Rect(width: 10.0, height: 20.0)    // reassign to different type

// Return type
func createShape(kind: String): dyn Drawable {
    return when kind {
        "circle" -> Circle(radius: 5.0)
        else -> Rect(width: 10.0, height: 20.0)
    }
}

// Type check and downcast
if shape is Circle {
    var circle: Circle = shape as Circle
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A spec can be used with <code className="text-az-primary">dyn</code> if all its methods
        take <code className="text-az-primary">self</code> as the receiver, do not return{' '}
        <code className="text-az-primary">Self</code>, and have no generic method parameters.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.6 Heterogeneous Collections with dyn</h3>
      <p className="mt-2 text-az-35">
        The primary use case for <code className="text-az-primary">dyn</code> is storing values
        of different concrete types in the same collection. Without{' '}
        <code className="text-az-primary">dyn</code>, generic collections are monomorphized and
        can only hold one concrete type.
      </p>
      <CodeBlock>{`pack Circle { var radius: Real }
pack Rect { var width: Real; var height: Real }

impl Drawable for Circle {
    func draw(): Unit { println("circle") }
}

impl Drawable for Rect {
    func draw(): Unit { println("rect") }
}

// Mix Circle and Rect in the same array
var shapes: [dyn Drawable] = [
    Circle(radius: 1.0),
    Rect(width: 2.0, height: 3.0),
    Circle(radius: 5.0)
]

for shape in shapes {
    shape.draw()    // dispatched to the right implementation
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">21.7 Multiple Specs (dyn (A + B))</h3>
      <p className="mt-2 text-az-35">
        A value can satisfy multiple specs simultaneously. Use the{' '}
        <code className="text-az-primary">dyn (SpecA + SpecB)</code> syntax to require that a
        value implements all listed specs. The vtable covers all methods from all listed specs.
      </p>
      <CodeBlock>{`spec Drawable { func draw(): Unit }
spec Printable { func print(): String }

func renderAndLog(item: dyn (Drawable + Printable)): Unit {
    item.draw()
    println(item.print())
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The concrete type must implement every spec in the combination. The compiler validates
        this at the point where the value is assigned to the{' '}
        <code className="text-az-primary">dyn (A + B)</code> type.
      </p>

      <p className="mt-4 text-sm text-az-50">
        Use static dispatch (<code className="text-az-primary">where T: Spec</code>) when
        performance matters and the concrete type is known at compile time. Use dynamic dispatch
        (<code className="text-az-primary">dyn Spec</code>) when you need runtime polymorphism
        or heterogeneous collections. The two approaches can coexist in the same program.
      </p>
    </Section>
  )
}
