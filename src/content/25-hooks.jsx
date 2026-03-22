import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function Hooks() {
  return (
    <Section id="hooks" title="Hooks">
      <p className="mt-2 text-az-35">
        Hooks are lifecycle entry points in Azora applications. They run in a suspendable
        context, meaning they can use <code className="text-az-primary">suspend</code>,{' '}
        <code className="text-az-primary">async</code>/<code className="text-az-primary">await</code>,
        and <code className="text-az-primary">launch</code> directly. Hooks require
        the <code className="text-az-primary">@file:script(hooks = true)</code> decorator at the top of the file.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">29.1 The onStart Hook</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">onStart</code> hook is the main entry point of an Azora
        application, equivalent to <code className="text-az-primary">main</code> in other languages. It runs
        once when the application launches and completes fully before any other hook executes.
      </p>
      <CodeBlock>{`@file:script(hooks = true)
package myapp

hook onStart() {
    println("Application started")
    // Load assets, initialize state, connect services
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">onUpdate</code> hook runs on every frame or tick after{' '}
        <code className="text-az-primary">onStart</code> has completed. Use it for game loops, polling, or
        any repeated logic.
      </p>
      <CodeBlock>{`hook onUpdate() {
    // Read input, update world, render frame
    println("Frame update")
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">29.2 Hook Syntax</h3>
      <p className="mt-2 text-az-35">
        Declare a hook with the <code className="text-az-primary">hook</code> keyword followed by the hook
        name, an empty parameter list, and a body block. Hooks are invoked automatically by the
        runtime, not called from user code.
      </p>
      <CodeBlock>{`hook onStart() {
    // runs once at launch
}

hook onUpdate() {
    // runs every frame/tick
}`}</CodeBlock>
      <p className="mt-2 text-az-35">Rules:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="text-az-primary">onStart</code> completes fully before the first <code className="text-az-primary">onUpdate</code> call</li>
        <li>Hooks cannot have <code className="text-az-primary">expose</code> applied to them</li>
        <li>Hooks take no parameters and return no value</li>
        <li>Each hook name can appear at most once per file</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">29.3 Hooks and the Async Context</h3>
      <p className="mt-2 text-az-35">
        Every hook body runs inside a suspendable context. You can
        use <code className="text-az-primary">suspend</code>, <code className="text-az-primary">async</code>,{' '}
        <code className="text-az-primary">await</code>, and <code className="text-az-primary">launch</code>{' '}
        directly without special wrappers.
      </p>
      <CodeBlock>{`hook onStart() {
    // Suspend for 100 milliseconds
    suspend 100

    // Launch concurrent tasks
    fin a = async { loadTextures() }
    fin b = async { loadSounds() }

    // Wait for both to finish
    await(a)
    await(b)

    println("All assets loaded")
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Factor complex initialization into separate tasks
        that you <code className="text-az-primary">await</code> inside <code className="text-az-primary">onStart</code>, and
        factor frame logic into focused functions called from <code className="text-az-primary">onUpdate</code>.
      </p>
      <CodeBlock>{`@file:script(hooks = true)
package mygame

task loadWorld(): World {
    suspend 50
    return World(width: 100, height: 100)
}

hook onStart() {
    fin world = await loadWorld()
    println("World loaded: " + world.width.toString())
}

hook onUpdate() {
    // Keep frame logic thin, delegate to functions
    processInput()
    updatePhysics()
    render()
}`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: When targeting Kotlin, <code className="text-az-primary">hook onStart()</code> compiles
        to <code className="text-az-primary">fun main()</code> and{' '}
        <code className="text-az-primary">hook onUpdate()</code> compiles
        to <code className="text-az-primary">fun onUpdate()</code>.
      </p>
    </Section>
  )
}
