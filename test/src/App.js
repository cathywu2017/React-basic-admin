import React from 'react';
import { Sidebar, Segment } from 'semantic-ui-react';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="content">
      <Header />
      <Sidebar.Pushable as={Segment} attached>
        <SideBar />
        <Main />
      </Sidebar.Pushable>
      <Footer />
    </div>
  );
}

export default App;
