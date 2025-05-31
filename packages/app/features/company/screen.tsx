// packages/app/features/company/screen.tsx - Clean Platform Approach
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
import { ChevronLeft, MessageCircle, Eye, WheatOff, Twitter, Heart, MoveLeft, ArrowLeft, MoveRight, ChevronRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import AssetImage from '../../components/AssetImages'
import ProductCarousel from '../../components/ProductCarousel'
import { LinearGradient } from '@tamagui/linear-gradient'

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
  images: string[]
  origin: string
  grade: string
  packagingType: string
}

interface Category {
  id: string
  name: string
  icon: number | { src: string }
  products: Product[]
}

// Responsive style helpers
const isWeb = Platform.OS === 'web'

const styles = {
  container: {
    maxWidth: isWeb ? 1200 : undefined,
    alignSelf: isWeb ? 'center' : undefined,
  },
  header: {
    p: isWeb ? "$4" : "$2",
    pt: isWeb ? "$8" : "$6",
    ...(isWeb && {
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    })
  },
  headerTitle: {
    fontSize: isWeb ? '$9' : '$8',
    fontWeight: isWeb ? '700' : undefined,
  },
  coverImage: {
    height: isWeb ? 200 : 120,
  },
  avatar: {
    size: isWeb ? "$8" : "$6",
    padding: isWeb ? "$2" : "$1",
    bottom: isWeb ? -50 : -40,
    left: isWeb ? "$6" : "$4",
    ...(isWeb && {
      shadowColor: "rgba(0,0,0,0.2)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5
    })
  },
  companyInfo: {
    p: isWeb ? "$6" : "$4",
    pt: isWeb ? "$8" : "$6",
    gap: isWeb ? "$4" : "$3",
  },
  proButton: {
    size: isWeb ? '$2' : '$1.5',
    fontSize: isWeb ? '$3' : '$2',
    fontWeight: isWeb ? '700' : undefined,
  },
  categoryContainer: {
    width: isWeb ? 140 : 100,
    pt: isWeb ? "$3" : "$2",
  },
  productCard: {
    borderRadius: isWeb ? "$6" : "$4",
    ...(isWeb && {
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: "#f3f4f6"
    })
  },
  contactSection: {
    p: isWeb ? "$5" : "$4",
    ...(isWeb && {
      shadowColor: "rgba(0,0,0,0.1)",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5
    })
  }
}

// Asset mapping that works for both platforms
const getAssetIcon = (assetName: string): number | { src: string } => {
  if (Platform.OS === 'web') {
    return { src: `/assets/${assetName}.png` }
  } else {
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
    return '/assets/logo300.png'
  } else {
    return logo as any
  }
}

// Cover image helper function
const getCoverImage = (): number | { src: string } => {
  if (Platform.OS === 'web') {
    return { src: '/assets/coverimg.png' }
  } else {
    return cover
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
            'https://images.unsplash.com/photo-1641661548431-87172338d58c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwcGVwcGVyfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1612708034948-466dcc56ebde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBwZXBwZXJ8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1636488771211-9c635f5002e9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwcGVwcGVyfGVufDB8fDB8fHww',
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
            'https://media.istockphoto.com/id/1136809580/photo/spices-online-store-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=D4w8woW1yFSCysXXvFQ4KQ8jfqrP1n5Qv5Wy9cBUEwQ=',
            'https://media.istockphoto.com/id/1144616940/photo/white-pepper-with-mortar-pestle.webp?a=1&b=1&s=612x612&w=0&k=20&c=mQPyKvyd-a9v20os84WygZnPbZynMrjVVSnmXMy0Z6s=',
            'https://media.istockphoto.com/id/508627851/photo/spoon-of-pepper.webp?a=1&b=1&s=612x612&w=0&k=20&c=v-RdYhJREkQrLC8zH2Js1sxskJPUosH1xcBIBPjSfXM='
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
            'https://plus.unsplash.com/premium_photo-1723759301525-4b8dd72fb425?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdmVzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1701191310584-3f319e0e6c59?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdmVzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1701190882981-eefd61eeec88?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3Zlc3xlbnwwfHwwfHx8MA%3D%3D'
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

  // Function to render tab content
  const renderTabContent = () => {
    if (activeTab === 'Products') {
      return (
        <XStack flex={1}>
          {/* Categories Sidebar */}
          <YStack
            bg="#f9fafb"
            borderRightWidth={1}
            borderRightColor="$borderColor"
            {...styles.categoryContainer}
          >
            <ScrollView showsVerticalScrollIndicator={!isWeb}>
              <YStack gap={isWeb ? "$3" : "$2"} px={isWeb ? "$2" : 2}>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    size={isWeb ? "$4" : "$3"}
                    bg={selectedCategory === category.name && isWeb ? "#f0fdf4" : "transparent"}
                    borderWidth={selectedCategory === category.name ? (isWeb ? 2 : 1) : 0}
                    borderColor={selectedCategory === category.name && isWeb ? "#22c55e" : undefined}
                    onPress={() => setSelectedCategory(category.name)}
                    p={isWeb ? "$3" : "$2"}
                    height="auto"
                    flexDirection="column"
                    gap={isWeb ? "$2" : "$1"}
                    borderRadius={isWeb ? "$4" : undefined}
                  >
                    <AssetImage
                      icon={category.icon}
                      width={isWeb ? 80 : 70}
                      height={isWeb ? 75 : 65}
                      borderRadius={isWeb ? "$3" : "$2"}
                    />
                    <Paragraph
                      fontSize={selectedCategory === category.name ? "$3" : "$2"}
                      text={isWeb ? "center" : undefined}
                      items="center"
                      numberOfLines={2}
                      color={selectedCategory === category.name ? (isWeb ? "#16a34a" : "black") : "#6b7280"}
                      fontWeight={selectedCategory === category.name && isWeb ? "600" : "400"}
                    >
                      {category.name}
                    </Paragraph>
                  </Button>
                ))}
              </YStack>
            </ScrollView>
          </YStack>

          {/* Products List */}
          <ScrollView flex={1} p={isWeb ? "$5" : "$3"}>
            <YStack gap={isWeb ? "$5" : "$3"}>
              {selectedCategoryData?.products.map((product) => (
                <Card 
                  key={product.id} 
                  padding="$0" 
                  overflow="hidden" 
                  bg="transparent"
                  {...styles.productCard}
                >
                  <YStack position="relative">
                    <ProductCarousel
                      images={product.images}
                      width={isWeb ? 900 : 300}
                      height={isWeb ? 350 : 200}
                      showArrows={true}
                      showIndicators={true}
                      autoSlide={true}
                    />
                    
                    {/* Product Info Overlay */}
                    <YStack
                      b={0}
                      l={0}
                      r={0}
                      p={isWeb ? "$4" : "$3"}
                    >
                      <H4 
                        color="white" 
                        fontSize={isWeb ? "$6" : "$5"} 
                        mb={isWeb ? "$3" : "$2"} 
                        position="absolute"
                        t={isWeb ? -40 : -30}
                        l={isWeb ? 8 : 5}
                        fontWeight={isWeb ? "700" : undefined}
                      >
                        {product.name}
                      </H4>
                      
                      <YStack gap={isWeb ? "$2" : "$1"} mb={isWeb ? "$3" : undefined}>
                        <XStack 
                          justify={isWeb ? "space-between" : "flex-start"} 
                          gap={isWeb ? undefined : "$11"}
                          items="center"
                        >
                          <Paragraph 
                            size={isWeb ? "$3" : "$2"}
                            fontWeight={isWeb ? "500" : undefined}
                          >
                            Origin
                          </Paragraph>
                          <Paragraph 
                            size={isWeb ? "$3" : "$2"}
                            fontWeight={isWeb ? "600" : undefined}
                          >
                            {product.origin}
                          </Paragraph>
                        </XStack>
                        
                        <XStack 
                          justify={isWeb ? "space-between" : "flex-start"} 
                          gap={isWeb ? undefined : "$11"}
                          items="center"
                        >
                          <Paragraph 
                            size={isWeb ? "$3" : "$2"}
                            fontWeight={isWeb ? "500" : undefined}
                          >
                            Grade
                          </Paragraph>
                          <Paragraph 
                            size={isWeb ? "$3" : "$2"}
                            fontWeight={isWeb ? "600" : undefined}
                          >
                            {product.grade}
                          </Paragraph>
                        </XStack>
                        
                        <XStack 
                          justify={isWeb ? "space-between" : "flex-start"} 
                          gap={isWeb ? undefined : "$3"}
                          items="center"
                        >
                          <Paragraph 
                            size={isWeb ? "$3" : "$2"}
                            fontWeight={isWeb ? "500" : undefined}
                          >
                            {isWeb ? "Packaging" : "Packaging Type"}
                          </Paragraph>
                          <Paragraph 
                            size={isWeb ? "$3" : "$2"}
                            fontWeight={isWeb ? "600" : undefined}
                          >
                            {product.packagingType}
                          </Paragraph>
                        </XStack>
                      </YStack>

                      <XStack justify="space-between" items="center" mt="$2">
                        <Button 
                          size={isWeb ? "$3" : "$2"} 
                          bg={isWeb ? "rgba(34, 197, 94, 0.9)" : "transparent"} 
                          color={isWeb ? "white" : "#22c55e"}
                          fontWeight={isWeb ? "600" : undefined}
                          borderRadius={isWeb ? "$4" : undefined}
                        >
                          {isWeb ? "View Details" : "View All Details"} 
                          <ChevronRight 
                            size={isWeb ? 16 : "$1"} 
                            color={isWeb ? "white" : "#22c55e"} 
                          />
                        </Button>
                        <XStack gap="$1" items="center">
                          <Eye 
                            size={isWeb ? 16 : 12} 
                            color={isWeb ? "rgba(255,255,255,0.8)" : "white"} 
                          />
                          <Paragraph 
                            size="$1" 
                            color={isWeb ? "rgba(255,255,255,0.8)" : "white"}
                          >
                            {isWeb ? "View Count" : "•••••"}
                          </Paragraph>
                        </XStack>
                      </XStack>
                    </YStack>
                  </YStack>
                </Card>
              ))}
              
              {selectedCategoryData?.products.length === 0 && (
                <YStack 
                  items="center" 
                  justify="center" 
                  p="$8"
                  bg={isWeb ? "white" : undefined}
                  borderRadius={isWeb ? "$6" : undefined}
                >
                  <Paragraph 
                    color="#6b7280" 
                    items="center"
                    fontSize={isWeb ? "$4" : undefined}
                    text={isWeb ? "center" : undefined}
                  >
                    No products available in this category
                  </Paragraph>
                </YStack>
              )}
            </YStack>
          </ScrollView>
        </XStack>
      )
    } else {
      // Empty state for other tabs
      return (
        <YStack 
          flex={1} 
          items="center" 
          justify="center" 
          p="$8"
          bg={isWeb ? "#f9fafb" : undefined}
        >
          <Paragraph 
            color="#6b7280" 
            text="center"
            fontSize={isWeb ? "$5" : "$4"}
            fontWeight={isWeb ? "500" : undefined}
          >
            {activeTab} content coming soon
          </Paragraph>
        </YStack>
      )
    }
  }

  return (
    <YStack flex={1} bg="$background" {...styles.container}>
      {/* Header */}
      <XStack
        bg="$background"
        justify="space-between"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        items="center"
        {...styles.header}
      >
        <XStack gap="$3" items="center">
          <Button 
            size={isWeb ? "$4" : "$3"} 
            bg="transparent" 
            circular 
            fontSize="$10" 
            icon={ArrowLeft}
          />
          <Button size="$1" bg="transparent" circular opacity={0} pointerEvents="none">
            <Twitter />
          </Button>
        </XStack>
        <H2 text="center" {...styles.headerTitle}>
          {company.name}
        </H2>
        <Button 
          size={isWeb ? "$4" : "$3"} 
          bg="transparent" 
          circular
        >
          <Twitter />
        </Button>
      </XStack>

      {/* Cover Image */}
      <YStack position="relative" {...styles.coverImage}>
        <AssetImage
          icon={getCoverImage()}
          width={isWeb ? 1200 : 420}
          height={isWeb ? 200 : 120}
        />
        <YStack
          position="absolute"
          items="center"
          gap="$2"
          b={styles.avatar.bottom}
          l={styles.avatar.left}
        >
          <Avatar 
            circular 
            bg="$background" 
            size={styles.avatar.size}
            padding={styles.avatar.padding}
            {...(isWeb && {
              shadowColor: styles.avatar.shadowColor,
              shadowOffset: styles.avatar.shadowOffset,
              shadowOpacity: styles.avatar.shadowOpacity,
              shadowRadius: styles.avatar.shadowRadius,
              elevation: styles.avatar.elevation
            })}
          >
            <Avatar.Image src={company.logo} />
          </Avatar>
        </YStack>
      </YStack>

      {/* Company Info */}
      <YStack {...styles.companyInfo}>
        <XStack items="center" gap={isWeb ? "$3" : "$2"}>
          <H2 fontSize={isWeb ? "$9" : undefined} fontWeight={isWeb ? "700" : undefined}>
            {company.name}
          </H2>
          <LinearGradient
            colors={['#FBBB54', '#C88110']}
            start={[0, 0]}
            end={[0, 1]}
            style={{ borderRadius: 5 }}
          >
            <Button 
              bg="transparent" 
              color="white"
              size={styles.proButton.size}
              fontSize={styles.proButton.fontSize}
              fontWeight={styles.proButton.fontWeight}
            >
              PRO
            </Button>
          </LinearGradient>
        </XStack>

        <XStack gap={isWeb ? "$3" : "$2"} items="center">
          <Paragraph 
            size={isWeb ? "$4" : "$3"} 
            color="#6b7280"
            fontWeight={isWeb ? "500" : undefined}
          >
            {company.revenue}
          </Paragraph>
          <Paragraph size={isWeb ? "$4" : "$3"} color="#D9D9D9">•</Paragraph>
          <Paragraph 
            size={isWeb ? "$4" : "$3"} 
            color="#6b7280"
            fontWeight={isWeb ? "500" : undefined}
          >
            {company.employees}
          </Paragraph>
          <Paragraph size={isWeb ? "$4" : "$3"} color="#D9D9D9">•</Paragraph>
          <Paragraph 
            size={isWeb ? "$4" : "$3"} 
            color="#6b7280"
            fontWeight={isWeb ? "500" : undefined}
          >
            {company.experience}
          </Paragraph>
        </XStack>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap={isWeb ? "$6" : "$4"} pt={isWeb ? "$3" : "$2"}>
            {tabs.map((tab) => (
              <Button
                key={tab}
                size={isWeb ? "$4" : "$3"}
                bg="transparent"
                borderWidth={0}
                borderBottomWidth={activeTab === tab ? (isWeb ? 3 : 2) : 0}
                borderBottomColor={activeTab === tab ? "#22c55e" : "transparent"}
                color={activeTab === tab ? "#22c55e" : "#6b7280"}
                borderRadius={0}
                fontSize={isWeb ? "$5" : undefined}
                fontWeight={activeTab === tab && isWeb ? "700" : isWeb ? "500" : undefined}
                onPress={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </XStack>
        </ScrollView>
      </YStack>

      {/* Main Content - Conditional based on active tab */}
      {renderTabContent()}

      {/* Contact Button */}
      <XStack
        bg="$background"
        borderTopWidth={1}
        justify="space-between"
        borderTopColor="$borderColor"
        items="center"
        {...styles.contactSection}
      >
        <Button 
          bg="#E8F5E8" 
          color="#12A150"
          size={isWeb ? "$4" : undefined}
          circular={isWeb}
        >
          <Heart color="#12A150"/>
        </Button>
        <Button
          size={isWeb ? "$5" : "$4"}
          bg="#E8F5E8"
          color="#12A150"
          fontWeight={isWeb ? "700" : "600"}
          fontSize={isWeb ? "$5" : undefined}
          borderRadius={isWeb ? "$5" : undefined}
        >
          {isWeb ? "Contact Company" : "Contact"}
        </Button>
      </XStack>
    </YStack>
  )
}