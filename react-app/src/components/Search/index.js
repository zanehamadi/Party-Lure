import { useEffect, useState } from "react"
import {Link} from 'react-router-dom';

function Search({posts, activities}) {

    const [title, setTitle] = useState('')
    // const [level, setLevel] = useState('')
    const [role,setRole] = useState([])
    const [activity, setActivity] = useState('')
    const [filter, setFilter] = useState(false)
    const [searchPosts, setSearchPosts] = useState([])
    const [activityType, setActivityType] = useState('')

    const resetFunc = () => {
        setSearchPosts([])
        setRole([])
        setActivity('')
        setTitle('')
        setActivityType('')
    }

    useEffect(() => {
        if((title || (role || activity))){
            let postsArr = posts
            if(title){
                postsArr = postsArr.filter(post => ((post?.title).toUpperCase()).includes((title.toUpperCase())))
                console.log(postsArr)
            }
            console.log(activityType)
            // if(level){
            //     console.log(postsArr)
            //     // postsArr.forEach(post => console.log(post?.recruit_level))
            //     // postsArr = postsArr.filter(post => +post?.recruit_level === +level)
            // }

            if(activity){
                postsArr = postsArr.filter(post => post?.mission === activity)
            }
            if(activityType){
                postsArr = postsArr.filter(post => post?.type === activityType)
            }
            setSearchPosts(postsArr)
        }


    }, [title, role, activity, activityType])

    return (
        <>
            <input placeholder='Search' value={title} onChange={e => setTitle(e.target.value)}></input>
            <button onClick={e => setFilter(true)}>Filters</button>
            <button onClick={() => resetFunc()}>Reset</button>
            {filter ? 
                <>
                    <button onClick={e => setFilter(false)}>Close</button>
                    <form>
                        {/* <label> Level
                            <span> <input type='range' min='1' max='50' value={level} onChange={e => setLevel(e.target.value)}></input> {level}</span>
                        </label> */}
                        <select value={activity} onChange={e => setActivity(e.target.value)}>
                            {activities.map(eActivity => 
                                <option>{eActivity.name}</option>
                            )}
                        </select>
                        <select onChange={e => setActivityType(e.target.value)}>
                            <option>Leveling</option>
                            <option>Questing</option>
                            <option>Gathering</option>
                            <option>Dungeons</option>
                            <option>Raids</option>

                        </select>
                    </form>
                    <h1>Yup</h1>
                </> 
            
            : <></>}
            {searchPosts ? 
                <>
                    {searchPosts.map(post => <div><Link to={`/posts/${post.id}`}>{post.title}</Link></div>)}
                </> 
            
            :<></>}
        </>
    )
}

export default Search
