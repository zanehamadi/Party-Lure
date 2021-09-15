

const PartyCounter = ({requests}) => {

    console.log('look at requests',requests)
    let num_reqs = requests.length
    return(
        <div>
            {num_reqs}
        </div>
    )
}

export default PartyCounter
