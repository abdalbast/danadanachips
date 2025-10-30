'use client';
import { useEffect } from 'react';

export default function RootRedirect() {
  useEffect(() => {
    // Relative keeps basePath; trailing slash ensures correct static file
    window.location.replace('ckb/');
  }, []);
  
  return null;
}
