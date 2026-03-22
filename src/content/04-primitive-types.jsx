import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function PrimitiveTypes() {
  return (
    <Section id="primitive-types" title="Primitive Types">
      <p className="mt-2 text-az-35">
        Azora has a rich set of primitive types: 15 numeric types covering signed integers, unsigned
        integers, and floating-point numbers, plus <code className="text-az-primary">Bool</code>,
        <code className="text-az-primary"> Char</code>, <code className="text-az-primary">String</code>,
        <code className="text-az-primary"> Unit</code>, and <code className="text-az-primary">Nothing</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.1 Integer Types</h3>
      <p className="mt-2 text-az-35">
        Azora provides 12 integer types, covering signed and unsigned variants at multiple bit widths,
        plus platform-sized types.
      </p>

      <Table
        headers={['Type', 'Size', 'Signed', 'Suffix', 'Default']}
        rows={[
          [<code className="text-az-primary">Byte</code>, '8-bit', 'Yes', <code>b</code>, <code>0</code>],
          [<code className="text-az-primary">UByte</code>, '8-bit', 'No', <code>ub</code>, <code>0</code>],
          [<code className="text-az-primary">Short</code>, '16-bit', 'Yes', <code>s</code>, <code>0</code>],
          [<code className="text-az-primary">UShort</code>, '16-bit', 'No', <code>us</code>, <code>0</code>],
          [<code className="text-az-primary">Int</code>, '32-bit', 'Yes', '(none)', <code>0</code>],
          [<code className="text-az-primary">UInt</code>, '32-bit', 'No', <code>u</code>, <code>0</code>],
          [<code className="text-az-primary">Long</code>, '64-bit', 'Yes', <code>L</code>, <code>0</code>],
          [<code className="text-az-primary">ULong</code>, '64-bit', 'No', <code>uL</code>, <code>0</code>],
          [<code className="text-az-primary">Cent</code>, '128-bit', 'Yes', <code>c</code>, <code>0</code>],
          [<code className="text-az-primary">UCent</code>, '128-bit', 'No', <code>uc</code>, <code>0</code>],
          [<code className="text-az-primary">Size</code>, 'Platform', 'Yes', <code>sz</code>, <code>0</code>],
          [<code className="text-az-primary">USize</code>, 'Platform', 'No', <code>usz</code>, <code>0</code>],
        ]}
      />

      <p className="mt-4 text-az-35">
        <code className="text-az-primary">Int</code> is the default integer type. Unsuffixed integer
        literals are inferred as <code className="text-az-primary">Int</code>. <code className="text-az-primary">Long</code> is
        64-bit and is used for large values. <code className="text-az-primary">Size</code> and
        <code className="text-az-primary"> USize</code> match the platform's native pointer width
        (32-bit on 32-bit systems, 64-bit on 64-bit systems). <code className="text-az-primary">Cent</code> and
        <code className="text-az-primary"> UCent</code> provide 128-bit integers for cases that need
        extremely large values.
      </p>

      <CodeBlock>{`var a = 42              // Int (32-bit, default)
var b = 42L             // Long (64-bit)
var c = 42b             // Byte (8-bit)
var d = 42u             // UInt (32-bit, unsigned)
var e = 42sz            // Size (platform-width)
var f = 100c            // Cent (128-bit)
var g = 255ub           // UByte (8-bit, unsigned)
var h = 1000s           // Short (16-bit)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Every numeric type exposes <code className="text-az-primary">.min</code> and <code className="text-az-primary">.max</code> properties
        for the smallest and largest representable values:
      </p>

      <CodeBlock>{`var a: Int = 4
assert a.min == -2_147_483_648
assert a.max == 2_147_483_647`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.2 Floating-Point Types</h3>

      <Table
        headers={['Type', 'Size', 'Suffix', 'Default']}
        rows={[
          [<code className="text-az-primary">Float</code>, '32-bit', <code>f</code>, <code>0.0</code>],
          [<code className="text-az-primary">Real</code>, '64-bit', '(none)', <code>0.0</code>],
          [<code className="text-az-primary">Decimal</code>, 'Arbitrary precision', <code>D</code>, <code>0.0</code>],
        ]}
      />

      <p className="mt-4 text-az-35">
        <code className="text-az-primary">Real</code> (64-bit double precision) is the default
        floating-point type. Unsuffixed decimal literals are inferred as <code className="text-az-primary">Real</code>.
        <code className="text-az-primary"> Float</code> is 32-bit single precision, useful for
        graphics and performance-sensitive code.
        <code className="text-az-primary"> Decimal</code> provides arbitrary precision for financial
        and scientific calculations where rounding errors are unacceptable.
      </p>

      <CodeBlock>{`var x = 3.14            // Real (64-bit, default)
var y = 3.14f           // Float (32-bit)
var z = 1.5D            // Decimal (arbitrary precision)

var pi: Real = 3.14159265358979
var radius: Float = 2.5f`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.3 Boolean Type (<code className="text-az-primary">Bool</code>)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">Bool</code> type has two
        values: <code className="text-az-primary">true</code> and <code className="text-az-primary">false</code>.
        It is used in conditions, flags, and logical expressions.
      </p>

      <CodeBlock>{`var active = true
var done: Bool = false
var ready: Bool = _      // zero-value: false

if active {
    println("Running")
}

// Logical operations
fin result = active && !done   // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Azora does not support "truthy" or "falsy" coercion for non-boolean types in
        boolean contexts. You must use explicit comparisons. The exceptions are arrays and strings,
        which can be used directly in boolean context (empty is falsy, non-empty is truthy).
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.4 Character Type (<code className="text-az-primary">Char</code>)</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">Char</code> represents a single Unicode character. Character
        literals are enclosed in single quotes. <code className="text-az-primary">Char</code> is a
        first-class type, distinct from <code className="text-az-primary">String</code>, with support
        for arithmetic, comparison, and Unicode operations.
      </p>

      <CodeBlock>{`fin letter = 'A'
fin digit = '0'
fin space = ' '`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Escape sequences</strong> in character literals:
      </p>

      <CodeBlock>{`'\\n'     // newline
'\\t'     // tab
'\\r'     // carriage return
'\\\\'     // backslash
'\\''     // single quote
'\\0'     // null character
'\\u0041' // Unicode escape (4 hex digits) - 'A'`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Character arithmetic:</strong> You can add an integer to a <code className="text-az-primary">Char</code> to
        produce another <code className="text-az-primary">Char</code>, or subtract
        two <code className="text-az-primary">Char</code> values to get the integer distance between them.
      </p>

      <CodeBlock>{`fin c = 'a'
fin d = c + 1         // 'b' (Char + Int = Char)
fin e = 'z' - 1       // 'y' (Char - Int = Char)

fin diff = 'z' - 'a'  // 25 (Char - Char = Int)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Character concatenation:</strong> Adding two <code className="text-az-primary">Char</code> values
        produces a <code className="text-az-primary">String</code>. Adding
        a <code className="text-az-primary">Char</code> and a <code className="text-az-primary">String</code> also
        produces a <code className="text-az-primary">String</code>.
      </p>

      <CodeBlock>{`fin greeting = 'h' + 'i'      // "hi" (Char + Char = String)
fin word = 'h' + "ello"       // "hello" (Char + String = String)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Character comparison:</strong> Characters are compared by their Unicode code points.
      </p>

      <CodeBlock>{`assert 'a' < 'b'     // true
assert 'z' > 'a'     // true
assert 'a' == 'a'    // true
assert 'a' != 'b'    // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Built-in character functions:</strong>
      </p>

      <CodeBlock>{`ord('A')           // 65 (Unicode code point)
chr(65)            // 'A' (code point to Char)
isDigit('5')       // true
isAlpha('a')       // true
isUpper('A')       // true
isLower('a')       // true
isWhitespace(' ')  // true
isAlphanumeric('x') // true
toUpper('a')       // 'A'
toLower('Z')       // 'z'
charAt("hello", 0) // 'h'
toChars("abc")     // ['a', 'b', 'c']
fromChars(['a', 'b', 'c'])  // "abc"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.5 String Type</h3>
      <p className="mt-2 text-az-35">
        Strings are immutable, UTF-8 encoded text values. The default zero value
        is <code className="text-az-primary">""</code>, not <code className="text-az-primary">null</code>.
        Use <code className="text-az-primary">String?</code> for nullable strings. Strings are covered
        in full detail in the Strings chapter.
      </p>

      <CodeBlock>{`var greeting = "Hello, World!"
var empty: String = _          // ""
var name: String? = null       // nullable string`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.6 Unit Type</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">Unit</code> represents the absence of a meaningful value,
        similar to <code className="text-az-primary">void</code> in C/Java. Functions with no return
        value implicitly return <code className="text-az-primary">Unit</code>. Unlike <code className="text-az-primary">void</code>,
        <code className="text-az-primary"> Unit</code> is a real type that can appear in generics.
      </p>

      <CodeBlock>{`func logMessage(msg: String): Unit {
    println(msg)
}

// Equivalent: return type defaults to Unit
func logMessage2(msg: String) {
    println(msg)
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.7 Nothing Type</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">Nothing</code> is the bottom type. It represents a
        computation that never completes normally, for example a function that always throws or
        loops forever. No value can have type <code className="text-az-primary">Nothing</code>.
        It is a subtype of every other type, which makes it useful in type-level programming.
      </p>

      <CodeBlock>{`func crash(msg: String): Nothing {
    // This function never returns normally
    fail .FatalError
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.8 Numeric Literals</h3>
      <p className="mt-2 text-az-35">
        Azora supports multiple numeric literal formats for readability and precision:
      </p>

      <CodeBlock>{`// Decimal (default)
var a = 42
var b = 1_000_000       // underscores as separators

// Hexadecimal
var hex = 0xFF           // 255
var hex2 = 0x1A2B        // 6699

// Octal
var oct = 0o77           // 63

// Binary
var bin = 0b1010         // 10
var bin2 = 0b1111_0000   // 240

// Scientific notation
var sci = 1.5e10         // 15000000000.0
var sci2 = 2.5e-3        // 0.0025
var sci3 = 1e6           // 1000000.0

// Suffixed literals
var x = 42L              // Long
var y = 3.14f            // Float
var z = 100c             // Cent
var w = 255ub            // UByte`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> The suffixes <code className="text-az-primary">b</code>,
        <code className="text-az-primary"> c</code>, and <code className="text-az-primary">f</code> are not
        recognized as type suffixes in hex literals because they are valid hex digits.
        Use explicit type annotations instead: <code className="text-az-primary">var x: Byte = 0xFF</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.9 Type Casting (<code className="text-az-primary">as</code>)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">as</code> keyword performs explicit type casts. For
        primitives, it behaves like a conversion function.
      </p>

      <CodeBlock>{`var x: Int = 3.14 as Int        // 3 (truncates toward zero)
var s: String = 42 as String    // "42"
var r: Real = 42 as Real        // 42.0
var b: Bool = 1 as Bool         // true (non-zero = true)
var b2: Bool = 0 as Bool        // false (zero = false)
var c: Char = 97 as Char        // 'a' (code point to Char)`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Conversion functions are also available:
      </p>

      <CodeBlock>{`toString(42)       // "42"
toInt(3.9)         // 3 (truncates, does not round)
toReal(3)          // 3.0
toChar(65)         // 'A'`}</CodeBlock>

      <p className="mt-4 text-az-35">
        You can check a value's type at runtime with <code className="text-az-primary">is</code>,
        and its negated form <code className="text-az-primary">is!</code>:
      </p>

      <CodeBlock>{`var x = 5
if x is Int { println("it's an Int") }
if x is! String { println("not a String") }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">4.10 Numeric Promotion</h3>
      <p className="mt-2 text-az-35">
        When mixing numeric types in an expression, Azora promotes automatically using these rules:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Floating-point wins over integer: <code className="text-az-primary">Int + Real</code> produces <code className="text-az-primary">Real</code></li>
        <li>Higher bit width wins: <code className="text-az-primary">Byte + Int</code> produces <code className="text-az-primary">Int</code></li>
        <li>Unsigned wins at the same width: <code className="text-az-primary">Int + UInt</code> produces <code className="text-az-primary">UInt</code></li>
      </ul>

      <CodeBlock>{`2 + 1.5         // Real (Int promoted to Real)
42b + 100       // Int (Byte promoted to Int)
5u + 5          // UInt (unsigned wins at same width)
3.14f + 1.0     // Real (Float promoted to Real)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Every value exposes a <code className="text-az-primary">.typename</code> property that returns
        the type name as a string:
      </p>

      <CodeBlock>{`var x = 42
assert x.typename == "Int"

var y = 3.14
assert y.typename == "Real"

var c = 'A'
assert c.typename == "Char"`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> Numeric type names (Byte, Short, Long, Float, etc.) are not language
        keywords. They are regular identifiers recognized as types in type annotation context.
      </p>
    </Section>
  )
}
