import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userAction';

function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser())
    history.push('/');
  })
  return null;
}

export default Logout;
