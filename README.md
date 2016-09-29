# Sprinkles 🍩

Sprinkles makes your browser more developer friendly. It extends built-in JavaScript objects to make them more useful and provides generic CSS utility classes that you'd want on every project.

If you've used [Ruby on Rails] you're probably familiar with [ActiveSupport]. Sprinkles does to browser-based JavaScript what ActiveSupport does to Ruby. Sprinkles makes it easier to work with arrays, cookies, dates, query string parameters, local storage, and other parts of your browser that might be a bit prickly at times.

---

# Installation

Pop open the `dist` folder in the project root and grab the latest version. Minified versions are there if you need them. Currently Sprinkles clocks in at a whopping 4.6 KB.

---

# Documentation

## Table of Contents

* JavaScript
  * [Arrays](#arrays)
  * [Cookies](#cookies)
  * [Dates](#dates)
  * [Nodes](#nodes)
  * [Numbers](#numbers)
  * [Objects](#objects)
  * [Query String Params](#query-string-params)
  * [AJAX](#ajax)
* CSS
  * [Cursor](#cursor)
  * [Display](#display)
  * [Float](#float)
  * [Lists](#lists)
  * [Opacity](#opacity)
  * [Position](#position)
  * [Print](#print)
  * [Type](#type)

## JavaScript

Sprinkles works by adding functions and properties to existing objects. This kind of [monkey patching] is generally considered bad practice but it is often syntactically superior (think `$.each([])` vs. `[].forEach()`). So to get the best of both worlds, Sprinkles prefixes any methods or properties it adds to built-in objects with a "$" to differentiate them from any native methods the client may have.

### Arrays

#### `Array.prototype.$flatten()`

Collapse an array of arrays into a new one-dimensional array.

``` js
[["vanilla"], ["chocolate"], ["strawberry"]].$flatten();
// => ["vanilla", "chocolate", "strawberry"]
```

#### `Array.prototype.$groupBy()`

Group an array by the results of a function applied to each item.

``` js
["cream", "fudge", "caramel"].$groupBy(function(topping) {
  return topping.length;
});
// => { 5: ["cream", "fudge"], 7: ["caramel"] }
```

### Cookies

Working with cookies isn't very fun if all you have is `document.cookie`. Sprinkles makes managing cookies a little easier.

Sprinkles always assumes the path on all your cookies is `/` and does not (yet) support cookies that specify `domain`, `max-age`, `expires`, or `secure`.

#### `document.$cookies.set()`

Write a cookie by name and value.

``` js
document.$cookies.set("flavor", "mint chocolate chip");
// => "mint chocolate chip"
```

#### `document.$cookies.get()`

Read the value of a cookie by name.

``` js
document.$cookies.set("flavor", "vanilla");
document.$cookies.get("flavor");
// => "vanilla"
```

#### `document.$cookies.remove()`

Delete a cookie by name. Returns the value of the cookie, just in case.

``` js
document.$cookies.set("flavor", "chocolate");
document.$cookies.remove("flavor");
// => "chocolate"
```

#### `document.$cookies.clear()`

Deletes all cookies.

``` js
document.$cookies.clear();
```

### Dates

Manipulating dates in JavaScript can be a real chore. Sprinkles extends the Date class with a few helpful properties.

#### `Date.prototype.$beginningOfDay`

Returns a new date with the time set to the beginning of the day (0:00).

#### `Date.prototype.$endOfDay`

Returns a new date with the time set to the end of the day (23:59:59).

#### `Date.prototype.$beginningOfMonth`

Returns a new date with the date set to the 1st and the time set to the beginning of the day (0:00).

#### `Date.prototype.$endOfMonth`

Returns a new date with the date set to the last day of the month and the time set to the end of the day (23:59:59).

#### `Date.prototype.$tomorrow`

Returns a new date with the date set to one day into the future. The time remains unchanged.

#### `Date.prototype.$yesterday`

Returns a new date with the date set to one day into the past. The time remains unchanged.

#### `Date.prototype.$monthName`

Returns the name of the month in English.

#### `Date.prototype.$dayName`

Returns the name of the day in English.

### Nodes

#### `Node.prototype.$removeChildren()`

Removes all the children of the current node or element effectively emptying its contents. It's the equivalent to `el.innerHTML = ""` (gross) or repeatedly calling `removeChild()` (tedious).

``` js
var ul = document.querySelector("ul");
ul.$removeChildren();
```

### Numbers

#### `Number.prototype.$ordinalize()`

Returns an ordinal string used to denote order (e.g., 1st, 2nd, 3rd).

``` js
var n = 42;
n.$ordinalize();
// => "42nd"
```

[inf]: http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html

### Objects

#### `Object.prototype.$forEach()`

In Ruby, looping over an array or looping over a hash is very similiar—you call the same method, `each()`. The difference is the signature of the callback function. For an array, the callback receives one primary argument (each item in the aray); for a hash, the callback receives two arguments (each key and value).

``` js
var object = { scoops: 1, flavor: "vanilla", sprinkles: true },
    keys   = [],
    values = [];

object.$forEach(function(key, value) {
  keys.push(key);
  values.push(value);
})

// keys => ["scoops", "flavor", "sprinkles"]
// values => [1, "vanilla", true]
```

#### `Object.prototype.$try()`

Try to access a property or call a function of an object that might be `undefined`. Helps to avoid writing conditional statements.

``` js
// Instead of this...
if (iceCream.addToppings) iceCream.addToppings("caramel", "coconut", "cream");
// Try this...
iceCream.$try("addToppings", "caramel", "coconut", "cream");
```

### Query String Params

#### `Sprinkles.QueryString.parse()`

Returns an object representing the query string params from any URL. Also works on query string fragments too like `window.location.search`.

``` js
Sprinkles.QueryString.parse("http://icecreamfinder.com/?flavor=strawberry&location=san%20francisco");
// => { "flavor": "strawberry", "location": "san francisco" }
```

#### `window.location.$params`

Returns an object representing the query string params from `window.location.search`. Pair with `forEach()` to loop through URL parameters.

``` js
// Assume window.location = "http://icecreamfinder.com/?flavor=strawberry
window.location.$params
// => { "flavor": "strawberry" }
window.location.$params["flavor"]
// => "strawberry"

window.location.$params.$forEach(function(key, value) {
  // Loop through every parameter
})
```

### AJAX

#### `$get()`

Perform an HTTP GET request to a specified resource and call the appropriate callback when the request is complete.

``` js
$get("http://api.icecreamfinder.com/stores.csv", success, error);

function success(response) {
  // Handle the success...
};

function error(response) {
  // Handle the error...
};
```

#### `$getJSON()`

Just like `$get()` but the response is parsed as JSON before the success or error callbacks are called.

## CSS

Sprinkles' CSS utilities are helpful for two reasons.

When building up a webpage from scratch, it's often easiest to start with inline styles. With inline styles, at least to start, you get something working quickly. Then you can go back and reorganize things later. The CSS utilities in Sprinkles allow you to mix and match classes to apply basic styles to elements without having to actually write any CSS.

The CSS utilities here also help reduce the amount of one-off CSS rules in your stylesheets. If the heading of one special page should be centered, writing `<h1 class="align-center">` is better than adding a special rule to your CSS file. This is especially true on larger sites, where a mistargeted selector could have unintended consequences for other pages.

Although not indicated below, all the CSS properties applied by the utilities here are considered `!important` to avoid specificity issues.

### Cursor

``` css
.pointer { cursor: pointer; }
```

Note: If you'd like to see the other cursor types implemented in Sprinkles, please create an issue.

### Display

For the most part, you can show/hide elements by adding/removing `.hide`. However, if an element is already hidden due to other CSS rules, you can add `.show` to make it appear.

``` css
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.hide { display: none; }
.show { display: inherit; }
```

### Float

Float an element to the left or to the right, unless used in conjunction with `.fixed` or `.absolute`, in which case no floating will occur.

``` css
.left { float: left; }
.right { float: right; }
```

### Lists

``` css
ul.unstyled,
ol.unstyled {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

### Opacity

``` css
.opaque { opacity: 1; }
.transparent { opacity: 0; }
```

### Position

``` css
.fixed { position: fixed; }
.relative { position: relative; }
.absolute { position: absolute; }

.top { top: 0; }
.right { right: 0; }
.bottom { bottom: 0; }
.left { left: 0; }

.full-bleed {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

### Print

Hide elements for screen but show them for print with `.print-show`. Hide elements for print but show them for screen with `.print-hide`. Use `.print` to unhide an element for print that's otherwise hidden due to other CSS rules. Make sure when including Sprinkles' CSS that you use `<link ... media="all">` or these classes will not work.

``` css
@media screen {
  .print-show { display: none; }
}

@media print {
  .print,
  .print.hide { display: inherit; }

  .print-hide { display: none; }
}
```

### Type

``` css
.bold { font-weight: bold; }

.align-center { text-align: center; }
.align-left { text-align: left; }
.align-right { text-align: right; }
.align-justify { text-align: justify; }

.overline { text-decoration: overline; }
.strikethrough { text-decoration: line-through; }
.underline { text-decoration: underline; }
.no-underline { text-decoration: none; }

.italic { font-style: italic; }
.oblique { font-style: oblique; }

.lowercase { text-transform: lowercase; }
.uppercase { text-transform: uppercase; }
.capitalize { text-transform: capitalize; }

.no-wrap { white-space: nowrap; }
```

---

# Development

## Environment

Sprinkles uses [Grunt][grn] to run development-oriented tasks. Grunt relies on [Node Packaged Modules][npm] (NPM). You can install NPM with [Homebrew][hmb]. With NPM installed and from inside the Sprinkles project root run:

``` sh
npm install
```

This is the Ruby equivalent of running `bundle install`. You can run tasks individually if you must but the default task, which is available simply by calling `grunt` should be all you need.

When you're done with a feature, you should [semantically](sem) increment the version number in `package.json` and run `grunt` to update the distribution files.

## Tests

Unfortunately, you cannot run Sprinkles' tests from the command line. This is due to the fact that things like PhantomJS, which usually drive headless tests, are not real browsers. This means that things like `document.cookie` and `window.location` don't behave like you'd expect. It seems sensible that running tests in-browser takes priority over running them from the command line so for now to run them boot up Sprinkles in web server (e.g., `python -m SimpleHTTPServer 8080`) and hit the test file directly (e.g. http://localhost:8080/test/js/index.html).

Please note there is a separate test file dedicated to testing query strings because if you set `window.location.search` during a test, the browser will reload the page. In a separate file, it's possible to test query string parameters in isolation.

You'll also find a bunch of HTML files in `test/css` that serve as sandboxes to test the CSS classes in isolation.

[grn]: http://gruntjs.com
[npm]: https://www.npmjs.org
[hmb]: http://brew.sh
[sem]: http://semver.org

[ActiveSupport]: https://github.com/rails/rails/tree/master/activesupport
[Ruby on Rails]: http://rubyonrails.org
[monkey patching]: http://www.reddit.com/r/javascript/comments/279ion/sprinkles_the_activesupport_of_vanilla_js/
