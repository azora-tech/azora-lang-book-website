import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function GettingStarted() {
  return (
    <Section id="getting-started" title="Getting Started">
      <p className="mt-2 text-az-35">
        This chapter covers how Azora source files are organized, how packages and comments work,
        and how to write and run your first program.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">2.1 File Structure</h3>
      <p className="mt-2 text-az-35">
        Every Azora source file uses the <code className="text-az-primary">.az</code> extension. Files
        without this extension will not be recognized by the compiler. Azora source files are plain
        UTF-8 text, editable with any text editor or IDE.
      </p>

      <p className="mt-2 text-az-35">
        A source file can contain:
      </p>
      <ol className="list-decimal pl-6 space-y-1 mt-2">
        <li>An optional <code className="text-az-primary">package</code> declaration (must be first if present)</li>
        <li><code className="text-az-primary">use</code> imports</li>
        <li>Top-level declarations: variables, functions, types, hooks, tests, and more</li>
      </ol>

      <p className="mt-4 text-az-35">
        A single file can contain as many declarations as you like. There is no one-class-per-file
        rule. You can define multiple functions, packs, enums, and other declarations in the same
        file.
      </p>

      <CodeBlock title="example.az">{`package demo

use std

fin VERSION = "1.0.0"

func greet(name: String): String {
    return "Hello, $name!"
}

func main() {
    println(greet("World"))
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">2.2 Packages</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">package</code> declaration assigns a file to a named
        namespace, preventing naming collisions across files. Package names use dot-separated
        segments. If omitted, the file belongs to the default (unnamed) package.
      </p>

      <CodeBlock title="math_utils.az">{`package math.utils

func clamp(value: Int, lo: Int, hi: Int): Int {
    if value < lo { return lo }
    if value > hi { return hi }
    return value
}

func lerp(a: Real, b: Real, t: Real): Real {
    return a + (b - a) * t
}`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Other files can import from this package using the <code className="text-az-primary">use</code> keyword:
      </p>

      <CodeBlock>{`use math.utils`}</CodeBlock>

      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">use scope</code> variant brings all exported symbols
        from a scope into the current file without qualification:
      </p>

      <CodeBlock>{`use scope std    // brings all std functions into scope`}</CodeBlock>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> Using a type or function from another file without
        a <code className="text-az-primary">use</code> import is a compiler error. The semantic
        analyzer enforces import rules across all backends.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">2.3 Comments</h3>
      <p className="mt-2 text-az-35">
        Azora supports three styles of comments:
      </p>

      <CodeBlock>{`// Single-line comment: everything after // is ignored

/* Block comment: spans multiple lines */

/* Nested /* block */ comments are supported */`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Single-line comments start with <code className="text-az-primary">//</code> and extend to the
        end of the line. Block comments use <code className="text-az-primary">/* */</code> and can span
        multiple lines. Azora supports <strong>nested block comments</strong>, so you can comment
        out code that already contains block comments without syntax errors.
      </p>

      <p className="mt-2 text-az-35">
        Documentation comments use <code className="text-az-primary">/** */</code> and support doc
        tags:
      </p>

      <CodeBlock>{`/**
 * Calculates the area of a circle.
 *
 * @param radius The radius of the circle.
 * @return The area as a Real value.
 * @since 0.1.0
 */
func circleArea(radius: Real): Real {
    return 3.14159265 * radius * radius
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">2.4 Your First Program</h3>
      <p className="mt-2 text-az-35">
        The simplest Azora program consists of a <code className="text-az-primary">main</code> function
        that prints to the console:
      </p>

      <CodeBlock title="hello.az">{`func main() {
    println("Hello, Azora!")
}`}</CodeBlock>

      <p className="mt-2 text-az-35">
        In the Azora engine context, the entry point is <code className="text-az-primary">hook onStart()</code>,
        which is tied to the engine's lifecycle system:
      </p>

      <CodeBlock title="main.az">{`package demo

hook onStart() {
    println("Hello, Azora!")
}`}</CodeBlock>

      <p className="mt-2 text-az-35">
        Hooks run in a suspendable context, so you can
        use <code className="text-az-primary">async</code> and <code className="text-az-primary">await</code> directly
        inside them.
      </p>

      <p className="mt-4 text-az-50">
        <strong>Note:</strong> A program can have only
        one <code className="text-az-primary">onStart</code> hook across all source files. For
        multi-file initialization, define regular functions and call them
        from <code className="text-az-primary">onStart</code>.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">2.5 Running Azora Code</h3>
      <p className="mt-2 text-az-35">
        Azora code can be run in several ways depending on your development workflow:
      </p>

      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>
          <strong>Interpreter mode:</strong> Runs <code className="text-az-primary">.az</code> files
          directly without full compilation. Best for rapid prototyping and testing.
        </li>
        <li>
          <strong>Compiled mode:</strong> Compiles to a target backend (Kotlin/JVM, JavaScript, C#,
          Python, Swift, or LLVM IR) for production use.
        </li>
        <li>
          <strong>Engine mode:</strong> Inside the Azora engine, code is compiled and executed
          automatically with hot-reload on file changes.
        </li>
      </ul>

      <p className="mt-4 text-az-35">
        Here is a complete example that ties the concepts together:
      </p>

      <CodeBlock title="greet.az">{`package demo

// A greeting function that builds a welcome message
func greet(name: String): String {
    return "Welcome to Azora, $name!"
}

hook onStart() {
    fin message = greet("Developer")
    println(message)
}`}</CodeBlock>
    </Section>
  )
}
