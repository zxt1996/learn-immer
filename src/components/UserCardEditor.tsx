import React from 'react';
import { useImmer } from 'use-immer';

function UserCardEditor() {
    // useImmer和useState类似，但是在处理多层嵌套的数据时较为方便
    const [state, setState] = useImmer({
        id: 14,
        email: "example@domain.com",
        profile: {
            name: "Horus",
            bio: "Lorem ipsum dolor sit amet..."
        }
    })

    const changeName = (name: string) => {
        setState(draft => {
            draft.profile.name = name;
        })
    }

    return (
        <div>
            <h4>
                {state.profile.name}
            </h4>
            <button onClick={() => changeName('jo')}>changeName</button>
        </div>
    )
}

export default UserCardEditor;