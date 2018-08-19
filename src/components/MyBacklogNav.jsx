import React from 'react';
import { NavLink } from 'react-router-dom';

import BacklogStatusLabel from './BacklogStatusLabel';
import { BACKLOG_STATUSES } from '../constants';

import './MyBacklogNav.css';

const MyBacklogNav = () => (
  <div className="row MyBacklogNav">
    <div className="col-12">
      <ul className="nav nav-tabs">
        {BACKLOG_STATUSES.map(status => (
          <li key={status.id} className="nav-item">
            <NavLink className="nav-link" to={`/collections/${status.id}`} activeClassName="active">
              <BacklogStatusLabel status={status} size={24} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default MyBacklogNav;
