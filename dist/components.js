"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//common code needed for every component created...
// class NewComponent extends React.Component{
//     render(){
//         return ();
//     }
// }


var Comment = function (_React$Component) {
    _inherits(Comment, _React$Component);

    function Comment() {
        _classCallCheck(this, Comment);

        return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).apply(this, arguments));
    }

    _createClass(Comment, [{
        key: "render",
        value: function render() {
            return (
                //first: replace 'class' with 'className'
                //now this component can be used in JSX, like this... <Comment />
                React.createElement(
                    "div",
                    { className: "comment" },
                    React.createElement(
                        "p",
                        { className: "comment-header" },
                        this.props.author
                    ),
                    React.createElement(
                        "p",
                        { className: "comment-body" },
                        this.props.body
                    ),
                    React.createElement(
                        "div",
                        { className: "comment-footer" },
                        React.createElement(
                            "a",
                            { href: "#", onClick: this._handleDelete.bind(this), className: "comment-footer-delete", title: this.props.author + "'s delete comment" },
                            "Delete comment"
                        )
                    )
                )
            );
        }
    }, {
        key: "_handleDelete",
        value: function _handleDelete(event) {
            event.preventDefault();
            if (confirm('Are you sure you want to delete?')) {
                this.props.onDelete(this.props.comment);
            }
        }
    }]);

    return Comment;
}(React.Component);

var CommentForm = function (_React$Component2) {
    _inherits(CommentForm, _React$Component2);

    function CommentForm() {
        _classCallCheck(this, CommentForm);

        var _this2 = _possibleConstructorReturn(this, (CommentForm.__proto__ || Object.getPrototypeOf(CommentForm)).call(this));

        _this2.state = {
            characters: 0
        };
        return _this2;
    }

    _createClass(CommentForm, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "form",
                { className: "comment-form", onSubmit: this._handleSubmit.bind(this) },
                React.createElement(
                    "label",
                    null,
                    "Join the discussion"
                ),
                React.createElement(
                    "div",
                    { className: "comment-form-fields" },
                    React.createElement("input", { placeholder: "Name:", ref: function ref(input) {
                            return _this3._author = input;
                        } }),
                    React.createElement("textarea", { placeholder: "Comment:", ref: function ref(textarea) {
                            return _this3._body = textarea;
                        },
                        onKeyUp: this._getCharacterCount.bind(this) })
                ),
                React.createElement(
                    "p",
                    null,
                    this.state.characters,
                    " characters"
                ),
                React.createElement(
                    "div",
                    { className: "comment-form-actions" },
                    React.createElement(
                        "button",
                        { type: "submit" },
                        "Post Comment"
                    )
                )
            );
        }
    }, {
        key: "_handleSubmit",
        value: function _handleSubmit(event) {
            event.preventDefault();
            //populated from refs in JSX
            var author = this._author;
            var body = this._body;

            if (!this._author.value || !this._body.value) {
                alert("Please enter your name and comment");
                return;
            }

            this.props.addComment(author.value, body.value);
        }
    }, {
        key: "_getCharacterCount",
        value: function _getCharacterCount() {
            this.setState({
                characters: this._body.value.length
            });
        }
    }]);

    return CommentForm;
}(React.Component);

//Comment Box Component...


var CommentBox = function (_React$Component3) {
    _inherits(CommentBox, _React$Component3);

    //because we want to start with our showComments as hidden, we set our initial state to false
    //In order to create the initial state for a component, we must declare the property this.state as an object in the class constructor function.
    function CommentBox() {
        _classCallCheck(this, CommentBox);

        var _this4 = _possibleConstructorReturn(this, (CommentBox.__proto__ || Object.getPrototypeOf(CommentBox)).call(this));

        _this4.state = {
            showComments: false,
            comments: [] //making array empty since we will be pulling these from an API server.
            // comments: [
            //     { id: 1, author: 'Morgan McCircuit', body: 'Great picture!' },
            //     { id: 2, author: 'Bending bender', body: 'Excellent stuff' }
            // ]
        };
        return _this4;
    }

    _createClass(CommentBox, [{
        key: "render",
        value: function render() {
            var comments = this._getComments();
            var commentNodes = void 0;
            var buttonText = 'Show comments';

            if (this.state.showComments) {
                //code for displaying comments
                buttonText = 'Hide Comments';
                commentNodes = React.createElement(
                    "div",
                    { className: "comment-list" },
                    comments
                );
            }

            return React.createElement(
                "div",
                { className: "comment-box" },
                React.createElement(CommentForm, { addComment: this._addComment.bind(this) }),
                React.createElement(
                    "h3",
                    null,
                    "Comments"
                ),
                React.createElement(
                    "h4",
                    { className: "comment-count" },
                    this._getCommentsTitle(comments.length)
                ),
                React.createElement(
                    "button",
                    { onClick: this._handleClick.bind(this) },
                    buttonText
                ),
                commentNodes
            );
        }

        //_ underscore: convention that distingushes custom methods from React methods

    }, {
        key: "_getComments",
        value: function _getComments() {
            var _this5 = this;

            return this.state.comments.map(function (comment) {
                return React.createElement(Comment, { author: comment.author, body: comment.body, key: comment.id, comment: comment, onDelete: _this5._deleteComment.bind(_this5) });
            });
        }
    }, {
        key: "_getCommentsTitle",
        value: function _getCommentsTitle(commentCount) {
            if (commentCount === 0) {
                return 'No comments yet';
            } else if (commentCount === 1) {
                return '1 comment';
            } else {
                return commentCount + " comments";
            }
        }
    }, {
        key: "_handleClick",
        value: function _handleClick() {
            this.setState({
                showComments: !this.state.showComments
            });
        }
    }, {
        key: "_addComment",
        value: function _addComment(author, body) {
            var comment = {
                id: this.state.comments.length + 1,
                author: author,
                body: body
            };
            this.setState({
                comments: this.state.comments.concat([comment])
            });

            //commenting this out since we don't have a server, but if we did, this is what we would do to add a comment.
            // const comment ={ author, body };

            // $.post('/api/comments', {comment})
            //     .success(newComment => {
            //         this.setState({ comments: this.state.comments.concat([newComment]) });
            // });
        }
    }, {
        key: "_deleteComment",
        value: function _deleteComment(comment) {
            //for real api...
            // $.ajax({
            //     method: 'DELETE',
            //     url: `/api/comments/${comment.id}`
            // });

            var comments = [].concat(_toConsumableArray(this.state.comments)); //spread operatore: clone existing array
            var commentIndex = comments.indexOf(comment); //find the index of the comment that is about to be deleted.

            comments.splice(commentIndex, 1);
            this.setState({ comments: comments });
        }
    }, {
        key: "_fetchComments",
        value: function _fetchComments() {}
        // $.ajax({
        //     method: 'GET',
        //     url: '/api/comments.json',
        //     contentType: "application/json; charset=utf-8",
        //     async: false,
        //     dataType: 'json',
        //     success: (comments) => {    //using arrow function to make sure this is bound to the CommentBox class
        //         this.setState({comments});
        //     }
        // });


        //this makes it so that we load it before the component is rendered to the page

    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this._fetchComments();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this6 = this;

            this._timer = setInterval( //store a timer as an object property. good idea to do this with spas so there are no muliple timers going.
            function () {
                return _this6._fetchComments();
            }, 5000); //polling - running fetchComments after every 5s.
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this._timer); //clear the timer when it unmounts.
        }
    }]);

    return CommentBox;
}(React.Component);

ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('CommentBox'));