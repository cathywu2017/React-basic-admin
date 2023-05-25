import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';

function SideBar() {
  return (
    <Sidebar as={Menu} vertical visible width="thin">
      <Menu.Item as="a" content="Home" />
      {/* <Menu.Item as="a" content="Games" />
      <Menu.Item as="a" content="Channels" /> */}
    </Sidebar>
  );
}

export default SideBar;
