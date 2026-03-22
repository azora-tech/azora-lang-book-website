import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function InfixFunctions() {
  return (
    <Section id="infix-functions" title="Infix Functions">
      <p className="mt-2 text-az-35">
        Infix functions let you call a method between a receiver and an argument, reading like
        natural language. They are declared with the <code className="text-az-primary">infx</code>{' '}
        keyword and are ideal for DSLs, mathematical operations, and expressive APIs.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.1 Declaring Infix Functions</h3>
      <p className="mt-2 text-az-35">
        There are two syntaxes for declaring infix functions. The short form puts the receiver
        type, dot, and method name on a single line. Inside the body,{' '}
        <code className="text-az-primary">self</code> refers to the left-hand receiver.
      </p>
      <CodeBlock>{`// Short form: infx ReceiverType.methodName(param): ReturnType
infx Int.plus(other: Int): Int = self + other
infx String.repeat(n: Int): String = self * n`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The block form groups multiple infix methods for the same receiver type. This is useful
        when you want to add several infix methods at once.
      </p>
      <CodeBlock>{`// Block form: infx ReceiverType { func ... }
infx String {
    func shout(): String {
        return self + "!"
    }

    func whisper(): String {
        return "(" + self + ")"
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.2 Using Infix Functions</h3>
      <p className="mt-2 text-az-35">
        Call an infix function by placing its name between the receiver and the argument, with
        no dot or parentheses. The left side is the receiver (<code className="text-az-primary">self</code>),
        the right side is the argument.
      </p>
      <CodeBlock>{`var result = 5 plus 3      // 8
var s = "ha" repeat 3     // "hahaha"`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Infix calls sit between comparison operators (<code className="text-az-primary">==</code>,{' '}
        <code className="text-az-primary">&lt;</code>) and{' '}
        <code className="text-az-primary">as</code>/<code className="text-az-primary">is</code> in
        precedence. Arithmetic operators bind more tightly:{' '}
        <code className="text-az-primary">2 + 3 plus 4</code> evaluates as{' '}
        <code className="text-az-primary">5 plus 4</code>, which is{' '}
        <code className="text-az-primary">9</code>.
      </p>
      <p className="mt-2 text-az-35">
        The parser pre-scans all <code className="text-az-primary">infx</code> declarations to
        recognize infix identifiers, so they can be used anywhere in the file.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">18.3 Examples</h3>
      <p className="mt-2 text-az-35">
        Infix functions excel in math libraries, test assertions, and collection DSLs.
      </p>
      <CodeBlock>{`// Math DSL: dot product
infx Vec3.dot(other: Vec3): Real =
    self.x * other.x + self.y * other.y + self.z * other.z

var d = v1 dot v2`}</CodeBlock>
      <CodeBlock>{`// Test assertion DSL
infx Int.shouldBe(expected: Int): Bool = self == expected

var ok = result shouldBe 42`}</CodeBlock>
      <CodeBlock>{`// Collection DSL
infx Array<Int>.contains(el: Int): Bool = self.has(el)

var found = myArr contains 7`}</CodeBlock>
      <CodeBlock>{`// Range DSL
infx Int.to(end: Int): Array<Int> {
    var result: Array<Int> = []
    var i = self
    while i <= end {
        result.push(i)
        i += 1
    }
    return result
}

var nums = 1 to 5    // [1, 2, 3, 4, 5]`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Keep infix function names short and descriptive for readability. Good names read like
        natural language: <code className="text-az-primary">a contains b</code>,{' '}
        <code className="text-az-primary">v1 dot v2</code>,{' '}
        <code className="text-az-primary">x shouldBe 42</code>.
      </p>
    </Section>
  )
}
