import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function OperatorOverloading() {
  return (
    <Section id="operator-overloading" title="Operator Overloading">
      <p className="mt-2 text-az-35">
        Azora lets you define custom behavior for operators on your types through{' '}
        <code className="text-az-primary">impl oper</code> declarations. This includes arithmetic,
        comparison, unary, subscript, map key, set member, and compound assignment operators.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.1 The oper Keyword</h3>
      <p className="mt-2 text-az-35">
        Operator overloads are declared with{' '}
        <code className="text-az-primary">impl oper&lt;symbol&gt; for Type</code>. The body
        is a lambda-like block that receives the operands. The receiver convention{' '}
        (<code className="text-az-primary">ref self</code> or{' '}
        <code className="text-az-primary">mut self</code>) determines whether the operation
        reads or mutates the instance.
      </p>
      <CodeBlock>{`pack Vec2 {
    var x: Real = _
    var y: Real = _
}

impl oper+ for Vec2 { ref self, rhs ->
    Vec2(x: self.x + rhs.x, y: self.y + rhs.y)
}

var a = Vec2(x: 1.0, y: 2.0)
var b = Vec2(x: 3.0, y: 4.0)
var c = a + b    // Vec2(4.0, 6.0)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.2 Binary Operators</h3>
      <p className="mt-2 text-az-35">
        Binary operators take two operands of the same type. The left operand is{' '}
        <code className="text-az-primary">self</code>, the right operand is{' '}
        <code className="text-az-primary">rhs</code>. Supported binary operators include{' '}
        <code className="text-az-primary">+</code>, <code className="text-az-primary">-</code>,{' '}
        <code className="text-az-primary">*</code>, <code className="text-az-primary">/</code>,{' '}
        <code className="text-az-primary">%</code>, and the bitwise operators{' '}
        <code className="text-az-primary">&</code>, <code className="text-az-primary">|</code>,{' '}
        <code className="text-az-primary">^</code>, <code className="text-az-primary">&lt;&lt;</code>,{' '}
        <code className="text-az-primary">&gt;&gt;</code>.
      </p>
      <CodeBlock>{`impl oper+ for Vec2 { ref self, rhs ->
    Vec2(x: self.x + rhs.x, y: self.y + rhs.y)
}

impl oper- for Vec2 { ref self, rhs ->
    Vec2(x: self.x - rhs.x, y: self.y - rhs.y)
}

impl oper* for Vec2 { ref self, rhs ->
    Vec2(x: self.x * rhs.x, y: self.y * rhs.y)
}

impl oper/ for Vec2 { ref self, rhs ->
    Vec2(x: self.x / rhs.x, y: self.y / rhs.y)
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Bitwise operators work the same way, useful for flag or bitmask types:
      </p>
      <CodeBlock>{`pack Flags {
    var bits: Int = _
}

impl oper& for Flags { ref self, rhs ->
    Flags(bits: self.bits & rhs.bits)
}

impl oper| for Flags { ref self, rhs ->
    Flags(bits: self.bits | rhs.bits)
}

impl oper^ for Flags { ref self, rhs ->
    Flags(bits: self.bits ^ rhs.bits)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.3 Unary Operators</h3>
      <p className="mt-2 text-az-35">
        Unary operators take only <code className="text-az-primary">ref self</code>, with no
        second operand. Supported unary operators are{' '}
        <code className="text-az-primary">-</code> (negation),{' '}
        <code className="text-az-primary">!</code> (logical not), and{' '}
        <code className="text-az-primary">~</code> (bitwise not).
      </p>
      <CodeBlock>{`impl oper- for Vec2 { ref self ->
    Vec2(x: -self.x, y: -self.y)
}

var v = Vec2(x: 3.0, y: -4.0)
var neg = -v    // Vec2(-3.0, 4.0)`}</CodeBlock>
      <CodeBlock>{`pack Mask {
    var bits: Int = _
}

impl oper~ for Mask { ref self ->
    Mask(bits: ~self.bits)
}

var m = Mask(bits: 0b1010)
var inv = ~m    // bits: 0b...0101`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The compiler distinguishes unary from binary operators by the number of parameters in
        the block. A single <code className="text-az-primary">ref self</code> parameter means
        unary; two parameters means binary.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.4 Comparison Operators</h3>
      <p className="mt-2 text-az-35">
        Comparison operators return <code className="text-az-primary">Bool</code>. Define{' '}
        <code className="text-az-primary">==</code>, <code className="text-az-primary">!=</code>,{' '}
        <code className="text-az-primary">&lt;</code>, <code className="text-az-primary">&gt;</code>,{' '}
        <code className="text-az-primary">&lt;=</code>, and <code className="text-az-primary">&gt;=</code> independently.
      </p>
      <CodeBlock>{`impl oper== for Vec2 { ref self, rhs ->
    self.x == rhs.x && self.y == rhs.y
}

impl oper!= for Vec2 { ref self, rhs ->
    self.x != rhs.x || self.y != rhs.y
}

impl oper< for Vec2 { ref self, rhs ->
    self.magnitude() < rhs.magnitude()
}

impl oper> for Vec2 { ref self, rhs ->
    self.magnitude() > rhs.magnitude()
}

impl oper<= for Vec2 { ref self, rhs ->
    self.magnitude() <= rhs.magnitude()
}

impl oper>= for Vec2 { ref self, rhs ->
    self.magnitude() >= rhs.magnitude()
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.5 Index Operators (oper[], oper[]=)</h3>
      <p className="mt-2 text-az-35">
        Define <code className="text-az-primary">oper[]</code> and{' '}
        <code className="text-az-primary">oper[]=</code> to enable bracket-based access on your
        types. The read operator uses <code className="text-az-primary">ref self</code>; the
        write operator uses <code className="text-az-primary">mut self</code>.
      </p>
      <CodeBlock>{`pack Matrix {
    var data: Real[16] = _
    var cols: Int = 4
}

// Read: matrix[row, col]
impl oper[](row: Int, col: Int): Real for Matrix { ref self ->
    self.data[row * self.cols + col]
}

// Write: matrix[row, col] = value
impl oper[]=(row: Int, col: Int, value: Real) for Matrix { mut self ->
    self.data[row * self.cols + col] = value
}

var m = Matrix()
m[0, 0] = 1.0
m[1, 1] = 1.0
println(m[0, 0])    // 1.0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.6 Map Key Operators (oper[:], oper[:]=)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">oper[:]</code> and{' '}
        <code className="text-az-primary">oper[:]=</code> operators provide map-style key access.
        The <code className="text-az-primary">[:key]</code> syntax is visually distinct from
        array indexing.
      </p>
      <CodeBlock>{`impl oper[:] for Map<K, V> { ref self, key ->
    // key-based read
}

impl oper[:]= for Map<K, V> { mut self, key, value ->
    // key-based write
}

var m: [String:Int] = ["x": 1, "y": 2]
var v = m[:"x"]       // key read, returns 1
m[:"z"] = 3           // key write`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.7 Set Member Operators (oper![], oper![]=)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">oper![]</code> and{' '}
        <code className="text-az-primary">oper![]=</code> operators provide set membership
        access. Use the bang-bracket syntax <code className="text-az-primary">set![elem]</code> to
        check or modify membership.
      </p>
      <CodeBlock>{`impl oper![] for Set<T> { ref self, elem ->
    // returns true if elem is in the set
}

impl oper![]= for Set<T> { mut self, elem, flag ->
    // add or remove elem based on flag
}

var s: ![Int] = ![1, 2, 3]
var has = s![2]       // true
s![4] = true          // add 4 to the set`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.8 Mixed-Type Operators (by keyword)</h3>
      <p className="mt-2 text-az-35">
        When the right-hand operand has a different type from the left, use the{' '}
        <code className="text-az-primary">by</code> keyword to specify the other type. Define
        both directions to support commutativity. In the reverse direction, mark the second
        parameter as <code className="text-az-primary">ref self</code> and the first as the
        foreign type.
      </p>
      <CodeBlock>{`// Vec2 * Real (vector scaled by scalar)
impl oper* by Real for Vec2 { ref self, rhs ->
    Vec2(x: self.x * rhs, y: self.y * rhs)
}

// Real * Vec2 (scalar times vector, reverse direction)
impl oper* by Real for Vec2 { lhs, ref self ->
    Vec2(x: self.x * lhs, y: self.y * lhs)
}

// Vec2 / Real
impl oper/ by Real for Vec2 { ref self, rhs ->
    Vec2(x: self.x / rhs, y: self.y / rhs)
}

var v = Vec2(x: 1.0, y: 2.0)
var scaled = v * 3.0        // Vec2(3.0, 6.0)
var reversed = 3.0 * v      // Vec2(3.0, 6.0)
var halved = v / 2.0         // Vec2(0.5, 1.0)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">by</code> keyword works with any binary operator,
        including addition, subtraction, and bitwise shifts:
      </p>
      <CodeBlock>{`// Shift a Flags value by an Int number of positions
impl oper<< by Int for Flags { ref self, rhs ->
    Flags(bits: self.bits << rhs)
}

impl oper>> by Int for Flags { ref self, rhs ->
    Flags(bits: self.bits >> rhs)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">17.9 Compound Assignment Operators (+=, -=)</h3>
      <p className="mt-2 text-az-35">
        Compound assignment operators like <code className="text-az-primary">+=</code>,{' '}
        <code className="text-az-primary">-=</code>, <code className="text-az-primary">*=</code>,{' '}
        <code className="text-az-primary">/=</code> are auto-derived from the corresponding
        binary operator when the variable is <code className="text-az-primary">var</code>. You
        can also override them explicitly for in-place mutation using{' '}
        <code className="text-az-primary">mut self</code>.
      </p>
      <CodeBlock>{`impl oper+= for Vec2 { mut self, rhs ->
    self.x += rhs.x
    self.y += rhs.y
}

impl oper-= for Vec2 { mut self, rhs ->
    self.x -= rhs.x
    self.y -= rhs.y
}

impl oper*= by Real for Vec2 { mut self, rhs ->
    self.x *= rhs
    self.y *= rhs
}

impl oper/= by Real for Vec2 { mut self, rhs ->
    self.x /= rhs
    self.y /= rhs
}

var v = Vec2(x: 1.0, y: 2.0)
v += Vec2(x: 3.0, y: 4.0)    // v is now Vec2(4.0, 6.0)
v *= 2.0                      // v is now Vec2(8.0, 12.0)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Explicit compound operators are more efficient than the auto-derived form because they
        mutate in place rather than creating a new value and reassigning.
      </p>

      <p className="mt-4 text-sm text-az-50">
        Operator overloading in Azora is explicit and opt-in. Each operator is defined
        independently, giving you full control over which operations your type supports. Use{' '}
        <code className="text-az-primary">Self</code> inside operator bodies to refer to the
        enclosing pack type.
      </p>
    </Section>
  )
}
