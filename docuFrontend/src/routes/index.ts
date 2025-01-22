import { lazy } from 'react';

const Home = lazy(() => import('../pages/Dashboard/Home'));
const Progress = lazy(() => import('../pages/Progress/Progress'));
const ProgressAdd = lazy(() => import('../pages/Progress/ProgressAdd'));
const ProgressEdit  = lazy(() => import('../pages/Progress/ProgressEdit'));
const Areas = lazy(() => import('../pages/Areas/Area'));
const AreasAdd = lazy(() => import('../pages/Areas/AreaAdd'));
const AreasEdit = lazy(() => import('../pages/Areas/AreaEdit'));
const RequestsType = lazy(() => import('../pages/RequestsType/RequestsType'));
const RequestsTypeAdd = lazy(() => import('../pages/RequestsType/RequestsTypeAdd'));
const RequestsTypeEdit = lazy(() => import('../pages/RequestsType/RequestsTypeEdit'));
const Roles = lazy(() => import('../pages/Rols/Roles'));
const RolesAdd = lazy(() => import('../pages/Rols/RolesAdd'));
const RolesEdit = lazy(() => import('../pages/Rols/RolesEdit'));
const Users = lazy(() => import('../pages/Users/User'));
const UserAdd = lazy(() => import('../pages/Users/UserAdd'));
const UserEdit = lazy(() => import('../pages/Users/UserEdit'));
const UpdatePassword = lazy(() => import('../pages/Authentication/UpdatePassword'));
const Project = lazy(() => import('../pages/Projects/Projects'));
const ProjectAdd = lazy(() => import('../pages/Projects/ProjectsAdd'));
const ProjectEdit = lazy(() => import('../pages/Projects/ProjectsEdit'));
const ProjectDetails = lazy(() => import('../pages/Projects/ProjectsDetails'));
const Endpoint = lazy(() => import('../pages/Endpoints/Endpoint'));
const EndpointDetails = lazy(() => import('../pages/Endpoints/EndpointDetails'));
const EndpointDetailsAdd = lazy(() => import('../pages/Endpoints/EndpointDetailsAdd'));
const EndpointDetailsEdit = lazy(() => import('../pages/Endpoints/EndpointDetailsEdit'));

const coreRoutes = [
  {
    path: '/inicio',
    component: Home,
  },
  {
    path: '/areas',
    component: Areas,
  },
  {
    path: '/areas/agregar',
    component: AreasAdd,
  },
  {
    path: '/areas/editar/:id',
    component: AreasEdit,
  },
  {
    path: '/progresos',
    component: Progress,
  },
  {
    path: '/progresos/agregar',
    component: ProgressAdd,
  },
  {
    path: '/progresos/editar/:id',
    component: ProgressEdit,
  },
  {
    path: '/tipo-requests',
    component: RequestsType,
  },
  {
    path: '/tipo-requests/agregar',
    component: RequestsTypeAdd,
  },
  {
    path: '/tipo-requests/editar/:id',
    component: RequestsTypeEdit,
  },
  {
    path: '/roles',
    component: Roles,
  },
  {
    path: '/roles/agregar',
    component: RolesAdd,
  },
  {
    path: '/roles/editar/:id',
    component: RolesEdit,
  },
  {
    path: '/usuarios',
    component: Users,
  },
  {
    path: '/usuarios/agregar',
    component: UserAdd,
  },
  {
    path: '/usuarios/editar/:id',
    component: UserEdit,
  },
  {
    path: '/usuarios/editar-contraseña/:id',
    component: UpdatePassword,
  },
  {
    path: '/proyectos',
    component: Project,
  },
  {
    path: '/proyectos/agregar',
    component: ProjectAdd,
  },
  {
    path: '/proyectos/editar/:id',
    component: ProjectEdit,
  },
  {
    path: '/proyectos/detalle-de-proyecto/:id',
    component: ProjectDetails,
  },
  {
    path: '/endpoints',
    component: Endpoint,
  },
  {
    path: '/endpoints-details/:id',
    component: EndpointDetails,
  },
  {
    path: '/endpoints-details/agregar/:id',
    component: EndpointDetailsAdd,
  },
  {
    path: '/endpoints-details/editar/:id',
    component: EndpointDetailsEdit,
  },
];

const routes = [...coreRoutes];
export default routes;
