import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import { createNewGroupThunk } from "../../../store/Groups"

// import FooterInfo from '../../FooterInfo'
import './GroupForm.css'

function GroupForm() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [type, setType] = useState('In person')
    const [privates, setPrivate] = useState(false)
    const [city, setCity] = useState('')
    const [state, setState] = useState('AL')
    const [step, setStep] = useState('STEP 1')

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) {
        return (
            <div className="main-div flex-row-center">
                <h1> PLEASE LOG IN TO CONTINUE MAKING A GROUP </h1>
            </div>
        )
    }

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

        const data = await dispatch(createNewGroupThunk(newGroup))

        history.push(`/groups/${data.id}/about`)
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
        <div className="main-div flex-row-center">
            <div className="w70 h100 flex-row-center flex-column-center">
                <form className="h100 flex-column-center" onSubmit={handleSubmit}>

                    <div className="textcolor-grey">
                        {step} OF 5
                    </div>
                    {
                        step === 'STEP 1' && (
                            <div className="create-group h100">
                                <div className="w100 flex-column-center">
                                    <h2 className="create-group">First, set your group's location</h2>
                                    <p className="create-group">Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
                                </div>

                                <span className="text14 textcolor-grey">City</span>
                                <input
                                    required
                                    type='text'
                                    onChange={e => setCity(e.target.value)}
                                    value={city}
                                    placeholder='city...'
                                    name="city" />

                                <span className="text14 textcolor-grey">State</span>
                                <select value={state} onChange={e => setState(e.target.value)}>
                                    {USstates.map(el => <option key={el} value={el} onChange={e => setState(el)}>{el}</option>)}
                                </select>

                                <div className="w100 flex-row-justify-between border-top-black-2px">
                                    <button className="return" style={{ visibility: 'hidden' }}></button>
                                    <button className="default" disabled={city.length < 3} onClick={e => setStep('STEP 2')}>Next</button>
                                </div>
                            </div>
                        )
                    }

                    {
                        step === 'STEP 2' &&
                        <div className="create-group h100">
                            <div className="w100 flex-column-center">
                                <h2 className="create-group">What will your group's name be?</h2>
                                <p className="create-group">Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                            </div>

                            <input
                                type='text'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                maxLength='60'
                                placeholder='group name...'
                                name='name' />
                            <span className="text14 textcolor-grey">Character count: {name.length}</span>

                            <div className="w100 flex-row-justify-between border-top-black-2px">
                                <button className="return" onClick={e => setStep('STEP 1')}>Back</button>
                                <button className="default" disabled={name.length < 5 || name.length > 60} onClick={e => setStep('STEP 3')}>Next</button>
                            </div>
                        </div>
                    }
                    {
                        step === 'STEP 3' &&
                        <div className="create-group h100">
                            <div className="w100 flex-column-center">
                                <h2 className="create-group">Now describe what {name} will be about</h2>
                                <p className="create-group"> People will see this when we promote your group, but you'll be able to add to it later, too.</p>
                                <ol>
                                    <li>What's the purpose of the group?</li>
                                    <li>Who should join?</li>
                                    <li>What will you do at your events?</li>
                                </ol>
                            </div>


                            <textarea
                                rows='13'
                                cols='76'
                                onChange={e => setAbout(e.target.value)}
                                value={about}
                                maxLength='1000'
                                placeholder='Please write at least 50 characters'
                                name='about' />
                            <span className="text14 textcolor-grey">Character count: {about.length}</span>

                            <div className="w100 flex-row-justify-between border-top-black-2px">
                                <button className="return" onClick={e => setStep('STEP 2')}>Back</button>
                                <button className="default" disabled={about.length < 50 || about.length > 1000} onClick={e => setStep('STEP 4')}>Next</button>
                            </div>
                        </div>
                    }
                    {
                        step === 'STEP 4' &&
                        <div className="create-group h100">
                            <div className="w100 flex-column-center">
                                <h2 className="create-group">What type of group will {name} be ?</h2>
                            </div>

                            <p className="create-group">Will this group primarily be In Person or Online?</p>
                            <select name='type' value={type} onChange={e => setType(e.target.value)} >
                                <option value='In person'>In Person</option>
                                <option value='Online'>Online</option>
                            </select>

                            <p className="create-group">Will this group be a private or public group?</p>
                            <select name='private' value={privates} onChange={e => setPrivate(e.target.value)}>
                                <option value={false} >Public</option>
                                <option value={true} >Private</option>
                            </select>

                            <div className="w100 flex-row-justify-between border-top-black-2px">
                                <button className="return" onClick={e => setStep('STEP 3')}>Back</button>
                                <button className="default" onClick={e => setStep('STEP 5')}>Next</button>
                            </div>
                        </div>
                    }
                    {
                        step === 'STEP 5' &&
                        <div className="create-group">
                            <div className="w100 flex-column-center">
                                <h2 className="create-group">Almost done! Just take a minute to review our guidelines</h2>
                                <span className="create-group">Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:</span>
                                <ul>
                                    <li>Provide growth opportunities for members</li>
                                    <li>Encourage real human interactions in person or online</li>
                                    <li>Have a host present at all events</li>
                                    <li>Be transparent about the group's intentions</li>
                                </ul>
                            </div>

                            <span>Once you submit your group, you'll be redirected to your newly created group's page</span>
                            <div className="w100 flex-row-justify-between border-top-black-2px">
                                <button className="return" onClick={e => setStep('STEP 4')}>Back</button>
                                <button className="default" type="submit">{'Agree & Create group'}</button>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default GroupForm;
