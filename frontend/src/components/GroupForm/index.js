import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { createNewGroup } from "../../store/Groups"

function GroupForm() {
    // const [isLoaded, setIsLoaded] = useState(false)
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [type, setType] = useState('In person')
    const [privates, setPrivate] = useState(false)
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [step, setStep] = useState('step 1')

    const history = useHistory()

    const dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault()

        const newGroup = {
            name: name,
            about: about,
            type: type,
            private: privates,
            city: city,
            state: state
        }

        const data = await dispatch(createNewGroup(newGroup))

        history.push(`/groups/${data.id}`)
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    {
                        step === 'step 1' &&
                        <div>
                            <h2>First, set your group's location</h2>
                            <p>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
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
                            <button onClick={e => setStep('step 2')}>Next</button>
                        </div>
                    }
                    {
                        step === 'step 2' &&
                        <div>
                            <h2>What will your group's name be?</h2>
                            <p>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                            <input
                                type='text'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                placeholder='group name...'
                                name='name' />
                            <button onClick={e => setStep('step 1')}>Back</button>
                            <button onClick={e => setStep('step 3')}>Next</button>
                        </div>
                    }
                    {
                        step === 'step 3' &&
                        <div>
                            <h2>Now describe what {name} will be about</h2>
                            <p>People will see this when we promote your group, but you'll be able to add to it later, too.</p>
                            <ol>
                                <li>What's the purpose of the group?</li>
                                <li>Who should join?</li>
                                <li>What will you do at your events?</li>
                            </ol>
                            <textarea
                                rows='13'
                                cols='76'
                                onChange={e => setAbout(e.target.value)}
                                value={about}
                                placeholder='Please write at least 50 characters'
                                name='about' />
                            <button onClick={e => setStep('step 2')}>Back</button>
                            <button onClick={e => setStep('step 4')}>Next</button>
                        </div>
                    }
                    {
                        step === 'step 4' &&
                        <div>
                            <h2>What type of group will {name} be?</h2>
                            <select name='type'>
                                <option value='In person' onChange={e => setType(e.target.value)}>In Person</option>
                                <option value='Online' onChange={e => setType(e.target.value)}>Online</option>
                            </select>
                            <select name='private'>
                                <option value={false} onChange={e => setPrivate(e.target.value)}>Public</option>
                                <option value={true} onChange={e => setPrivate(e.target.value)}>Private</option>
                            </select>
                            <button onClick={e => setStep('step 3')}>Back</button>
                            <button onClick={e => setStep('step 5')}>Next</button>
                        </div>
                    }
                    {
                        step === 'step 5' &&
                        <div>
                            <h2>Almost done! Just take a minute to review our guidelines</h2>
                            <span>Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:</span>
                            <ul>
                                <li>Provide growth opportunities for members</li>
                                <li>Encourage real human interactions in person or online</li>
                                <li>Have a host present at all events</li>
                                <li>Be transparent about the group's intentions</li>
                            </ul>
                            <span>Once you submit your group, a human at Meetup will review it based on these guidelines and make sure it gets promoted to the right people.</span>
                            <button onClick={e => setStep('step 4')}>Back</button>
                        </div>
                    }
                    {step === 'step 5' && <button type="submit">{'Agree & Continue'}</button>}
                </form>
            </div>
        </>
    )
}

export default GroupForm;
