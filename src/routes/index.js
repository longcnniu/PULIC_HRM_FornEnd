import Account from '../pages/Account/Account';
import AddDependentPerson from '../pages/AddDependentPerson/AddDependentPerson';
import AddPersonnel from '../pages/AddPersonnel/AddPersonnel';
import Company from '../pages/Company/Company';
import DependentPerson from '../pages/DependentPerson/DependentPerson';
import EditDependentPerson from '../pages/EditDependentPerson/EditDependentPerson';
import EidtPersonnel from '../pages/EditPersonnel/EidtPersonnel';
import Group from '../pages/Group/Group';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Personnel from '../pages/personnel/Personnel';
import PersonnelDetails from '../pages/PersonnelDetails/PersonnelDetails';
import Birthday from '../pages/statistical/Birthday/Birthday';
import SignedContract from '../pages/statistical/SignedContract/SignedContract';
import Tool from '../pages/Tool/Tool';

const publicRoutes = [
  { path: '/login', component: Login, layout: null },
  //==========
  { path: '/', component: Home },
  //==========
  { path: '/personnel', component: Personnel },
  { path: '/personnel-details/:id', component: PersonnelDetails },
  { path: '/personnel-add', component: AddPersonnel },
  { path: '/personnel-edit/:id', component: EidtPersonnel },
  //==========
  { path: '/company', component: Company },
  //==========
  { path: '/dependent-person', component: DependentPerson },
  { path: '/dependent-person-add/:id', component: AddDependentPerson },
  { path: '/dependent-person-edit/:id', component: EditDependentPerson },
  //==========
  { path: '/tools', component: Tool },
  //==========
  { path: '/birthday-statistical', component: Birthday },
  { path: '/signed-contract-statistical', component: SignedContract },
  //==========
  { path: '/group', component: Group },
  //==========
  { path: '/account', component: Account },
];

export { publicRoutes };
