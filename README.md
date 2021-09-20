# Party-Lure

Party-Lure is a website allowing you to discover and correspond with fellow players of a fictional MMO game called Abyss Adventures set in the ocean. The site can be found at: https://party-lure.herokuapp.com/

## Development
* You can read more about the project using the wiki located at: https://github.com/zanehamadi/Party-Lure/wiki
* To start a development environment:
    1. Clone the repository at: https://github.com/zanehamadi/Party-Lure
    2. Run the command "npm install" from the react-app directory in your terminal to install dependencies for the front end
    3. Run the command "pipenv install" from the root directory in your terminal to install dependencies for the backend and create a virtual environment.
    4. Run the command "flask run" from the root directory to start the backend server.
    5. Run the command "npm start" from the react-app directory to start the frontend server.
    6. Navigate to the localhost port specified in config/index.js

## Technologies Used
* Javascript
* HTML/CSS
* Reactjs
* Python
* Node.js
* Flask
* Postgres
* Heroku
* Git/Github
* Redux

##  Features
* Users
    * User functionality including registration, Login/Logout authentication, and authorization to perform different CRUD operations throughout the site is all present.
    * The Bcrypt hashing algorithm is used to maintain password security.
    * All forms are protected against Csurf attacks
* Posts
    * Authenticated users can submit new posts for other users to comment on and read.
    * Authenticated users can edit posts that are already submited, as well as delete their posts.
    * Any user can view previously submitted posts and comments to those posts.
* Comments
    * Authenticated users can submit new comments for other user's posts.
    * Authenticated users can edit the comments they created, as well as delete their comments.
    * Any user can view previously submitted posts and comments to those posts.
* Parties
    * Authenticated users can request to join the parties of other users.
    * Authenticated users can accept or deny incoming party requests to their posts
    * Authenticated users view all the parties they are a part of on their profile page.
* Profiles
    * Authenticated users have a profile page where they can view their posts, the parties they have joined, and the parties they have started.
    * Authenticated users can edit limited information on their profile such as their role, job, or profile picture
    * Profile page is not visible unless a user is logged in
* Search
    * Users can search through previous posts on the site
    * Search can be filtered by level, job, and activity
 
## Challenges and Learnings
* We learned quickly how important it is to ensure that we protect our main branch, and commit early and often to keep all the branches updated.
* We had a lot of reload/refresh errors that were caused by react being too fast, and rendering components without having the data loaded. The "?" operator was very important.
* We learned how flexible flask is. The to_dict() methods we created on our models could be easily tweaked to contain information from related tables to make most of the database queries we needed to run fairly simple.

## Code Highlights
* Search by a variety of different filters, and have the results show up live underneath the search bar*
```

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
```
* Query the Posts database in flask to return the posts that have the most amount of comments attatched to them*
```
# route to get all top 10 most actice posts
@post_routes.route('/home')
# @login_required
def get_top_10():
    posts = db.session.query(Post).join(Comment).group_by(
        Post.id).order_by(func.count().desc()).all()
    data = posts[0:10]
    if data:
        return {"posts": [post.to_dict() for post in data]}
    return "No Comments"
 ```
## Features to be implemented later: 
  * Friends
    * Authenticated users can add/remove other users as friends on the site
  

## Bugs that are still being worked on: 
  - Minor empty post issue causing some crashing issues
  - Scroll issues on the home page on some monitors
  - 
## Database Structure
![](https://github.com/zanehamadi/Party-Lure/blob/main/visualization/Party-Lure-Database-Schema-1.png)

## Contributors
* [Tanner Pedretti](https://github.com/VoodooJellyfish) (VoodooJellyfish)
* [Zane Hamadi](https://github.com/zanehamadi) (zanehamadi)
* [Kristian Martinez](https://github.com/Kristianmartinw) (kristianmartinw)
* [Cam Chandler](https://github.com/CamChandler98) (CamChandler98)
