// components/ProductCarousel.tsx
"use client"
import { useState, useRef, useEffect } from 'react'
import { Platform } from 'react-native'
import { 
  XStack, 
  YStack, 
  Image, 
  Button,
  ScrollView,
  styled
} from '@my/ui'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'

interface ProductCarouselProps {
  images: string[]
  width?: number
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

// Web-specific slide container
const WebSlideContainer = styled(XStack, {
  width: '100%',
  transition: 'transform 0.3s ease-in-out',
})

const Slide = styled(YStack, {
  minW: '100%',
  width: '100%',
})

const IndicatorContainer = styled(XStack, {
  position: 'absolute',
  b: '$2',
  self: 'center',
  gap: '$1',
  px: '$2',
  py: '$1',
  bg: 'rgba(0,0,0,0.3)',
  borderRadius: '$6',
  z: 20,
})

const Indicator = styled(YStack, {
  width: 8,
  height: 8,
  borderRadius: 4,
  bg: 'rgba(255,255,255,0.5)',
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
  zIndex: 30,
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

// Mobile-specific carousel using ScrollView
function MobileCarousel({ 
  images, 
  width, 
  height, 
  showIndicators, 
  currentIndex, 
  setCurrentIndex 
}: {
  images: string[]
  width: number
  height: number
  showIndicators: boolean
  currentIndex: number
  setCurrentIndex: (index: number) => void
}) {
  const scrollViewRef = useRef<any>(null)

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent
    const currentPage = Math.round(contentOffset.x / layoutMeasurement.width)
    setCurrentIndex(currentPage)
  }

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      const scrollX = index * width
      scrollViewRef.current.scrollTo({ x: scrollX, animated: true })
    }
  }

  useEffect(() => {
    if (scrollViewRef.current && currentIndex >= 0) {
      scrollToIndex(currentIndex)
    }
  }, [currentIndex])

  return (
    <CarouselContainer width={width} height={height}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ 
          flexDirection: 'row',
        }}
        style={{ 
          width: '100%', 
          height: '100%' 
        }}
      >
        {images.map((imageUrl, index) => (
          <YStack 
            key={index} 
            width={width} 
            height={height}
          >
            <Image
              source={{ uri: imageUrl }}
              width={width}
              height={height}
              objectFit="cover"
            />
          </YStack>
        ))}
      </ScrollView>

      {/* Indicators for mobile */}
      {showIndicators && images.length > 1 && (
        <IndicatorContainer>
          {images.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onPress={() => {
                setCurrentIndex(index)
                scrollToIndex(index)
              }}
            />
          ))}
        </IndicatorContainer>
      )}
    </CarouselContainer>
  )
}

// Web-specific carousel using transforms
function WebCarousel({ 
  images, 
  width, 
  height, 
  showArrows, 
  showIndicators, 
  currentIndex, 
  setCurrentIndex,
  goToNext,
  goToPrevious 
}: {
  images: string[]
  width: number
  height: number
  showArrows: boolean
  showIndicators: boolean
  currentIndex: number
  setCurrentIndex: (index: number) => void
  goToNext: () => void
  goToPrevious: () => void
}) {
  return (
    <CarouselContainer width={width} height={height}>
      <WebSlideContainer
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((imageUrl, index) => (
          <Slide key={index}>
            <Image
              source={{ uri: imageUrl }}
              width={width}
              height={height}
              objectFit="cover"
            />
          </Slide>
        ))}
      </WebSlideContainer>

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
              onPress={() => setCurrentIndex(index)}
              cursor="pointer"
            />
          ))}
        </IndicatorContainer>
      )}
    </CarouselContainer>
  )
}

export function ProductCarousel({
  images,
  width = 300,
  height = 160,
  showArrows = true,
  showIndicators = true,
  autoSlide = false,
  autoSlideInterval = 3000
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isWeb = Platform.OS === 'web'

  // Handle empty or single image
  if (!images || images.length === 0) {
    return (
      <YStack width={width} height={height} backgroundColor="$gray3" alignItems="center" justifyContent="center">
        <Image
          source={{ uri: 'https://via.placeholder.com/300x160/e5e7eb/6b7280?text=No+Image' }}
          width={width}
          height={height}
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
        objectFit="cover"
      />
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto slide effect (only for web to avoid conflicts with mobile ScrollView)
  useEffect(() => {
    if (autoSlide && images.length > 1 && isWeb) {
      const interval = setInterval(goToNext, autoSlideInterval)
      return () => clearInterval(interval)
    }
  }, [autoSlide, autoSlideInterval, images.length, isWeb])

  // Platform-specific rendering
  if (isWeb) {
    return (
      <WebCarousel
        images={images}
        width={width}
        height={height}
        showArrows={showArrows}
        showIndicators={showIndicators}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
      />
    )
  } else {
    return (
      <MobileCarousel
        images={images}
        width={width}
        height={height}
        showIndicators={showIndicators}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    )
  }
}

export default ProductCarousel