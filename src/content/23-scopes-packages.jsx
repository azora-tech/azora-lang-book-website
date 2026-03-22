import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ScopesPackages() {
  return (
    <Section id="scopes-packages" title="Scopes & Packages">
      <p className="mt-2 text-az-35">
        Azora provides <code className="text-az-primary">package</code> declarations for grouping files into
        modules, and <code className="text-az-primary">scope</code> blocks for grouping related declarations
        within a file. Together they form a hierarchical namespace system that prevents naming
        collisions and makes dependencies explicit.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.1 Package Declaration</h3>
      <p className="mt-2 text-az-35">
        Every source file begins with a <code className="text-az-primary">package</code> declaration. The
        name is a dot-separated identifier establishing the file's place in the module hierarchy.
        Files in the same package can reference each other's declarations without explicit imports.
      </p>
      <CodeBlock>{`package demo
package std.math
package game.engine.renderer`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.2 Scope Declaration (namespacing)</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">scope</code> is a named namespace that groups related declarations.
        Scopes are not types and cannot be instantiated. They organize variables, constants, and
        functions into logical units.
      </p>
      <CodeBlock>{`scope media {
    var a: Real = 3.14
    fin PI = 3.14159265358979
    func square(x: Int): Int = x * x
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Members are accessed using the <code className="text-az-primary">::</code> operator:
      </p>
      <CodeBlock>{`var x = media::a
var squared = media::square(5)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.3 Nested Scopes</h3>
      <p className="mt-2 text-az-35">
        Scopes can be nested to any depth. Access nested members by chaining
        with <code className="text-az-primary">::</code>.
      </p>
      <CodeBlock>{`scope std {
    scope math {
        fin PI = 3.14159265358979
        fin E = 2.71828182845905
    }
    func lerp(a: Real, b: Real, t: Real): Real = a + (b - a) * t
}

var pi = std::math::PI
var e = std::math::E
var mid = std::lerp(0.0, 10.0, 0.5)`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.4 Exposed Scopes</h3>
      <p className="mt-2 text-az-35">
        By default, scopes are private to their file. Prefix
        with <code className="text-az-primary">expose</code> to make a scope visible to other files and
        importers.
      </p>
      <CodeBlock>{`expose scope std {
    scope math {
        fin PI = 3.14159265358979
        fin E = 2.71828182845905
    }
    func lerp(a: Real, b: Real, t: Real): Real = a + (b - a) * t
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        All contents of an exposed scope become available to other files that import the package.
        Nested scopes inside an exposed scope are also accessible.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.5 Use and Use Scope (imports)</h3>
      <p className="mt-2 text-az-35">
        <code className="text-az-primary">use</code> imports a package by its dot-separated name.
        <code className="text-az-primary"> use scope</code> imports the members of a specific scope into the
        current namespace, eliminating the need for <code className="text-az-primary">::</code> qualification.
      </p>
      <CodeBlock>{`use std.math                         // package import
use scope std                        // import scope members
use scope std::math                  // import nested scope`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Grouped imports are supported with curly braces:
      </p>
      <CodeBlock>{`use scope std::{math, container}     // grouped import`}</CodeBlock>
      <p className="mt-2 text-az-35">
        After <code className="text-az-primary">use scope std::math</code>, you can
        reference <code className="text-az-primary">PI</code> directly instead
        of <code className="text-az-primary">std::math::PI</code>:
      </p>
      <CodeBlock>{`use scope std::math

var circumference = 2.0 * PI * radius`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Import rules are enforced by the semantic analyzer. Using a type or function from another
        file without the proper <code className="text-az-primary">use</code> statement is a compiler error.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">27.6 Scope Access (:: operator)</h3>
      <p className="mt-2 text-az-35">
        The double-colon operator accesses members of a scope. It works at any depth and is resolved
        entirely at compile time with no runtime overhead.
      </p>
      <CodeBlock>{`var x = media::a
var pi = std::math::PI
var result = std::lerp(1.0, 5.0, 0.5)`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Use qualified <code className="text-az-primary">::</code> access for clarity when referencing
        scoped symbols occasionally. Reserve <code className="text-az-primary">use scope</code> for scopes
        you reference frequently.
      </p>
    </Section>
  )
}
