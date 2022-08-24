import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteGroupThunk, editGroupDetailsThunk } from "../../../store/Groups";
import './EditGroupForm.css'

function EditGroupForm({ group }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState(group.name)
    const [about, setAbout] = useState(group.about)
    const [type, setType] = useState(group.type)
    const [privates, setPrivate] = useState(group.private)
    const [city, setCity] = useState(group.city)
    const [state, setState] = useState(group.state)

    const [validationErrors, setValidationErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        const errors = []

        if (name.length < 5) errors.push('Name must have atleast 5 characters')
        if (name.length > 60) errors.push('Name must have atmost 60 characters')
        if (about.length < 50) errors.push('About must be at least 50 characters')
        if (about.length > 1000) errors.push('About must be atmost 1000 characters')
        if (city.length < 3) errors.push('Please provide valid city')

        setValidationErrors(errors)

    }, [name, about, city])

    const handleSubmit = async e => {
        e.preventDefault()

        setIsSubmitted(true)

        if (validationErrors.length > 0) return

        const editedGroup = {
            name: name,
            about: about,
            type: type,
            private: privates,
            city: city,
            state: state
        }

        const data = await dispatch(editGroupDetailsThunk(group.id, editedGroup))

        history.push(`/groups/${group.id}/about`)
    }

    const handleDelete = async e => {
        e.preventDefault()
        const data = await dispatch(deleteGroupThunk(group.id))
        history.push('/groups')
    }

    const USstates = [
        'AL', 'AK', 'AS', 'AZ', 'AR',
        'CA', 'CO', 'CT', 'DE', 'DC',
        'FM', 'FL', 'GA', 'GU', 'HI',
        'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MH', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PW', 'PA',
        'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VI', 'VA',
        'WA', 'WV', 'WI', 'WY'
    ];

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    {isSubmitted && validationErrors.length > 0 &&
                        <ul>
                            {validationErrors.map(error => <li key={error}>{error}</li>)}
                        </ul>}
                    <h2>Name</h2>
                    <input
                        required
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder='group name...'
                        name='name' />
                    <h2>About</h2>
                    <textarea
                        required
                        rows='13'
                        cols='76'
                        onChange={e => setAbout(e.target.value)}
                        value={about}
                        placeholder='Please write at least 50 characters'
                        name='about' />
                    <p>Character count {about.length}</p>
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
                        required
                        type='text'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        placeholder='city...'
                        name="city" />
                    <select
                        required
                        name='state'
                        placeholder="state..."
                        value={state}
                        onChange={e => setState(e.target.value)}
                    >
                        {USstates.map(USstate => {
                            return (
                                <option
                                    key={USstate}
                                    onChange={e => setState(e.target.value)}
                                    value={USstate}
                                >
                                    {USstate}
                                </option>
                            )
                        })}
                    </select>
                    <div className="form-buttons">
                        <button className="return" onClick={handleDelete}>Delete</button>
                        <button className="default" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditGroupForm
