import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editGroupDetails } from "../../store/GroupDetails";
import { deleteAGroup } from "../../store/Groups";

function EditGroupForm({ group }) {
    const [name, setName] = useState(group.name)
    const [about, setAbout] = useState(group.about)
    const [type, setType] = useState(group.type)
    const [privates, setPrivate] = useState(group.private)
    const [city, setCity] = useState(group.city)
    const [state, setState] = useState(group.state)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()

        const editedGroup = {
            name: name,
            about: about,
            type: type,
            private: privates,
            city: city,
            state: state
        }

        const data = await dispatch(editGroupDetails(group.id, editedGroup))
        history.push(`/groups/${group.id}`)
    }

    const handleDelete = async e => {
        e.preventDefault()
        const data = await dispatch(deleteAGroup(group.id))
        history.push('/groups')
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Name</h2>
                    <input
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder='group name...'
                        name='name' />
                    <h2>About</h2>
                    <textarea
                        rows='13'
                        cols='76'
                        onChange={e => setAbout(e.target.value)}
                        value={about}
                        placeholder='Please write at least 50 characters'
                        name='about' />
                    <h2>Type</h2>
                    <select name='type'>
                        <option value='In person' onChange={e => setType(e.target.value)}>In Person</option>
                        <option value='Online' onChange={e => setType(e.target.value)}>Online</option>
                    </select>
                    <select name='private'>
                        <option value={false} onChange={e => setPrivate(e.target.value)}>Public</option>
                        <option value={true} onChange={e => setPrivate(e.target.value)}>Private</option>
                    </select>
                    <h2>Location</h2>
                    <input
                        type='text'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        placeholder='city...'
                        name="city" />
                    <input
                        type='text'
                        onChange={e => setState(e.target.value)}
                        value={state}
                        placeholder='state...'
                        name='state' />

                    <div>
                        <button type="submit">Save</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditGroupForm
