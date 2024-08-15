import React, { FunctionComponent } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import { useTheme } from '../../context/themeContext';

const ThemedSkeleton: FunctionComponent<SkeletonProps> = ({ ...props }) => {
  const { theme } = useTheme();

  const baseColor = theme === 'dark' ? '#161616' : '#ebebeb';
  const highlightColor = theme === 'dark' ? '#212121' : '#f5f5f5';

  return (
    <Skeleton
      baseColor={baseColor}
      highlightColor={highlightColor}
      {...props}
    />
  );
};

export default ThemedSkeleton;