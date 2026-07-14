'use client';

// Compatibility re-export of Material Tailwind components (Unit U3).
//
// Legacy section components (`.jsx`, rewritten/removed in Wave 4) import MT
// components from `@/providers/AppProvider`. This module preserves that import
// surface so those sections keep compiling. The provider *composition* now
// lives in `providers/AppProviders.tsx`.
export {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar,
  Alert,
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Carousel,
  Typography,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineHeader,
  TimelineBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Tooltip,
} from '@material-tailwind/react';
