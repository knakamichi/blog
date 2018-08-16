import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';


class PostsNew extends Component {

  renderField(field) {
    // field argument makes sure Field tag below is responsible for input value below
    const {meta : {touched, error}} = field;
    // see bottom line for details
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.labeltoShow}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
    // {...field.input} = contains onChange, onBlur etc.
    // ... = pass functions inside method as props to parent function and spread it out
  }

// this callback is called after redux form validation
// this function is where we manually decide what to do with the values inside form (send to server, push to another component, etc)
  onSubmit(values){
    // this(binded in onSubmit) === component
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // property being passed to PropsNew component on behalf of ReduxForms
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          labeltoShow="Title"
          // same name as JSON request
          name="title"
          // return JSX blob to field to add a view to Field
          component={this.renderField}
        />
        <Field
          labeltoShow="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          labeltoShow="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type= "submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// function mapStateToProps(state) {
//   return {posts: state.posts};
// }

function validate(values) {
  // values = value of input
  const errors = {};

  // validate the inputs from 'values'
  // assign name value as property to error
  if (!values.title) {
    errors.title = "Enter a Title! ";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories! ";
  }
  if (!values.content) {
    errors.content = "Enter some content! ";
  }

// if errors is empty, form is fine to submit
// if errors has *any* properties, redux form assumes form is invalid
  return errors;
}

// wrap reduxForm component to Postsnew component
export default reduxForm({
  validate,
  // form property below: name of form (string assigned to form must be unique)
  form: 'PostsNewForm'
})(
  connect(null, {createPost})
  (PostsNew)
);

// const {meta : {touched, error}} = field;
// className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`;
// {touched ? error : ''}
// =
// className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
// {field.meta.touched ? field.meta.error : ''}
