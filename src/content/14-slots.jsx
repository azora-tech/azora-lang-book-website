import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Slots() {
  return (
    <Section id="slots" title="Slots">
      <p className="mt-2 text-az-35">
        Slots are tagged unions (also called algebraic data types or sum types). Each variant in a slot
        can carry structurally different data. Use enums when all variants share the same fields; use
        slots when variants need different payloads, or no payload at all.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.1 Slot Declaration</h3>
      <p className="mt-2 text-az-35">
        Declare a slot with the <code className="text-az-primary">slot</code> keyword. Each variant
        has a name, and optionally a set of typed fields in parentheses. Variants are separated by
        commas or newlines.
      </p>
      <CodeBlock>{`slot Shape {
    Circle(radius: Real),
    Rect(width: Real, height: Real),
    Point
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A slot is a single type whose value is exactly one of its variants at any given time. The
        compiler tracks which variant is active and ensures safe access to variant-specific fields.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.2 Slot Variants</h3>
      <p className="mt-2 text-az-35">
        Variants come in two forms: variants with data and variants without data. Data-carrying
        variants declare their fields inside parentheses, just like pack fields. Empty variants
        act as simple tags with no associated data.
      </p>
      <CodeBlock>{`slot Result {
    Success(data: String),   // carries a String
    Error(code: Int),        // carries an Int
    Loading                  // empty variant, no data
}

slot Option {
    Some(value: Int),
    None
}

slot Token {
    IntLiteral(value: Long),
    StringLiteral(value: String),
    Identifier(name: String, line: Int),
    EOF
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Each variant can have any number of fields, and different variants can have completely
        different field sets. This is the key difference from enums, where every variant shares
        the same field layout.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.3 Constructing Slot Values</h3>
      <p className="mt-2 text-az-35">
        Construct a slot value using dot notation on the slot type name. Pass arguments for
        variants with fields. For empty variants, omit the parentheses.
      </p>
      <CodeBlock>{`var r1 = Result.Success("hello")
var r2 = Result.Error(404)
var r3 = Result.Loading

var opt = Option.Some(42)
var none = Option.None`}</CodeBlock>
      <p className="mt-2 text-az-35">
        You can access variant fields with dot notation when the current variant has those fields.
        Accessing a field that does not exist on the active variant is a runtime error.
      </p>
      <CodeBlock>{`r1.data     // "hello"
r2.code     // 404`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.4 Pattern Matching with When</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">when</code> to branch on the active variant of a
        slot value. The <code className="text-az-primary">when</code> expression checks which
        variant is present and executes the matching branch. It can be used as an expression
        that produces a value.
      </p>
      <CodeBlock>{`var desc = when shape {
    .Circle -> "circle with radius " + toString(shape.radius)
    .Rect -> "rectangle " + toString(shape.width) + "x" + toString(shape.height)
    .Point -> "a point"
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Each branch uses the dot shorthand (<code className="text-az-primary">.Variant</code>)
        to match against variant names. The compiler infers the slot type from the subject of
        the <code className="text-az-primary">when</code> expression.
      </p>
      <CodeBlock>{`func describe(r: Result): String {
    return when r {
        .Success -> "OK: " + r.data
        .Error -> "Error code: " + toString(r.code)
        .Loading -> "Loading..."
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.5 Type Checking with "is"</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">is</code> keyword checks whether a value is of a
        particular type. For slot values, you can use{' '}
        <code className="text-az-primary">is</code> to test which variant is active. The negated
        form <code className="text-az-primary">!is</code> checks that the value is not of the
        given type.
      </p>
      <CodeBlock>{`var shape = Shape.Circle(radius: 5.0)

if shape is Shape {
    println("shape is a Shape")
}

// Check variant type with pattern matching
var isCircle = when shape {
    .Circle -> true
    else -> false
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">is</code> operator works with any type, not just
        slots. It is useful for runtime type checks in generic or polymorphic code.
      </p>
      <CodeBlock>{`var c: Char = 'a'
assert c is Char`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">15.6 Dot Shorthand (.Variant)</h3>
      <p className="mt-2 text-az-35">
        The dot shorthand <code className="text-az-primary">.Variant</code> lets you refer to a
        variant without repeating the slot type name. The compiler infers the type from context.
        This works in <code className="text-az-primary">when</code> branches, assignments where
        the type is already known, and comparisons.
      </p>
      <CodeBlock>{`// In when branches
when result {
    .Success -> handleSuccess(result.data)
    .Error -> handleError(result.code)
    .Loading -> showSpinner()
}

// In assignment when the type is known
var dir: Direction = .Up`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The dot shorthand keeps code concise, especially when the slot type name is long
        or when multiple branches reference the same type.
      </p>

      <p className="mt-4 text-sm text-az-50">
        Slots are the foundation for building tagged union hierarchies in Azora. They combine
        the safety of exhaustive pattern matching with the flexibility of variant-specific data.
        For cases where every variant shares the same fields, prefer{' '}
        <code className="text-az-primary">enum</code> instead.
      </p>
    </Section>
  )
}
