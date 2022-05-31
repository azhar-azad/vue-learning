## Component basics
Watch the video on [YouTube](https://youtu.be/wrqjPka7puo) | View the Repository [here](https://bitbucket.org/fbhood/how-to-vuejs/src/master/12-components-basics/)
A component is a reusable block of code, that represents a specific element on the page.
Every web page, web or mobile application can be divided into components, starting from the main sections we can further divide these into smaller bits and make sub-components. Every component is reusable and it's made of a dedicated HTML, CSS, and JavaScript code.
We can use components to organize our code and build complex layouts that are easy maintainable.

Looking at a simple web page, it is usually made of an header, a main content area and a footer. But each of these three pieces can be sub-divided into more smaller parts. For instance an Header can have a main navigation menu, a secondary menu and a hero image, and the same is true for the main and footer areas.

To get started with components we first need to learn how to register them, pass data and, how to use them.

- Register a component (https://vuejs.org/v2/guide/components-registration.html)
- How to use Props (https://vuejs.org/v2/guide/components-props.html)
- How to use Slots (https://vuejs.org/v2/guide/components-slots.html)
- How the Data object works inside a component
- Child Components Events (https://vuejs.org/v2/guide/components-custom-events.html)
- Dynamic Component ( https://vuejs.org/v2/guide/components-dynamic-async.html)


### Register a component
To register a component we need to use the `component` method on the `Vue()` object. After calling this function we need to define a template property with some markup specific to the component.
```js
Vue.component('component-name', {
    // component properies here
});
```
every component needs to have a template property at least, without it a component doesn't make much sense.

So the next step is to define a template property and pass to it a string literal with some HTML tag
```js
Vue.component('test-component', {
    // component properies here
    template: `<p>I am a component</p>`

});
```
Now we can use our component multiple times inside our main HTML file by using its name as it was a standard HTML tag.

```html
<div id="app">
  <test-component></test-component>
</div>

```
However, our component will render always the same content, `I am a component`. Let's make it more useful and following our tweets example build a tweet message component.

```js

Vue.component('tweet-message', {
   
    template: `
       <div>
           <p> Tweet text goes here </p>
           <p> Date of the tweet goes here</p>
       </div>
    `
});
```

OK, now that we have the base for our component we need to actually pass data to it.
One thing to notice here is that every component requires a single root element inside the
template property. Therefore, since we have two paragraphs we wrapped them inside a div that will be considered the root element of our component. Inside it, we can put whatever we want to
build our custom component.

Let's move to the next step and pass some data to the component.

### How to use Props
Docs: [https://vuejs.org/v2/guide/components-props.html]

Now, given what we learned so far, we want to pass data to our component like we did previously to bind data between the Vue instance and the markup file via the mustache syntax. However, with components things work a bit differently. We use props to create a binding between our component and its template.

The `props` property can be defined as an array or as an object.
When used as an array, we can specify the properties as strings inside the array and, these can later be used inside the component like we usually do.

When we use an object we can pass the prop as the key and its type as the value,
that will help making sure that the exact data type is passed to our component.

Let's see an example of that.

Example of props as an Array:
```js
Vue.component('tweet-message', {
    props: ['text', 'date']
    template: `
       <div>
           <p> {{text}} </p>
           <p> {{date}}</p>
       </div>
    `
});

```
Use props as an object where the key is the property and the value is its type:
```js
Vue.component('tweet-message', {
    props: {
        text: String,
        date: String
    }
    template: `
       <div>
           <p> {{text}} </p>
           <p> {{date}}</p>
       </div>
    `
});
```

Once we have defined our properties we can use the them as HTML attributes and pass them the
data we want our component to render onto the page.
For instance, we can use the component above to show a bunch of tweets using our newly created component.

```html
    <!-- Manually pass the data to the tweet message component -->
    <tweet-message text="This is a component" date="25/12/2020"></tweet-message>
    <tweet-message text="This another component" date="26/12/2020"></tweet-message>
    <tweet-message text="This another component" date="27/12/2020"></tweet-message>
    <!-- Pass a javascript expression to the date property of the tweet message component -->
    <tweet-message text="This another component" :date="new Date().toLocaleString()"></tweet-message>
```
Obviously, the first examples will render the string we passed between quotes, however,
to render the computed result of the new Date() instance we will need to use the v-bind directive
so that its content is interpreted as JavaScript code.

### The Data property inside components
So far we have seen that we can bind data by defining properties inside the `data` object on a Vue instance.
When working with components the data object is not available as an object but
as a function, this function can return an object with properties, this will make
each component's instance unique and independent from the other.

Following our previous example, lets add a couple of CSS classes to our component
First we will edit our component template and bind the class attribute to a data property then
we will create our data object.

```js
Vue.component('tweet-message', {
    props: {
        text: String,
        date: String
    }
    template: `
       <div :class="tweetBoxWrapper">
           <p> {{text}} </p>
           <p :class="dateClass"> {{date}}</p>
       </div>
    `
});

```
Now our template will look for two data properties, `tweetBoxWrapper` and `dateClass` that we can later use inside our CSS to add some style to our elements. Let's add the data function now.

```js
Vue.component('tweet-message', {
    props: {
        text: String,
        date: String
    }
    template: `
       <div :class="tweetBoxWrapper">
           <p> {{text}} </p>
           <p :class="dateClass"> {{date}}</p>
       </div>
    `,
    data(){
        return {
            // Data properties go here
            tweetBoxWrapper: "tweet-message",
            dateClass: "tweet-date",
        }
    }
});

```
Another thing we can do is to define a data property and use it inside our template, for instance to show dynamically the current date. We can define a now property and use it in the template like we previously did with the `date` property

```js

Vue.component('tweet-message', {
    props: {
        'text': String,
        
    },
     template: `
       <div :class="tweetBoxWrapper">
           <p> {{text}} </p>
           <p :class="dateClass">{{now}}</p>
           
       </div>
       
    `,
    data(){
        return {
            tweetBoxWrapper: "tweet-message",
            dateClass: "tweet-date",
            now: new Date().toDateString(), // 3 
            
        }
    }

    
});


```
In the example above we have used both `props` and `data`. The prop `text` can be used as an attribute when we use our component ` <tweet-message text="This is a component"></tweet-message>` while the properties we returned in the `data` method are bound to the template and will render the information we specify right there in the data method.

When inside the data method we need to remember that props defined here are accessible using the `this` keyword.
So if we want to store the value of the text prop inside a property in the data object we can grab it like that:

```js
Vue.component('tweet-message', {
    props: {
        'text': String,
        
    },
     template: `
       <div :class="tweetBoxWrapper">
           <p> {{text}} </p>
           <p :class="dateClass">{{now}}</p>
           
       </div>
       
    `,
    data(){
        return {
            tweetBoxWrapper: "tweet-message",
            dateClass: "tweet-date",
            now: new Date().toDateString(), 
            message: this.text
        }
    }

    
});
```
Next we will learn about slots.

### Use of slots
There are situations when we just don't know or want to strictly define what goes inside a component and we might want to let the user decide its content when our component is used.
In such cases we can use slots when we declare the template of our component.
Let's imagine that we have another component that we want to use to divide tweets in different sections.

```js
Vue.component('tweet-section', {
    props: {
        'title': String,
        
    },
     template: `
        <div class="tweet_section">
            <h2>{{title}}</h2>
           <slot></slot>
       </div>  
    `    
});

```
Our new component can be as simple as that, a div with a class tweet_section, an `h2` that binds to a prop and a slot. The slot means that inside our component we can put whatever we want, nest other elements and even other components.

```html

<tweet-section title="Latest Tweets">
    <tweet-message text="This is my first tweet"></tweet-message>
    <tweet-message text="This is my second tweet"></tweet-message>
    <tweet-message text="This is my third tweet"></tweet-message>
    <tweet-message text="This is my fourth tweet"></tweet-message>

</tweet-section>
<tweet-section title="Most popular">
    <h3>Trendy in IT</h3>
    <tweet-message text="This is a very popular tweet"></tweet-message>
    <tweet-message text="This is another popular tweet"></tweet-message>
</tweet-section>

```
We barely scratched the surface, but with what we know we can already modify our simple_twitter application to use components. Along the way we will also learn how events work inside components. I'll see you in the next video. In the mean time remember 


