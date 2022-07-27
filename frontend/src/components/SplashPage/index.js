import online_events from '../../assets/images/online_events.svg'
import handsup from '../../assets/images/handsUp.svg'
import ticket from '../../assets/images/ticket.svg'
import joinGroup from '../../assets/images/joinGroup.svg'

import { useHistory } from 'react-router-dom'

import './Splash.css'
function SplashPage() {
    const history = useHistory()
    return (
        <>
            <div className='splash-title-div'>
                <h1>Celebrating 20 years of real connections on Meetup</h1>
                <p>Whatever you're looking to do this year, Meetup can help. For 20 years, people have tuend to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day - join the fun</p>
                <img src={online_events} />
            </div>
            <div className='splash-body-div'>
                <h2>How Meetup Works</h2>
                <p>Meet new people who share your interests through online and in-person events. It's free to create an account.</p>
                <div className='splash-nav-container'>
                    <div className='splash-nav'>
                        <img src={handsup} />
                        <h3 className='splash-link' onClick={() => history.push('/groups')}>Join a group</h3>
                        <p>Do what you love, meet others who love it, find your community. The rest is history!</p>
                    </div>
                    <div className='splash-nav'>
                        <img src={ticket} />
                        <h3 className='splash-link' onClick={() => history.push('/events')}>Find an event</h3>
                        <p>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking</p>
                    </div>
                    <div className='splash-nav'>
                        <img src={joinGroup} />
                        <h3 className='splash-link' onClick={() => history.push('/group-form')}>Start a group</h3>
                        <p>You don't have to be an expert to gather people together and explore shared interests.</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SplashPage;
