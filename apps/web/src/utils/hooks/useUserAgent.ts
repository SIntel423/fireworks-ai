'use client';

import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<'mac' | 'windowsArm64' | 'windowsX86_64' | 'unsupported' | null>(null);

  useEffect(() => {
    const parsedUa = UAParser(navigator.userAgent);

    switch (true) {
      case parsedUa.device.model === 'Macintosh':
        setUserAgent('mac');
        break;
      case parsedUa.cpu.architecture === 'arm64':
        setUserAgent('windowsArm64');
        break;
      case parsedUa.cpu.architecture === 'amd64':
        setUserAgent('windowsX86_64');
        break;
      default:
        setUserAgent('unsupported');
        break;
    }
  }, []);

  return userAgent;
};

export default useUserAgent;
