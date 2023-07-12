import React from 'react';
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from '@/app/provider';
import {SquaresIcon} from '../Icons';
import {navItems} from '../NavBar';
import Link from 'next/link';

export default function MobileNav(): JSX.Element {
  return (
    <div className="sm:hidden">
      <SpeedDial placement="bottom">
        <SpeedDialHandler>
          <IconButton className="h-8 w-8 rounded-full bg-transparent shadow-transparent hover:bg-blue-500/10 hover:shadow-transparent">
            <SquaresIcon className="h-4 w-4 transition-transform group-hover:rotate-45 text-black dark:text-white" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          {Object.entries(navItems).map(([name, {path, icon}]) => {
            return (
              <SpeedDialAction
                key={name}
                className="h-14 w-14 border-transparent bg-blue-200 dark:bg-[#121640] rounded-xl">
                <Link
                  href={path}
                  className="flex flex-col items-center justify-items-center space-y-1">
                  {icon}
                  <Typography className="text-xs">{name}</Typography>
                </Link>
              </SpeedDialAction>
            );
          })}
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
