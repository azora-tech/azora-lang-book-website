import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Table from '../components/Table.jsx'

export default function Trees() {
  return (
    <Section id="trees" title="Trees (Inheritance)">
      <p className="mt-2 text-az-35">
        Trees are Azora's class-like types that support inheritance, method override, sealed
        hierarchies, constructors, destructors, and visibility control. Where packs are simple
        data holders with structural equality, trees are identity-based types with behavior,
        designed for polymorphism and object hierarchies.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.1 Tree Declaration</h3>
      <p className="mt-2 text-az-35">
        Declare a tree with the <code className="text-az-primary">tree</code> keyword followed by a name,
        optional primary constructor parameters, and a body block containing methods, fields,
        properties, and nested types.
      </p>
      <CodeBlock>{`tree Animal(var name: String) {
    func speak(): String {
        return "..."
    }
}

tree Point(var x: Real, var y: Real) {
    func distanceTo(other: Point): Real {
        fin dx = x - other.x
        fin dy = y - other.y
        return sqrt(dx * dx + dy * dy)
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.2 Primary Constructor</h3>
      <p className="mt-2 text-az-35">
        Primary constructor parameters are declared in the tree header. Each parameter
        must be prefixed with <code className="text-az-primary">var</code> (mutable)
        or <code className="text-az-primary">fin</code> (immutable). Every parameter automatically
        becomes a field on the tree instance.
      </p>
      <CodeBlock>{`tree Config(fin name: String, var debug: Bool) {
    func toggleDebug() {
        debug = !debug     // OK: var field
        // name = "x"      // ERROR: fin field is immutable
    }
}

fin cfg = Config("prod", false)
cfg.toggleDebug()
assert cfg.debug == true
assert cfg.name == "prod"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.3 Inheritance</h3>
      <p className="mt-2 text-az-35">
        A tree can extend another tree using <code className="text-az-primary">: ParentName(args)</code> after
        the constructor parameters. The parent constructor arguments are passed in the declaration.
      </p>
      <CodeBlock>{`tree Animal(var name: String) {
    func speak(): String {
        return "..."
    }
}

tree Dog(var breed: String, var name: String) : Animal(name) {
    repl func speak(): String {
        return "Woof!"
    }
}

tree Cat(var indoor: Bool, var name: String) : Animal(name) {
    repl func speak(): String {
        return "Meow!"
    }
}

fin dog = Dog("Labrador", "Rex")
assert dog.speak() == "Woof!"
assert dog.name == "Rex"
assert dog.breed == "Labrador"`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.4 Method Override (repl func)</h3>
      <p className="mt-2 text-az-35">
        Override a parent method with the <code className="text-az-primary">repl func</code> keyword
        (short for "replace"). The overriding method must have the same name and compatible signature.
      </p>
      <CodeBlock>{`tree Shape(var color: String) {
    func area(): Real {
        return 0.0
    }

    func describe(): String {
        return color + " shape"
    }
}

tree Circle(var radius: Real, var color: String) : Shape(color) {
    repl func area(): Real {
        return 3.14159 * radius * radius
    }

    repl func describe(): String {
        return color + " circle with radius " + radius.toString()
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.5 Sealed Trees</h3>
      <p className="mt-2 text-az-35">
        A sealed tree cannot be extended. Use <code className="text-az-primary">seal tree</code> or place
        the <code className="text-az-primary">seal</code> keyword after the tree name to prevent inheritance.
      </p>
      <CodeBlock>{`seal tree Constants(fin pi: Real) {
    // Cannot be extended by any other tree
}

// Also valid: tree Constants seal(fin pi: Real) { }

// tree MyConstants(fin pi: Real) : Constants(pi) { }
// ERROR: Constants is sealed and cannot be extended`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.6 Sealed Methods</h3>
      <p className="mt-2 text-az-35">
        Mark individual methods as sealed with <code className="text-az-primary">seal func</code> to prevent
        child trees from overriding them, while still allowing the tree itself to be extended.
      </p>
      <CodeBlock>{`tree Base(var x: Int) {
    seal func locked(): Int {
        return x * 2
    }

    func open(): Int {
        return x
    }
}

tree Child(var x: Int) : Base(x) {
    // repl func locked(): Int { }   // ERROR: locked is sealed
    repl func open(): Int {           // OK: open is not sealed
        return x + 1
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.7 Base Calls</h3>
      <p className="mt-2 text-az-35">
        Inside an overriding method, call the parent's implementation
        using <code className="text-az-primary">base.methodName()</code>.
      </p>
      <CodeBlock>{`tree Logger(var prefix: String) {
    func log(msg: String) {
        println(prefix + ": " + msg)
    }
}

tree TimestampLogger(var prefix: String) : Logger(prefix) {
    repl func log(msg: String) {
        fin stamped = "[" + timestamp() + "] " + msg
        base.log(stamped)    // calls Logger.log with the stamped message
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.8 The this Keyword</h3>
      <p className="mt-2 text-az-35">
        Inside a tree method, <code className="text-az-primary">this</code> refers to the current instance.
        It is optional for field access (fields are in scope by name) but can be used for
        clarity or disambiguation.
      </p>
      <CodeBlock>{`tree Counter(var count: Int) {
    func increment() {
        count += 1           // implicit this
        this.count += 1      // explicit this (same effect)
    }

    func self(): Counter {
        return this           // return the current instance
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.9 Destructors (dtor)</h3>
      <p className="mt-2 text-az-35">
        A destructor runs when an instance is destroyed (via <code className="text-az-primary">drop</code> or
        scope exit). Declare it with the <code className="text-az-primary">dtor</code> keyword inside
        the tree body. Use it for resource cleanup.
      </p>
      <CodeBlock>{`tree FileHandle(var path: String) {
    func read(): String {
        return readContents(path)
    }

    dtor {
        println("Closing file: " + path)
        // release system resources
    }
}

func example() {
    fin f = FileHandle("/tmp/data.txt")
    fin content = f.read()
    drop f    // explicitly destroys f, runs dtor
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.10 Nested Trees and Inner Trees</h3>
      <p className="mt-2 text-az-35">
        Trees can be nested inside other trees. A regular nested tree is an independent type
        scoped to its parent. An <code className="text-az-primary">in tree</code> (inner tree) has access
        to the enclosing tree's instance.
      </p>
      <CodeBlock>{`tree Outer(var x: Int) {
    // Regular nested tree: independent, no access to Outer's fields
    tree Nested(var y: Int) {
        func value(): Int { return y }
    }

    // Inner tree: has access to Outer's instance
    in tree Inner(var z: Int) {
        func combined(): Int {
            return x + z    // can access Outer's x
        }
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.11 Visibility</h3>
      <p className="mt-2 text-az-35">
        Tree members have three visibility levels, controlled by keywords placed before the member:
      </p>
      <Table
        headers={['Keyword', 'Visibility', 'Description']}
        rows={[
          [<code>expose</code>, 'Public', 'Accessible from anywhere (default)'],
          [<code>protect</code>, 'Protected', 'Accessible from the tree and its children'],
          [<code>confine</code>, 'Private', 'Accessible only within the tree itself'],
        ]}
      />
      <CodeBlock>{`tree Account(var balance: Int) {
    expose func getBalance(): Int {
        return balance
    }

    protect func validateAmount(amount: Int): Bool {
        return amount > 0
    }

    confine func internalLog(msg: String) {
        println("[Account] " + msg)
    }

    func deposit(amount: Int) {
        if validateAmount(amount) {    // OK: same tree
            balance += amount
            internalLog("Deposited")   // OK: same tree
        }
    }
}

tree SavingsAccount(var interest: Real, var balance: Int) : Account(balance) {
    func addInterest() {
        if validateAmount(1) {         // OK: protected, accessible in child
            // internalLog("...")       // ERROR: confine, not accessible in child
        }
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.12 Secondary Constructors</h3>
      <p className="mt-2 text-az-35">
        Secondary constructors provide alternative ways to create an instance. They are declared
        with <code className="text-az-primary">ctor</code> and must delegate to the primary constructor
        using <code className="text-az-primary">: this(args)</code>.
      </p>
      <CodeBlock>{`tree Rect(var width: Real, var height: Real) {
    // Secondary constructor: create a square
    ctor(side: Real) : this(side, side)

    // Confined secondary constructor: internal factory
    confine ctor(scale: Int) : this(scale * 1.0, scale * 1.0)

    func area(): Real {
        return width * height
    }
}

fin square = Rect(5.0)          // uses secondary ctor
assert square.area() == 25.0

fin rect = Rect(3.0, 4.0)      // uses primary ctor
assert rect.area() == 12.0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">37.13 Abstract Methods</h3>
      <p className="mt-2 text-az-35">
        A method declared without a body is abstract. Child trees must override it
        with <code className="text-az-primary">repl func</code>. Abstract methods define a contract
        that subclasses must fulfill.
      </p>
      <CodeBlock>{`tree Serializer(var format: String) {
    // Abstract: no body, must be overridden
    func serialize(data: String): String

    func getFormat(): String {
        return format
    }
}

tree JsonSerializer(var format: String) : Serializer(format) {
    repl func serialize(data: String): String {
        return "{" + '"' + "data" + '"' + ":" + '"' + data + '"' + "}"
    }
}

tree XmlSerializer(var format: String) : Serializer(format) {
    repl func serialize(data: String): String {
        return "<data>" + data + "</data>"
    }
}

fin json = JsonSerializer("json")
assert json.serialize("hello") == "{" + '"' + "data" + '"' + ":" + '"' + "hello" + '"' + "}"
assert json.getFormat() == "json"`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Prefer packs for simple data, specs for shared behavior contracts, and trees only
        when you need inheritance hierarchies with polymorphic method dispatch.
      </p>
    </Section>
  )
}
