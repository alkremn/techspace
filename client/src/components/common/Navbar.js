import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../actions/authActions';
import { RiDashboardLine } from 'react-icons/ri';
import { GiMicroscope, GiEscalator } from 'react-icons/gi';
import { RiTeamFill } from 'react-icons/ri';
import { ImBooks } from 'react-icons/im';
import { BsChatDotsFill } from 'react-icons/bs';
import { FaTools } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';
import Link from '../Link';

const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = logout => {
    if (logout) {
      dispatch(logoutAction());
      localStorage.removeItem('userInfo');
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className='navbar'>
      <GiMicroscope className='navbar__logo' />
      <ul className='navbar__links'>
        <li>
          <Link to='/dashboard' title='Dashboard' Icon={RiDashboardLine} />
        </li>
        <li>
          <Link to='/team' title='Team' Icon={RiTeamFill} />
        </li>
        <li>
          <Link to='/solutions' title='Solutions' Icon={ImBooks} />
        </li>
        <li className='navbar__linkItem'>
          <Link to='/second' title='Escalations' Icon={GiEscalator} />
        </li>
        <li>
          <Link to='/chat' title='chat' Icon={BsChatDotsFill} />
        </li>
        <li>
          <Link to='/tools' title='Tools' Icon={FaTools} />
        </li>
      </ul>
      <div className='navbar__link-buttom'>
        <Link
          to='/logout'
          title='Logout'
          Icon={BiLogOut}
          onClick={() => setOpen(true)}
        />
      </div>
      <Modal size='mini' open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Logout</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to logout?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => logoutHandler(false)}>
            No
          </Button>
          <Button positive onClick={() => logoutHandler(true)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Navbar;
