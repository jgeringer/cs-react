//common code needed for every component created...
// class NewComponent extends React.Component{
//     render(){
//         return ();
//     }
// }


class Comment extends React.Component{
    render(){
        return (
            //first: replace 'class' with 'className'
            //now this component can be used in JSX, like this... <Comment />
            <div className="comment">                  
                <p className="comment-header">{this.props.author}</p>
                <p className="comment-body">{this.props.body}</p>
                <div className="comment-footer">
                    <a href="#" className="comment-footer-delete" title={`${this.props.author}'s delete comment`}>Delete comment</a>
                </div>
            </div>

        );
    }
}

class CommentForm extends React.Component{
    constructor(){
        super();
        this.state = {
            characters: 0
        }
    }
    render(){
        return(
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <label>Join the discussion</label>
                <div className="comment-form-fields">
                    <input placeholder="Name:" ref={(input) => this._author = input} />
                    <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea} 
                    onKeyUp={this._getCharacterCount.bind(this)}></textarea>
                </div>
                <p>{this.state.characters} characters</p>
                <div className="comment-form-actions">
                    <button type="submit">Post Comment</button>
                </div>
            </form>
        )
    }

    _handleSubmit(event){
        event.preventDefault();
        //populated from refs in JSX
        let author = this._author;
        let body = this._body;

        if(!this._author.value || !this._body.value){
            alert("Please enter your name and comment");
            return;
        }

        this.props.addComment(author.value, body.value);
    }

    _getCharacterCount(){
        this.setState({
            characters: this._body.value.length
        });
    }

}

//Comment Box Component...
class CommentBox extends React.Component{

    //because we want to start with our showComments as hidden, we set our initial state to false
    //In order to create the initial state for a component, we must declare the property this.state as an object in the class constructor function.
    constructor() {
        super();

        this.state = {
            showComments: false,
            comments: [
                {
                    id: 1, 
                    author: 'Morgan McCircuit',
                    body: 'Great picture!'
                },
                {
                    id: 2, 
                    author: 'Bending bender',
                    body: 'Excellent stuff'
                }
            ]
        };
    }

    render(){
        const comments = this._getComments();
        let commentNodes;
        let buttonText = 'Show comments';

        if (this.state.showComments){
            //code for displaying comments
            buttonText = 'Hide Comments';
            commentNodes = <div className="comment-list">{comments}</div>;
        }

        return (
            <div className="comment-box">
                <CommentForm addComment={this._addComment.bind(this)} />
                <h3>Comments</h3>
                <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
                <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
                {commentNodes}
            </div>
        )
    }

    //_ underscore: convention that distingushes custom methods from React methods
    
    _getComments(){
        return this.state.comments.map((comment) => {
            return (
                <Comment author={comment.author} body={comment.body} key={comment.id}  />
            );
        });
    }

    _getCommentsTitle(commentCount){
        if (commentCount === 0){
            return 'No comments yet';
        } else if (commentCount === 1){
            return '1 comment';
        } else{
            return `${commentCount} comments`
        }
    }

    _handleClick(){
        this.setState({
            showComments: !this.state.showComments
        });
    }

    _addComment(author, body){
        const comment = {
            id: this.state.comments.length + 1,
            author,
            body
        };
        this.setState({ 
            comments: this.state.comments.concat([comment])
        });
    }

}

ReactDOM.render(
    <CommentBox />, document.getElementById('CommentBox')
)