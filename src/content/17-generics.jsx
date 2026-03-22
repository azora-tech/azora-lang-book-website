import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Generics() {
  return (
    <Section id="generics" title="Generics">
      <p className="mt-2 text-az-35">
        Azora uses monomorphization for generics. Generic types and functions are expanded into
        specialized versions at compile time by the preprocessor. No type erasure, no boxing, no
        virtual dispatch. The generated code is identical to hand-written type-specific code.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.1 Generic Functions</h3>
      <p className="mt-2 text-az-35">
        Functions can be parameterized with type parameters. Two equivalent syntaxes are
        supported: type parameters after the function name or before it.
      </p>
      <CodeBlock>{`// Type params after name
func identity<T>(x: T): T = x

// Type params before name
func<T> add(a: T, b: T): T {
    return a + b
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Calling <code className="text-az-primary">add(5, 7)</code> generates a specialized
        function <code className="text-az-primary">add__Int</code> with all{' '}
        <code className="text-az-primary">T</code> replaced by{' '}
        <code className="text-az-primary">Int</code>. Each unique type combination produces a
        separate specialization.
      </p>
      <CodeBlock>{`fin result = add(5, 7)            // inferred as add<Int>
var p = Pair(1, "hello")          // inferred as Pair<Int, String>`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.2 Generic Packs</h3>
      <p className="mt-2 text-az-35">
        Packs can be parameterized with one or more type parameters. The preprocessor generates
        a specialized pack for each concrete instantiation.
      </p>
      <CodeBlock>{`pack Box<T> {
    value: T
}

pack Pair<A, B> {
    var first: A
    var second: B
}

typealias IntBox = Box<Int>
// Creates: pack IntBox { value: Int }

var p: Pair<Int, String> = Pair<Int, String>(first: 1, second: "hi")`}</CodeBlock>
      <p className="mt-2 text-az-35">
        When a field has the generic default value{' '}
        <code className="text-az-primary">_</code>, it expands to the zero value of the concrete
        type at specialization time:
      </p>
      <CodeBlock>{`pack Box<T> { value: T = _ }
typealias IntBox = Box<Int>       // value: Int = 0
typealias StringBox = Box<String> // value: String = ""`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.3 Monomorphization</h3>
      <p className="mt-2 text-az-35">
        All generics in Azora are monomorphized. The preprocessor replaces each type parameter
        with the concrete type and generates a fully specialized copy. There is no runtime cost
        for generics.
      </p>
      <CodeBlock>{`func<T> max(a: T, b: T): T {
    return if a > b { a } else { b }
}

var m1 = max(3, 7)           // generates max__Int
var m2 = max(1.5, 2.3)       // generates max__Real`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Nested generics are expanded recursively. Each unique combination of type arguments
        produces its own specialization.
      </p>
      <CodeBlock>{`var x: Box<Pair<Int, Bool>> = Box<Pair<Int, Bool>>(
    value: Pair<Int, Bool>(first: 1, second: true)
)
// Creates: pack Pair__Int__Bool and pack Box__Pair__Int__Bool`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.4 Type Parameter Usage</h3>
      <p className="mt-2 text-az-35">
        Type parameters can appear as field types, parameter types, return types, and in
        expressions. The compiler replaces every occurrence with the concrete type.
      </p>
      <CodeBlock>{`func<T> wrap(value: T): Box<T> {
    return Box<T>(value: value)
}

func<T> unwrap(box: Box<T>): T {
    return box.value
}

var b = wrap(42)         // Box<Int>
var v = unwrap(b)        // Int: 42`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.5 Generic Method Calls</h3>
      <p className="mt-2 text-az-35">
        When calling a generic function, you can specify the type argument explicitly with
        angle brackets. This is necessary when the type cannot be inferred from the arguments.
      </p>
      <CodeBlock>{`// Explicit type argument
var x = identity<String>("hello")

// Type inferred from arguments (preferred when possible)
var y = identity(42)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.6 Type Aliases (typealias)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">typealias</code> keyword creates a named alias
        for a specific generic instantiation. This triggers the preprocessor to generate the
        specialized code.
      </p>
      <CodeBlock>{`typealias Vec3 = Vector<Real, 3>
typealias IntPair = Pair<Int, Int>
typealias StringList = List<String>`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Type aliases are more than cosmetic: they are the mechanism by which generic packs
        get monomorphized. The alias name becomes the actual type name in the generated code.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.7 Constraints (where T: Spec)</h3>
      <p className="mt-2 text-az-35">
        Attach <code className="text-az-primary">where</code> clauses to restrict which types
        can be used as type arguments. The constraint checks that the type implements the
        required spec. If it does not, the preprocessor reports a compile-time error.
      </p>
      <CodeBlock>{`func<T1, T2> add(a: T1, b: T2): T1
where T1: Numeric, T2: Numeric {
    return a + b
}

var r = add(5, 3.0)               // OK: Int and Real are Numeric
var bad = add("hello", 5)         // ERROR: String does not implement Numeric`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">19.8 Multiple Type Parameters</h3>
      <p className="mt-2 text-az-35">
        Functions and packs can have any number of type parameters, separated by commas. Each
        parameter is independently substituted during monomorphization.
      </p>
      <CodeBlock>{`func<K, V> makePair(key: K, value: V): Pair<K, V> {
    return Pair<K, V>(first: key, second: value)
}

pack Triple<A, B, C> {
    var first: A
    var second: B
    var third: C
}

var t = Triple<Int, String, Bool>(
    first: 1, second: "hello", third: true
)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">Compile-Time Variable Substitution</h3>
      <p className="mt-2 text-az-35">
        Compile-time variables (prefixed with <code className="text-az-primary">$</code>) can
        be used as generic arguments alongside types, enabling parameterization by values such
        as array sizes.
      </p>
      <CodeBlock>{`fin $size = 4
pack Arr<T, N> { data: T[N] }
typealias Vec4 = Arr<Real, $size>
// Creates: pack Vec4 { data: Real[4] }`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Use <code className="text-az-primary">typealias</code> generously to give meaningful
        names to generic instantiations. Names like{' '}
        <code className="text-az-primary">Vec3</code> and{' '}
        <code className="text-az-primary">IntBox</code> are far more readable than their fully
        parameterized forms.
      </p>
    </Section>
  )
}
