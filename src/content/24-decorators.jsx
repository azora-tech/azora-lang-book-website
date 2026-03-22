import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Decorators() {
  return (
    <Section id="decorators" title="Decorators">
      <p className="mt-2 text-az-35">
        Decorators are compile-time metadata annotations processed by the preprocessor. They attach
        structured information to declarations without affecting runtime behavior. All decorator
        definitions and queries are resolved during preprocessing with zero runtime overhead.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.1 What are Decorators</h3>
      <p className="mt-2 text-az-35">
        Decorators let you annotate declarations (variables, functions, packs) with metadata that
        can be queried at compile time. The decorator itself and
        all <code className="text-az-primary">@Name</code> applications are stripped from the output, so
        they have no runtime cost. They are useful for code generation, conditional compilation,
        serialization markers, and framework-level patterns.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.2 Defining Decorators (deco keyword)</h3>
      <p className="mt-2 text-az-35">
        Declare with the <code className="text-az-primary">deco</code> keyword. A decorator with no fields is
        a marker decorator. A decorator with fields carries structured metadata.
      </p>
      <CodeBlock>{`deco Serializable               // marker decorator (no fields)

deco Range {                    // decorator with fields
    min: Int
    max: Int
}

deco Label {
    text: String
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A marker decorator with empty braces is equivalent to one without braces:
      </p>
      <CodeBlock>{`deco Serializable {}            // same as: deco Serializable`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Add the <code className="text-az-primary">repeatable</code> modifier to allow a decorator to be applied
        multiple times to the same declaration:
      </p>
      <CodeBlock>{`deco Tag repeatable {
    value: String
}

@Tag(value: "a")
@Tag(value: "b")
func foo() {}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.3 Decorator Fields and Defaults</h3>
      <p className="mt-2 text-az-35">
        Decorator fields can have default values. When a default is provided, the field becomes
        optional at the application site. Missing fields without defaults produce a preprocessor
        error. Type mismatches are also caught at compile time.
      </p>
      <CodeBlock>{`deco Version {
    major: Int = 1,
    minor: Int = 0,
    patch: Int = 0
}

@Version(major: 2)
pack MyLib { var x: Int = 0 }
// minor defaults to 0, patch defaults to 0

@Version(major: 3, minor: 5)
pack OtherLib { var y: Int = 0 }
// patch defaults to 0`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.4 Applying Decorators (@Name(field: value))</h3>
      <p className="mt-2 text-az-35">
        Prefix declarations with <code className="text-az-primary">@</code> followed by the decorator name.
        Marker decorators need no arguments. Field decorators use named-argument syntax. Multiple
        decorators can be stacked on the same declaration.
      </p>
      <CodeBlock>{`@Serializable
var health: Int = 50

@Range(min: 0, max: 100)
var health: Int = 50

@Serializable
@Range(min: 10, max: 200)
var mana: Int = 100

@Pure
func add(a: Int, b: Int) { return a + b }

@Entity
pack Player {
    name: String
    health: Int
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Both <code className="text-az-primary">field: value</code> and <code className="text-az-primary">field = value</code> syntax
        are supported for field arguments:
      </p>
      <CodeBlock>{`@Range(min: 0, max: 100)      // colon syntax
@Range(min = 0, max = 100)    // equals syntax`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Applying a non-repeatable decorator twice to the same declaration produces an error.
        Referencing an undeclared decorator name produces an "Unknown decorator" error.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.5 File-Level Decorators (@file:experimental)</h3>
      <p className="mt-2 text-az-35">
        System decorators prefixed with <code className="text-az-primary">@file:</code> control compiler behavior
        for the entire file. They are placed at the very top, before the package declaration.
        Unlike user decorators, they are passed through to the output.
      </p>
      <CodeBlock>{`@file:experimental

package std.math

// The rest of the file...`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">@file:script(hooks = true)</code> decorator enables the hook system
        for a file:
      </p>
      <CodeBlock>{`@file:script(hooks = true)

// Hook declarations are now allowed in this file`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.6 Target Restrictions (deco Name for .Func)</h3>
      <p className="mt-2 text-az-35">
        Use the <code className="text-az-primary">for</code> clause to restrict which declaration types a
        decorator can be applied to. Applying a restricted decorator to the wrong target produces
        a compile-time error.
      </p>
      <CodeBlock>{`deco FuncOnly for .Func

@FuncOnly
func myFunc() {}         // OK

@FuncOnly
pack NotAFunc {}         // ERROR: can only be applied to .Func`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Multiple targets can be specified in a tuple:
      </p>
      <CodeBlock>{`deco Shared for (.Func, .Pack) {}

@Shared
func foo() {}            // OK

@Shared
pack Bar { var x: Int = 0 }    // OK`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Restricted decorators can also have fields:
      </p>
      <CodeBlock>{`deco OnlyForPacks for .Pack {
    serializable: Bool = false
}

@OnlyForPacks
pack MyData { var x: Int = 0 }    // OK`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.7 CT Queries (hasDeco, getDeco)</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">hasDeco(target, DecoratorName)</code> to check whether a decorator
        was applied, and <code className="text-az-primary">getDeco(target, DecoratorName, "fieldName")</code> to
        retrieve a field value. Both are used inside <code className="text-az-primary">inline if</code> blocks
        for conditional code generation.
      </p>
      <CodeBlock>{`deco Serializable
deco Range {
    min: Int
    max: Int
}

@Serializable
@Range(min: 0, max: 100)
var health: Int = 50

inline if hasDeco(health, Serializable) {
    var isSerialized: Bool = true
}

inline if hasDeco(health, Range) {
    var healthMin: Int = getDeco(health, Range, "min")
    var healthMax: Int = getDeco(health, Range, "max")
    // healthMin = 0, healthMax = 100
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Arguments can be passed as strings or bare identifiers:
      </p>
      <CodeBlock>{`// Both forms are equivalent:
hasDeco(health, Serializable)
hasDeco("health", "Serializable")

// getDeco also supports :: syntax for field access:
getDeco(health, Range::min)
getDeco(health, Range, "min")`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">decoTargets("DecoratorName")</code> function returns a list of all
        declarations annotated with the given decorator:
      </p>
      <CodeBlock>{`deco Serializable

@Serializable
pack Foo { var x: Int = 0 }
@Serializable
pack Bar { var y: Int = 0 }

inline fin targets = decoTargets("Serializable")
// targets contains ["Foo", "Bar"]`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The built-in <code className="text-az-primary">@deprecated</code> decorator is always available without
        a <code className="text-az-primary">deco</code> declaration:
      </p>
      <CodeBlock>{`@deprecated(message: "Use newFunc instead")
func oldFunc() {}

// Query it:
inline if hasDeco(oldFunc, "deprecated") {
    // this block is included
}

// Access the message field:
inline fin msg = getDeco(oldFunc, "deprecated", "message")`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">28.8 Block Decorators (@Name &#123; declarations &#125;)</h3>
      <p className="mt-2 text-az-35">
        A decorator can be applied to multiple declarations at once using block syntax. Every
        declaration inside the block receives the decorator. This is equivalent to applying the
        decorator individually to each declaration.
      </p>
      <CodeBlock>{`deco Entity

@Entity {
    pack Player { var hp: Int = 100 }
    pack Enemy { var hp: Int = 50 }
    pack Boss { var hp: Int = 500 }
}

// Equivalent to:
// @Entity
// pack Player { var hp: Int = 100 }
// @Entity
// pack Enemy { var hp: Int = 50 }
// @Entity
// pack Boss { var hp: Int = 500 }

inline if hasDeco(Player, "Entity") {
    func playerIsEntity() {}       // included
}
inline if hasDeco(Enemy, "Entity") {
    func enemyIsEntity() {}        // included
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Block decorators also support field arguments, which are applied uniformly to all
        declarations in the block:
      </p>
      <CodeBlock>{`deco Tag { value: String }

@Tag(value: "important") {
    pack A { var x: Int = 0 }
    pack B { var y: Int = 0 }
}
// Both A and B receive @Tag(value: "important")`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: <code className="text-az-primary">@file:script</code> is placed at the very top of a file,
        before the package declaration. User-defined decorators are placed anywhere in the file
        but must be declared with <code className="text-az-primary">deco</code> before they are applied.
      </p>
    </Section>
  )
}
