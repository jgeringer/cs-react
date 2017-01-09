//In React, we write apps in terms of components

//We use JS classes when decalring React components

//Components are written in upper camel case: PascalCase
class StoryBox extends React.Component{ //Component class inherits from a React base class
    render() {  //every component needs a render() function

        const now = new Date();
        const topicsList = ["HTML", "JavaScript", "React"];

        return(
            <div>
                <h3>Stories App</h3>
                <p className="lead">
                    Current time: {now.toTimeString()}
                </p>
                <ul>
                    { topicsList.map(topic => <li>{topic}</li> )}
                </ul>
            </div> //this JSX becomes... React.createElement('div', null, 'Story Box')
        );
    }
}

//To render a component to a webpage...
ReactDOM.render(
    <StoryBox />, document.getElementById('story-app')
    //args: Invoke StoryBox, then Target contender where the component will render to
    //<StoryBox /> JSX becomes transpiled into ... React.createElement(StoryBox, null)
);