import React from 'react';
import Svg, { G, Line, Path, Circle, Rect, Polyline } from 'react-native-svg';

const Icon = ({ size = 20, color = '#8B9CC8', sw = '1.75', children }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </G>
  </Svg>
);

export const MenuIcon      = ({ size, color }) => <Icon size={size} color={color}><Line x1="4" y1="6" x2="20" y2="6"/><Line x1="4" y1="12" x2="20" y2="12"/><Line x1="4" y1="18" x2="20" y2="18"/></Icon>;
export const XIcon         = ({ size, color }) => <Icon size={size} color={color}><Line x1="18" y1="6" x2="6" y2="18"/><Line x1="6" y1="6" x2="18" y2="18"/></Icon>;
export const DashboardIcon = ({ size, color }) => <Icon size={size} color={color}><Rect x="3" y="3" width="7" height="7" rx="1"/><Rect x="14" y="3" width="7" height="7" rx="1"/><Rect x="3" y="14" width="7" height="7" rx="1"/><Rect x="14" y="14" width="7" height="7" rx="1"/></Icon>;
export const BriefcaseIcon = ({ size, color }) => <Icon size={size} color={color}><Rect x="2" y="7" width="20" height="14" rx="2"/><Path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></Icon>;
export const FileTextIcon  = ({ size, color }) => <Icon size={size} color={color}><Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><Polyline points="14 2 14 8 20 8"/><Line x1="16" y1="13" x2="8" y2="13"/><Line x1="16" y1="17" x2="8" y2="17"/></Icon>;
export const UserIcon      = ({ size, color }) => <Icon size={size} color={color}><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><Circle cx="12" cy="7" r="4"/></Icon>;
export const SearchIcon    = ({ size, color }) => <Icon size={size} color={color}><Circle cx="11" cy="11" r="8"/><Line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
export const BookmarkIcon  = ({ size, color }) => <Icon size={size} color={color}><Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></Icon>;
export const SettingsIcon  = ({ size, color }) => <Icon size={size} color={color}><Circle cx="12" cy="12" r="3"/><Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Icon>;
export const HelpIcon      = ({ size, color }) => <Icon size={size} color={color}><Circle cx="12" cy="12" r="10"/><Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><Line x1="12" y1="17" x2="12.01" y2="17"/></Icon>;
export const LogOutIcon    = ({ size, color }) => <Icon size={size} color={color}><Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><Polyline points="16 17 21 12 16 7"/><Line x1="21" y1="12" x2="9" y2="12"/></Icon>;
export const PlusIcon      = ({ size, color }) => <Icon size={size} color={color}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Icon>;
export const ArrowLeftIcon = ({ size, color }) => <Icon size={size} color={color}><Line x1="19" y1="12" x2="5" y2="12"/><Polyline points="12 19 5 12 12 5"/></Icon>;
export const ShieldIcon    = ({ size, color }) => <Icon size={size} color={color}><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>;
export const BellIcon      = ({ size, color }) => <Icon size={size} color={color}><Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><Path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
export const EditIcon      = ({ size, color }) => <Icon size={size} color={color}><Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Icon>;
export const BarChartIcon  = ({ size, color }) => <Icon size={size} color={color}><Line x1="18" y1="20" x2="18" y2="10"/><Line x1="12" y1="20" x2="12" y2="4"/><Line x1="6" y1="20" x2="6" y2="14"/></Icon>;
export const ZapIcon       = ({ size, color }) => <Icon size={size} color={color}><Polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
export const CheckIcon     = ({ size, color }) => <Icon size={size} color={color}><Polyline points="20 6 9 17 4 12"/></Icon>;
export const MapPinIcon    = ({ size, color }) => <Icon size={size} color={color}><Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><Circle cx="12" cy="10" r="3"/></Icon>;
export const BuildingIcon  = ({ size, color }) => <Icon size={size} color={color}><Rect x="2" y="3" width="20" height="18" rx="1"/><Line x1="9" y1="3" x2="9" y2="21"/><Line x1="15" y1="3" x2="15" y2="21"/><Line x1="2" y1="9" x2="22" y2="9"/><Line x1="2" y1="15" x2="22" y2="15"/></Icon>;
export const ChevronRightIcon = ({ size, color }) => <Icon size={size} color={color}><Polyline points="9 18 15 12 9 6"/></Icon>;
export const MoreVerticalIcon = ({ size, color }) => <Icon size={size} color={color}><Circle cx="12" cy="12" r="1"/><Circle cx="12" cy="5" r="1"/><Circle cx="12" cy="19" r="1"/></Icon>;
export const TrashIcon = ({ size, color }) => <Icon size={size} color={color}><Polyline points="3 6 5 6 21 6"/><Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><Line x1="10" y1="11" x2="10" y2="17"/><Line x1="14" y1="11" x2="14" y2="17"/></Icon>;
