import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

const DemoButton = () => {
    const dispatch = useDispatch();
    useSelector(state => state.session.user)

    let credential = 'Demo Fish'
    let password = 'password'
    let demoLogin = () => { return dispatch(sessionActions.login(credential, password)) }

    return (
        <button onClick={demoLogin}>Demo</button >
    )
}

export default DemoButton;
