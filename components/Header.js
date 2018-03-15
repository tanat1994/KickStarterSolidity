import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    // <Menu.Item>CrowdFundingCoin</Menu.Item>
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item">
          CrowdFundingCoin
        </a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">
            Campaigns
          </a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">
            +
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
    // <Menu.Item>Campaigns</Menu.Item>
    // <Menu.Item>+</Menu.Item>
  );
};
