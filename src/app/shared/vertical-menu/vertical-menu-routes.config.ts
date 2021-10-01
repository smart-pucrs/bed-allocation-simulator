import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  { path: '/page/dashboard', title: 'Painel de Controle', icon: 'fa fa-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
  { path: '/page/situacao-leitos', title: 'Situação dos Leitos', icon: 'fa fa-bed', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
  { path: '/page/alocacao-leitos', title: 'Alocação de Leitos', icon: 'fa fa-clipboard', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
  { path: '/page/optimised', title: 'Sugestão de alocação', icon: 'fa fa-file-text-o', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
  { path: '/page/pacientes-internados', title: 'Pacientes Internados', icon: 'fa fa-users', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
  {
    path: '', title: 'Cadastros', icon: 'ft-edit', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/page/cadastros/profissionais', title: 'Profissionais', icon: 'fa fa-user-md', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/page/cadastros/infraestrutura', title: 'Infraestrutura', icon: 'fa fa-hospital-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/page/cadastros/prontuarios', title: 'Prontuários', icon: 'fa fa-file-text-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/page/cadastros/agendamentos', title: 'Agendamentos', icon: 'fa fa-calendar-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/page/cadastros/usuarios', title: 'Usuários', icon: 'fa fa-user-o', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/page/cadastros/consultas', title: 'Consultas Médicas', icon: 'fa fa-medkit', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  { path: 'https://www.ghc.com.br/', title: 'GHC', icon: 'fa fa-h-square', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
  { path: 'https://www.ghc.com.br/default.asp?idMenu=unidades&idSubMenu=1', title: 'Hospital Conceição', icon: 'fa fa-medkit', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
];