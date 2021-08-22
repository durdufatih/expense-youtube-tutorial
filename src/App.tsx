
import { Route } from "react-router-dom";
import SignUp from './components/Signup';
import Login from './components/Login';
import { Layout } from 'antd';
import PrivateRoute from './components/PrivateRoute';
import Category from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";

const { Content, Footer } = Layout;


function App() {
  return (

    <Layout>
      <AppHeader />
      <Content className="site-layout" style={{ padding: '50px', marginTop: 64 }}>

        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Category} />
        <PrivateRoute path="/records" component={Records} />
        <Route path="/logout" component={Logout} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Expense Tracker</Footer>
    </Layout>

  );
}

export default App;
