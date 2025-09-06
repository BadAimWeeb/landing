import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import "@radix-ui/themes/styles.css";
import "@fontsource/manrope/index.css";
import '@fontsource/inter/index.css';
import { Theme } from '@radix-ui/themes';
import { ParallaxProvider } from 'react-scroll-parallax';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ParallaxProvider>
            <Theme appearance="dark" accentColor="teal" radius="large">
                <App type="dn42" />
            </Theme>
        </ParallaxProvider>
    </StrictMode>,
)
