import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function NullableTypes() {
  return (
    <Section id="nullable-types" title="Nullable Types">
      <p className="mt-2 text-az-35">
        By default, no type in Azora can hold <code className="text-az-primary">null</code>. Append{' '}
        <code className="text-az-primary">?</code> to a type to make it nullable. This is enforced at
        compile time. A family of null-aware operators lets you unwrap, coalesce, and transform nullable
        values concisely.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.1 Nullable Type Syntax</h3>
      <p className="mt-2 text-az-35">
        Append <code className="text-az-primary">?</code> to any type. Works with primitives, packs,
        enums, and generics.
      </p>
      <CodeBlock>{`var x: Int? = null
var s: String? = null
var b: Bool? = null
var r: Real? = null`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Nullable variables can also start with a concrete value:
      </p>
      <CodeBlock>{`var name: String? = "Azora"   // starts non-null, could become null later
var count: Int? = 42          // nullable Int with an initial value`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.2 Null Literal</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">null</code> literal represents the absence of a value.
        It can only be assigned to nullable types. Assigning <code className="text-az-primary">null</code> to
        a non-nullable type is a compile-time error.
      </p>
      <CodeBlock>{`var x: Int? = null     // OK: nullable type
var y: Int = null      // ERROR: non-nullable type`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Compare nullable values to <code className="text-az-primary">null</code> with{' '}
        <code className="text-az-primary">==</code> and <code className="text-az-primary">!=</code>:
      </p>
      <CodeBlock>{`var x: Int? = null
assert x == null

var y: Int? = 5
assert y != null`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.3 Null Coalescing (??)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">??</code> operator provides a fallback when the left side
        is null. The right side is evaluated lazily. The result type is always non-nullable.
        Supports chaining.
      </p>
      <CodeBlock>{`var x: Int? = null
var y: Int = x ?? 42       // y == 42 (x is null, use fallback)

var a: Int? = null
var b: Int? = null
var c: Int = a ?? b ?? 99  // c == 99 (both null, use last fallback)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.4 Safe Calls (?.)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">?.</code> operator calls a method or accesses a field only
        if the receiver is non-null. If the receiver is null, the entire expression evaluates to null
        instead of crashing.
      </p>
      <CodeBlock>{`var name: String? = "Azora"
var len: Int? = name?.length      // len == 5

var empty: String? = null
var noLen: Int? = empty?.length   // noLen == null (no crash)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.5 Null-Safe Assignments (?=)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">?=</code> operator assigns a value only if the variable is
        currently null. Useful for lazy initialization.
      </p>
      <CodeBlock>{`var x: Int? = null
x ?= 10            // assigns 10 (was null)
x ?= 20            // skips (already non-null, still 10)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.6 Null-Safe Compound Operators</h3>
      <p className="mt-2 text-az-35">
        All null-safe operators perform their operation only when the variable is non-null.
        When null, they are complete no-ops.
      </p>
      <Table
        headers={['Operator', 'Meaning']}
        rows={[
          [<code>?+=</code>, 'Add if non-null'],
          [<code>?-=</code>, 'Subtract if non-null'],
          [<code>?*=</code>, 'Multiply if non-null'],
          [<code>?/=</code>, 'Divide if non-null'],
          [<code>?%=</code>, 'Modulo if non-null'],
          [<code>?++</code>, 'Increment if non-null'],
          [<code>?--</code>, 'Decrement if non-null'],
        ]}
      />
      <p className="mt-4 text-az-35">Full lifecycle example:</p>
      <CodeBlock>{`var x: Int? = null
x ?+= 5         // no-op (still null)
x ?= 10         // now x == 10
x ?+= 5         // now x == 15
x ?++            // now x == 16
x ?--            // now x == 15
x ?*= 2         // now x == 30
x ?/= 3         // now x == 10
x ?%= 3         // now x == 1
x ?-= 1         // now x == 0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.7 Guard Statements</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">guard</code> statement binds a nullable value to a non-nullable
        variable if it is non-null, or executes an else block that must exit the scope
        (via <code className="text-az-primary">return</code>, <code className="text-az-primary">break</code>,{' '}
        <code className="text-az-primary">continue</code>, or <code className="text-az-primary">throw</code>).
        The variable is bound in the enclosing scope, not a nested scope.
      </p>
      <CodeBlock>{`func process(input: String?): Int {
    guard fin value = input else {
        return -1
    }
    // value is non-nullable String here
    return stringLength(value)
}

assert process("hello") == 5
assert process(null) == -1`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">guard var</code> for a mutable binding:
      </p>
      <CodeBlock>{`func increment(x: Int?): Int {
    guard var value = x else { return 0 }
    value += 1
    return value
}`}</CodeBlock>

      <p className="mt-4 text-az-35">
        A common pattern is unwrapping a nullable parameter and using it for the rest of the
        function. After the guard statement, the bound variable is available as a non-null value
        in the enclosing scope:
      </p>
      <CodeBlock>{`func processUser(name: String?): String {
    guard fin n = name else {
        return "unknown"
    }
    // n is available here as a non-null String
    return "Hello, " + n
}

assert processUser("Alice") == "Hello, Alice"
assert processUser(null) == "unknown"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">34.8 Type Checking for Null</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">is</code> and <code className="text-az-primary">!is</code> to
        check whether a nullable value holds null at runtime.
      </p>
      <CodeBlock>{`var x: Int? = 42
if x is Int {
    println("x has a value")
}

var y: Int? = null
if y !is Int {
    println("y is null")
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Use non-nullable types by default. Only introduce nullability when absence is a meaningful
        part of the domain.
      </p>
    </Section>
  )
}
