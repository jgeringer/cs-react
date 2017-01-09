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

//Comment Box Component...
class CommentBox extends React.Component{

    //because we want to start with our showComments as hidden, we set our initial state to false
    //In order to create the initial state for a component, we must declare the property this.state as an object in the class constructor function.
    constructor() {
        super();

        this.state = {
            showComments: false
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
                <h3>Comments</h3>
                <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
                <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
                {commentNodes}
            </div>
        )
    }

    //_ underscore: convention that distingushes custom methods from React methods
    _getComments(){
        const commentList = [
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
        ];

        return commentList.map((comment) => { //(comment) = Each element from commentList is passed as an arg
            return (<Comment author={comment.author} body={comment.body} key={comment.id}  />);
            //also good idea to provide a unique key, as seen with the last property. makes for better performance.
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

}

ReactDOM.render(
    <CommentBox />, document.getElementById('CommentBox')
)