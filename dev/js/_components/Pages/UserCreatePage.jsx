import React from 'react';
import { connect } from 'react-redux';

import { userActions, headerActions, footerActions } from '../../_actions';

class UserCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                display_name: '',
                email: '',
                password: '',
                access_level: '50',
                user_status: 'off'
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(headerActions.titleChange('Create user'));
        this.props.dispatch(footerActions.linksClear());
        this.props.dispatch(footerActions.linkAdd('Save', '/user-save', 'save_user_footer_link'));
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.username && user.email && user.password) {
            dispatch(userActions.create(user));
        }
    }

    render() {
        const { creating  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div id="user_create_page">
                <form name="form" id="add_user" onSubmit={this.handleSubmit}>

                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={user.username} onChange={this.handleChange} />
                        {/*{submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }*/}
                    </div>

                    <div className="form-group">
                        <label htmlFor="display_name">Display name</label>
                        <input type="text" className="form-control" id="display_name" name="display_name" placeholder="Name or Nickname" value={user.display_name} onChange={this.handleChange} />
                    </div>

                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" id="email" placeholder="Email" value={user.email} onChange={this.handleChange} />
                        {/*{submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }*/}
                    </div>

                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" name="password" value={user.password} onChange={this.handleChange} />
                        {/*{submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }*/}
                    </div>

                    {/*<div class="form-group">
                        <label for="confirm_password">Confirm Password</label>
                        <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="password">
                    </div>*/}
                    
                    <div className="form-group">
                        <label htmlFor="access_level">Access Level</label>
                        <select value={user.access_level} name="access_level" className="form-control" id="access_level" onChange={this.handleChange}>
                          <option value="100">Administrator</option>
                          <option value="50">Simple user</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="user_status">Status</label>
                        <input type="checkbox" checked={user.user_status} id="user_status" name="user_status" onChange={this.handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-primary">Save</button>
                        {creating && 
                            <div>lodaing...</div>
                        }
                    </div>

                </form>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { creating } = state.userCreation;
    return {
        creating
    };
}

const connectedUserCreatePage = connect(mapStateToProps)(UserCreatePage);
export { connectedUserCreatePage as UserCreatePage };