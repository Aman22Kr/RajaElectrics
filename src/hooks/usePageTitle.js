import { useEffect } from 'react';
import { QUICK_SETTINGS } from '../config';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${QUICK_SETTINGS.brandName}` : `${QUICK_SETTINGS.brandName}: ${QUICK_SETTINGS.tagline}`;
  }, [title]);
}
