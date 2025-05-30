// packages/app/components/AssetImage.tsx
import React from 'react'
import { Image, ImageProps } from '@my/ui'
import { Platform } from 'react-native'

interface AssetImageProps extends Omit<ImageProps, 'source' | 'src'> {
  icon: number | { src: string }
  width?: number
  height?: number
  fallbackSrc?: string
}

const AssetImage: React.FC<AssetImageProps> = ({ 
  icon, 
  width = 40, 
  height = 40, 
  fallbackSrc = 'https://via.placeholder.com/40x40',
  ...props 
}) => {
  // Handle error cases
  const handleError = () => {
    console.warn('AssetImage: Failed to load asset', icon)
  }

  if (typeof icon === 'number') {
    // React Native local asset (from require())
    return (
      <Image 
        height={height} 
        width={width} 
        source={icon}
        onError={handleError}
        {...props}
      />
    )
  }
  
  if (icon && typeof icon === 'object' && icon.src) {
    // Web asset (imported or public URL)
    return (
      <Image 
        height={height} 
        width={width} 
        src={icon.src}
        onError={handleError}
        {...props}
      />
    )
  }

  // Fallback for invalid icon prop
  return (
    <Image 
      height={height} 
      width={width} 
      source={{ uri: fallbackSrc }}
      {...props}
    />
  )
}

export default AssetImage