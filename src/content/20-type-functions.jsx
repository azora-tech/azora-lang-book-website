import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function TypeFunctions() {
  return (
    <Section id="type-functions" title="Type Functions">
      <p className="mt-2 text-az-35">
        Type functions operate on types at compile time. They accept types as parameters, perform
        compile-time logic, and return a type. Declared with the <code className="text-az-primary">type</code> keyword
        and invoked with the <code className="text-az-primary">!</code> suffix syntax, they are fully resolved
        during preprocessing with zero runtime cost.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">22.1 What are Type Functions</h3>
      <p className="mt-2 text-az-35">
        A type function is a compile-time function whose parameters and return value are types rather
        than values. The preprocessor evaluates them during compilation and substitutes the result
        wherever the type function is invoked. This enables type-level computation without any
        runtime overhead.
      </p>
      <CodeBlock>{`type promote(t1: Type, t2: Type) {
    return if t1.rank >= t2.rank { t1 } else { t2 }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Parameters have the special type <code className="text-az-primary">Type</code>. The body uses
        compile-time logic (conditionals, loops, property access) to compute and return a type.
        Type functions are invoked in type-annotation position using
        regular function call syntax:
      </p>
      <CodeBlock>{`func<T1, T2> add(a: T1, b: T2): promote(T1, T2)
where T1: Numeric, T2: Numeric {
    var sum: ReturnType = _
    return sum
}

// promote(Int, Real) resolves to Real
// promote(Int, Int) resolves to Int`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">22.2 Using typename Property</h3>
      <p className="mt-2 text-az-35">
        Every value in Azora has a built-in <code className="text-az-primary">.typename</code> property
        that returns the name of its type as a <code className="text-az-primary">String</code>. This works
        at both compile time and runtime.
      </p>
      <CodeBlock>{`fin x = 42
fin t = x.typename
assert t == "Int"

fin s = "hello"
assert s.typename == "String"

fin b = true
assert b.typename == "Bool"

fin c = 'a'
assert c.typename == "Char"`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Inside type functions, types expose a <code className="text-az-primary">.rank</code> property that
        represents their position in the numeric promotion hierarchy.
        <code className="text-az-primary"> Int</code> has a lower rank than <code className="text-az-primary">Real</code>,
        so promoting them yields <code className="text-az-primary">Real</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">22.3 Type-Level Computation</h3>
      <p className="mt-2 text-az-35">
        Type functions can accept a variable number of type arguments
        using <code className="text-az-primary">Type...</code> syntax. Combined with
        the <code className="text-az-primary">let</code> keyword for compile-time variable binding,
        this enables iterative type-level computation.
      </p>
      <CodeBlock>{`type promote(T: Type...) where T.length >= 2 {
    let Result = T.0
    for Ty in T[1...] {
        Result = if Ty.rank > Result.rank { Ty } else { Result }
    }
    return Result
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">let</code> keyword declares a compile-time binding inside type
        functions. Unlike <code className="text-az-primary">var</code> and <code className="text-az-primary">fin</code>,
        <code className="text-az-primary"> let</code> operates at the type level and does not exist at runtime.
        It can be reassigned within a type function, which is useful for loops that iteratively
        compute a type.
      </p>
      <CodeBlock>{`let Result = T.0   // bind to the first type in the variadic pack`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Inside a function body whose return type was computed by a type function,
        <code className="text-az-primary"> ReturnType</code> is automatically replaced with the concrete
        resolved return type:
      </p>
      <CodeBlock>{`var sum: ReturnType = _    // becomes: var sum: Real = 0.0`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Type functions are most useful when combined with generic functions and
        the <code className="text-az-primary">where</code> clause. They let you express return-type
        relationships that depend on the input types, such as numeric promotion or container
        element extraction.
      </p>
    </Section>
  )
}
