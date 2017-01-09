# cs-react

##Components
Components in React are JavaScript classes that inherit from the React.Component base class...

Every Component needs to include a render() function

##JSX
JSX = JavaScript XML
Common to map arrays to map arrays to JSX elements
<div>
    <h3>Stories App</h3>
    <p className="lead">
        Current time: {now.toTimeString()} //Any code written in curly braces gets interpreted as literal JavaScript
    </p>
</div> //this JSX becomes... React.createElement('div', null, 'Story Box')


##Props
They look just like HTML attributes...

Passing props...
<Comment author="Morgan McCircuit" body="Great Picture!" />

Receiving props...
<p className="comment-header">{this.props.author}</p>


##Dynamic Props - Passing Dynamic Arguments

##Component State
Two ways of manipulating the dome...
1) Direct DOM Manipulation: jQuery, etc.
2) Indirect DOM manipulation: React

In React, we don't modify the DOM directly. Instead, we modify a component state object in response to user events and let React handle updates to the DOM.

The 'state' is a JS object that lives inside each component. We can access it via 'this.state'.

to set state...
not this: this.state.showComments = true;
instead, do this: this.setState({showComments: true})

these things and more can cause state change...
Button clicks,
link clicks,
form submissions,
ajax requests,
more!