import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Strings() {
  return (
    <Section id="strings" title="Strings">
      <p className="mt-2 text-az-35">
        Strings in Azora are immutable, UTF-8 encoded values. They support interpolation, escape
        sequences, concatenation, repetition, and a rich set of built-in operations.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.1 String Literals</h3>
      <p className="mt-2 text-az-35">
        String literals are enclosed in double quotes. Strings are always immutable: a <code className="text-az-primary">var</code> string
        variable can be reassigned to a different string, but the string content itself cannot be
        mutated in place.
      </p>

      <CodeBlock>{`var greeting = "Hello, World!"
var empty = ""                // empty string
var zero: String = _          // also empty string (zero value)

// Reassignment is allowed for var
greeting = "Hi there!"

// But the string itself is immutable
// greeting[0] = 'h'  // ERROR: strings are immutable`}</CodeBlock>

      <p className="mt-4 text-az-35">
        The default zero value for <code className="text-az-primary">String</code> is <code className="text-az-primary">""</code>,
        not <code className="text-az-primary">null</code>. To allow null, use <code className="text-az-primary">String?</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.2 Raw Strings (Triple-Quoted)</h3>
      <p className="mt-2 text-az-35">
        Raw strings are enclosed in triple double quotes (<code className="text-az-primary">"""..."""</code>).
        They preserve whitespace and newlines exactly as written. No escape processing is performed
        inside raw strings.
      </p>

      <CodeBlock>{`fin query = """
    SELECT *
    FROM users
    WHERE active = true
"""

fin poem = """
    Roses are red,
    Violets are blue,
    Azora compiles,
    And so should you.
"""`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Raw strings are useful for multi-line text, SQL queries, templates, and any content where
        you want to avoid escaping. Since no escape processing occurs, backslashes are literal
        characters inside raw strings.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.3 String Interpolation</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">$variable</code> to insert a variable's value into a
        string, and <code className="text-az-primary">{"${expression}"}</code> for arbitrary
        expressions. The inserted value is automatically converted to a string.
      </p>

      <CodeBlock>{`var name = "World"
println("Hello, $name!")             // Hello, World!

var x = 10
println("result: \${x + 5}")         // result: 15

var a = 3
var b = 4
println("$a + $b = \${a + b}")       // 3 + 4 = 7`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Simple variable interpolation uses <code className="text-az-primary">$name</code>. For anything
        more complex (method calls, arithmetic, property access), wrap it in braces: <code className="text-az-primary">{"${expr}"}</code>.
      </p>

      <CodeBlock>{`fin items = [1, 2, 3]
println("Count: \${items.length}")     // Count: 3

fin pi = 3.14159
println("Pi is about \${toInt(pi)}")   // Pi is about 3`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> To include a literal dollar sign in a string, escape it
        with <code className="text-az-primary">\$</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.4 Escape Sequences</h3>
      <p className="mt-2 text-az-35">
        Azora strings support the following escape sequences:
      </p>

      <CodeBlock>{`"\\n"     // newline
"\\t"     // tab
"\\r"     // carriage return
"\\\\"     // backslash
"\\""     // double quote
"\\$"     // literal dollar sign (prevents interpolation)
"\\0"     // null character`}</CodeBlock>

      <p className="mt-4 text-az-35">
        Escape sequences are processed in regular strings only. Inside triple-quoted raw strings,
        all characters are literal, including backslashes.
      </p>

      <CodeBlock>{`// Regular string: escape processed
var path = "C:\\\\Users\\\\docs"    // C:\Users\docs

// Raw string: backslashes are literal
var raw = """C:\\Users\\docs"""    // C:\Users\docs`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.5 String Operations</h3>
      <p className="mt-2 text-az-35">
        <strong>Concatenation</strong> with <code className="text-az-primary">+</code> joins two strings together.
        <strong> Repetition</strong> with <code className="text-az-primary">*</code> repeats a string a given
        number of times.
      </p>

      <CodeBlock>{`// Concatenation
"hello" + " " + "world"    // "hello world"
var greeting = "Hi"
greeting = greeting + "!"  // "Hi!"

// Repetition (works in either order)
"ab" * 3                   // "ababab"
3 * "ha"                   // "hahaha"
"-" * 20                   // "--------------------"
"x" * 0                    // "" (empty string)`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Length:</strong> Use the <code className="text-az-primary">.length</code> property or
        the <code className="text-az-primary">stringLength()</code> built-in function:
      </p>

      <CodeBlock>{`fin s = "hello"
println(s.length)           // 5
println(stringLength(s))    // 5`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Equality:</strong> Strings use structural equality.
        Two strings are equal if they contain the same characters:
      </p>

      <CodeBlock>{`"ab" + "c" == "abc"     // true
"hello" != "world"      // true
"" == ""                // true`}</CodeBlock>

      <p className="mt-4 text-az-35">
        <strong>Boolean coercion:</strong> Non-empty strings are truthy, empty strings are falsy:
      </p>

      <CodeBlock>{`var s = "hello"
if s { println("non-empty") }   // prints "non-empty"

var empty = ""
if !empty { println("empty") }  // prints "empty"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.6 String Methods</h3>
      <p className="mt-2 text-az-35">
        Azora provides built-in functions for common string operations. These are available without
        importing any module.
      </p>

      <CodeBlock>{`// Substrings
substring("hello", 1, 4)        // "ell" (start inclusive, end exclusive)

// Searching
startsWith("hello", "hel")      // true
endsWith("hello", "llo")        // true
contains("hello world", "world") // true
indexOf("hello", "ll")          // 2 (first occurrence)
indexOf("hello", "xyz")         // -1 (not found)

// Transformation
toUpper("hello")                // "HELLO"
toLower("HELLO")                // "hello"
trim("  hello  ")               // "hello"
replace("hello world", "world", "azora")  // "hello azora"

// Splitting
split("a,b,c", ",")             // ["a", "b", "c"]`}</CodeBlock>

      <p className="mt-4 text-az-35">
        The standard library (<code className="text-az-primary">use scope std</code>) provides
        additional string functions:
      </p>

      <CodeBlock>{`use scope std

// Standard library string functions
strLength("hello")          // 5
strCharAt("hello", 0)       // 'h' (returns Char)
strSlice("hello", 1, 4)     // "ell"
strStartsWith("hello", "he") // true
strEndsWith("hello", "lo")  // true
strContains("hello", "ell") // true
strIndexOf("hello", "ll")   // 2
strTrim("  hi  ")           // "hi"
strToUpper("hello")         // "HELLO"
strToLower("HELLO")         // "hello"
strReplace("hi", "hi", "bye") // "bye"
strSplit("a,b,c", ",")      // ["a", "b", "c"]
strReverse("hello")         // "olleh"
strRepeat("ab", 3)          // "ababab"
strIsEmpty("")              // true
strIsNotEmpty("hi")         // true
strIsNumeric("123")         // true
strIsAlpha("abc")           // true

// Char conversion
strToChars("abc")           // ['a', 'b', 'c']
charsToString(['a', 'b'])   // "ab"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">6.7 Characters vs Strings</h3>
      <p className="mt-2 text-az-35">
        Azora has a distinct <code className="text-az-primary">Char</code> type for individual
        characters. Characters use single quotes (<code className="text-az-primary">'a'</code>), while
        strings use double quotes (<code className="text-az-primary">"a"</code>). They are different
        types.
      </p>

      <CodeBlock>{`fin c: Char = 'a'         // Char
fin s: String = "a"       // String (length 1)

// They are different types
assert c is Char
assert s is String

// Conversion between Char and String
fin charToStr = toString(c)         // "a"
fin strToChar = charAt("hello", 0)  // 'h'

// Char arrays and strings
fin chars = toChars("hello")        // ['h', 'e', 'l', 'l', 'o']
fin str = fromChars(chars)          // "hello"

// Character concatenation produces strings
fin greeting = 'h' + 'i'           // "hi" (String)
fin word = 'h' + "ello"            // "hello" (String)`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> You can index into a string using the <code className="text-az-primary">charAt()</code> function,
        which returns a <code className="text-az-primary">Char</code>. Direct bracket indexing on strings
        is not supported. Use <code className="text-az-primary">charAt(s, i)</code> or convert to a char
        array with <code className="text-az-primary">toChars(s)</code> first.
      </p>
    </Section>
  )
}
