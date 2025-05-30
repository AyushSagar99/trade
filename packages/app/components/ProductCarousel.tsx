// components/ProductCarousel.tsx
"use client"
import { useState } from 'react'
import { 
  XStack, 
  YStack, 
  Image, 
  Button,
  styled
} from '@my/ui'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'

interface ProductCarouselProps {
  images: string[]
  width?: string | number
  height?: number
  showArrows?: boolean
  showIndicators?: boolean
  autoSlide?: boolean
  autoSlideInterval?: number
}

const CarouselContainer = styled(YStack, {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '$4',
})

const SlideContainer = styled(XStack, {
  width: '100%',
  transition: 'transform 0.3s ease-in-out',
})

const Slide = styled(YStack, {
  minWidth: '100%',
  width: '100%',
})

const IndicatorContainer = styled(XStack, {
  position: 'absolute',
  bottom: '$2',
  alignSelf: 'center',
  gap: '$1',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  backgroundColor: 'rgba(0,0,0,0.3)',
  borderRadius: '$6',
})

const Indicator = styled(YStack, {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255,255,255,0.5)',
  variants: {
    active: {
      true: {
        backgroundColor: 'white',
        width: 16,
      }
    }
  }
})

const ArrowButton = styled(Button, {
  position: 'absolute',
  top: '50%',
  zIndex: 10,
  size: '$3',
  circular: true,
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderWidth: 0,
  transform: [{ translateY: -20 }],
  
  variants: {
    side: {
      left: {
        left: '$2',
      },
      right: {
        right: '$2',
      }
    }
  }
})

export function ProductCarousel({
  images,
  width = "100%",
  height = 160,
  showArrows = true,
  showIndicators = true,
  autoSlide = false,
  autoSlideInterval = 3000
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Handle empty or single image
  if (!images || images.length === 0) {
    return (
      <YStack width={width} height={height} backgroundColor="$gray3" alignItems="center" justifyContent="center">
        <Image
          source={{ uri: 'https://via.placeholder.com/300x160/e5e7eb/6b7280?text=No+Image' }}
          width="100%"
          height="100%"
        />
      </YStack>
    )
  }

  if (images.length === 1) {
    return (
      <Image
        source={{ uri: images[0] }}
        width={width}
        height={height}
      />
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto slide effect
  useState(() => {
    if (autoSlide && images.length > 1) {
      const interval = setInterval(goToNext, autoSlideInterval)
      return () => clearInterval(interval)
    }
  })

  return (
    <CarouselContainer width={width} height={height}>
      <SlideContainer
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((imageUrl, index) => (
          <Slide key={index}>
            <Image
              source={{ uri: imageUrl }}
              width="100%"
              height={height}
              objectFit="cover"
            />
          </Slide>
        ))}
      </SlideContainer>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <ArrowButton
            side="left"
            onPress={goToPrevious}
            icon={<ChevronLeft size={16} color="white" />}
          />
          <ArrowButton
            side="right"
            onPress={goToNext}
            icon={<ChevronRight size={16} color="white" />}
          />
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <IndicatorContainer>
          {images.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onPress={() => goToSlide(index)}
              cursor="pointer"
            />
          ))}
        </IndicatorContainer>
      )}
    </CarouselContainer>
  )
}

export default ProductCarousel