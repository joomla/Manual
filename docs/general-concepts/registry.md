---
title: Registry
---

The Joomla Registry class (\Joomla\Registry\Registry in 
libraries/vendor/joomla/registry/src/Registry.php)
is a very useful utility class for manipulating the 
JSON strings and PHP associative arrays which appear frequently within Joomla.

For example, parameters are often held in database fields as JSON strings,
but in PHP code it's easier to manipulate them as associative arrays.
Registry provides an easy mechanism to convert between them.

More generally, Registry provides an indexed key-value data store
and an [API](framework-api://classes/Joomla-Registry-Registry.html)
for importing/exporting this data to several formats.

The Joomla Registry github project is at [Registry project on github](https://github.com/joomla-framework/registry).

This documentation page covers only the main features of Registry 
which are commonly used within Joomla. 

:::warning
  If you're browsing Joomla code, then (particularly in Extension classes)
  you may find references to Registry, but which refer to \Joomla\CMS\HTML\Registry.
  This is a completely different class!
::: 

## Loading a Registry

You can load a Registry from a variety of data formats.
The following all have the same outcome.

```php
use Joomla\Registry\Registry;

$registry = new Registry();

// load from a JSON string
$registry->loadString('{"a" : 1, "b" : "foo"}');

// load from a PHP associative array
$array = ['a' => 1, 'b' => "foo"];
$registry->loadArray($array);

// load from a PHP stdclass
$obj = new \stdClass();
$obj->a = 1;
$obj->b = "foo";
$registry->loadObject($obj);
```

The examples above use values which are integer or string,
but Registry allows you to specify any PHP object as a value.

You can also load a Registry by passing the data in the constructor, for example:

```php
use Joomla\Registry\Registry;

$array = ['a' => 1, 'b' => "foo"];
$registry = new Registry($array);
```

## Getters and Setters

### get

You can access individual elements using `get` 
or [PHP array access](https://www.php.net/manual/en/class.arrayaccess.php):

```php
$a = $registry->get("a");
// or
$a = $registry["a"];
```

If the key does not exist then `null` is returned. 

You can pass a second parameter to `get` to define a default,
which is returned if the key is not present or is set to null:

```php
$d = $registry->get("d", "a default string");
```

### set

Use `set` to set a value against a key. 
If the key already exists then its value will be overridden.

```php
$registry->set("c", "bar");
```

If you don't wish to override an existing value then use `def`:

```php
$registry->set("c", "bar");
$registry->def("c", "something else");
echo $registry["c"]; // outputs "bar"
```

The code `$registry->def("c", "some value");` sets to "some value" the value of the key "c"

- if the key "c" doesn't exist, or,

- if the key "c" has a null value.

## Utility methods

### exists

Use `exists` to check if a key exists in the Registry:

```php
$exists = $registry->exists("a");
```
:::warning
  If the value of a key has been set to `null`, then `exists` returns `false`:
:::

```php
$registry->set("x", null);
$exists = $registry->exists("x");
echo ($exists ? "Exists" : "Doesn't exist");   // outputs Doesn't exist
```

### count

Use `count` to find the number of key-value pairs in the Registry

```php
$n = $registry->count();
```

If there are entries where the value of a key has been set to `null`
then these are included in the count.

### Iterating

To get an iterator use the `getIterator` method.
You can then cycle through the elements using `foreach`:

```php
$iterator = $registry->getIterator();
foreach ($iterator as $key => $value) {
    ...
}
```

Elements which have a `null` value are included within the iteration.

### remove

To remove a key-value pair from the Registry object use `remove`, passing the key:

```php
$registry->remove("a");
```

## Export

You can export the data in a Registry to an associative array, a JSON string or a `stdclass` object:

```php
$arr = $registry->toArray();    // to an associative array
$str = $registry->toString();   // to a JSON string
$obj = $registry->toObject();   // to a stdclass object
```

## Merging

You can merge 2 Registry instances, 
but you have to take care if the instances have matching keys,
as the values in one Registry will overwrite the values in the other.

```php
$arr1 = ["a" => 1, "b" => 2];
$reg1 = new Registry($arr1);
$arr2 = ["b" => "foo", "c" => "bar"];  // matching entry with key "b"
$reg2 = new Registry($arr2);
$reg1->merge($reg2);
echo $reg1->toString();  // outputs {"a":1,"b":"foo","c":"bar"}
```

The value of the entry for key "b" in `$reg1` has been overwritten. 

## Multidimensional

Registry can support multidimensional structures, like arrays of arrays.

These can arise within Joomla if you have a form which includes
fields with the `multiple` attribute, 
or [`subform`](./forms-fields/standard-fields/subform.md) fields. 

For example, the [Maps Package](../building-extensions/modules/module-examples/map-module.md#maps-package) 
contains a [maps module](https://github.com/joomla/manual-examples/tree/main/package-example-maps/constituents/mod_example_maps)
which displays a map. 
The config defined in the manifest file allows the administrator 
to define the position and zoom level of the map, 
together with a number of marker pins.

So the params will be in the form of a multidimensional array,
which can be loaded into a Registry, like:

```php
$map = ["lat" => "54.2", "long" => "-6.0", "zoom" => "12",
        "pins" => ["pins0" => ["pinlat" => "54.17982", "pinlong" => "-5.92094"],
                   "pins1" => ["pinlat" => "54.17928", "pinlong" => "-5.94742"]]];
$registry = new Registry($map);
```

The functions described above work in a similar way to the case of single dimensions,
but items are identified using a path, which is a concatenation of the keys descending the structure.

Using the above example:

```php
$location0 = (array) $registry->get("pins.pins0"]; // returns the array of pins0
$lat0 = $registry->get("pins.pins0.pinlat"];       // returns "54.17982"
```

The `count` method returns the number of elements at the top level, 
so using the above example:

```php
echo $registry->count();   // outputs 4
```

Within the `merge` method the `recursive` parameter controls how the merging is done:

- if `recursive` is false then only the top level is considered

- if `recursive` is true then the merging is performed at the lowest possible level.

To see the difference, consider a Registry similar to the above, 
but with "pins1" and "pins2" used instead of "pins0" and "pins1":

```php
$map2 = ["lat" => "54.0", "long" => "-6.0", "zoom" => "13",
        "pins" => ["pins1" => ["pinlat" => "54.17", "pinlong" => "-5.94"],
                   "pins2" => ["pinlat" => "54.3", "pinlong" => "-5.93"]]];
$registry2 = new Registry($map2);
```

With `recursive` set to false, the `merge` causes the value of the "pins" key to be overwritten:

```php
$registry->merge($registry2, false);
print_r($registry["pins"]);
// output is
Array ( [pins1] => Array ( [pinlat] => 54.17 [pinlong] => -5.94 ) 
        [pins2] => Array ( [pinlat] => 54.3 [pinlong] => -5.93 ) )
```

With `recursive` set to false, the structure below the "pins" key is traversed,
and the merge performed at a lower level:

```php
$registry->merge($registry2, false);
print_r($registry["pins"]);
// output is
stdClass Object ( 
    [pins0] => stdClass Object ( [pinlat] => 54.17982 [pinlong] => -5.92094 ) 
    [pins1] => stdClass Object ( [pinlat] => 54.17 [pinlong] => -5.94 ) 
    [pins2] => stdClass Object ( [pinlat] => 54.3 [pinlong] => -5.93 ) ) 
```

Note also that the type of the entry is changed from array to stdclass object.
This may be a bug, so be warned when this feature!