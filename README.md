# Company Profile Screen + Tamagui + Solito

```sh
git clone https://github.com/AyushSagar99/trade.git
yarn install
```

## 🔦 About

This is a responsive company profile component built with React Native and Tamagui Starter Kit that works seamlessly across web and mobile platforms. Perfect for B2B marketplaces, trading platforms, and business directories.

Built on top of the Tamagui + Solito + Next + Expo monorepo starter, this project demonstrates cross-platform UI development with a focus on reusable components and responsive design.

## 📦 Included packages

- [Tamagui](https://tamagui.dev) 🪄 - Universal UI components and styling
- [Solito](https://solito.dev) - Cross-platform navigation
- [React Native](https://reactnative.dev) - Cross-platform mobile development
- [Next.js](https://nextjs.org) - React framework for web
- [TypeScript](https://www.typescriptlang.org) - Type-safe development
- [Expo SDK](https://expo.dev) - Development platform and tools

## 🗂 Folder layout

The main apps are:

- `expo` (native)
- `next` (web)

- `packages` shared packages across apps
  - `ui` includes your custom UI kit optimized by Tamagui
  - `app` main application code
    - `features/company` company profile screen implementation
      - `screen.tsx` main company profile component (1,200+ lines)
      - `components/` reusable UI components
        - `AssetImages.tsx` cross-platform image handler
        - `ProductCarousel.tsx` reusable carousel component
        - `OverviewTab.tsx` company overview content
      - `assets/` company and product images
        - `logo300.png` company logo
        - `coverimg.png` cover image
        - Category icons (dryspices.png, seeds.png, etc.)

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn web`
  - Open browser to `http://localhost:3000`

- Expo local dev: `yarn native`
  - Press `i` for iOS simulator
  - Press `a` for Android emulator
  - Scan QR code with Expo Go for physical device

To run with optimizer on in dev mode: `yarn web:extract`. To build for production `yarn web:prod`.

> [!TIP]
> To see debug output to verify the compiler, add `// debug` as a comment to the top of any file.

## 🎯 Features

- Cross-platform compatibility (iOS, Android, Web)
- Responsive design optimized for mobile and desktop
- Professional company information display
- Dynamic product categories with image carousels
- Interactive tab navigation system
- Auto-sliding product galleries with navigation controls
- Modern UI with shadows, gradients, and smooth animations
- Performance optimized rendering and smooth scrolling
- Full TypeScript implementation
- Modular reusable UI components built with Tamagui

## 🧩 Reusable Components

Built with **Tamagui** components for maximum reusability:

### Core Tamagui Components Used
- `YStack` & `XStack` - Layout containers
- `ScrollView` - Scrollable content areas
- `Button` - Interactive buttons with hover states
- `Card` - Content containers with shadows
- `Avatar` - Profile image display
- `H2`, `H4`, `Paragraph` - Typography components
- `LinearGradient` - Gradient backgrounds

### Custom Components

**AssetImage Component**
```tsx
<AssetImage
  icon={category.icon}
  width={isWeb ? 80 : 70}
  height={isWeb ? 75 : 65}
  borderRadius={isWeb ? "$3" : "$2"}
/>
```

**ProductCarousel Component**
```tsx
<ProductCarousel
  images={product.images}
  width={isWeb ? 900 : 300}
  height={isWeb ? 350 : 200}
  showArrows={true}
  showIndicators={true}
  autoSlide={true}
/>
```

## ✅ Implemented Features

### Core Functionality
- Cross-platform compatibility (iOS, Android, Web)
- Responsive header with company name and navigation
- Cover image with overlaid company avatar
- Company information section with revenue, employees, experience
- PRO badge with gradient styling
- Tab navigation system (5 tabs implemented)
- Product categories sidebar (7 categories)
- Product showcase with image carousels
- Product details overlay (origin, grade, packaging)
- Interactive category selection
- Empty state handling for categories without products
- Contact section with heart and contact buttons

### Technical Implementation
- Platform-specific styling (web vs mobile optimizations)
- TypeScript implementation with proper typing
- Error handling for missing components
- Asset management system for cross-platform images
- Fallback Overview component with proper state management

### Sample Data
- Company profile: KMG Robust (spice trading company)
- 3 Product categories with actual products:
  - Dry Spices (Black Pepper)
  - Seeds (White Pepper) 
  - Pulses (Cloves)
- 4 Empty categories ready for content

## 🚧 Pending Features

### Content Management
- OverviewTab component (currently using fallback)
- Posts tab content (social media style posts)
- Certificates tab (company certifications display)
- Representative tab (contact person details)

### Data Integration
- Real API integration (currently using mock data)
- Search functionality within products
- Product filtering by origin, grade, packaging
- Product detail modal/screen

### User Experience
- Company social media links integration
- Review/rating system
- Share functionality
- Bookmark/favorite products
- Chat integration for instant messaging
- Phone/email direct contact actions
- PDF catalog download

### Technical Enhancements
- Multi-language support
- Dark mode support
- Accessibility improvements
- Unit tests for components
- E2E testing setup
- Loading states and error boundaries
- Skeleton screens and pull-to-refresh
- Infinite scroll for large product lists
- Image zoom functionality
- Advanced animations and haptic feedback

## 🏗️ Architecture

### Platform Detection System
```tsx
const isWeb = Platform.OS === 'web'

// Conditional rendering
{isWeb ? "Contact Company" : "Contact"}
```


### Responsive Styling
```tsx
const styles = {
  container: {
    maxWidth: isWeb ? 1200 : undefined,
    alignSelf: isWeb ? 'center' : undefined,
  },
  // Platform-aware conditional styling
}
```

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `expo`:

```sh
cd apps/expo
yarn add react-native-reanimated
cd ../..
yarn
```

## 🔧 Development Commands

### Basic Commands
```sh
# Install dependencies
yarn

# Start web development
yarn web

# Start native development  
yarn native

# Build for production (web)
yarn web:prod

# Type checking
yarn type-check

# Clean cache
yarn clean
```

### Troubleshooting

**Metro bundler issues:**
```sh
yarn clean
yarn start --reset-cache
```

**iOS build errors:**
```sh
cd ios && pod install && cd ..
yarn ios
```

**Missing assets:**
- Ensure all images are in the correct `/assets` folder
- Check asset paths in the `getAssetIcon` function

## 📱 Platform Setup

### iOS Setup
1. Install Xcode from Mac App Store
2. Install Xcode Command Line Tools:
   ```sh
   xcode-select --install
   ```
3. Install CocoaPods:
   ```sh
   sudo gem install cocoapods
   ```

### Android Setup
1. Download and install [Android Studio](https://developer.android.com/studio)
2. Set up Android SDK through Android Studio
3. Create a virtual device in AVD Manager

## 🎨 Usage

### Basic Implementation

```tsx
import { CompanyProfileScreen } from './packages/app/features/company/screen'

export default function App() {
  return <CompanyProfileScreen />
}
```

### Customizing Company Data

```tsx
const company = {
  name: 'Your Company Name',
  logo: getLogo(),
  revenue: '50M Revenue',
  employees: '100+ Employees',
  experience: '20 Years Old',
  isPro: true,
  verified: true,
}
```

### Adding Product Categories

```tsx
const categories = [
  {
    id: '1',
    name: 'Your Category',
    icon: getAssetIcon('category-name'),
    products: [
      {
        id: '1',
        name: 'Product Name',
        images: ['image1.jpg', 'image2.jpg'],
        origin: 'Country',
        grade: 'Premium Quality',
        packagingType: 'Box (25kg)'
      }
    ]
  }
]
```

> [!TIP]
> Environment Configuration:
>
> Create a `.env.local` file in the root directory:
> ```env
> NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
> NEXT_PUBLIC_APP_ENV=development
> NEXT_PUBLIC_ASSETS_URL=/assets
> ```

## 📊 Project Stats

- **Total Lines of Code**: 1,200+ lines
- **Components**: 15+ reusable components
- **Platforms Supported**: 3 (iOS, Android, Web)
- **TypeScript Coverage**: 100%
- **Responsive Breakpoints**: Mobile & Desktop

## 🚀 Deploying to Vercel

- Root: `apps/next`
- Install command: `yarn set version stable && yarn install`
- Build command: leave default setting
- Output dir: leave default setting

## 🤝 Contributing

### Development Guidelines

- Follow TypeScript best practices
- Maintain cross-platform compatibility
- Write responsive designs
- Add proper error handling
- Include tests for new features
- Use Tamagui components consistently

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tamagui Starter Kit](https://github.com/tamagui/starter-free) for the foundation
- [Tamagui](https://tamagui.dev/) for the amazing UI framework
- [@FernandoTheRojo](https://twitter.com/fernandotherojo) for the Solito starter
- [React Native](https://reactnative.dev/) for cross-platform development