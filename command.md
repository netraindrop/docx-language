# Command / Syntax

Some syntax is like javascript, but differs only in keywords and will be translated in javascript and executed as javascript.

## Console / Print Line

```js
Logging(“Message In Here”) # same as python like print
```

## Variable

```js
variable numberVar = 4
constan yourData = { name: "Radit" } 
```

## Condition

```js
if numberVar > 5 {
  Logging(“More than 5”)
} ifels numberVar == 0 {
  Logging(“Is Zero”)
} els {
  Logging(“Less than 5”)
}
```

## Import & Export

```js
// Import
import nextModule
import nextModule as module
import nextModule contain { Manager, MessageType }
// Import
export nextModule
export { Manager, MessageType }
```

## Looping

```js
// Same as in javascript
for(variable a = 0; a < 10; a++) {
  Logging(“I'm Steve”)
}
```

## Function & Async Function

```js
// Sync
func NewFunctionHore(name) {
  Logging(“Your Name: ”+name)
}

NewFunctionHore(“Example”)
```

```js
// Async
func asy FunctionAsync(name) {
  sleep(500) # sleep in 500ms
  return "Yeah!"
}

variable testSync = FunctionAsync(“Example”)
Logging(testSync) # Can use async on global script
```

## Try & Catch

```js
try {
  Logging(x)
} except e { # e variable has optional
  Logging(“An exception occurred”, e)
}
```