
import styled from "styled-components"

/*
If the array of requests is greater than 0 then turn the color red
else turn the color blue

If the array of requests is greater than 0 and hasn't activated an on click then the color is red
number > 0 && onClick={handleRequestColor} ? 'red' : 'blue'
else the color is blue?
*/
const PaintCounter = styled.div`
color: ${props => props.number > 0 && props.colorBlue ? 'red' : 'blue'}
`
const PartyCounter = ({ requests, colorBlue }) => {


    let num_reqs = requests.length

    return (
        <PaintCounter colorBlue={colorBlue} number={num_reqs}>
            {num_reqs}
        </PaintCounter>
    )
}

export default PartyCounter
