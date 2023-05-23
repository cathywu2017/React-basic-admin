import React from 'react';
import { Menu } from 'semantic-ui-react';

function HeaderBar() {
  return (
    <Menu inverted>
      <Menu.Item as="a" header content="Header" />
    </Menu>
  );
}

export default HeaderBar;
