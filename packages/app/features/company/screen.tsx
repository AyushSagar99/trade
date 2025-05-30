// packages/app/features/company/screen.tsx - Using AssetImage Component
"use client"
import {
  YStack,
  XStack,
  ScrollView,
  H2,
  H4,
  Paragraph,
  Button,
  Image,
  Avatar,
  Card,
} from '@my/ui'
import { ChevronLeft, MessageCircle, Eye, WheatOff, Twitter, Heart, MoveLeft } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import AssetImage from '../../components/AssetImages'
import ProductCarousel from '../../components/ProductCarousel'

// Import assets for native
import drySpicesIcon from '../../assets/dryspices.png'
import seedsIcon from '../../assets/seeds.png'
import herbsIcon from '../../assets/herbs.png'
import driedIcon from '../../assets/dried.png'
import pulsesIcon from '../../assets/pulses.png'
import cerealsIcon from '../../assets/cereals.png'
import organicIcon from '../../assets/organic.png'
import logo from "../../assets/logo300.png"
import cover from "../../assets/coverimg.png"

interface Product {
  id: string
  name: string
  images: string[] // Changed from 'image' to 'images' array
  origin: string
  grade: string
  packagingType: string
}

interface Category {
  id: string
  name: string
  icon: number | { src: string } // Type matches AssetImage prop
  products: Product[]
}

// Asset mapping that works for both platforms
const getAssetIcon = (assetName: string): number | { src: string } => {
  if (Platform.OS === 'web') {
    // For web, return object with src property
    return { src: `/assets/${assetName}.png` }
  } else {
    // For native, return the imported asset (number)
    const assetMap: Record<string, any> = {
      'dryspices': drySpicesIcon,
      'seeds': seedsIcon,
      'herbs': herbsIcon,
      'dried': driedIcon,
      'pulses': pulsesIcon,
      'cereals': cerealsIcon,
      'organic': organicIcon,
    }
    return assetMap[assetName] || drySpicesIcon
  }
}

// Logo helper function
const getLogo = (): string => {
  if (Platform.OS === 'web') {
    // For web, return the public path
    return '/assets/logo300.png'
  } else {
    // For native, return the imported asset
    return logo as any
  }
}

export function CompanyProfileScreen() {
  const [activeTab, setActiveTab] = useState('Products')
  const [selectedCategory, setSelectedCategory] = useState('Dry Spices')

  const company = {
    name: 'KMG Robust',
    logo: getLogo(),
    revenue: '24 M Revenue',
    employees: '1-10 Employees',
    experience: '15 Years Old',
    isPro: true,
    verified: true,
  }

  const tabs = ['Overview', 'Products', 'Posts', 'Certificates', 'Representative']

  const categories: Category[] = [
    {
      id: '1',  
      name: 'Dry Spices',
      icon: getAssetIcon('dryspices'),
      products: [
        {
          id: '1',
          name: 'Black Pepper',
          images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1585062418875-1ee1b0b12d36?w=300&h=200&fit=crop'
          ],
          origin: 'Tanzania',
          grade: 'Choice, Export Quality',
          packagingType: 'Carton Box (50kg)'
        }
      ]
    },
    {
      id: '2',
      name: 'Seeds',
      icon: getAssetIcon('seeds'),
      products: [
        {
          id: '2',
          name: 'White Pepper',
          images: [
            'https://images.unsplash.com/photo-1599909533730-f3b4d8e79a8b?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1585862142430-d4569ef5e76e?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=300&h=200&fit=crop'
          ],
          origin: 'Tanzania',
          grade: 'Choice, Export Quality',
          packagingType: 'Carton Box (3kg)'
        }
      ]
    },
    {
      id: '3',
      name: 'Herbs & Dehydrates',
      icon: getAssetIcon('herbs'),
      products: []
    },
    {
      id: '4',
      name: 'Dried Fruits & Nuts',
      icon: getAssetIcon('dried'),
      products: []
    },
    {
      id: '5',
      name: 'Pulses',
      icon: getAssetIcon('pulses'),
      products: [
        {
          id: '3',
          name: 'Cloves',
          images: [
            'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=300&h=200&fit=crop',
            'https://images.unsplash.com/photo-1535567465397-7523840d5e28?w=300&h=200&fit=crop'
          ],
          origin: 'Tanzania',
          grade: 'Choice, Export Quality',
          packagingType: 'Carton Box (3kg)'
        }
      ]
    },
    {
      id: '6',
      name: 'Grains & Cereals',
      icon: getAssetIcon('cereals'),
      products: []
    },
    {
      id: '7',
      name: 'Organic',
      icon: getAssetIcon('organic'),
      products: []
    }
  ]

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory)

  return (
    <YStack flex={1} bg="$background">
      {/* Header */}
      <XStack
  p="$2"
  pt="$6"
  bg="$background"
  justify="space-between"
  borderBottomWidth={1}
  borderBottomColor="$borderColor"
  items="center"
>
  <XStack gap="$3" items="center">
    <Button size="$3" circular fontSize={'$10'} icon={MoveLeft} />
    {/* Invisible button for symmetry */}
    <Button size="$1" circular opacity={0} pointerEvents="none">
      <Twitter />
    </Button>
  </XStack>
  <H2 fontSize={'$8'} text="center" >
    {company.name}
  </H2>
  <Button size="$3" circular>
    <Twitter />
  </Button>
</XStack>


      {/* Cover Image */}
      <YStack height={120} position="relative">
        <Image
          source={cover}
          width="100%"
          height="100%"
        />
        <YStack
          position="absolute"
          b={-40}
          l="$4"
          items="center"
          gap="$2"
        >
          <Avatar circular size="$6" bg="$background" padding="$1">
            <Avatar.Image src={company.logo} />
          </Avatar>
        </YStack>
      </YStack>

      {/* Company Info */}
      <YStack p="$4" pt="$6" gap="$3">
        <XStack items="center" gap="$2">
          <H2>{company.name}</H2>
        </XStack>


<XStack gap="$2" items="center">
  <Paragraph size="$3" color="#6b7280">{company.revenue}</Paragraph>
  <Paragraph size="$3" color="#D9D9D9">•</Paragraph>
  <Paragraph size="$3" color="#6b7280">{company.employees}</Paragraph>
  <Paragraph size="$3" color="#D9D9D9">•</Paragraph>
  <Paragraph size="$3" color="#6b7280">{company.experience}</Paragraph>
</XStack>


        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$4" pt="$2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                size="$3"
                bg="transparent"
                borderWidth={0}
                borderBottomWidth={activeTab === tab ? 2 : 0}
                borderBottomColor={activeTab === tab ? "#22c55e" : "transparent"}
                color={activeTab === tab ? "#22c55e" : "#6b7280"}
                borderRadius={0}
                onPress={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </XStack>
        </ScrollView>
      </YStack>

      {/* Main Content */}
      <XStack flex={1}>
        {/* Categories Sidebar */}
        <YStack
          width={100}
          bg="#f9fafb"
          borderRightWidth={1}
          borderRightColor="$borderColor"
          pt="$2"
        >
          <ScrollView showsVerticalScrollIndicator={true} 
        
          >
            <YStack gap="$2" px={2}>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  size="$3"
                  bg={
                    selectedCategory === category.name ? "#D9D9D9" : "transparent"
                  }
                  borderWidth={selectedCategory === category.name ? 1 : 0}
                  onPress={() => setSelectedCategory(category.name)}
                  p="$2"
                  height="auto"
                  flexDirection="column"
                  gap="$1"
                >
                  {/* Use the AssetImage component */}
                  <AssetImage
                    icon={category.icon}
                    width={70}
                    height={65}
                    borderRadius="$2"
                  />
                  <Paragraph
                    size={selectedCategory === category.name ? "$3" : "$2"}
                    items="center"
                    numberOfLines={2}
                    color={selectedCategory === category.name ? "#08100D" : "#6b7280"}
                  >
                    {category.name}
                  </Paragraph>
                </Button>
              ))}
            </YStack>
          </ScrollView>
        </YStack>

        {/* Products List */}
        <ScrollView flex={1} p="$3">
          <YStack gap="$3">
            {selectedCategoryData?.products.map((product) => (
              <Card key={product.id} padding="$0" borderRadius="$4" overflow="hidden">
                <YStack position="relative">
                  <ProductCarousel
                    images={product.images}
                    width="100%"
                    height={160}
                    showArrows={true}
                    showIndicators={true}
                    autoSlide={false}
                  />
                  
                  {/* Product Info Overlay */}
                  <YStack
                    b={0}
                    l={0}
                    r={0}
                    p="$3"
                  >
                    <H4 color="white" fontSize={'$5'} mb="$2" position='absolute'
                    t={-30}
                    l={5}
                    >
                      {product.name}
                    </H4>
                    
                    <YStack gap="$1">
                      <XStack gap={'$11'} justify="flex-start" >
                        <Paragraph size="$2">Origin</Paragraph>
                        <Paragraph size="$2" >{product.origin}</Paragraph>
                      </XStack>
                      
                      <XStack gap={'$11'} justify="flex-start">
                        <Paragraph size="$2" >Grade</Paragraph>
                        <Paragraph size="$2">{product.grade}</Paragraph>
                      </XStack>
                      
                      <XStack gap={'$3'} justify="flex-start">
                        <Paragraph size="$2" >Packaging Type</Paragraph>
                        <Paragraph size="$2">{product.packagingType}</Paragraph>
                      </XStack>
                    </YStack>

                    <XStack justify="space-between" items="center" mt="$2">
                      <Button size="$2"  color="#22c55e">
                        View All Details
                      </Button>
                      <XStack gap="$1" items="center">
                        <Eye size={12} color="white" />
                        <Paragraph size="$1" color="white">•••••</Paragraph>
                      </XStack>
                    </XStack>
                  </YStack>
                </YStack>
              </Card>
            ))}
            
            {selectedCategoryData?.products.length === 0 && (
              <YStack items="center" justify="center" p="$8">
                <Paragraph color="#6b7280" items="center">
                  No products available in this category
                </Paragraph>
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </XStack>

      {/* Contact Button */}
      <XStack
        p="$4"
        bg="$background"
        borderTopWidth={1}
        justify={'space-between'}
        borderTopColor="$borderColor"
      >

        <Button bg="#E8F5E8" color="#12A150"><Heart/></Button>
        <Button
          size="$4"
          bg="#E8F5E8"
          color="#12A150"
          fontWeight="600"
        >
          Contact
        </Button>
      </XStack>
    </YStack>
  )
}