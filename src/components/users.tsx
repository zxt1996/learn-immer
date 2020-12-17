import React,{ SyntheticEvent } from 'react';
import produce, { Draft } from 'immer';

interface aboutUser {
    user: {
        name: string
    };
}
interface myState extends aboutUser{}
class Users extends React.Component<any, myState> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                name: ''
            }
        }
    }

    onInputChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        const now = event.target.value;
        this.setState(
            produce(draft => {
                draft.user.name = now
            })
        )
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                <h1>Immer with React</h1>
                <h4>{user.name}</h4>
                <input type="text" onChange={this.onInputChange} />
            </div>
        )
    }
}

export default Users;