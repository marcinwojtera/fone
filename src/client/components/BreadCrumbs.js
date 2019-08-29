import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import {connect} from "react-redux";

const Breadcrumbs = ({ navigation }) => (
  <Breadcrumb>
    <Breadcrumb.Section link>Home</Breadcrumb.Section>
    <Breadcrumb.Divider />
    <Breadcrumb.Section >{navigation.year}</Breadcrumb.Section>
    {navigation.season && <span> <Breadcrumb.Divider />
    <Breadcrumb.Section >{navigation.season}</Breadcrumb.Section></span>}
  </Breadcrumb>
)

const mapStateToProps = state => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(Breadcrumbs)
