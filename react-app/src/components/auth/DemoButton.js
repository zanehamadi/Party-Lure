import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ButtonStyle from '../Button/ButtonStyle';

const DemoButton = () => {
    const dispatch = useDispatch();
    useSelector(state => state.session.user)

    let credential = 'Demo Fish'
    let password = 'password'
    let demoLogin = () => { return dispatch(sessionActions.login(credential, password)) }

    return (
        <ButtonStyle>
            <button onClick={demoLogin} className="styled-button">Demo</button >
        </ButtonStyle>
    )
}

export default DemoButton;
