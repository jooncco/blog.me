'use client';

import React, {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';
import {MoonIcon, SunIcon} from '../Icons';
import {IconButton} from '@material-tailwind/react';

export default function ThemeSwitch(): JSX.Element {
  const {systemTheme, theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = (): void => {
    setTheme(
      theme === 'system'
        ? systemTheme === 'dark'
          ? 'light'
          : 'dark'
        : theme === 'dark'
        ? 'light'
        : 'dark'
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-row rounded-full">
      {mounted && (
        <IconButton
          size="sm"
          variant="text"
          className="rounded-full text-black dark:text-white"
          onClick={toggleTheme}>
          {theme === 'system' ? (
            systemTheme === 'light' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )
          ) : theme === 'light' ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </IconButton>
      )}
    </div>
  );
}
