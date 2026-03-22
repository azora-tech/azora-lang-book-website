import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Lambdas() {
  return (
    <Section id="lambdas" title="Lambdas & Closures">
      <p>
        Lambdas are anonymous, first-class functions. They can be assigned to variables, passed as
        arguments, returned from other lambdas, and stored in data structures. All lambdas have the
        type <code className="text-az-primary">Callback</code>.
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">11.1 Lambda Syntax</h3>
      <p className="mt-2 text-az-35">
        A lambda is written with curly braces containing an optional parameter list, an arrow{' '}
        <code className="text-az-primary">-&gt;</code>, and a body. Parameter types are inferred
        from context. The last expression in the body is the return value.
      </p>
      <CodeBlock>{`var add = { a, b -> a + b }
var identity = { x -> x }
var constant = { 42 }               // no-arg lambda`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Lambdas are called with the same syntax as functions:
      </p>
      <CodeBlock>{`println(add(3, 4))        // 7
println(identity("hi"))  // hi
println(constant())      // 42`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.2 Single-Parameter Lambdas</h3>
      <p className="mt-2 text-az-35">
        Single-parameter lambdas can use the implicit <code className="text-az-primary">it</code>{' '}
        name instead of declaring a parameter explicitly:
      </p>
      <CodeBlock>{`var double = { it * 2 }
println(double(5))    // 10`}</CodeBlock>

      <p className="mt-4 text-az-35">
        When a function expects a callback and the callback is the last argument, it can be written
        as a trailing lambda outside the parentheses:
      </p>
      <CodeBlock>{`var result = runCallback(10) { it * 2 }    // 20`}</CodeBlock>

      <p className="mt-4 text-az-35">
        For multi-parameter callbacks using <code className="text-az-primary">it</code>, arguments
        are bundled into a Tuple accessed via <code className="text-az-primary">.0</code>,{' '}
        <code className="text-az-primary">.1</code>, etc.:
      </p>
      <CodeBlock>{`var result = applyTwo({ it.0 + it.1 }, 3, 7)    // 10`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.3 Multi-Statement Lambdas</h3>
      <p className="mt-2 text-az-35">
        Lambda bodies can contain multiple statements. The last expression is the return value:
      </p>
      <CodeBlock>{`var compute = { a, b ->
    var sum = a + b
    var doubled = sum * 2
    doubled
}
assert compute(3, 4) == 14`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Lambdas can also nest to any depth. Each inner lambda captures variables from all enclosing
        scopes:
      </p>
      <CodeBlock>{`var outer = { x ->
    var inner = { y -> x + y }
    inner(10)
}
assert outer(5) == 15`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.4 Closures</h3>
      <p className="mt-2 text-az-35">
        Lambdas capture variables from their enclosing scope by reference. Changes to captured{' '}
        <code className="text-az-primary">var</code> variables are visible in both directions:
        the lambda sees updates made outside, and the outside sees updates made inside the lambda.
      </p>
      <CodeBlock>{`var base = 100
var addBase = { x -> x + base }
assert addBase(5) == 105

// Mutations are shared:
var counter = 0
var increment = { counter += 1 }
increment()
increment()
assert counter == 2`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.5 Lambdas as Arguments</h3>
      <p className="mt-2 text-az-35">
        Lambdas are commonly passed as arguments to functions, enabling callback-driven APIs. When
        the last parameter of a function is a callback, the lambda can be written outside the
        parentheses (trailing lambda syntax).
      </p>
      <CodeBlock>{`func apply(x: Int, transform: Callback): Int {
    return transform(x)
}

// Inline lambda:
var result = apply(5, { it * 3 })     // 15

// Trailing lambda:
var result2 = apply(5) { it * 3 }     // 15

// Pre-defined lambda:
var triple = { it * 3 }
var result3 = apply(5, triple)        // 15`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">11.6 Higher-Order Functions</h3>
      <p className="mt-2 text-az-35">
        A higher-order function is one that takes a lambda as a parameter or returns a lambda. This
        pattern enables currying, factory functions, and functional composition.
      </p>
      <CodeBlock>{`// Returning a lambda (factory pattern):
var makeAdder = { x ->
    { y -> x + y }
}
var add5 = makeAdder(5)
var add10 = makeAdder(10)
assert add5(3) == 8
assert add10(3) == 13

// Composition:
var compose = { f, g ->
    { x -> f(g(x)) }
}
var double = { it * 2 }
var addOne = { it + 1 }
var doubleThenAdd = compose(addOne, double)
assert doubleThenAdd(5) == 11`}</CodeBlock>

      <p className="mt-4 text-az-35">
        All lambdas share the typename{' '}
        <code className="text-az-primary">"Callback"</code>, regardless of parameter count or
        return type:
      </p>
      <CodeBlock>{`var f = { x -> x }
assert f.typename == "Callback"`}</CodeBlock>
    </Section>
  )
}
