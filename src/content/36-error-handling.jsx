import Section from '../components/Section.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

export default function ErrorHandling() {
  return (
    <Section id="error-handling" title="Error Handling">
      <p className="mt-2 text-az-35">
        Azora uses a typed error system based on fail sets. Errors are values, not exceptions.
        Functions declare which errors they can produce in their return type, and callers must
        handle or propagate them explicitly. This design makes error paths visible in the type
        system and eliminates hidden control flow.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">36.1 Fail Sets</h3>
      <p className="mt-2 text-az-35">
        A fail set declares a named group of error variants. Each variant is a distinct error
        case. Declare fail sets at the top level of a file or package.
      </p>
      <CodeBlock>{`fail IOError {
    FileNotFound
    PermissionDenied
    DiskFull
}

fail ParseError {
    InvalidSyntax
    UnexpectedToken
    EndOfInput
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        A function that can fail annotates its return type with <code className="text-az-primary">!</code> followed
        by the fail set name. The syntax <code className="text-az-primary">T!ErrorName</code> means
        "returns T on success, or an ErrorName variant on failure."
      </p>
      <CodeBlock>{`func readFile(path: String): String!IOError {
    if path == "" { throw .FileNotFound }
    if path == "/secret" { throw .PermissionDenied }
    return "file contents"
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">36.2 Returning Errors</h3>
      <p className="mt-2 text-az-35">
        Use <code className="text-az-primary">throw .Variant</code> to return an error from a function
        with a fail type. The variant must belong to the function's declared fail set.
      </p>
      <CodeBlock>{`func safeDivide(a: Int, b: Int): Int!MathError {
    if b == 0 { throw .DivisionByZero }
    return a / b
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The legacy syntax <code className="text-az-primary">return fail .Variant</code> is also
        supported and has the same semantics:
      </p>
      <CodeBlock>{`func safeSqrt(n: Int): Int!MathError {
    if n < 0 { return fail .NegativeRoot }
    return n
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">36.3 Error Propagation (try)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">try</code> keyword propagates errors from a failable
        expression to the enclosing function. If the expression fails, the enclosing function
        immediately returns the same error. The enclosing function must declare a compatible fail type.
      </p>
      <CodeBlock>{`func processFile(path: String): Int!IOError {
    fin content = try readFile(path)    // propagates IOError if readFile fails
    return stringLength(content)
}

// processFile("test.txt") -> 13  (success)
// processFile("")          -> IOError.FileNotFound  (propagated)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        You can chain multiple <code className="text-az-primary">try</code> calls. Any failure propagates
        immediately:
      </p>
      <CodeBlock>{`func validateAndRead(path: String): String!IOError {
    if stringLength(path) == 0 { throw .FileNotFound }
    fin content = try readFile(path)
    return content
}`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">36.4 Error Recovery (catch)</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">catch</code> keyword provides a fallback value when a
        failable expression fails. The result is always non-failable.
      </p>
      <CodeBlock>{`fin content = readFile("missing.txt") catch "default content"
// content == "default content" (readFile failed, fallback used)

fin count = safeDivide(10, 0) catch -1
// count == -1 (division by zero, fallback used)

fin result = safeDivide(10, 2) catch -1
// result == 5 (success, fallback not used)`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Multiple catch chains work independently:
      </p>
      <CodeBlock>{`fin a = safeDivide(1, 0) catch -1     // -1
fin b = readFile("") catch "none"     // "none"
fin c = safeDivide(10, 2) catch -1    // 5`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">36.5 Defer</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">defer</code> statement schedules a block to run when the
        enclosing scope exits, regardless of whether the function succeeds or fails. Use it for
        cleanup operations like closing files, releasing locks, or freeing resources.
      </p>
      <CodeBlock>{`func processData(): [Int]!IOError {
    var log: [Int] = [0]
    defer { log[0] = 99 }
    // ... do work ...
    return log
    // defer block runs here, setting log[0] to 99
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Multiple defers execute in reverse declaration order (last-in, first-out):
      </p>
      <CodeBlock>{`func example() {
    defer { println("first defer") }
    defer { println("second defer") }
    println("body")
}
// Output:
// body
// second defer
// first defer`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">36.6 Rescue Defer</h3>
      <p className="mt-2 text-az-35">
        A <code className="text-az-primary">rescue defer</code> block runs only when the enclosing scope
        exits due to a failure. It does not run on successful returns. Use it for error-specific cleanup.
      </p>
      <CodeBlock>{`func connect(): Connection!NetworkError {
    fin socket = openSocket()
    rescue defer { socket.close() }   // only runs if we fail below

    fin auth = try authenticate(socket)
    return Connection(socket, auth)
    // rescue defer does NOT run on success
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        The immediate <code className="text-az-primary">rescue</code> block (without defer) runs right away
        if the preceding expression failed:
      </p>
      <CodeBlock>{`fin auth = authenticate(socket)
rescue { println("Authentication failed") }`}</CodeBlock>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-az-25">36.7 Guard Statements</h3>
      <p className="mt-2 text-az-35">
        The <code className="text-az-primary">guard</code> statement unwraps a nullable value into a
        non-nullable binding, or exits the scope through the else block. The else block
        must <code className="text-az-primary">return</code>, <code className="text-az-primary">break</code>,{' '}
        <code className="text-az-primary">continue</code>, or <code className="text-az-primary">throw</code>.
        The bound variable is available in the enclosing scope, not nested.
      </p>
      <CodeBlock>{`func getUsername(id: Int): String {
    guard fin user = findUser(id) else {
        return "unknown"
    }
    // user is non-nullable here
    return user.name
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Guard works with both <code className="text-az-primary">fin</code> (immutable)
        and <code className="text-az-primary">var</code> (mutable) bindings:
      </p>
      <CodeBlock>{`func processInput(raw: String?): Int {
    guard var value = raw else { return 0 }
    // value is a mutable, non-nullable String
    value = strTrim(value)
    return stringLength(value)
}`}</CodeBlock>
      <p className="mt-2 text-az-35">
        Guard with an explicit type annotation:
      </p>
      <CodeBlock>{`guard fin token: String = getToken() else {
    throw .Unauthorized
}
// token is a non-nullable String`}</CodeBlock>

      <p className="mt-4 text-sm text-az-50">
        Tip: Prefer <code className="text-az-primary">try</code> for propagation
        and <code className="text-az-primary">catch</code> for recovery. Use{' '}
        <code className="text-az-primary">guard</code> when working with nullable types, not fail sets.
      </p>
    </Section>
  )
}
