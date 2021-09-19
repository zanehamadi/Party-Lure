import styled from "styled-components";
import { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import { Modal } from "../../context/Modal";
import ButtonStyle from "../Button/ButtonStyle";
import "./Search.css"

function Search({posts, activities, activityTypes}) {
    const [title, setTitle] = useState('')
    const [level, setLevel] = useState('')
    const [role,setRole] = useState([])
    const [activity, setActivity] = useState('')
    const [searchPosts, setSearchPosts] = useState([])
    const [activityType, setActivityType] = useState('')
    const [userClass, setUserClass] = useState('')
    const [showActivities, setShowActivities] = useState(false)
    const [listActivities, setListActivities] = useState([])
    const [activityTypeId, setActivityTypeId] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }




    const resetFunc = () => {
        setSearchPosts([])
        setRole([])
        setActivity('')
        setTitle('')
        setActivityType('')
        setLevel('')
        setShowActivities(false)
        setUserClass('')
        setShowResults(false)
    }

    const activityTypeFunc= (e) => {
        if(e.target.value === 'Leveling') setActivityTypeId(1)
        else if(e.target.value === 'Questing') setActivityTypeId(2)
        else if(e.target.value === 'Gathering') setActivityTypeId(3)
        else if(e.target.value === 'Dungeons') setActivityTypeId(4)
        else if(e.target.value === 'Raids') setActivityTypeId(5)
        setActivityType(e.target.value)
        return
    }

    useEffect(() => {
        if( (title || userClass) || (role || activity) ){
            let postsArr = posts
            postsArr.pop()
            postsArr.pop()
            if(title){
                setShowResults(true)
                postsArr = postsArr.filter(post => ((post?.title).toUpperCase()).includes((title.toUpperCase())))
            }
            if(level){
                setShowResults(true)
                postsArr = postsArr.filter(post => +post?.recruit_level === +level)
            }
            if(activity && activity !== 'All Activities'){
                setShowResults(true)
                postsArr = postsArr.filter(post => post?.mission === activity)
            }
            if(activityType && activityType !== 'All Activity Types'){
                setShowResults(true)
                postsArr = postsArr.filter(post => post?.type === activityType)
                let tempActivities = activities
                tempActivities = tempActivities.filter(aType => +aType.type_id === activityTypeId)
                setListActivities(tempActivities)
                setShowActivities(true)
            }
            if(userClass && userClass !== 'All Roles'){
                setShowResults(true)
                postsArr = postsArr.filter(post => post?.recruit_role.includes(+userClass))
            }
            setSearchPosts(postsArr)
        }


    }, [level, title, role, activity, activityType, userClass])
    const SearchButtonsStyle = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        input{
            margin: 20px;
            height: 20px;
        }
        .button-container{
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 20px;
        }
    `

    return (
        <>
            <input className="bar" placeholder='Search' value={title} onChange={e => setTitle(e.target.value)}></input>
            <div className = 'button-container search-buttons'>
                <ButtonStyle>
                    <button className = 'styled-button' id='search-btn' onClick={handleClick}>
                        Filters
                    </button>
                </ButtonStyle>
                <ButtonStyle>
                        <button  className = 'styled-button' id='search-btn' onClick={() => resetFunc()}>
                            Reset
                        </button>
                </ButtonStyle>
            </div>
            {showModal ?
                <Modal onClose={() => setShowModal(false)}>
                    <form>
                        <label> Level
                            <span> <input type='range' min='1' max='50' value={level} onChange={e => setLevel(e.target.value)}></input> {level}</span>
                        </label>
                        <select value={activityType} onChange={e => activityTypeFunc(e)}>
                            <option>All Activity Types</option>
                            {activityTypes.map(atype => <option>{atype.name}</option>)}
                        </select>
                        {showActivities ?
                            <>
                                <select value={activity} onChange={e => setActivity(e.target.value)}>

                                    <option>All Activities</option>
                                    {listActivities.map(eActivity =>
                                        <option>{eActivity.name}</option>
                                    )}
                                </select>
                            </>
                        : <></>}
                        <select onChange={e => setUserClass(e.target.value)}>
                            <option>All Roles</option>
                            <option value='1'>Tank</option>
                            <option value='2'>Support</option>
                            <option value='3'>Magical DPS</option>
                            <option value='4'>Physical DPS</option>

                        </select>


                    </form>
                </Modal>

            : <></>}
            {showResults ?
                <div className = "search-results">
                    <h2>results for: {title}</h2>
                    {searchPosts.map(post => <div><Link to={`/posts/${post.id}`} onClick={resetFunc}>{post.title}</Link></div>)}
                </div>

            :<></>}
        </>
    )
}

export default Search
