import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function BridgeFFI() {
  return (
    <Section id="bridge-ffi" title="Bridge (FFI)">
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">bridge</code> keyword allows Azora code to call functions
        written in other languages. Each bridge block targets a specific platform and maps foreign function
        names to Azora-facing names using the <code className="text-az-primary">as</code> keyword.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">38.1 Bridge Targets</h3>
      <p className="mt-2 text-az-35">
        Azora supports seven bridge targets, each corresponding to a foreign language or runtime:
      </p>
      <ul className="list-disc list-inside mt-2 text-az-35 space-y-1">
        <li><code className="text-az-primary">.C</code>, native C functions (used with LLVM IR target)</li>
        <li><code className="text-az-primary">.OBJC</code>, Objective-C (macOS/iOS)</li>
        <li><code className="text-az-primary">.JVM</code>, Java/Kotlin functions</li>
        <li><code className="text-az-primary">.JS</code>, JavaScript functions</li>
        <li><code className="text-az-primary">.CS</code>, C# static methods</li>
        <li><code className="text-az-primary">.PY</code>, Python functions</li>
        <li><code className="text-az-primary">.SWIFT</code>, Swift functions</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">38.2 Basic Bridge Syntax</h3>
      <p className="mt-2 text-az-35">
        A bridge block declares one or more foreign functions. The <code className="text-az-primary">func foreignName as azName(params): ReturnType</code> syntax
        maps a foreign function to an Azora-callable name.
      </p>
      <CodeBlock>{`bridge .C {
    func sin as az_sin(x: Real): Real
    func cos as az_cos(x: Real): Real
    func sqrt as az_sqrt(x: Real): Real
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        After this declaration, you can call <code className="text-az-primary">az_sin(3.14)</code> in Azora and it
        will invoke the C <code className="text-az-primary">sin</code> function.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">38.3 Dotted Foreign Names</h3>
      <p className="mt-2 text-az-35">
        Many languages use dotted names for namespaced functions. Bridge supports this with dotted foreign names:
      </p>
      <CodeBlock>{`bridge .JS {
    func Math.sin as az_sin(x: Real): Real
    func Math.cos as az_cos(x: Real): Real
    func Math.sqrt as az_sqrt(x: Real): Real
}

bridge .JVM {
    func kotlin.math.sin as az_sin(x: Real): Real
    func kotlin.math.cos as az_cos(x: Real): Real
}

bridge .CS {
    func Math.Sin as az_sin(x: Real): Real
    func Math.Cos as az_cos(x: Real): Real
}

bridge .PY {
    func math.sin as az_sin(x: Real): Real
    func math.cos as az_cos(x: Real): Real
}

bridge .SWIFT {
    func Foundation.sin as az_sin(x: Real): Real
    func Foundation.cos as az_cos(x: Real): Real
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">38.4 Target Annotations</h3>
      <p className="mt-2 text-az-35">
        Bridge blocks are typically paired with <code className="text-az-primary">@target</code> annotations to
        ensure each bridge only compiles for its intended platform. The <code className="text-az-primary">@target</code> annotation
        uses <code className="text-az-primary">CompileTarget</code> enum values.
      </p>
      <CodeBlock>{`@target(.Native)
bridge .C {
    func sin as az_sin(x: Real): Real
}

@target(.WebJs, .WebWasm)
bridge .JS {
    func Math.sin as az_sin(x: Real): Real
}

@target(.KotlinJvm, .Kmp)
bridge .JVM {
    func kotlin.math.sin as az_sin(x: Real): Real
}

@target(.Csharp)
bridge .CS {
    func Math.Sin as az_sin(x: Real): Real
}

@target(.Python)
bridge .PY {
    func math.sin as az_sin(x: Real): Real
}

@target(.Swift)
bridge .SWIFT {
    func Foundation.sin as az_sin(x: Real): Real
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Available compile targets:
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

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">38.5 Wrapping Bridge Functions</h3>
      <p className="mt-2 text-az-35">
        Bridge functions are typically low-level. The convention is to wrap them in an exposed scope
        with a clean public API:
      </p>
      <CodeBlock>{`// Bridge declarations (one per platform)
@target(.Native)
bridge .C {
    func sin as az_sin(x: Real): Real
    func cos as az_cos(x: Real): Real
}

@target(.WebJs)
bridge .JS {
    func Math.sin as az_sin(x: Real): Real
    func Math.cos as az_cos(x: Real): Real
}

// Public API, same for all platforms
expose scope std {
    scope math {
        func sin(x: Real): Real { return az_sin(x) }
        func cos(x: Real): Real { return az_cos(x) }
    }
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Users then call <code className="text-az-primary">std.math.sin(x)</code> without knowing which
        platform bridge is used underneath.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">38.6 Complete Multi-Platform Example</h3>
      <p className="mt-2 text-az-35">
        Here is a complete example showing how to bridge a math function across all platforms:
      </p>
      <CodeBlock>{`@file:experimental
package std.math

@target(.Native)
bridge .C {
    func sqrt as az_sqrt(x: Real): Real
}

@target(.WebJs, .WebWasm)
bridge .JS {
    func Math.sqrt as az_sqrt(x: Real): Real
}

@target(.KotlinJvm, .Kmp)
bridge .JVM {
    func kotlin.math.sqrt as az_sqrt(x: Real): Real
}

@target(.Csharp)
bridge .CS {
    func Math.Sqrt as az_sqrt(x: Real): Real
}

@target(.Python)
bridge .PY {
    func math.sqrt as az_sqrt(x: Real): Real
}

@target(.Swift)
bridge .SWIFT {
    func Foundation.sqrt as az_sqrt(x: Real): Real
}

expose scope std {
    scope math {
        func sqrt(x: Real): Real { return az_sqrt(x) }
    }
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">38.7 Naming Convention</h3>
      <p className="mt-2 text-az-35">
        Bridge functions should use the <code className="text-az-primary">az_</code> prefix for the Azora-facing name.
        This avoids name collisions with user code and makes it clear that the function is a bridge binding.
      </p>
      <CodeBlock>{`// Good: az_ prefix
bridge .C {
    func malloc as az_malloc(size: Int): Int
    func free as az_free(ptr: Int)
}

// Then wrap in a clean API
func allocateMemory(bytes: Int): Int {
    return az_malloc(bytes)
}`}</CodeBlock>
    </Section>
  )
}
