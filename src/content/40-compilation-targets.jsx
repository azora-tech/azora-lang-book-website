import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function CompilationTargets() {
  return (
    <Section id="compilation-targets" title="Compilation Targets">
      <p className="mt-2 text-az-35">
        Azora is a multi-target language. The same source code can compile to seven different
        backends, plus a tree-walking interpreter for development and testing. Each target
        translates Azora constructs into idiomatic code for its platform. The{' '}
        <code className="text-az-primary">@target</code> annotation lets you restrict
        declarations to specific platforms when needed.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.1 Overview</h3>
      <p className="mt-2 text-az-35">
        Azora supports the following compilation targets:
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li><strong>JavaScript</strong> (.WebJs), ES6 classes and modules</li>
        <li><strong>Kotlin/JVM</strong> (.KotlinJvm), runs on the Java Virtual Machine</li>
        <li><strong>Kotlin Multiplatform</strong> (.Kmp), shared Kotlin code across platforms</li>
        <li><strong>C#</strong> (.Csharp), .NET classes and methods</li>
        <li><strong>Python</strong> (.Python), Python 3 classes and functions</li>
        <li><strong>Swift</strong> (.Swift), Swift 6.2 classes and protocols</li>
        <li><strong>LLVM IR</strong> (.Native), compiles to native machine code via LLVM</li>
        <li><strong>WebAssembly</strong> (.WebWasm), runs in browsers alongside JS</li>
        <li><strong>Interpreter</strong>, tree-walking execution for development and testing</li>
      </ul>
      <p className="mt-2 text-az-35">
        Without a <code className="text-az-primary">@target</code> annotation, declarations are
        available on all targets. This means most of your code compiles everywhere with no
        extra effort.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.2 The @target Annotation</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">@target</code> annotation restricts a declaration
        to one or more compilation targets. Place it directly before the declaration it applies to.
      </p>
      <CodeBlock>{`// Only available when compiling to LLVM IR (native)
@target(.Native)
func readFile(path: String): String {
    // native file I/O implementation
}

// Available on both JS targets
@target(.WebJs, .WebWasm)
func fetchUrl(url: String): String {
    // browser-based fetch implementation
}

// Available on JVM-based targets
@target(.KotlinJvm, .Kmp)
func connectDatabase(url: String): Connection {
    // JDBC-based implementation
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        All valid target values:
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li><code className="text-az-primary">.Native</code>, LLVM IR / native compilation</li>
        <li><code className="text-az-primary">.KotlinJvm</code>, Kotlin on JVM</li>
        <li><code className="text-az-primary">.Kmp</code>, Kotlin Multiplatform</li>
        <li><code className="text-az-primary">.Python</code>, Python 3</li>
        <li><code className="text-az-primary">.WebJs</code>, JavaScript</li>
        <li><code className="text-az-primary">.WebWasm</code>, WebAssembly</li>
        <li><code className="text-az-primary">.Csharp</code>, C#</li>
        <li><code className="text-az-primary">.Swift</code>, Swift 6.2</li>
      </ul>
      <p className="mt-2 text-az-35">
        Without <code className="text-az-primary">@target</code>, a declaration is compiled for
        every target.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.3 JavaScript Target</h3>
      <p className="mt-2 text-az-35">
        The JavaScript target generates ES6-compatible code. Azora constructs map naturally
        to JavaScript equivalents.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become ES6 classes with constructor parameters</li>
        <li>String interpolation uses JS template literals</li>
        <li>Arrays map directly to JavaScript arrays</li>
        <li>Tests output PASS/FAIL messages to the console</li>
        <li>Enums become frozen object literals</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack User {
    var name: String
    var age: Int
}

fin u = User(name: "Alice", age: 30)
println("Hello, " + u.name + "!")`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated JavaScript (simplified):
      </p>
      <CodeBlock language="javascript">{`class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const u = new User("Alice", 30);
console.log("Hello, " + u.name + "!");`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.4 Kotlin Target</h3>
      <p className="mt-2 text-az-35">
        The Kotlin target generates idiomatic Kotlin code. There are two variants:
        KotlinJvm (targeting the JVM directly) and Kmp (Kotlin Multiplatform for shared code).
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become Kotlin data classes</li>
        <li>Specs map to Kotlin interfaces</li>
        <li>Bridge .JVM maps to direct Kotlin/Java function calls</li>
        <li>fin becomes val, var stays var</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack Point {
    var x: Real
    var y: Real
}

fin p = Point(x: 1.0, y: 2.0)
println("Point: " + p.x as String + ", " + p.y as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Kotlin (simplified):
      </p>
      <CodeBlock language="kotlin">{`data class Point(val x: Double, val y: Double)

val p = Point(1.0, 2.0)
println("Point: " + p.x.toString() + ", " + p.y.toString())`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.5 C# Target</h3>
      <p className="mt-2 text-az-35">
        The C# target generates .NET-compatible C# code.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become C# classes with properties</li>
        <li>Specs map to C# interfaces</li>
        <li>Bridge .CS maps to static method calls</li>
        <li>fin becomes readonly fields</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack Item {
    var name: String
    var price: Real
}

fin item = Item(name: "Widget", price: 9.99)
println(item.name + ": " + item.price as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated C# (simplified):
      </p>
      <CodeBlock language="csharp">{`public class Item {
    public string Name { get; }
    public double Price { get; }
    public Item(string name, double price) {
        Name = name;
        Price = price;
    }
}

var item = new Item("Widget", 9.99);
Console.WriteLine(item.Name + ": " + item.Price.ToString());`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.6 Python Target</h3>
      <p className="mt-2 text-az-35">
        The Python target generates Python 3 code.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become Python classes with <code className="text-az-primary">__init__</code></li>
        <li>Integer division uses <code className="text-az-primary">//</code> for int operands</li>
        <li>Bridge .PY maps to Python function calls</li>
        <li>Operator overloading maps to Python dunder methods</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
pack Rect {
    var width: Int
    var height: Int
}

impl Rect {
    func area(): Int { ref self ->
        self.width * self.height
    }
}

fin r = Rect(width: 10, height: 5)
println(r.area() as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Python (simplified):
      </p>
      <CodeBlock language="python">{`class Rect:
    def __init__(self, width, height):
        self.width = width
        self.height = height

def _impl_area(self):
    return self.width * self.height
Rect.area = _impl_area

r = Rect(10, 5)
print(str(r.area()))`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.7 Swift Target</h3>
      <p className="mt-2 text-az-35">
        The Swift target generates Swift 6.2 code.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Packs become Swift classes</li>
        <li>Specs become Swift protocols</li>
        <li>Tree inheritance maps to class inheritance</li>
        <li>Bridge .SWIFT maps to Foundation and native Swift calls</li>
      </ul>
      <CodeBlock language="azora">{`// Azora source
spec Drawable {
    func draw(): String
}

pack Circle {
    var radius: Real
}

impl Drawable for Circle {
    func draw(): String { ref self ->
        return "Circle with radius " + self.radius as String
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Generated Swift (simplified):
      </p>
      <CodeBlock language="swift">{`protocol Drawable {
    func draw() -> String
}

class Circle: Drawable {
    let radius: Double
    init(radius: Double) { self.radius = radius }
    func draw() -> String {
        return "Circle with radius " + String(describing: self.radius)
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.8 LLVM IR Target</h3>
      <p className="mt-2 text-az-35">
        The LLVM IR target compiles Azora to LLVM Intermediate Representation in text format.
        This is then compiled to native machine code by LLVM. The native target supports the
        full memory management model (alloc, drop, pointers, unsafe blocks, regions).
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Bridge .C maps to C function declarations (extern)</li>
        <li>Low-level pointer operations are fully supported</li>
        <li>Memory management primitives compile to direct LLVM instructions</li>
        <li>Optimized via LLVM optimization passes</li>
      </ul>
      <CodeBlock>{`// Azora source targeting native
@target(.Native)
bridge .C {
    func malloc as az_malloc(size: Int): Int
    func free as az_free(ptr: Int)
    func puts as az_puts(s: String): Int
}

@target(.Native)
func main() {
    var buffer: [Int]* = alloc [Int](32)
    (*buffer)[0] = 42
    drop buffer
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.9 The Interpreter</h3>
      <p className="mt-2 text-az-35">
        Azora includes a tree-walking interpreter that runs your code directly without
        compilation. The interpreter supports all language features and is used for
        development, testing, and the REPL.
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li>Runs all language features without a compilation step</li>
        <li>Executes <code className="text-az-primary">test</code> blocks for the test framework</li>
        <li>Powers the interactive REPL for experimentation</li>
        <li>Useful for rapid iteration during development</li>
      </ul>
      <CodeBlock>{`// Run directly with the interpreter, no build step needed
pack Counter {
    var count: Int = 0
}

impl Counter {
    func increment() { mut self ->
        self.count = self.count + 1
    }
}

test "counter increments correctly" {
    var c = Counter()
    c.increment()
    c.increment()
    assert c.count == 2 { "count should be 2" }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">40.10 Writing Cross-Platform Code</h3>
      <p className="mt-2 text-az-35">
        The typical pattern for cross-platform code is to keep shared logic without
        any <code className="text-az-primary">@target</code> annotation, and provide
        platform-specific implementations using <code className="text-az-primary">@target</code> paired
        with the appropriate <code className="text-az-primary">bridge</code> block. A shared
        public API then wraps the platform-specific calls so that consumers do not need to
        know which backend is in use.
      </p>
      <CodeBlock>{`// Platform-specific bridges
@target(.Native)
bridge .C {
    func clock as az_clock(): Int
}

@target(.WebJs)
bridge .JS {
    func Date.now as az_clock(): Int
}

@target(.KotlinJvm, .Kmp)
bridge .JVM {
    func System.currentTimeMillis as az_clock(): Int
}

@target(.Python)
bridge .PY {
    func time.time_ns as az_clock(): Int
}

@target(.Swift)
bridge .SWIFT {
    func Foundation.Date.timeIntervalSince1970 as az_clock(): Int
}

// Shared API, no @target needed
expose scope std {
    scope time {
        func now(): Int {
            return az_clock()
        }
    }
}

// Consumer code, works on every target
fin timestamp = std.time.now()
println("Current time: " + timestamp as String)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        This layered approach keeps platform details isolated. The bridge declarations
        handle the FFI mapping, the <code className="text-az-primary">@target</code> annotations
        control which bridge compiles on which platform, and the shared scope provides
        a single API that works everywhere.
      </p>

      <p className="mt-4 text-sm text-az-50">
        <strong>Tip:</strong> Start by writing your logic without any <code className="text-az-primary">@target</code> annotations.
        Only add platform-specific code when you need to call into a foreign API. This maximizes
        code reuse across all backends.
      </p>
    </Section>
  )
}
