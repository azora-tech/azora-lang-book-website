import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Enums() {
  return (
    <Section id="enums" title="Enums">
      <p>
        Enums represent a fixed set of named values. Azora supports simple enums (plain labels) and
        parameterized enums (where every variant shares the same fields with different values). For
        variants that carry <em>different</em> fields, use{' '}
        <code className="text-az-primary">slot</code> instead (covered in the next chapter).
      </p>

      <h3 className="text-lg font-semibold mt-2 mb-2 text-az-25">14.1 Enum Declaration</h3>
      <p className="mt-2 text-az-35">
        Declare an enum with the <code className="text-az-primary">enum</code> keyword and list its
        variants inside curly braces. Each variant is a distinct, named value of the enum type.
      </p>
      <CodeBlock>{`enum Direction {
    Up
    Down
    Left
    Right
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Enums can also carry fields. When fields are declared at the enum level, every variant must
        provide values for those fields:
      </p>
      <CodeBlock>{`enum Color(r: Int, g: Int, b: Int) {
    Red(255, 0, 0)
    Green(0, 255, 0)
    Blue(0, 0, 255)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.2 Enum Variants</h3>
      <p className="mt-2 text-az-35">
        Variants are the possible values of an enum. Simple enums have variants with no data.
        Parameterized enums attach the same set of fields (declared at the enum level) with
        different values per variant.
      </p>
      <CodeBlock>{`// Simple: no data
enum Size {
    Small
    Medium
    Large
}

// Parameterized: each variant provides field values
enum Direction(dx: Int, dy: Int) {
    Up(0, 1)
    Down(0, -1)
    Left(-1, 0)
    Right(1, 0)
}

// Access variant fields:
var d = Direction.Right
println(d.dx)    // 1
println(d.dy)    // 0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.3 Accessing Variants</h3>
      <p className="mt-2 text-az-35">
        Reference variants with dot notation on the enum name. Two enum values are equal if they
        are the same variant.
      </p>
      <CodeBlock>{`var c = Color.Red
assert c.r == 255
assert c.g == 0

// Equality:
Direction.Up == Direction.Up     // true
Direction.Up != Direction.Down   // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Dot shorthand:</strong> When a variable already has a known enum type, you can use
        the dot shorthand on the right side of assignment, omitting the enum name:
      </p>
      <CodeBlock>{`var s: Size = .Medium
var d: Direction = .Up`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.4 Enums in When Expressions</h3>
      <p className="mt-2 text-az-35">
        Enums pair naturally with <code className="text-az-primary">when</code> for exhaustive
        pattern matching. Inside a <code className="text-az-primary">when</code> block, the dot
        shorthand <code className="text-az-primary">.Variant</code> infers the enum type from the
        subject. This works as both a statement and an expression.
      </p>
      <CodeBlock>{`// As a statement:
when direction {
    .Up -> println("going up")
    .Down -> println("going down")
    .Left -> println("going left")
    .Right -> println("going right")
}

// As an expression:
var name = when c {
    .Red -> "red"
    .Green -> "green"
    .Blue -> "blue"
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        When used with parameterized enums, you can access the variant fields after matching:
      </p>
      <CodeBlock>{`var move = Direction.Up
when move {
    .Up -> println("moving by dy=${ move.dy}")
    .Down -> println("moving by dy=${ move.dy}")
    .Left -> println("moving by dx=${ move.dx}")
    .Right -> println("moving by dx=${ move.dx}")
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Multi-statement branches use curly braces:
      </p>
      <CodeBlock>{`when size {
    .Small -> {
        width = 320
        height = 240
    }
    .Medium -> {
        width = 800
        height = 600
    }
    .Large -> {
        width = 1920
        height = 1080
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">14.5 Enum as Int</h3>
      <p className="mt-2 text-az-35">
        For parameterized enums, you can include an integer field to associate numeric values with
        each variant. This is the idiomatic way to map enums to integers in Azora.
      </p>
      <CodeBlock>{`enum Priority(value: Int) {
    Low(0)
    Medium(1)
    High(2)
    Critical(3)
}

var p = Priority.High
println(p.value)        // 2

// Use in comparisons:
if p.value >= 2 {
    println("urgent!")
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        This pattern is commonly used for serialization, interop, or when you need a numeric
        representation of an enum:
      </p>
      <CodeBlock>{`enum HttpStatus(code: Int) {
    Ok(200)
    NotFound(404)
    ServerError(500)
}

var status = HttpStatus.NotFound
println(status.code)    // 404`}</CodeBlock>
    </Section>
  )
}
